# -*- coding: utf-8 -*-
"""
按清单把原始实拍图裁切/压缩成站点素材（WebP + JPEG 双格式）。

用法：
    python build_assets.py [--src <图片根目录>] [--out <站点 assets/img 目录>] [--only hero]

输出：
    <out>/<分类>/<名称>.webp|.jpg
    <out>/<分类>/<名称>-t.webp|.jpg     （带缩略图规格的槽位）
    <out>/manifest.json                 （源图 -> 输出 的溯源清单）
"""
import argparse
import json
import os
import shutil
import sys
from datetime import datetime

from PIL import Image, ImageOps

Image.MAX_IMAGE_PIXELS = None

DEFAULT_SRC = r"D:\agent开发\菲美得\菲美得产品图片"
DEFAULT_OUT = r"D:\agent开发\菲美得\公司网站\assets\img"

# 槽位：目标尺寸 + 缩略图尺寸
SLOTS = {
    "hero":   {"size": (2400, 1100), "thumb": None},
    "banner": {"size": (2000, 800),  "thumb": (800, 320)},
    "card":   {"size": (1200, 900),  "thumb": (600, 450)},
    "tall":   {"size": (900, 1200),  "thumb": (450, 600)},
    "wide":   {"size": (1600, 900),  "thumb": (800, 450)},
    "square": {"size": (1000, 1000), "thumb": (500, 500)},
    "og":     {"size": (1200, 630),  "thumb": None},
    "video":  {"size": (1280, 720),  "thumb": None},
    # 证书扫描件：等比缩放到框内，四周留白，绝不裁切证件内容
    "cert":   {"size": (1400, 1000), "thumb": (700, 500), "fit": "contain"},
    "certp":  {"size": (1130, 1500), "thumb": (565, 750), "fit": "contain"},
}

