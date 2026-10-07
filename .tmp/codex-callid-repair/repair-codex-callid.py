#!/usr/bin/env python3
"""Repair Codex rollout items that break OpenAI-compatible gateways.

Why this exists
---------------
The Codex Desktop automation runner injects an automation wake-up as a
synthetic tool result that has no ``call_id``::

    {"type":"function_call_output","id":"fco_...","name":"automation_update",
     "namespace":"codex_app","output":"<heartbeat>..."}

OpenAI's own Responses API tolerates that item.  Stricter gateways (OpenCode
Zen "Go" in front of DeepSeek/GLM/Kimi) validate the body and reject the whole
request::

    unexpected status 422 Unprocessable Entity: Upstream request failed:
    [invalid_request_error] Failed to deserialize the JSON body into the target
    type: input: missing field `call_id` at line 1 column <N>

The item is written into the thread history, so *every* later turn of that
thread fails with the same 422.  Upgrading nothing helps; the history has to be
repaired.

What this script does
---------------------
For each stored ``function_call_output`` / ``custom_tool_call_output`` without a
``call_id`` it:

* keeps the outer line byte-for-byte the same length (the JSON is re-serialised
  with a shorter payload and padded with trailing spaces after the closing
  brace, which every JSON parser ignores) so the rollout byte offsets, ordinals
  and projections recorded in the app stay valid;
* turns the payload into a plain assistant message that keeps the original id
  and the turn metadata, so the thread keeps loading;
* archives the original payload to ``<rollout>.repair-<stamp>.removed.jsonl``;
* mirrors the change into ``thread_history_1.sqlite`` (``thread_items`` and, if
  present, ``thread_realtime_items``).

Codex must be closed while running this: it keeps rollout files open and denies
writes from other processes.

Usage
-----
    python repair-codex-callid.py                       # dry run, report only
    python repair-codex-callid.py --apply               # backup + repair
    python repair-codex-callid.py --apply --thread 01a0a30f-1f6b-7160-b211-5b337025242a
    python repair-codex-callid.py --apply --codex-home "C:\\Users\\me\\.codex"
"""

from __future__ import annotations

import argparse
import glob
import json
import os
import sqlite3
import sys
import time
from pathlib import Path

BAD_TYPES = ("function_call_output", "custom_tool_call_output", "local_shell_call_output")
NOTE_TEMPLATE = (
    "【本地修复 / local repair】此条原为自动化心跳注入的工具结果"
    "（{name} / {namespace}），因为没有 call_id 被 OpenCode Go 网关拒绝"
    "（422 missing field `call_id`），导致本会话每一轮都失败。"
    "已改写为普通消息以便会话继续使用；原始内容 {chars} 字符已另存到 {archive}。"
)


def codex_home(explicit: str | None) -> Path:
    if explicit:
        return Path(explicit)
    env = os.environ.get("CODEX_HOME")
    return Path(env) if env else Path.home() / ".codex"


def rollout_files(home: Path) -> list[Path]:
    found: list[Path] = []
    for sub in ("sessions", "archived_sessions"):
        pattern = str(home / sub / "**" / "*.jsonl")
        found.extend(Path(p) for p in glob.glob(pattern, recursive=True))
    return sorted(found)


def split_lines(raw: bytes) -> tuple[list[bytes], bool]:
    """Return (lines without newline, trailing_newline)."""
    trailing = raw.endswith(b"\n")
    lines = raw.split(b"\n")
    if trailing:
        lines = lines[:-1]
    return lines, trailing


def line_offsets(lines: list[bytes]) -> list[int]:
    offsets: list[int] = []
    pos = 0
    for line in lines:
        offsets.append(pos)
        pos += len(line) + 1  # + newline
    return offsets


def wants_call_id(payload: dict) -> bool:
    return (
        isinstance(payload, dict)
        and payload.get("type") in BAD_TYPES
        and not payload.get("call_id")
    )


def replacement_payload(payload: dict, archive_name: str) -> dict:
    name = payload.get("name") or "unknown"
    namespace = payload.get("namespace") or "-"
    output = payload.get("output")
    chars = len(output) if isinstance(output, str) else 0
    note = NOTE_TEMPLATE.format(
        name=name, namespace=namespace, chars=chars, archive=archive_name
    )
    new_payload: dict = {
        "type": "message",
        "id": payload.get("id") or "",
        "role": "assistant",
        "content": [{"type": "output_text", "text": note}],
        "phase": "commentary",
    }
    if payload.get("internal_chat_message_metadata_passthrough"):
        new_payload["internal_chat_message_metadata_passthrough"] = payload[
            "internal_chat_message_metadata_passthrough"
        ]
    return new_payload


