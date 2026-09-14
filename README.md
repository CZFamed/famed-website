# 沧州菲美得机械设备有限公司 官网（前期开发版）

中英双语静态官网原型，按《菲美得官网-模板选型与建站方案》确立的栏目架构与外贸打法实现，
事实与数据来自《沧州菲美得机械设备有限公司-深度调研报告》。

生成日期：2026-09-12

---

## 一、怎么打开

**方式 1（最简单）**：直接双击站点根目录的 `index.html`，浏览器即可打开。
中英文切换、图片灯箱、表单校验在 `file://` 协议下都已验证可用。

**方式 2（推荐，效果与上线一致）**：起一个本地服务再访问。

```powershell
cd "D:\agent开发\菲美得\公司网站"
node tools/serve.mjs          # 然后浏览器打开 http://localhost:5173/
```

**方式 3（在手机上看）**：`serve.mjs` 监听所有网卡，手机连同一个 Wi-Fi，
浏览器打开 `http://<电脑局域网IP>:5173/` 即可（电脑 IP 用 `ipconfig` 查无线网卡的 IPv4 地址）。

预览截图已生成在 `_预览截图\`（桌面端 13 张 + 手机端 10 张整页长图），不想开浏览器可以直接看。

---

## 二、交付内容

| 目录 / 文件 | 说明 |
|---|---|
| `index.html` 等 19 个 `.html` | **英文站**（默认，主入口） |
| `zh\*.html` | **中文站**（19 个页面，与英文站一一对应） |
| `assets\css\site.css` | 全站样式（设计系统 + 组件，无第三方依赖）。响应式断点集中在文件末尾 §9：1180 / 1080 / 760 / 480 / 420 / 360 |
| `assets\js\site.js` | 全站交互（导航、灯箱、手风琴、表单、Cookie 同意等） |
| `assets\img\` | 已裁切压缩的图片素材（WebP + JPEG 双格式） |
| `assets\img\brand\` | LOGO 与图标（由 `..\LOGO\` 同步而来，不要直接改这里） |
| `assets\video\` | 6 段原始车间视频（共 14 MB）。首页"车间短视频"模块已按要求移除，站内暂无引用，可自行删除 |
| `robots.txt` | 爬虫规则（屏蔽 `tools\` 与素材审阅目录） |
| `tools\` | 站点生成器与素材脚本（**上线时不要上传**）。另含 `audit_mobile.mjs`、`audit_mobile_ui.mjs`、`shots_mobile.mjs` 三个手机端复验脚本 |
| `_素材审阅\` | 336 张原始素材的分析数据、拼版图、选图排名（**上线时不要上传**） |
| `_预览截图\` | 各页面预览截图：桌面端 13 张 + 手机端整页长图 10 张（**上线时不要上传**）；`旧版\` 是改版前的两张手机截图 |
| `交付说明.md` | 设计说明、占位内容清单、待确认事项、上线清单 |

### 页面清单（中英各 19 页）

```
首页                    index.html
关于我们                about.html           公司简介 / 发展历程 / 企业文化 / 工厂掠影
产品中心                products.html
  ├ 机床零部件            product-machine-tool-parts.html
  ├ 工程机械零部件        product-construction-machinery-parts.html
  └ 泵阀壳体与本体零部件  product-pump-valve-parts.html