# (槽位, 输出相对路径(不含扩展名), 源图相对路径, 裁切锚点 0-1, RAG 知识库中的画面描述)
# 每张图的画面内容以 agent/RAG知识库/图片描述/ 中的描述为准，不做主观推断。
ITEMS = [
    # ---------- 首页与栏目页横幅 ----------
    ("hero",   "hero/hero-home",            "厂区_场景/厂房/1.jpg",  (0.5, 0.45), "消失模铸造车间内景：蓝色除尘系统与黄色铸件周转区"),
    ("hero",   "hero/hero-home-alt",        "厂区_场景/厂房/2251dd58506fe701b09c608bb4f3e097.jpg", (0.5, 0.5), "铸造车间内部全景，通道两侧摆放蓝色金属箱体与排风管道"),
    ("banner", "banner/banner-about",       "厂区_场景/厂房/9a773cb3fc77360e98642d9f5703ba48.jpg", (0.5, 0.5), "大型钢结构厂房内地面堆放多件弧形铸件毛坯，工人戴安全帽在作业区旁活动"),
    ("banner", "banner/banner-products",    "铸件/壳体/IMG_20241122_160745.jpg", (0.5, 0.5), "车间内大量灰色阀体成品整齐码放于木托盘"),
    ("banner", "banner/banner-capabilities","生产流程/机加工/IMG_20201012_094906.jpg", (0.5, 0.5), "机加工作业区一排大型数控加工中心整齐排列"),
    ("banner", "banner/banner-quality",     "铸件/箱体_支座/IMG_20231029_095938.jpg", (0.5, 0.5), "大型灰铁箱体铸件正在进行三维扫描检测"),
    ("banner", "banner/banner-applications","铸件/箱体_支座/IMG_20201202_160824.jpg", (0.5, 0.5), "车间内多排大型黄色配重铸件整齐排列"),
    ("banner", "banner/banner-certificates","厂区_场景/厂房/7.jpg",  (0.5, 0.5), "公司招牌墙：沧州菲美得机械有限公司大门形象"),
    ("banner", "banner/banner-news",        "厂区_场景/厂房/12.jpg", (0.5, 0.5), "在建新厂房：混凝土框架结构裸露楼面"),
    ("banner", "banner/banner-faq",         "铸件/壳体/IMG_20250419_083631.jpg", (0.5, 0.5), "新建红色钢结构仓库内成排阀体铸件待发货"),
    ("banner", "banner/banner-contact",     "厂区_场景/厂房/918a90491ef1a1b22294f4be4c18f38e.jpg", (0.5, 0.5), "厂区户外除尘设备与砖砌厂房外景"),
    ("og",     "og/og-default",             "厂区_场景/厂房/1.jpg",  (0.5, 0.45), "消失模铸造车间内景：蓝色除尘系统与黄色铸件周转区"),

    # ---------- 生产工艺（按 8 道工序分组） ----------
    # 三维扫描与检测
    ("card", "process/scan-1",  "铸件/箱体_支座/IMG_20231029_095938.jpg", (0.5, 0.5), "大型灰铁箱体铸件正在进行三维扫描检测"),
    ("card", "process/scan-2",  "铸件/箱体_支座/IMG_20231029_095947.jpg", (0.5, 0.5), "吊运状态下的大型箱体铸件三维扫描检测"),
    ("card", "process/scan-3",  "加工件/壳体/mmexport1700357244017.jpg", (0.5, 0.5), "Volvo 品牌大型铸钢件吊装与手持扫描检测"),
    # 发泡成型
    ("card", "process/foam-forming-1", "生产流程/发泡/生成流程_发泡_1.jpg", (0.5, 0.5), "单台立式发泡成型机特写"),
    ("card", "process/foam-forming-2", "生产流程/发泡/生成流程_发泡_2.jpg", (0.5, 0.5), "发泡工段多台成型机并列作业"),
    ("card", "process/foam-forming-3", "生产流程/发泡/生成流程_发泡_3.jpg", (0.5, 0.5), "发泡成型机开模作业近景，模腔内白模清晰可见"),
    # 白模修整与组装
    ("card", "process/pattern-1", "生产流程/白模/IMG_20230712_080849.jpg", (0.5, 0.5), "白模车间内工人正在进行泡沫模样的手工修整与组装"),
    ("card", "process/pattern-2", "生产流程/白模/微信图片_20260911075254_26_18.jpg", (0.5, 0.5), "车间内工人手工修整白色泡沫白模工件"),
    ("card", "process/pattern-3", "生产流程/白模/mmexport1664677938541.jpg", (0.5, 0.5), "工人正在对一件大型复杂白模进行检查或组装定位"),
    # 涂料与烘干
    ("card", "process/slurry-1", "生产流程/黄模/微信图片_20260911074619_20_18.jpg", (0.5, 0.5), "车间圆形大浆池盛灰色浆料，机械臂伸入其中，两名工人在旁操作"),
    ("card", "process/slurry-2", "生产流程/黄模/微信图片_20260911074627_21_18.jpg", (0.5, 0.5), "涂装线现场：成排铸件表面覆白色涂层，金属架挂满浆料"),
    ("card", "process/slurry-3", "生产流程/黄模/微信图片_20260911074857_23_18.jpg", (0.5, 0.5), "车间内带轮料架挂满浅灰色涂层铸件，批量化涂装后摆放状态"),
    # 熔炼与浇注
    ("card", "process/pouring-1", "生产流程/浇筑/3246a53caad53ec7a6afd8986e00775d.jpg", (0.5, 0.5), "铸造车间内排列蓝色砂箱，起重机吊运浇包进行浇注作业"),
    ("card", "process/pouring-2", "厂区_场景/厂房/3b7e1081d04015a9758fbfdc8fdec4e8.jpg", (0.5, 0.5), "铸造厂房内，行车吊运盛有铁水的浇包，两侧成排摆放方形金属箱体"),
    ("card", "process/pouring-3", "厂区_场景/厂房/6dd0532a8a692aec50f04a38532630dd.jpg", (0.5, 0.5), "车间内大型加热炉炉门开启，炉膛通红"),
    # 清理与热处理
    ("card", "process/cleaning-1", "厂区_场景/厂房/10.jpg", (0.5, 0.5), "喷砂/清理工段：洁净板房群与大型银色除尘风管走廊"),
    ("card", "process/cleaning-2", "厂区_场景/厂房/11.jpg", (0.5, 0.5), "喷砂清理房特写：透过观察窗可见员工作业"),
    ("card", "process/cleaning-3", "厂区_场景/厂房/7d80df09df3859c13c59d95001b007aa.jpg", (0.5, 0.5), "车间内一敞开箱式高温炉，吊钩悬挂工件，现场高温作业中"),
    # 机加工
    ("card", "process/machining-1", "生产流程/机加工/IMG_20201012_094906.jpg", (0.5, 0.5), "机加工作业区一排大型数控加工中心整齐排列"),
    ("card", "process/machining-2", "厂区_场景/厂房/5.jpg", (0.5, 0.5), "机加工车间：大型数控镗铣床加工厚壁铸铁箱体"),
    ("card", "process/machining-3", "生产流程/机加工/微信图片_20260911075618_31_18.jpg", (0.5, 0.5), "一名工人戴黄色安全帽，在卧式加工中心前操作数控面板"),
    # 涂装与包装
    ("card", "process/paint-1", "厂区_场景/厂房/18.jpg", (0.5, 0.5), "喷涂线作业实景：两件大型黄色铸件悬挂在输送链下方"),
    ("card", "process/paint-2", "生产流程/涂装线/2S4A0159.JPG", (0.5, 0.5), "厂房内编号 9 至 12 的悬挂吊挂工位，挂具上吊挂灰色金属工件"),
    ("card", "process/paint-3", "加工件/机床件/IMG_20250927_104404.jpg", (0.5, 0.5), "一件机床床身铸件已完成最终包装，整体用透明塑料缠绕膜包裹"),

    # ---------- 车间图集 ----------
    ("card", "gallery/factory-01", "厂区_场景/厂房/6.jpg",  (0.5, 0.5), "宽敞明亮的机加工车间全景：一排数控机床沿墙布置"),
    ("card", "gallery/factory-02", "厂区_场景/厂房/16.jpg", (0.5, 0.5), "机加工车间：三台数控加工中心（保沪A）并列布置"),
    ("card", "gallery/factory-03", "厂区_场景/厂房/4.jpg",  (0.5, 0.4), "机加工车间内景：数控加工中心与工件堆场"),
    ("card", "gallery/factory-04", "厂区_场景/厂房/19.jpg", (0.5, 0.5), "钢结构空置厂房：宽阔整洁的二楼车间平台"),
    ("card", "gallery/factory-05", "厂区_场景/厂房/1582768668884.jpg", (0.5, 0.5), "车间主通道：绿色地坪与满墙宣传栏标语"),
    ("card", "gallery/factory-06", "厂区_场景/厂房/688d191deaadf5815b8f0992ba25b305.jpg", (0.5, 0.5), "厂房内成堆铸件毛坯与木质模箱，上方悬行车吊钩"),
    ("card", "gallery/factory-07", "厂区_场景/厂房/24a72a24ba2dd8fe1d45f5ac59b2f6ff.jpg", (0.5, 0.5), "铸造厂房内景，地面散放灰色铸件，工人穿行，天车吊钩垂挂"),
    ("card", "gallery/factory-08", "厂区_场景/厂房/fb5cf86c3a5de63e4de98aa7eb7bab67.jpg", (0.5, 0.5), "铸造车间内蓝色流水线造型区设备与安全标语实景"),
    ("card", "gallery/factory-09", "厂区_场景/厂房/2.jpg",  (0.5, 0.5), "消失模浇铸区侧视：蓝色除尘管道与黄色周转料斗群"),
    ("card", "gallery/factory-10", "厂区_场景/厂房/3.jpg",  (0.5, 0.4), "消失模铸件冷却区：一排黄色铸件壳体架空于铁架之上"),
    ("card", "gallery/factory-11", "厂区_场景/厂房/IMG_20260528_150612.jpg", (0.5, 0.4), "机加工车间：消失模成品铸件堆场与多台数控机床"),
    ("card", "gallery/factory-12", "厂区_场景/厂房/微信图片_20260911075650_33_18.jpg", (0.5, 0.5), "厂房内一台大型立式机床，立柱上方两条电缆拖链呈拱形排布"),
    ("card", "gallery/factory-13", "厂区_场景/厂房/微信图片_20260911075744_37_18.jpg", (0.5, 0.5), "车间内铸件成垛码放，大型机床位于中后部"),
    ("card", "gallery/factory-14", "厂区_场景/厂房/9.jpg",  (0.5, 0.5), "白模发泡车间作业现场：比亚迪电动叉车与两名现场作业人员"),
    ("card", "gallery/factory-15", "厂区_场景/厂房/8.jpg",  (0.5, 0.5), "白模发泡车间现场办公区：质量管理看板与办公桌"),
    ("card", "gallery/factory-16", "厂区_场景/厂房/14.jpg", (0.5, 0.5), "新厂房外立面：三层混凝土建筑与大面积玻璃窗"),

    # ---------- 新闻封面备用图集（2026-09-17 新增） ----------
    # 用途：行业动态的封面必须是"站内其他页面没用过"的照片，上面 16 张已全部用尽。
    # 这批图刻意不进任何页面的循环（首页取 factory-01~08、关于我们取 factory-01~12），
    # 因此新增后只作为新闻封面池，页面不会自动引用它们，选图脚本能直接挑到。
    # 画面描述一律取自 agent/RAG知识库/图片描述/，未做主观推断。
    ("card", "gallery/factory-17", "厂区_场景/厂房/2S4A0163.JPG", (0.5, 0.5), "大型车间内部全景，红钢结构配黄色桥式起重机，地面成排摆放黄色涂装工件。"),
    ("card", "gallery/factory-18", "厂区_场景/厂房/2S4A0155.JPG", (0.5, 0.5), "红色钢结构厂房内，黄色天车下方成排摆放铸件，右侧为大型机床。"),
    ("card", "gallery/factory-19", "厂区_场景/厂房/2S4A0156.JPG", (0.5, 0.5), "红色钢构厂房内，地面成排摆放黑色铸件，一名工人正在设备前作业"),
    ("card", "gallery/factory-20", "厂区_场景/厂房/2S4A0157.JPG", (0.5, 0.5), "钢结构厂房内的环形悬挂输送线，前景地面堆放灰黑色铸件。"),
    ("card", "gallery/factory-21", "厂区_场景/厂房/2S4A0136.JPG", (0.5, 0.5), "涂装车间内环形悬挂输送轨道与覆膜柜体设备，处于作业阶段。"),
    ("card", "gallery/factory-22", "厂区_场景/厂房/17.jpg",       (0.5, 0.5), "喷涂/烘干工段：环形悬挂输送链与洁净板房组合线"),
    ("card", "gallery/factory-23", "厂区_场景/厂房/0e5cc0b4337e7e7d4a6876ad9bd121ae.jpg", (0.5, 0.5), "铸造车间内圆筒形炉体，炉口积渣，旁有红色手轮与吨袋。"),
    ("card", "gallery/factory-24", "厂区_场景/厂房/473f25fe1721fac1a36bd7ffd91818b9.png", (0.5, 0.5), "蓝色大型设备与管道的铸造车间内景，设安全标语、检修平台与护栏。"),
    ("card", "gallery/factory-25", "厂区_场景/厂房/6f22d1a1b147e23128ccd220b7b23460.png", (0.5, 0.5), "钢结构厂房内蓝色箱式设备与除尘器，两名工人作业"),
    ("card", "gallery/factory-26", "厂区_场景/厂房/c41aa7dd4c5bee11733a334d9c9b8c69.png", (0.5, 0.5), "车间内一排数控加工中心沿墙整齐排列，地面划有黄色标线。"),
    ("card", "gallery/factory-27", "厂区_场景/厂房/0150a3155d3f3a16701fdea8a09f2b2e.png", (0.5, 0.5), "钢结构厂房内蓝色管道集气罩与成排黄色料箱作业区。"),
    ("card", "gallery/factory-28", "厂区_场景/厂房/15.jpg",       (0.5, 0.5), "新厂区建设全景：黄色平地机与三层混凝土厂房"),
    ("card", "gallery/factory-29", "厂区_场景/厂房/1582768322196.jpg", (0.5, 0.5), "车间内大型烘房/喷漆房：四扇门的密闭黑色设备间"),

    # ---------- 生产流程补充工段（2026-09-17 新增） ----------
    # 浇筑 / 抛丸 / 机加工 / 下检 四个工段的影像原先各有 1~3 张，补到 4 张上下，
    # 既是新闻封面备选，也补上"检测与清理"这两类采购最想看、原先最缺的证据。
    ("card", "process/pouring-4",   "生产流程/浇筑/2S4A0125.JPG", (0.5, 0.5), "车间内行车吊包浇筑，两名工人持工具在旁配合作业"),
    ("card", "process/blasting-1",  "生产流程/抛丸/2S4A0134.JPG", (0.5, 0.5), "钢结构厂房内多台大型箱式设备，地面堆放灰色铸件，工人戴安全帽在场作业。"),
    ("card", "process/blasting-2",  "生产流程/抛丸/IMG_20260915_133351.jpg", (0.5, 0.5), "钢结构厂房内两台箱式抛丸清理设备，地面散落待清理铸件。"),
    ("card", "process/blasting-3",  "生产流程/抛丸/IMG_20260915_133414.jpg", (0.5, 0.5), "车间内工人坐在堆满灰色铸件的托盘旁，身后是蓝色箱体设备。"),
    ("card", "process/machining-4", "生产流程/机加工/IMG_20260915_132327.jpg", (0.5, 0.5), "厂房内的卧式加工中心与摆放的待加工铸件"),
    ("card", "process/machining-5", "生产流程/机加工/微信图片_20260908145330_47_2.png", (0.5, 0.5), "大型加工中心车间内，地面摆放黑色金属工件，工人现场查看作业。"),
    ("card", "process/machining-6", "生产流程/机加工/微信图片_20260908145331_48_2.png", (0.5, 0.5), "车间内大型龙门加工中心正在加工铸件，周边摆放待加工与已加工工件"),
    ("card", "process/machining-7", "生产流程/机加工/微信图片_20260908145338_49_2.png", (0.5, 0.5), "车间内多台数控加工中心并排，木托盘上码放灰色机加工铸件。"),
    ("card", "process/inspection-1", "生产流程/下检/IMG_20260915_132902.jpg", (0.5, 0.5), "人员在工作台前操作台式检测仪器，对夹持的小样品进行成分分析"),
    ("card", "process/inspection-2", "生产流程/下检/IMG_20260915_132843.jpg", (0.5, 0.5), "身穿红色工装的员工在台式仪器前操作试样检测"),
    ("card", "process/inspection-3", "生产流程/下检/IMG_20260915_132627.jpg", (0.5, 0.5), "实验室内检测仪器旁摆放数个带钩金属试样，属检验环节场景。"),

    # ========== 产品大类 1／3：机床零部件 ==========
    ("card", "products/machine-tool-parts/01", "加工件/机床件/IMG_20201111_135023.jpg", (0.5, 0.5), "机床类大型铸铁床身的顶部俯视照片，可见两侧长导轨面和内部交叉筋板结构"),
    ("card", "products/machine-tool-parts/02", "加工件/机床件/IMG_20201111_135051.jpg", (0.5, 0.5), "大型机床床身铸铁毛坯的俯视图，可见两侧导轨安装面和多个矩形开口"),
    ("card", "products/machine-tool-parts/03", "铸件/箱体_支座/IMG_20220801_155453.jpg", (0.5, 0.5), "大型长条形机床床身铸件车间照片"),
    ("card", "products/machine-tool-parts/04", "加工件/机床件/IMG_20201111_135040.jpg", (0.5, 0.5), "机床立柱或滑座类大型铸铁件的正面照，两侧带有长导轨面"),
    ("card", "products/machine-tool-parts/05", "加工件/机床件/IMG_20250914_095347.jpg", (0.5, 0.4), "一摞机床立柱或横梁类长条形铸件整齐码放在木托盘上"),
    ("card", "products/machine-tool-parts/06", "加工件/机床件/IMG_20250914_095357.jpg", (0.5, 0.4), "多件机床滑座或连接件类铸件散放在木托盘上"),
    ("card", "products/machine-tool-parts/07", "加工件/其他/IMG_20220608_160244.jpg", (0.5, 0.5), "车间地坪上一件 H 形灰铁机加工件，台面写有检验标记"),
    ("card", "products/machine-tool-parts/08", "加工件/其他/IMG_20220608_160305.jpg", (0.5, 0.5), "大型灰铁床身铸件正面特写，端面铸有清晰编号"),
    ("card", "products/machine-tool-parts/09", "加工件/机床件/微信图片_20260910160059_4_18.jpg", (0.5, 0.5), "车间内大型加工中心与成排机床类铸件待加工周转现场"),
    ("card", "products/machine-tool-parts/10", "加工件/机床件/IMG_20250914_091940.jpg", (0.5, 0.5), "一件喷涂灰色底漆的机床床身铸件近景，顶面结构复杂"),
    ("card", "products/machine-tool-parts/11", "加工件/机床件/IMG_20250927_104417.jpg", (0.5, 0.5), "大型机床铸件成品车间全景，中后景整齐排列大量同款产品"),
    ("card", "products/machine-tool-parts/12", "加工件/机床件/IMG_20250927_104404.jpg", (0.5, 0.5), "一件机床床身铸件已完成最终包装，整体用透明塑料缠绕膜包裹，放置在蓝色木托盘上待运"),

    # ========== 产品大类 2／3：工程机械零部件 ==========
    ("card", "products/construction-machinery-parts/01", "铸件/箱体_支座/IMG_20201202_160802.jpg", (0.5, 0.5), "一件大型黄色工程机械配重铸件，结构复杂且带多处安装凸台"),
    ("card", "products/construction-machinery-parts/02", "铸件/箱体_支座/IMG_20201120_083836.jpg", (0.5, 0.5), "一排黄色楔形配重铸件整齐摆放在水泥地面上"),
    ("card", "products/construction-machinery-parts/03", "铸件/箱体_支座/IMG_20191129_100946.jpg", (0.5, 0.5), "一件黄色弧形配重铸件正面外观，两端带吊装环"),
    ("card", "products/construction-machinery-parts/04", "铸件/箱体_支座/IMG_20181107_095836.jpg", (0.5, 0.5), "一块 HT200 灰铁配重铸件，表面铸有 FAMED 和编号标识"),
    ("card", "products/construction-machinery-parts/05", "铸件/箱体_支座/IMG_20220510_142351.jpg", (0.5, 0.5), "车间内数十件大型灰铁配重块整齐排列"),
    ("card", "products/construction-machinery-parts/06", "铸件/箱体_支座/IMG_20231027_092553.jpg", (0.5, 0.5), "带重量标识的大型配重铁铸件"),
    ("card", "products/construction-machinery-parts/07", "铸件/壳体/IMG_20260202_084733.jpg", (0.5, 0.5), "两台精加工后的大型支臂/阀座类铸件展示金属本色"),
    ("card", "products/construction-machinery-parts/08", "铸件/壳体/IMG_20260202_084740.jpg", (0.5, 0.5), "精加工支臂类铸件俯拍：镗孔与法兰加工面细节"),
    ("card", "products/construction-machinery-parts/09", "铸件/箱体_支座/IMG_20220331_133514.jpg", (0.5, 0.5), "黄色涂装对称式箱体支座铸件正面展示"),
    ("card", "products/construction-machinery-parts/10", "铸件/箱体_支座/IMG_20220619_080008.jpg", (0.5, 0.5), "大型复杂灰铁机架/底座铸件俯视展示"),
    ("card", "products/construction-machinery-parts/11", "加工件/壳体/mmexport1736255440375.jpg", (0.5, 0.5), "DONLY（东力）品牌减速机箱体——正面三法兰口展示"),
    ("card", "products/construction-machinery-parts/12", "铸件/箱体_支座/IMG_20240618_091917.jpg", (0.5, 0.5), "灰铁齿轮箱体铸件正面特写"),

    # ========== 产品大类 3／3：泵阀壳体与本体零部件 ==========
    ("card", "products/pump-valve-parts/01", "铸件/壳体/IMG_20240927_143533.jpg", (0.5, 0.5), "两台大型 Y 型多接口阀体铸件并排摆放于车间地面"),
    ("card", "products/pump-valve-parts/02", "铸件/壳体/IMG_20240928_142713.jpg", (0.5, 0.5), "三台黑色涂装 Y 型阀体整齐排列于车间墙边"),
    ("card", "products/pump-valve-parts/03", "铸件/壳体/IMG_20241010_084724.jpg", (0.5, 0.5), "两台大型多支管阀体毛坯立于车间地面"),
    ("card", "products/pump-valve-parts/04", "铸件/壳体/IMG_20250730_145417.jpg", (0.5, 0.5), "喷丸态 Y 型三通阀体近景：通腔与铸出型号清晰可见"),
    ("card", "products/pump-valve-parts/05", "铸件/壳体/IMG_20241122_162316.jpg", (0.5, 0.5), "灰色涂装大口径阀体成排放置并以打包带固定"),
    ("card", "products/pump-valve-parts/06", "铸件/壳体/IMG_20260208_085822.jpg", (0.5, 0.5), "表面涂覆黄色防锈底漆的机加工阀体铸件整齐码放"),
    ("card", "products/pump-valve-parts/07", "加工件/壳体/mmexport1750064675842.jpg", (0.5, 0.5), "罗茨泵/压缩机壳体——8 字形双腔精镗端面"),
    ("card", "products/pump-valve-parts/08", "加工件/壳体/mmexport1750064685600.jpg", (0.5, 0.5), "罗茨泵壳体——圆柱主体侧面及多接口特征"),
    ("card", "products/pump-valve-parts/09", "加工件/壳体/IMG_20250616_160558.jpg", (0.5, 0.4), "大型阀体法兰端面特写——双腔 8 字形内孔结构"),
    ("card", "products/pump-valve-parts/10", "加工件/壳体/image_1781528187576.jpg", (0.5, 0.45), "HISKM KH75 数控加工中心及阀体加工现场全景"),
    ("card", "products/pump-valve-parts/11", "加工件/壳体/IMG_20260618_110947.jpg", (0.5, 0.4), "DN300 齿轮状外缘蝶阀阀体批量成品"),
    ("card", "products/pump-valve-parts/12", "加工件/壳体/mmexport1747366657507.jpg", (0.5, 0.5), "蝶阀阀体铸件毛坯——蝶形双耳外形俯拍"),
    ("card", "products/pump-valve-parts/13", "铸件/管件/IMG_20220908_144610.jpg", (0.5, 0.45), "一件 Y 型分叉三通管件的成品近景照片"),
    ("card", "products/pump-valve-parts/14", "铸件/箱体_支座/IMG_20201012_094832.jpg", (0.5, 0.5), "多件大型弯头法兰管件套件堆放在木托盘上"),

    # ---------- 质量控制 ----------
    ("card", "quality/scan-box",    "铸件/箱体_支座/IMG_20231029_095938.jpg", (0.5, 0.5), "大型灰铁箱体铸件正在进行三维扫描检测"),
    ("card", "quality/scan-hoist",  "铸件/箱体_支座/IMG_20231029_095947.jpg", (0.5, 0.5), "吊运状态下的大型箱体铸件三维扫描检测"),
    ("card", "quality/scan-hand",   "加工件/壳体/mmexport1700357244017.jpg", (0.5, 0.5), "Volvo 品牌大型铸钢件吊装与手持扫描检测"),
    ("card", "quality/cmm",         "生产流程/涂装线/IMG_20201012_094750.jpg", (0.5, 0.5), "计量室内的大型检测设备"),
    ("card", "quality/record",      "加工件/其他/IMG_20220609_173232.jpg", (0.5, 0.5), "喷涂黑色涂料后的灰铁箱体件摆在木托上，工人正在做检验记录"),
    ("card", "quality/packing",     "加工件/机床件/IMG_20250927_104404.jpg", (0.5, 0.5), "一件机床床身铸件已完成最终包装，整体用透明塑料缠绕膜包裹"),

    # ---------- 企业文化 / 人员 ----------
    ("card", "people/training-01", "人员/IMG_20260702_151016.jpg", (0.5, 0.5), "公司内部会议/培训现场"),
    ("card", "people/training-02", "人员/mmexport1664677852782.jpg", (0.5, 0.5), "公司内部培训/技术交流会议"),
    ("wide", "about/gate",         "厂区_场景/厂房/7.jpg", (0.5, 0.5), "公司招牌墙：沧州菲美得机械有限公司大门形象"),

    # ---------- 新闻配图 ----------
    ("wide", "news/news-expansion", "厂区_场景/厂房/13.jpg", (0.5, 0.5), "在建新厂房二层：混凝土框架与远处钢结构屋面并存"),
    ("wide", "news/news-coating",   "生产流程/涂装线/2S4A0159.JPG", (0.5, 0.5), "厂房内编号 9 至 12 的悬挂吊挂工位，挂具上吊挂灰色金属工件"),
    ("wide", "news/news-hitech",    "厂区_场景/厂房/6.jpg", (0.5, 0.5), "宽敞明亮的机加工车间全景：一排数控机床沿墙布置"),
    ("wide", "news/news-techrenov", "加工件/机床件/IMG_20250914_091930.jpg", (0.5, 0.5), "多件机床床身类铸件在厂房外或半开放场地整齐堆放，表面喷涂均匀的灰色防锈底漆"),

    # ---------- 近期出货（首页） ----------
    ("card", "featured/ship-01", "铸件/壳体/IMG_20241122_162316.jpg", (0.5, 0.5), "灰色涂装大口径阀体成排放置并以打包带固定"),
    ("card", "featured/ship-02", "铸件/箱体_支座/IMG_20201202_160802.jpg", (0.5, 0.5), "一件大型黄色工程机械配重铸件，结构复杂且带多处安装凸台"),
    ("card", "featured/ship-03", "加工件/机床件/IMG_20250927_104417.jpg", (0.5, 0.5), "大型机床铸件成品车间全景"),
    ("card", "featured/ship-04", "加工件/壳体/IMG_20260618_110947.jpg", (0.5, 0.4), "DN300 齿轮状外缘蝶阀阀体批量成品"),
    ("card", "featured/ship-05", "铸件/箱体_支座/IMG_20240618_091917.jpg", (0.5, 0.5), "灰铁齿轮箱体铸件正面特写"),
    ("card", "featured/ship-06", "铸件/管件/IMG_20220908_144610.jpg", (0.5, 0.45), "一件 Y 型分叉三通管件的成品近景照片"),

    # ---------- 资质证书扫描件（母版由 tools/build_certs.py 生成） ----------
    ("cert",  "certs/hitech-enterprise", "资质证书/01-高新技术企业证书.jpg", (0.5, 0.5), "国家高新技术企业证书：证书编号 GR202313000812，2023 年 10 月 16 日由河北省科学技术厅、河北省财政厅、国家税务总局河北省税务局批准，有效期三年"),
    ("cert",  "certs/tech-sme",          "资质证书/02-河北省科技型中小企业.jpg", (0.5, 0.5), "河北省科技型中小企业证书：认定编号 SKX202312J1560037，河北省科学技术厅 2023 年 12 月 14 日发证，有效期 3 年"),
    ("cert",  "certs/green-foundry",     "资质证书/03-绿色铸造示范企业-荣誉证书.jpg", (0.5, 0.5), "绿色铸造示范企业荣誉证书：河北省铸造行业协会 2018 年 10 月颁发"),
    ("certp", "certs/iso9001",           "资质证书/04-ISO9001质量管理体系认证证书.jpg", (0.5, 0.5), "质量管理体系认证证书：GB/T19001-2016 / ISO9001:2015，证书编号 785Q1250263R1M，天津证通公信认证有限公司 2025 年 9 月 6 日颁发，有效期至 2028 年 9 月 5 日"),
    ("cert",  "certs/discharge-permit",  "资质证书/05-排污许可证.jpg", (0.5, 0.5), "排污许可证正本：证书编号 91130981784093371Y001C，有效期限 2026 年 4 月 10 日至 2031 年 4 月 9 日，沧州市行政审批局 2026 年 4 月 10 日核发"),
]