def app_side_item(payload: dict, archive_name: str) -> dict:
    """Same message, in the shape thread_history_1.sqlite stores."""
    name = payload.get("name") or "unknown"
    namespace = payload.get("namespace") or "-"
    output = payload.get("output")
    chars = len(output) if isinstance(output, str) else 0
    return {
        "type": "agentMessage",
        "id": payload.get("id") or "",
        "text": NOTE_TEMPLATE.format(
            name=name, namespace=namespace, chars=chars, archive=archive_name
        ),
        "phase": "commentary",
        "memoryCitation": None,
        "delivery": None,
        "questions": None,
    }


def thread_id_of(lines: list[bytes]) -> str | None:
    for line in lines[:3]:
        try:
            obj = json.loads(line)
        except Exception:  # noqa: BLE001
            continue
        payload = obj.get("payload") or {}
        if obj.get("type") == "session_meta":
            return payload.get("session_id") or payload.get("id")
    return None


def plan_rollout(path: Path) -> tuple[list[bytes], list[dict]]:
    raw = path.read_bytes()
    lines, trailing = split_lines(raw)
    changes: list[dict] = []
    for index, line in enumerate(lines):
        if b"function_call_output" not in line and b"custom_tool_call_output" not in line:
            continue
        try:
            obj = json.loads(line)
        except Exception:  # noqa: BLE001
            continue
        payload = obj.get("payload")
        if not wants_call_id(payload):
            continue
        changes.append(
            {
                "index": index,
                "ordinal": obj.get("ordinal"),
                "original": payload,
                "line_bytes": len(line),
            }
        )
    return lines, changes