制造能力                capabilities.html    8 道工序 + 设备产能表 + 可生产材质
质量控制                quality.html         质量体系 / 6 个控制点 / 检测设备 / 执行标准
应用领域                applications.html    9 个下游行业
资质荣誉                certificates.html    4 项认定 + 5 张证书扫描件 + 5 项合规 + 专利表
新闻资讯                news.html + 4 篇详情
常见问题                faq.html             10 问，带 FAQ 结构化数据
联系我们                contact.html         询盘表单 + 联系方式 + 点击加载地图
隐私政策                privacy.html         GDPR/Cookie 说明
404                     404.html
```

---

## 三、怎么改内容

站点是**生成**出来的：改数据文件 → 重新生成 → HTML 自动更新。
不要直接改 HTML，否则下次生成会被覆盖。

```powershell
cd "D:\agent开发\菲美得\公司网站"
node tools/generate_site.mjs      # 重新生成全部 38 个 HTML
```

| 想改什么 | 改哪个文件 |
|---|---|
| 公司电话、邮箱、地址、域名、备案号、关键数字 | `tools\content.mjs` → `SITE` |
| 导航菜单 | `tools\content.mjs` → `NAV` |
| 首页各区块文案 | `tools\content.mjs` → `HOME` |
| 关于我们 / 制造能力 / 质量 / 应用 / 资质 / FAQ / 联系 / 隐私 | `tools\content.mjs` 对应导出对象 |
| 产品品类、参数表、图片张数 | `tools\products.mjs` |
| 新闻条目 | `tools\news.mjs` |
| 通用按钮文字（"获取报价"等） | `tools\content.mjs` → `UI` |

> 所有文案都是 `{ en: "…", zh: "…" }` 结构，中英文在一起改，不会漏。

### 新闻详情页的正文配图

每篇新闻的顶部大图是 `tools\news.mjs` 里的 `image` 字段；**正文里的配图**是同一个条目的
`figures` 数组。下面以"涂装线改造"那篇为例：

```js
figures: [
  {
    img: "process/paint-2",   // 路径相对 assets\img\，不带扩展名
    w: 1200, h: 900,          // 成品图尺寸，用于占位避免加载时跳动
    after: 1,                 // 插在第几段正文之后（1 = 第一段之后）
    caption: { en: "…", zh: "…" },   // 图注，中英文
  },
],
```

正文配图会**自动接入灯箱**（点击放大、同篇文章的图可用左右键翻页），
不需要额外写 HTML。`img` 只能用 `assets\img\` 下已存在的成品图；
想用新照片，先按上一节"换图片"把图生成出来，再在这里引用。
选图前建议先在 `assets\img\manifest.json` 里查 `rag_description`
确认那张照片的实际画面内容，别按文件名猜（历史上踩过这个坑）。

### 换图片

1. 把新照片放进 `D:\agent开发\菲美得\菲美得产品图片\` 对应子目录；
2. 打开 `tools\build_assets.py`，找到 `ITEMS` 列表里对应那行，
   把源图路径改成新文件名（格式：`槽位, 输出路径, 源图相对路径, 裁切锚点, 画面描述`）；
3. 重新跑：

```powershell
python tools/build_assets.py            # 全部重跑
python tools/build_assets.py --only hero      # 只重做首页大图
python tools/build_assets.py --only products/valve-bodies-cocks   # 只重做一个品类
python tools/build_assets.py --clean    # 先清空脚本管理的输出目录（改名后建议加）
```

脚本会自动处理手机拍照的 EXIF 旋转、按锚点裁切、输出 WebP + JPEG 两种格式。
每个输出的来源都会记录在 `assets\img\manifest.json`，方便溯源。

> **配图必须对照 RAG 知识库。** `agent\RAG知识库\图片描述\` 下有 336 张图与 22 段视频的逐条画面描述
> （各目录的 `00_汇总索引.md` 是总表）。给某个坑位换图前先在索引里确认那张图到底拍的是什么，
> 并把这句描述填进 `ITEMS` 的第 5 个字段，它会一并写进 `manifest.json`。

### 换证书扫描件

资质荣誉页的 5 张证书（高新技术企业 / 科技型中小企业 / 绿色铸造示范企业 / ISO9001 / 排污许可证）
走的是单独的预处理脚本，因为 PDF 正本和手机拍的证件需要先转正、去掉相框与四周留白：

1. 把新的 PDF 或照片路径写进 `tools\build_certs.py` 顶部的常量（或直接替换 `TASKS` 里那一行）；
2. `python tools/build_certs.py` —— 生成母版到 `..\菲美得产品图片\资质证书\`；
3. `python tools/build_assets.py` —— 母版转成 WebP + JPEG 双格式，写进 `assets\img\certs\`；
4. 改 `tools\content.mjs` → `CERTIFICATES.scans`（证书名称、编号、发证机关、有效期），
   再 `node tools/generate_site.mjs`。

> 证书类素材用的是"等比缩放 + 留白"（`build_assets.py` 里的 `cert` / `certp` 槽位），
> 不会像车间照片那样裁切，证件内容完整。上传时字号小的证书点开灯箱可以放大看原图。

---

## 四、询盘表单怎么接后端

**收件邮箱**：`czfamed1@outlook.com`。整个站点（页头、页脚、联系页、询盘表单、
结构化数据）都从 `tools\content.mjs` → `SITE.email` 取这个地址，改一处即可全站生效；
生成器还会把它写进每个页面的 `window.SITE_CONFIG.mailTo`，询盘脚本优先读这个配置，
不再依赖 JS 里的硬编码兜底。

**当前行为（已接 Formspree，询盘自动进 Outlook）**：点提交后校验必填项，然后 `fetch` POST 到
Formspree，由它转成邮件发到 `czfamed1@outlook.com`；成功后表单会清空并提示"已提交（发往 czfamed1@outlook.com）"。
接口地址配在 `tools\content.mjs` → `SITE.formEndpoint`，改一处全站生效：

```html
<script>
  window.SITE_CONFIG = {
    formEndpoint: "https://formspree.io/f/meaqbowe",
    mailTo: "czfamed1@outlook.com"
  };
