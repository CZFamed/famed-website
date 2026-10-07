# 修复 `422 ... missing field 'call_id'`（OpenCode Go 通道）

## 原因（已复现）

Codex 桌面版的「自动化」心跳在注入提示时，会在会话历史里写一条**没有 `call_id`
的工具结果**：

```json
{"type":"function_call_output","name":"automation_update","namespace":"codex_app","output":"<heartbeat>..."}
```

OpenAI 官方 Responses 接口能容忍这种条目，但 OpenCode Zen 的 Go 网关会严格校验，
直接拒掉**整个请求**：

```
unexpected status 422 ... input: missing field `call_id` at line 1 column <N>
```

因为这条记录已经落到会话历史里，所以这个会话**之后每一轮都会失败**。

本次受影响的会话：

| 项目 | 值 |
| --- | --- |
| 会话 | `01a0a30f-1f6b-7160-b211-5b337025242a`（菲美得公司网站 / 新闻周更） |
| 注入时间 | 2026-09-21 08:33（自动化 `08-30` 心跳） |
| 位置 | rollout 第 1585 行（ordinal 1584） |
| 失败轮次 | 09-21 1 次 + 09-22 2 次，全部 422 |

## 修复步骤

1. 打开一个普通 PowerShell 窗口，先干跑一次看报告：

   ```powershell
   python "D:\agent开发\菲美得\公司网站\.tmp\codex-callid-repair\repair-codex-callid.py" --thread 01a0a30f-1f6b-7160-b211-5b337025242a
   ```

2. 确认没问题后加 `--apply` 落地（不加 `--thread` 会修复所有含该问题的会话）：

   ```powershell
   python "D:\agent开发\菲美得\公司网站\.tmp\codex-callid-repair\repair-codex-callid.py" --apply --thread 01a0a30f-1f6b-7160-b211-5b337025242a
   ```

3. **重启 Codex**（桌面版把会话历史加载在内存里，重启后才会重新读取修好的 rollout），
   再进入该会话发一条消息验证。

Codex 运行中也可以执行：脚本用「原地等长覆写」而不是替换文件，因为 Codex 会一直持有
rollout 句柄，Windows 会拒绝重命名/替换（表现为 `WinError 5 拒绝访问`）。只有连写入
也被拒绝时（脚本会打印 `cannot write ...`）才需要完全退出 Codex 再重跑。

## 脚本改了什么

* rollout（`~/.codex/sessions/.../rollout-*.jsonl`）：把这条工具结果改成一条普通
  assistant 消息，**行字节长度保持完全一致**（JSON 后补空格，任何 JSON 解析器都会
  忽略），并直接原地覆写这几千字节；不新建/不替换文件，所以应用记录的字节偏移、
  ordinal、投影状态都不用动，也不会触发 “durable rollout shrank” 报错。
* `~/.codex/thread_history_1.sqlite`：按 `item_id` 把对应的
  `thread_items`/`thread_realtime_items` 行改成 `agentMessage`，保证界面侧一致。
* 原始内容：写到 `rollout-*.jsonl.repair-<时间戳>.removed.json`（故意不用 `.jsonl`
  后缀，避免被会话扫描当成新会话）。
* 备份：`rollout-*.jsonl.bak-<时间戳>` 和 `thread_history_1.sqlite.bak-<时间戳>`。

## 已验证

* 用一份 rollout 副本复现了原始 422；
* 对副本执行本脚本后，用 `codex exec resume` 重新跑该会话，成功拿到模型回复，
  不再出现 `missing field call_id`；
* 修复后文件字节数、行数、ordinal 连续性均未变化。

## 防止再次发生

* 自动化 `08-30`（新闻资讯周更，kind=heartbeat，target=该会话）已置为 `PAUSED`，
  否则下次周一 08:30 会再注入一条同样的坏记录。
* 同样的心跳注入在 OpenCode Go 通道上对**所有**自动化都不可用（会话里另有 17 条
  同类失败记录）。要恢复「新闻周更」定时任务，可参考开发信的做法：
  用 Windows 计划任务 + `codex exec`（CLI 不经桌面版心跳注入，不会踩这个坑）。