def build_repaired_lines(
    lines: list[bytes], changes: list[dict], archive_name: str
) -> list[bytes]:
    out = list(lines)
    for change in changes:
        index = change["index"]
        obj = json.loads(lines[index])
        obj["payload"] = replacement_payload(change["original"], archive_name)
        new_line = json.dumps(obj, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
        target = change["line_bytes"]
        if len(new_line) > target:
            raise SystemExit(
                f"replacement would be longer than the original line "
                f"({len(new_line)} > {target}); refusing to change offsets"
            )
        # Trailing spaces after the JSON object keep the byte length identical
        # without changing the parsed value.
        out[index] = new_line + b" " * (target - len(new_line))
    return out


def repair_sqlite(
    db_path: Path,
    thread_id: str | None,
    changes: list[dict],
    archive_name: str,
    apply: bool,
) -> None:
    if not db_path.exists():
        print(f"  sqlite: {db_path} not found, skipped")
        return
    con = sqlite3.connect(db_path)
    touched = 0
    try:
        for change in changes:
            ordinal = change["ordinal"]
            item_id = change["original"].get("id")
            # Match on item_id: the app's rollout_ordinal drifts from the
            # rollout file's ordinal column, the id never does.
            row = []
            if item_id:
                row = con.execute(
                    "select thread_id, item_id, item_type, item_json from thread_items "
                    "where item_id = ?" + (" and thread_id = ?" if thread_id else ""),
                    (item_id, thread_id) if thread_id else (item_id,),
                ).fetchall()
            if not row:
                row = con.execute(
                    "select thread_id, item_id, item_type, item_json from thread_items "
                    "where rollout_ordinal = ?"
                    + (" and thread_id = ?" if thread_id else ""),
                    (ordinal, thread_id) if thread_id else (ordinal,),
                ).fetchall()
            for thread, item_id, item_type, item_json in row:
                new_item = app_side_item(change["original"], archive_name)
                print(
                    f"  sqlite: {thread[:13]} {item_type} -> agentMessage (item_id={item_id})"
                )
                if apply:
                    con.execute(
                        "update thread_items set item_type = ?, item_json = ? "
                        "where thread_id = ? and item_id = ?",
                        (
                            "agentMessage",
                            json.dumps(new_item, ensure_ascii=False, separators=(",", ":")),
                            thread,
                            item_id,
                        ),
                    )
                    con.execute(
                        "update thread_realtime_items set item_type = ?, item_json = ? "
                        "where item_id = ?",
                        (
                            "agentMessage",
                            json.dumps(new_item, ensure_ascii=False, separators=(",", ":")),
                            item_id,
                        ),
                    )
                touched += 1
        if apply and touched:
            con.commit()
    finally:
        con.close()
    if not touched:
        print("  sqlite: no matching rows")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--codex-home", help="default: %CODEX_HOME% or ~/.codex")
    parser.add_argument("--thread", help="only touch this session id")
    parser.add_argument("--rollout", help="repair a single rollout file (testing)")
    parser.add_argument("--sqlite", help="override thread_history_1.sqlite path")
    parser.add_argument("--apply", action="store_true", help="write the repair (default: dry run)")
    args = parser.parse_args()

    home = codex_home(args.codex_home)
    stamp = time.strftime("%Y%m%d-%H%M%S")
    db_path = Path(args.sqlite) if args.sqlite else home / "thread_history_1.sqlite"
    targets = [Path(args.rollout)] if args.rollout else rollout_files(home)

    print(f"CODEX_HOME : {home}")
    print(f"sqlite     : {db_path}")
    print(f"mode       : {'APPLY' if args.apply else 'dry run'}")
    print()

    repaired = 0
    blocked: list[Path] = []
    for path in targets:
        lines, changes = plan_rollout(path)
        if not changes:
            continue
        thread_id = thread_id_of(lines)
        if args.thread and thread_id != args.thread:
            continue
        # NOTE: keep this extension out of the app's session scan ("*.jsonl").
        archive_name = f"{path.name}.repair-{stamp}.removed.json"
        print(f"== {path}")
        print(f"   thread {thread_id}: {len(changes)} item(s) without call_id")
        for change in changes:
            print(f"   - ordinal {change['ordinal']} ({change['original'].get('name')})")
        new_lines = build_repaired_lines(lines, changes, archive_name)
        raw = path.read_bytes()
        rebuilt = b"\n".join(new_lines) + (b"\n" if raw.endswith(b"\n") else b"")
        assert len(rebuilt) == len(raw), "byte length changed"
        if not args.apply:
            print("   dry run: nothing written")
            continue

        backup = Path(f"{path}.bak-{stamp}")
        archive = path.parent / archive_name
        backup.write_bytes(raw)
        with open(archive, "w", encoding="utf-8", newline="\n") as fh:
            for change in changes:
                fh.write(json.dumps(change["original"], ensure_ascii=False) + "\n")

        # The repaired line has exactly the same length as the original, so the
        # rollout is edited in place: Codex keeps rollout handles open and a
        # rename/replace of the file is refused while it runs.
        offsets = line_offsets(lines)
        try:
            with open(path, "r+b") as fh:
                for change in changes:
                    index = change["index"]
                    fh.seek(offsets[index])
                    fh.write(new_lines[index])
                fh.flush()
                os.fsync(fh.fileno())
        except PermissionError as exc:
            print(f"   !! cannot write {path}: {exc}")
            print("      Codex 桌面版可能仍在运行；请完全退出 Codex 后重试。")
            print(f"      (已生成备份 {backup.name}，原文件未改动)")
            blocked.append(path)
            continue

        for stale in path.parent.glob(path.name + ".new-*"):
            stale.unlink(missing_ok=True)
        print(f"   backup : {backup}")
        print(f"   archive: {archive}")
        print(
            f"   rollout rewritten in place ({len(new_lines)} lines, "
            f"{len(rebuilt)} bytes, unchanged size)"
        )
        repair_sqlite(db_path, thread_id, changes, archive_name, True)
        _, leftovers = plan_rollout(path)
        if leftovers:
            print(f"   !! {len(leftovers)} item(s) still without call_id - please report this")
        else:
            print("   verified: no item without call_id remains in this rollout")
        repaired += len(changes)

    if not repaired and not blocked and not args.apply:
        print("no rollout items need repair")
    if blocked:
        print()
        print(f"{len(blocked)} file(s) could not be written (target file refused the write).")
        print("Quit Codex completely (including the tray icon) and run this script again.")
        return 2
    if repaired:
        print()
        print(f"repaired {repaired} item(s). Restart Codex, then open the thread again.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