</script>
```

配套的细节（都在 `assets\js\site.js`）：

- 提交体除表单字段外，还带 Formspree 的 `_subject`（邮件标题含产品与公司名）、
  `_replyto`（在 Outlook 点"回复"直接回买家）、`_language`（中/英）。
- 表单里有一个蜜罐字段 `_gotcha`（CSS 移出屏幕），机器人填了就会被 Formspree 丢弃，
  不需要 JS 校验；要更严格可以在 Formspree 后台再开 reCAPTCHA。
- 提交期间提交按钮会置灰，避免买家连点产生重复询盘。
- 出错分两种处理：**字段级错误**（Formspree 返回 `errors[]`）会把对应输入框标红、就地提示，
  不打断买家；**表单级错误**（邮箱未验证、被限流、接口不可用）才回退到"打开访客的邮件客户端"，
  收件人仍是 `czfamed1@outlook.com`，保证询盘不丢。
- 表单下方始终保留**直接发邮件**入口（邮箱可点击、可一键复制），作为最后兜底。

> 注意：`formEndpoint` 置空字符串，就会回到"打开访客邮件客户端"的兜底模式；
> 那种情况下记得把 `tools\content.mjs` → `UI.formDemoNote` 的文案恢复（现在为空）。

### 换服务商 / 加保险，另外两条路

1. **自建一个小接口**（最稳，可存档）：在国内服务器或云函数上放一个 HTTP 接口，
   收到 JSON 后用 SMTP（`smtp-mail.outlook.com:587`，用这个 Outlook 账号的
   应用密码登录）把询盘发到 `czfamed1@outlook.com`，同时写一份到数据库/表格。
   接口地址填进上面的 `formEndpoint` 即可。

2. **Microsoft Forms + Power Automate**（不用写代码，全在微软生态里）：
   用公司 Outlook 账号建一个 Microsoft Form 收集询盘，再用 Power Automate 建一个
   「表单有新回复 → 发送邮件到 czfamed1@outlook.com」的流程，把 Form 嵌到联系页。

提交内容是 JSON：`name / company / country / email / phone / interest / quantity / message`，
接口需返回 HTTP 2xx。表单已内置必填校验与蜜罐，**上线后建议在 Formspree 后台
打开 reCAPTCHA，并把首封邮件标为"非垃圾"**。

改完记住：`node tools/generate_site.mjs` 重新生成页面，再跑一遍
`node tools/audit_inquiry.mjs` 确认收件邮箱没跑偏。

---

## 五、上线前必须替换的占位内容

站点里所有"占位"都集中在这里，替换后重新生成即可。清单详见 `交付说明.md`，
核心几项是：

- ~~邮箱~~ **已确定**：`czfamed1@outlook.com`（`tools\content.mjs` → `SITE.email` / `SITE.emailService`）
- 域名 `https://www.famedcasting.com`
- 备案号 `冀ICP备00000000号-1`
- ~~网站 Logo~~ **已确定**：公司提供的 LOGO 已转成矢量与全套位图，见 `..\LOGO\`；
  网站上用到的是它的同步副本，改 LOGO 请改 `LOGO\input\logo-source.jpg` 后重跑生成脚本
- 地图（现为"点击加载"，上线前确认用 Google Maps 还是高德/百度）
- 中英双语对接人姓名与联系方式

---

## 六、已完成的验证

用无头 Edge 实测（这一版用的是 `tools\` 里自带的 CDP 脚本，不再依赖 Playwright），结论如下：

| 检查项 | 结果 |
|---|---|
| 38 个页面（中英各 19）HTTP 状态 | 全部 200 |
| 控制台报错 / JS 异常 | 0 |
| 引用的 392 个静态资源 | 全部 200，无 404 |
| 图片加载完整性（滚动到底） | 无破图 |
| 横向溢出（1440 / 768 / 390 三种宽度） | 0 处（表格与页内导航为设计内横滑） |
| 每页 h1 数量 / meta description | 各 1 个 / 均存在 |
| 移动端抽屉、图片灯箱、FAQ 手风琴、Cookie 同意、表单校验 | 全部通过 |
| 中英切换 | 互跳正确，`<html lang>` 同步 |
| `file://` 双击直接打开 | 样式、图片、交互均正常 |

