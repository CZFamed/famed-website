# -*- coding: utf-8 -*-
"""
素材分析 + 审阅拼版生成（用于无法逐张目视时的辅助选图）。

输出：
    <out>/manifest.csv         每张图的尺寸、大小、画质指标、去重指纹
    <out>/manifest.json        同上（程序读取用）
    <out>/sheet_<分组>.jpg     按目录分组的带编号拼版图，供人工复核

用法：
    python analyze_assets.py --src "<图片根目录>" --out "<输出目录>"
"""
import argparse
import csv
import json
import math
import os
import sys
from collections import OrderedDict, defaultdict

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageStat

Image.MAX_IMAGE_PIXELS = None

EXTS = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}


def dhash(img: Image.Image, size: int = 8) -> int:
    """差值哈希，用于近似去重。"""
    small = img.resize((size + 1, size), Image.LANCZOS).convert("L")
    px = list(small.tobytes())
    bits = 0
    for row in range(size):
        base = row * (size + 1)
        for col in range(size):
            bits = (bits << 1) | (1 if px[base + col] > px[base + col + 1] else 0)
    return bits


def hamming(a: int, b: int) -> int:
    return bin(a ^ b).count("1")


def analyze(path: str):
    try:
        with Image.open(path) as im:
            im.draft("RGB", (640, 480))   # JPEG 快速降采样解码
            im.load()
            # draft 会就地缩小 im，原始尺寸需要另取
            with Image.open(path) as raw:
                w, h = raw.size
            base = im.convert("RGB").resize((360, 270), Image.LANCZOS)
            small = base.convert("L")
            stat = ImageStat.Stat(small)
            lum = stat.mean[0]
            contrast = stat.stddev[0]
            detail = ImageStat.Stat(small.filter(ImageFilter.FIND_EDGES)).mean[0]
            sat = ImageStat.Stat(base.convert("HSV")).mean[1]
            dh = dhash(im)
        return {
            "w": w, "h": h, "ratio": round(w / h, 3) if h else 0,
            "lum": round(lum, 1), "contrast": round(contrast, 1),
            "detail": round(detail, 2), "sat": round(sat, 1),
            "dhash": f"{dh:016x}",
        }
    except Exception as exc:  # noqa: BLE001
        print(f"  !! 读取失败 {path}: {exc}", file=sys.stderr)
        return None


def load_font(size: int, bold: bool = False):
    cands = [
        r"C:\Windows\Fonts\msyhbd.ttc" if bold else r"C:\Windows\Fonts\msyh.ttc",
        r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arial.ttf",
    ]
    for c in cands:
        if os.path.exists(c):
            try:
                return ImageFont.truetype(c, size)
            except Exception:  # noqa: BLE001
                continue
    return ImageFont.load_default()