def cover(im: Image.Image, box, anchor=(0.5, 0.5)):
    """等比缩放后按锚点裁切到 box。"""
    tw, th = box
    sw, sh = im.size
    scale = max(tw / sw, th / sh)
    nw, nh = max(1, int(round(sw * scale))), max(1, int(round(sh * scale)))
    im = im.resize((nw, nh), Image.LANCZOS)
    left = int(round((nw - tw) * anchor[0]))
    top = int(round((nh - th) * anchor[1]))
    left = max(0, min(left, nw - tw))
    top = max(0, min(top, nh - th))
    return im.crop((left, top, left + tw, top + th))


def contain(im: Image.Image, box, bg=(255, 255, 255)):
    """等比缩放到 box 内并居中，四周留白；用于证书扫描件，避免裁掉证件内容。"""
    tw, th = box
    sw, sh = im.size
    scale = min(tw / sw, th / sh)
    nw, nh = max(1, int(round(sw * scale))), max(1, int(round(sh * scale)))
    if (nw, nh) != (sw, sh):
        im = im.resize((nw, nh), Image.LANCZOS)
    canvas = Image.new("RGB", (tw, th), bg)
    canvas.paste(im, ((tw - nw) // 2, (th - nh) // 2))
    return canvas


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", default=DEFAULT_SRC)
    ap.add_argument("--out", default=DEFAULT_OUT)
    ap.add_argument("--only", default="")
    ap.add_argument("--clean", action="store_true",
                    help="先清空脚本管理的输出目录，避免留下改名后的孤立文件")
    ap.add_argument("--quality-jpg", type=int, default=82)
    ap.add_argument("--quality-webp", type=int, default=78)
    args = ap.parse_args()

    src_root, out_root = os.path.abspath(args.src), os.path.abspath(args.out)
    os.makedirs(out_root, exist_ok=True)

    # 本脚本管理的子目录（brand 目录由 build_brand.py 负责，不动）
    managed = {out_rel.split("/")[0] for _s, out_rel, _sr, _a, *_n in ITEMS}
    if args.clean:
        for d in sorted(managed):
            target = os.path.join(out_root, d)
            if os.path.isdir(target):
                shutil.rmtree(target)

    manifest, missing, total_px = [], [], 0

    for slot, out_rel, src_rel, anchor, *rest in ITEMS:
        note = rest[0] if rest else ""
        if args.only and not out_rel.startswith(args.only):
            continue
        src = os.path.join(src_root, src_rel.replace("/", os.sep))
        if not os.path.exists(src):
            missing.append(src_rel)
            continue
        spec = SLOTS[slot]
        out_dir = os.path.dirname(os.path.join(out_root, out_rel.replace("/", os.sep)))
        os.makedirs(out_dir, exist_ok=True)
        base = os.path.join(out_root, out_rel.replace("/", os.sep))

        with Image.open(src) as raw:
            im = ImageOps.exif_transpose(raw)
            im = im.convert("RGB")
            sw, sh = im.size
            fit = spec.get("fit", "cover")
            main_img = contain(im, spec["size"]) if fit == "contain" else cover(im, spec["size"], anchor)
            targets = [(base, main_img)]
            if spec["thumb"]:
                targets.append((base + "-t", contain(im, spec["thumb"]) if fit == "contain"
                                else cover(im, spec["thumb"], anchor)))

        outs = []
        for path, img in targets:
            jpg = path + ".jpg"
            webp = path + ".webp"
            img.save(jpg, "JPEG", quality=args.quality_jpg, optimize=True, progressive=True)
            img.save(webp, "WEBP", quality=args.quality_webp, method=5)
            outs.append((os.path.relpath(jpg, out_root).replace("\\", "/"),
                         os.path.relpath(webp, out_root).replace("\\", "/")))
            total_px += img.size[0] * img.size[1]

        manifest.append({
            "slot": slot, "out": out_rel, "src": src_rel,
            "src_size": f"{sw}x{sh}", "out_size": f'{spec["size"][0]}x{spec["size"][1]}',
            "rag_description": note,
            "files": outs,
        })

    with open(os.path.join(out_root, "manifest.json"), "w", encoding="utf-8") as fh:
        json.dump({"generated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                   "items": manifest}, fh, ensure_ascii=False, indent=1)

    print(f"OK 生成 {len(manifest)} 组素材（{len(manifest) * 2} 个文件）")
    if missing:
        print("!! 缺失源图：", file=sys.stderr)
        for m in missing:
            print("   " + m, file=sys.stderr)


if __name__ == "__main__":
    main()