### 手机端响应式复验（2026-09-13 补充）

用无头 Edge 按真机参数（DPR、`width=device-width` 移动端行为）复验了
320 / 360 / 390 / 414 / 768 / 1440 六种宽度 × 19 个代表页面（含中文站），
并把原有的一处小屏缺陷修掉了：

> **修掉的缺陷**：页头（LOGO + 品牌字 + "获取报价" + 汉堡按钮）在 320–360px 的机器上
> 最小宽度是 362px，超过屏幕宽度，浏览器会把整个布局视口撑到 362px，
> 也就是页面上所有文字与按钮都被缩小约 10%（安卓 360px 机型同样受影响）。
> 现在 `site.css` 里新增了 `max-width: 480px` / `360px` 两档：压缩 LOGO、品牌字、
> 报价按钮与汉堡按钮的尺寸与间距，并允许品牌字在极窄时省略，320px 也不再需要横向缩放。

| 复验项 | 结果 |
|---|---|
| 6 种宽度 × 19 页 = 114 次渲染，布局视口宽 | 与设备宽完全一致（320/360/390/414/768/1440），无一次被撑宽 |
| 页面级横向溢出 | 0 处 |
| 溢出屏幕的元素 | 0 处（表格、页内锚点导航为设计内的横滑容器；另有 1 个刻意移出屏幕的"跳到主要内容"无障碍链接） |
| 滚动触发懒加载后的断图 | 0 张 |
| 导航形态（≤1080 换成汉堡菜单，桌面为横向菜单） | 6 种宽度全部正确 |
| 手机端交互 32 项（320 / 390 各 16 项）：布局视口没被撑宽、抽屉开关与滚动锁、抽屉不溢出、点按区域 ≥44px、图片灯箱放大与关闭、FAQ 手风琴、空表单必填校验、Cookie 条不越界、锚点导航横滑 | 32/32 通过 |

复验怎么重跑（`tools\` 不上线，只在本机用）：

```powershell
cd "D:\agent开发\菲美得\公司网站"
node tools/serve.mjs 5173            # 终端 A：起本地服务
node tools/audit_mobile.mjs          # 终端 B：布局体检，明细写进 tools\mobile-audit.json
node tools/audit_mobile_ui.mjs       # 终端 B：手机端交互体检，逐项打印通过/失败
node tools/shots_mobile.mjs          # 终端 B：重生成 _预览截图\手机-*.jpg 整页长图
```

> 三个脚本都要求本机装有 Edge（默认路径 `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`，
> 可用环境变量 `AUDIT_EDGE` 覆盖），并用无头模式跑，不会弹窗口。

---

## 七、已知限制

1. **配图有推断成分**。原始素材没有目录说明，"首页大图""熔炼浇注""配重铁"这几处的看图选片
   是按画面指标（亮度/对比度/细节度/饱和度）+ 目录语义推断的，需要你复核。
   `_素材审阅\` 里有 336 张素材的编号拼版图，你可以直接告诉我"第几号换成第几号"。
2. **图片未做多倍图**。目前每个坑位 1 个尺寸 + 1 个缩略图，够用；若要进一步提速可加 2x 输出。
3. **新闻为公开信息整理**，行文口径请公司确认后再发布。
4. 专利表中 6 项只有名称与授权日期（授权公告号在公开渠道被遮挡），已按实际可核实的信息填写。
5. **车间短视频模块已移除**（首页 `#video` 区块、文案与样式一并删除）。6 段原始视频仍留在
   `assets\video\`，未做任何页面引用；若确定不再使用，直接删掉该目录即可。

---

## 八、下一步

见 `交付说明.md` 的"待确认事项"一节。确认后即可进入高保真视觉定稿与后端对接阶段。

---

## 九、把源码发布到 GitHub

只推送**站点源码**（页面、`assets/css`、`assets/js`、`assets/img`、`tools`、README 等），
不推送 `_预览截图\`（42 MB 预览长图）、`_素材审阅\`（素材分析中间产物）、
`assets\video\`（页面未引用的原始视频）。发布副本放在 `..\网站源码-GitHub\`（同级目录），
它是**自动生成的**，不要手动改，改内容一律改本目录再重跑下面的命令。

```powershell
cd "D:\agent开发\菲美得\公司网站"