def make_sheet(items, out_path, cols=6, tile_w=300, title=""):
    tile_h = int(tile_w * 0.72)
    label_h = 46
    head_h = 44 if title else 8
    pad = 6
    rows = max(1, math.ceil(len(items) / cols))
    sheet_w = cols * (tile_w + pad) + pad
    sheet_h = head_h + rows * (tile_h + label_h + pad) + pad
    sheet = Image.new("RGB", (sheet_w, sheet_h), (24, 28, 34))
    draw = ImageDraw.Draw(sheet)
    f_head = load_font(20, True)
    f_idx = load_font(17, True)
    f_name = load_font(11)

    if title:
        draw.text((12, 11), title, font=f_head, fill=(240, 244, 250))

    for i, it in enumerate(items):
        col = i % cols
        row = i // cols
        x = pad + col * (tile_w + pad)
        y = head_h + pad + row * (tile_h + label_h + pad)
        try:
            with Image.open(it["abs"]) as im:
                im = im.convert("RGB")
                sw, sh = im.size
                scale = max(tile_w / sw, tile_h / sh)
                nw, nh = max(1, int(sw * scale)), max(1, int(sh * scale))
                im = im.resize((nw, nh), Image.LANCZOS)
                left = (nw - tile_w) // 2
                top = (nh - tile_h) // 2
                im = im.crop((left, top, left + tile_w, top + tile_h))
                sheet.paste(im, (x, y))
        except Exception:  # noqa: BLE001
            draw.rectangle([x, y, x + tile_w, y + tile_h], fill=(60, 30, 30))

        draw.rectangle([x, y, x + 40, y + 26], fill=(15, 18, 24))
        draw.text((x + 7, y + 3), str(i), font=f_idx, fill=(255, 214, 64))

        q = it.get("m")
        name = os.path.basename(it["rel"])
        if len(name) > 34:
            name = name[:32] + ".."
        draw.text((x, y + tile_h + 3), name, font=f_name, fill=(186, 196, 210))
        if q:
            meta = '{}x{}  L{:.0f} C{:.0f} D{:.0f}'.format(q["w"], q["h"], q["lum"], q["contrast"], q["detail"])
            draw.text((x, y + tile_h + 19), meta, font=f_name, fill=(120, 200, 150))

    sheet.save(out_path, "JPEG", quality=80, optimize=True)
    return out_path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", required=True)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    src = os.path.abspath(args.src)
    out = os.path.abspath(args.out)
    os.makedirs(out, exist_ok=True)

    rows = []
    for dirpath, _dirnames, filenames in os.walk(src):
        for fn in sorted(filenames):
            if os.path.splitext(fn)[1].lower() not in EXTS:
                continue
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, src).replace("\\", "/")
            m = analyze(full)
            if not m:
                continue
            m["rel"] = rel
            m["kb"] = int(os.path.getsize(full) / 1024)
            m["abs"] = full
            m["mtime"] = __import__("datetime").datetime.fromtimestamp(
                os.path.getmtime(full)).strftime("%Y-%m-%d")
            rows.append(m)

    # 近似去重：同目录内 dHash 距离 <= 4 视为同一张
    dup_of = {}
    by_dir = defaultdict(list)
    for r in rows:
        by_dir[os.path.dirname(r["rel"])].append(r)
    for _d, group in by_dir.items():
        for i, a in enumerate(group):
            if a["rel"] in dup_of:
                continue
            for b in group[i + 1:]:
                if b["rel"] in dup_of:
                    continue
                if hamming(int(a["dhash"], 16), int(b["dhash"], 16)) <= 4:
                    dup_of[b["rel"]] = a["rel"]

    for r in rows:
        r["dup_of"] = dup_of.get(r["rel"], "")
        r["screenshot"] = 1 if os.path.basename(r["rel"]).lower().startswith("screenshot") else 0
        r["curated"] = 1 if "微信图片_202609" in r["rel"] else 0

    with open(os.path.join(out, "manifest.json"), "w", encoding="utf-8") as fh:
        json.dump(rows, fh, ensure_ascii=False, indent=1)

    fields = ["rel", "w", "h", "ratio", "kb", "lum", "contrast", "detail", "sat",
              "dup_of", "screenshot", "curated", "mtime", "dhash"]
    with open(os.path.join(out, "manifest.csv"), "w", encoding="utf-8-sig", newline="") as fh:
        wr = csv.writer(fh)
        wr.writerow(fields)
        for r in rows:
            wr.writerow([r[c] for c in fields])

    # 拼版
    group_map = OrderedDict()
    for r in rows:
        # 直接放在一级目录下的文件归到该目录，避免出现"单图分页"
        key = os.path.dirname(r["rel"]) or "(root)"
        group_map.setdefault(key, []).append(r)
    sheets = []
    for key, items in group_map.items():
        safe = key.replace("/", "__").replace(" ", "_")
        items_sorted = sorted(items, key=lambda x: x["rel"])
        sheets.append(make_sheet(items_sorted, os.path.join(out, f"sheet_{safe}.jpg"),
                                 title=f"{key}  ({len(items)} 张)"))

    print(f"OK {len(rows)} images, {len(sheets)} sheets -> {out}")


if __name__ == "__main__":
    main()
