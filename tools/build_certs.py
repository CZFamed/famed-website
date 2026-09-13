# -*- coding: utf-8 -*-
"""
把证书原件（PDF 正本 / 微信发来的照片）整理成"母版"图片，供 build_assets.py 再加工成站点素材。

用法：
    python tools/build_certs.py [--out <母版目录>]

输出（默认写到 ..\菲美得产品图片\资质证书\）：
    01-高新技术企业证书.jpg
    02-河北省科技型中小企业.jpg
    03-绿色铸造示范企业-荣誉证书.jpg
    04-ISO9001质量管理体系认证证书.jpg
    05-排污许可证.jpg

处理内容：PDF 用 Poppler 渲染成 200dpi 位图；手机拍摄的文件转正、裁掉证件外背景与相框；
PDF 渲染页裁掉四周留白。裁切参数集中在 TASKS 里，改完重跑即可。
"""
import argparse
import os
import shutil
import subprocess
import tempfile

from PIL import Image, ImageFilter, ImageOps

DEFAULT_OUT = r"D:\agent开发\菲美得\菲美得产品图片\资质证书"
PDF_DPI = 200
TARGET_LONG_EDGE = 2200

WECHAT_DIR = r"C:\Users\Administrator\Documents\xwechat_files\wxid_bfap9pdwtokj22_9974\msg\file\2026-09"
PIC_DIR = r"C:\Users\Administrator\Pictures\Saved Pictures"

PERMIT_PDF = os.path.join(WECHAT_DIR, "26年排污正本.pdf")
ISO_PDF = os.path.join(WECHAT_DIR, "质量管理体系证书中文-沧州菲美得机械设备有限公司.pdf")
HITECH_JPG = os.path.join(PIC_DIR, "微信图片_20260912135919_10_16.jpg")
TECHSME_PNG = os.path.join(PIC_DIR, "微信图片_20260912135930_11_16.png")
GREEN_PNG = os.path.join(PIC_DIR, "微信图片_20260912135814_6_16.png")


def find_pdftoppm():
    bundled = (r"C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime"
               r"\dependencies\native\poppler\Library\bin\pdftoppm.exe")
    if os.path.exists(bundled):
        return bundled
    found = shutil.which("pdftoppm")
    if found:
        return found
    raise SystemExit("找不到 pdftoppm，请安装 Poppler 或把 pdftoppm 加入 PATH")


def render_pdf(pdf_path, tmp_dir, tag):
    prefix = os.path.join(tmp_dir, tag)
    subprocess.run(
        [find_pdftoppm(), "-png", "-r", str(PDF_DPI), "-f", "1", "-l", "1",
         pdf_path, prefix],
        check=True,
    )
    produced = sorted(p for p in os.listdir(tmp_dir)
                      if p.startswith(os.path.basename(prefix)) and p.endswith(".png"))
    if not produced:
        raise SystemExit(f"渲染失败：{pdf_path}")
    return os.path.join(tmp_dir, produced[0])


def content_box(im, threshold=246, pad=8):
    mask = im.convert("L").point(lambda v: 0 if v >= threshold else 255)
    box = mask.getbbox()
    if not box:
        return (0, 0, im.width, im.height)
    return (max(0, box[0] - pad), max(0, box[1] - pad),
            min(im.width, box[2] + pad), min(im.height, box[3] + pad))


def normalize(im, rotate=0, crop=None, auto=True, edge=None, sharpen=False):
    im = ImageOps.exif_transpose(im).convert("RGB")
    if rotate:
        im = im.rotate(rotate, expand=True, resample=Image.BICUBIC)
    if crop:
        im = im.crop(crop)
    elif auto:
        im = im.crop(content_box(im))
    if edge and max(im.size) < edge:
        k = edge / max(im.size)
        im = im.resize((int(im.width * k), int(im.height * k)), Image.LANCZOS)
    if sharpen:
        im = im.filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=3))
    return im


def build(out_dir):
    tmp_dir = tempfile.mkdtemp(prefix="certs-")
    os.makedirs(out_dir, exist_ok=True)
    outputs = []
    try:
        jobs = [
            ("01-高新技术企业证书.jpg", HITECH_JPG,
             dict(rotate=90, auto=False)),
            ("02-河北省科技型中小企业.jpg", TECHSME_PNG,
             dict(auto=False)),
            ("03-绿色铸造示范企业-荣誉证书.jpg", GREEN_PNG,
             dict(auto=False, crop=(22, 5, 599, 369), edge=1200, sharpen=True)),
            ("04-ISO9001质量管理体系认证证书.jpg", render_pdf(ISO_PDF, tmp_dir, "iso"),
             dict(auto=True, edge=TARGET_LONG_EDGE)),
            ("05-排污许可证.jpg", render_pdf(PERMIT_PDF, tmp_dir, "permit"),
             dict(auto=True, edge=TARGET_LONG_EDGE)),
        ]
        for name, src, opts in jobs:
            with Image.open(src) as raw:
                im = normalize(raw, **opts)
            dst = os.path.join(out_dir, name)
            im.save(dst, "JPEG", quality=92, optimize=True, progressive=True)
            outputs.append((dst, im.size))
    finally:
        shutil.rmtree(tmp_dir, ignore_errors=True)
    return outputs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=DEFAULT_OUT)
    args = ap.parse_args()

    for path, size in build(os.path.abspath(args.out)):
        print(f"{size[0]}x{size[1]}  {path}")


if __name__ == "__main__":
    main()
