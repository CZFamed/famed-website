# -*- coding: utf-8 -*-
"""
从 analyze_assets.py 产出的 manifest.json 中挑出可用候选图并按目录输出排名清单。

用法：
    python rank_assets.py --manifest "<_素材审阅/manifest.json>" [--top 30] [--group 铸件/阀体]
"""
import argparse
import json
import os
import sys


def score(r):
    """综合画质打分：细节 > 对比度 > 分辨率，惩罚偏暗/偏灰/低饱和。"""
    s = 0.0
    s += min(r["detail"], 40) * 1.6
    s += min(r["contrast"], 70) * 0.5
    s += min(r["w"] * r["h"] / 1_000_000, 12) * 1.2
    s += min(r["sat"], 60) * 0.25
    if r["lum"] < 60:
        s -= (60 - r["lum"]) * 0.8
    if r["lum"] > 205:
        s -= (r["lum"] - 205) * 0.5
    if r["contrast"] < 35:
        s -= (35 - r["contrast"]) * 0.8
    if r["curated"]:
        s += 6
    return round(s, 2)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--manifest", required=True)
    ap.add_argument("--top", type=int, default=30)
    ap.add_argument("--group", default="")
    ap.add_argument("--min-width", type=int, default=1200)
    ap.add_argument("--csv", default="")
    args = ap.parse_args()

    with open(args.manifest, encoding="utf-8") as fh:
        rows = json.load(fh)

    kept = []
    for r in rows:
        if r["screenshot"] or r["dup_of"]:
            continue
        if r["w"] < args.min_width:
            continue
        if r["lum"] < 42 or r["contrast"] < 26 or r["detail"] < 9:
            continue
        r["score"] = score(r)
        kept.append(r)

    if args.group:
        kept = [r for r in kept if r["rel"].startswith(args.group)]

    groups = {}
    for r in kept:
        key = os.path.dirname(r["rel"]) or "(root)"
        groups.setdefault(key, []).append(r)

    lines = []
    for key in sorted(groups):
        items = sorted(groups[key], key=lambda x: -x["score"])[: args.top]
        lines.append(f"\n=== {key}  ({len(groups[key])} 合格 / 取前 {len(items)}) ===")
        for r in items:
            name = os.path.basename(r["rel"])
            lines.append(
                f'{r["score"]:7.1f}  {r["w"]}x{r["h"]}  L{r["lum"]:5.1f} C{r["contrast"]:5.1f} '
                f'D{r["detail"]:5.1f} S{r["sat"]:4.1f}  {name}')

    out = "\n".join(lines)
    print(out)
    if args.csv:
        import csv
        with open(args.csv, "w", encoding="utf-8-sig", newline="") as fh:
            wr = csv.writer(fh)
            wr.writerow(["group", "rel", "score", "w", "h", "lum", "contrast", "detail", "sat", "curated"])
            for key in sorted(groups):
                for r in sorted(groups[key], key=lambda x: -x["score"]):
                    wr.writerow([key, r["rel"], r["score"], r["w"], r["h"], r["lum"],
                                 r["contrast"], r["detail"], r["sat"], r["curated"]])
        print(f"\n-> {args.csv}")


if __name__ == "__main__":
    main()