# 第一次：给发布副本配置仓库地址并推送（会弹一次 GitHub 登录）
powershell -File tools\publish_github.ps1 -RepoUrl https://github.com/用户名/仓库.git

# 以后每次改完网站，重新生成页面后推一次即可（地址已记住）
node tools/generate_site.mjs
powershell -File tools\publish_github.ps1 -Message "改了什么"

# 想把预览截图 / 素材审阅 / 原始视频也推上去，加这个开关
powershell -File tools\publish_github.ps1 -IncludeNonSource
```

仓库里的文件是**网站根目录**（`index.html` 在最外层），所以直接开 GitHub Pages
（Settings → Pages → Branch: `main` / root）就能得到一个在线预览地址。

---

## 十、自动部署到 Cloudflare Workers

线上地址：<https://czfamed.czfamed1.workers.dev/>（英文在根目录，中文在 `/zh/`）。

链路是：**改内容 → 重新生成 → 推 GitHub → GitHub Actions 自动上线**。

```powershell
cd "D:\agent开发\菲美得\公司网站"
node tools\generate_site.mjs                              # 重新生成 38 个页面
powershell -File tools\publish_github.ps1 -Message "改了什么"   # 推送
# 推上去之后 GitHub 会自动跑「部署到 Cloudflare Workers」并上线，不需要再手工操作
```

### 首次配置（只需做一次）

1. **建 API Token**：Cloudflare 控制台 → 右上角头像 → My Profile → API Tokens →
   Create Token → 用 **Edit Cloudflare Workers** 模板（或自定义：Account →
   Workers Scripts → Edit）。创建后复制 token，**只会显示一次**。
2. **取 Account ID**：Workers & Pages 页面右侧的 Account ID，或地址栏
   `dash.cloudflare.com/<account-id>` 里那串。
3. **写进 GitHub**：仓库 → Settings → Secrets and variables → Actions →
   New repository secret，加两条：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`。
4. **跑一次**：仓库 → Actions → 部署到 Cloudflare Workers → Run workflow。

之后每次 push 到 `main` 都会自动部署。

### 部署相关文件

| 文件 | 作用 |
|---|---|
| `wrangler.jsonc` | Cloudflare 部署配置。`name` 必须与线上 Worker 同名（`czfamed`），否则会新建一个 Worker 而不是更新线上那个 |
| `.assetsignore` | 决定哪些文件**不**上传：`tools\`、`_素材审阅\`、`_预览截图\`、`assets\video\`、`README.md`、`交付说明.md` 等 |
| `.github/workflows/deploy-cloudflare.yml` | push 到 `main` 时自动部署 |
| `tools/check_site.mjs` | 部署前的完整性检查，见下 |

### 部署前检查（`tools/check_site.mjs`）

每次部署前自动跑，本地也可以随时手动跑：

```powershell
node tools\check_site.mjs
```

它检查三件事，任一不通过就**中断部署**（退出码 1）：

1. 每个页面的 `<use href="#图标">` 都能在本页找到对应 `<symbol>` 定义。
   SVG 引用未定义符号时不报错、只渲染成空白，2026-09-14 首页「为什么选择」三格
   图标就是这么坏掉的，这条专门防它。
2. 各页 sprite 完全一致（防止个别页面停留在旧版本生成结果）。
3. 页面与 CSS 里引用的本地文件都存在。

### 本地手动部署（可选）

不想走 GitHub 也可以在本地直接推：

```powershell
cd "D:\agent开发\菲美得\公司网站"
npx wrangler@4 login      # 首次会开浏览器登录 Cloudflare
npx wrangler@4 deploy
```

### 出问题时先看这里

| 现象 | 处理 |
|---|---|
| Actions 报"仓库缺少 secret" | 按上面「首次配置」第 3 步补两条 secret |
| Actions 失败但看不懂 | 进 Actions → 对应那次运行 → 展开失败的步骤看日志 |
| 部署成功但页面没变 | 先强制刷新（Ctrl+F5）排除浏览器缓存；仍不对就确认 `wrangler.jsonc` 的 `name` 与线上 Worker 一致 |
| 想确认线上到底是哪一版 | 抓 `https://czfamed.czfamed1.workers.dev/zh/`，在返回的 HTML 里搜 `id="i-group"` |

> 注意：如果 Cloudflare 控制台里**同时**给这个 Worker 开了 Git 集成（Workers Builds），
> 会和本工作流重复部署。二选一即可，推荐保留本仓库的 Actions（配置、检查都在仓库里）。
