# 新闻资讯周更 SOP（行业动态）

> 适用对象：内容负责人（市场/业务）、技术维护人
> 配套文档：[新闻资讯周更方案.md](新闻资讯周更方案.md)
> 已确定的前提：**先审后发**、**每周 2 篇**、主线目标是**搜索引擎收录与自然流量**，兼顾客户粘性

---

## 一、每周固定动作

| 时间 | 谁 | 做什么 | 耗时 |
|---|---|---|---|
| 周一 08:30 | AI 定时任务 | 检索白名单来源 → 出 2 篇双语草稿 + 审阅卡 → 写入 `tools/news.mjs`（`draft: true`） | 自动 |
| 周一上午 | 内容负责人 | 按下方「审核清单」过一遍，改"对客户意味着什么"，把 `draft` 去掉、填 `publishAt` | 10–15 分钟 |
| 通过后 | 内容负责人或技术 | 跑生成 + 检查 + 推送（下方命令），1–2 分钟后线上生效 | 3 分钟 |
| 每月最后一周 | 内容负责人 | 追加 1 篇《月度行业要闻汇总》 | 20 分钟 |
| 每月 | 市场负责人 | 看收录数 / 自然流量 / 询盘，定下月选题方向 | 30 分钟 |

排期一次排 4 周也可以：把 `publishAt` 写到未来某天，稿件会留在数据文件里等日期到——
生成器只渲染"当天及以前"的条目，**不需要有人记得发**。

---

## 二、命令（复制即用）

```powershell
cd "D:\agent开发\菲美得\公司网站"

node tools/generate_site.mjs     # 重新生成 38 个页面 + 两个语种的 feed.xml
node tools/check_site.mjs        # 部署前检查：缺来源、缺翻译、图片不存在都会在这里拦下

powershell -File tools\publish_github.ps1 -Message "新闻：<本周标题>"
# 脚本会把站点源码同步到发布副本并推送，推送后 Cloudflare 自动构建上线
```

> 不要在这个目录直接 `git add -A`：本目录所在的 Git 仓库根是 `D:\agent开发`，
> `git add -A` 会把 `..\` 下其他项目的改动一起提交进去（历史上踩过）。
> 只在本机留版本记录时用 `git add .`（限定当前目录），线上发布走上面的发布脚本。

想把未来排期的效果先在本地看一眼（不影响线上）：

```powershell
$env:NEWS_TODAY="2026-10-06"; node tools/generate_site.mjs
```

生成日志会直接告诉你当前状态，例如：

```
新闻发布状态（生成日期 2026-09-15）：已发布 4 篇 · 排期中 2 篇 · 草稿 0 篇
  下一篇到期的排期稿：casting-cost-outlook（2026-10-06）——到期后重新生成即上线
```

---

## 三、来源白名单（国际来源优先）

**站位先说清楚**：我们做的是出口生意，读者是海外采购和工程师，不是在中国的同业。
所以**先找国际来源**，中国数据只在能补充说明时作为其中一个来源出现，不能当唯一锚点。

**规则：只取事实与数据，不搬表达、不搬图片。** 事实本身不受著作权保护，
但段落级的翻译或改写仍然构成侵权风险，且会被搜索引擎判为重复内容。

国际来源（第一梯队，已实测可抓取）：

| 来源 | 能给什么 | 地址 |
|---|---|---|
| 世界钢铁协会 worldsteel | 全球/分区粗钢月产量、短期需求展望 | worldsteel.org/media/press-releases/ |
| Drewry | 世界集装箱运价指数（WCI），每周四更新 | drewry.co.uk 的 World Container Index 页 |
| 世界银行 Commodity Markets | 大宗商品价格（Pink Sheet 月度） | worldbank.org/en/research/commodity-markets |
| Eurostat | 欧盟工业生产、进出口、价格指数 | ec.europa.eu/eurostat |
| 美国联邦公报 Federal Register | 关税、反倾销/反补贴、232 条款等贸易措施原文（有 API） | federalregister.gov |
| 各国统计与贸易机构 | 美国 Census、日本经产省、印度商务部等公开数据 | 各国官网 |

第二梯队（按需，先确认能打开再引用）：各国铸造/机械行业协会（AFS、CEMA、VDMA、
日本 JMTBA 等）的公开报告；行业媒体 Foundry Management & Technology、Modern Casting。

中国来源（只作补充，不作主锚点）：国家统计局、海关总署、中国机床工具工业协会——
这几家目前可正常抓取。**注意：中国铸造协会官网对自动抓取返回 418、工信部返回 403、
OECD / LME / S&P Global 站点返回 403**，这些内容改由人工看到后丢给 AI 整理，不要写进自动流程。

每个来源首次使用前确认一次官网地址（域名会变），之后写进 `source.url`，长期复用。

**不要把以下内容写进草稿**：未经证实的传闻、来源里没有的具体数字、竞争对手的负面评价、
政治与政策好坏的评论、客户名称与订单信息。

---

## 四、选题池（全球买家视角）

**判定标准**：一个德国的采购经理看到这条标题，会不会觉得"这跟我下单有关"？
如果答案只成立于中国市场，就换题或改成全球口径。

| 方向 | 可以写什么 | 全球口径从哪来 |
|---|---|---|
| 交货与物流 | 集装箱运价、空班、港口拥堵、运河通行、绕行 | Drewry WCI、船公司与运河管理局公告 |
| 原料与能源 | 废钢、生铁、焦炭、电价、天然气的全球价格 | 世界银行 Pink Sheet、各国能源统计 |
| 全球供需 | 分区域粗钢产量、钢铁需求展望、产能变化 | worldsteel 月度产量与短期展望 |
| 贸易规则 | 关税、反倾销/反补贴、原产地规则、碳边境（CBAM） | 美国联邦公报、欧盟官方公报、各国贸易救济机构 |
| 下游行业 | 工程机械、机床、泵阀、风电、农机、矿山设备的全球景气 | 各国行业协会、区域制造业 PMI |
| 标准与合规 | EU 机械法规、材料证书（EN/ISO/ASTM）、碳足迹与 EPBR | 标准组织与监管机构公开文本 |

中国视角的内容不是不能写，但要改造成全球买家关心的形式——比如"中国机床行业订单增长"
应该落到"从中国采购机床类铸件的订货提前量要留多少"，而不是复述一份国内行业简讯。

---

## 五、一篇稿子的数据骨架

### 配图规则（先说结论：正文配图用数据图，封面才用照片）

网站上有 99 张成品照片，其中 **97 张已经被各个页面用掉了**（页面用循环铺图库），
真正没被任何页面用过的一度只剩 4 张。所以行业动态的配图规则是：

1. **正文配图用数据图**（`charts` 字段，生成器直接画内联条形图）：每期数据不同、天然唯一，
   不占图片池、没有体积、对采购经理比车间照片信息量更大。
2. **封面图**从"未被任何页面使用"的照片里挑，而且同一张图 180 天内不能出现在两篇文章里。
3. 历史公司新闻的配图与站内页面有重复，那些已经上线多年，改图收益低，`check_site` 只提示不拦。

选封面图前先查冷却与可用清单：

```powershell
node tools/news_images.mjs                 # 看"冷却中"与"可选用"两张清单（可用清单带画面描述）
node tools/news_images.mjs --filter=浇注    # 只想找某类画面时
node tools/news_images.mjs --sync          # 改完文章后重建冷却记录（check_site 会校验有没有漏）
```

> **素材告急**：目前"可选用"清单里只剩 2 张（`gallery/factory-15`、`gallery/factory-16`），
> 按每周 2 篇算只够一周多。需要尽快补一批没有在页面上用过的照片（补拍或从原始素材里新裁切），
> 否则封面只能重复站内已有的图——那是 `check_site` 明确会拦下的。

### 数据图的写法

```js
charts: [
  {
    after: 1,                                   // 插在第几段之后
    title: { en: "…", zh: "…" },                 // 图题（双语必填）
    items: [
      { label: { en: "Africa", zh: "非洲" }, value: 6.1, text: "+6.1%" },
      { label: { en: "Middle East", zh: "中东" }, value: -13.4, text: "−13.4%" },
    ],
    note: { en: "Source: worldsteel", zh: "来源：世界钢铁协会" },   // 选填，建议写来源
  },
],
```

`value` 决定条形长度（负数走橙色），`text` 是条形右侧显示的文字。数值必须来自来源原文。

写进 `tools/news.mjs` 的条目（**中英双语必须齐全，否则生成器会报错**）：

```js
{
  slug: "casting-cost-outlook",        // 小写字母、数字、连字符；直接拼进文件名
  date: "2026-10-06",                  // 显示与排序用
  publishAt: "2026-10-06",             // 选填：上线日期；不写就用 date
  draft: true,                         // 选填：草稿，验证通过后删掉这一行
  dateText: { en: "6 October 2026", zh: "2026 年 10 月 6 日" },
  category: "industry",                // 行业动态固定用 industry
  image: "news/news-hitech",           // 顶部大图，只能用 assets/img/ 下已有的成品图
  title: { en: "…", zh: "…" },
  summary: { en: "…", zh: "…" },       // 2 行以内，列表页与 feed.xml 都用它
  body: [
    { en: "…", zh: "…" },              // 第 1 段：发生了什么（事实 + 时间 + 来源口径）
    { en: "…", zh: "…" },              // 第 2 段：数据与背景，2–3 条，条条能核对
    { en: "…", zh: "…" },              // 第 3 段：对客户意味着什么 —— 我们自己定口径
  ],
  source: { name: "中国铸造协会", url: "https://…" },   // 行业动态必填，check_site 会拦
  figures: [                            // 选填：正文配图，插在第几段之后
    { img: "quality/cmm", w: 1200, h: 900, after: 2, caption: { en: "…", zh: "…" } },
  ],
}
```

四条硬规则：

1. `category: "industry"` 的条目**必须**有 `source.name` 和可点开的 `source.url`，否则 `check_site.mjs` 直接失败。
2. 配图只用站内自有素材，**不引用外部图片**；正文配图用 `charts` 数据图，封面图必须是站内页面没用过的照片。
3. **英文是主稿**：先用英文写，确认英文读起来像英文媒体而不是翻译稿；中文版是同一事实的中文表达，不是英文的逐字对照。
4. 金额与单位跟随来源口径并在文中写明（国际来源用 USD、欧盟用 EUR、中国数据用 CNY），需要换算时注明换算日期，不做无出处的换算。

配图还要过两关：封面从 `node tools/news_images.mjs` 的"可选用"清单里挑（不得使用站内页面已用的图），
文章写完后跑 `node tools/news_images.mjs --sync`，否则 `check_site.mjs` 会以"冷却记录缺条"失败。

---

## 六、双语术语表（固定用法，避免前后不一致）

| 中文 | English |
|---|---|
| 灰铸铁 | grey iron |
| 球墨铸铁 | ductile iron / nodular iron |
| 消失模铸造 | lost-foam casting |
| 树脂砂 | resin sand |
| 造型 / 砂型 | moulding / sand mould |
| 熔炼与浇注 | melting and pouring |
| 热处理 | heat treatment |
| 数控加工 / 镗铣 | CNC machining / boring and milling |
| 三坐标测量 | CMM inspection |
| 无损检测 | non-destructive testing (NDT) |
| 铸件毛坯 | raw casting |
| 加工件 | machined casting / machined part |
| 机床床身 | machine-tool bed |
| 泵阀壳体 | pump and valve housing |
| 配重件 | counterweight |
| 年产 30000 吨 | 30,000 t/yr capacity |
| 螺纹钢 / 混凝土用钢筋 | steel concrete reinforcing bar (rebar) |
| 反倾销税 | antidumping duty (AD) |
| 反补贴税 | countervailing duty (CVD) |
| 加权平均倾销幅度 | weighted-average dumping margin |
| 现金保证金税率 | cash deposit rate |
| 可获得的不利事实 | facts available with adverse inferences |
| 到岸成本 | landed cost |
| 价格指数 | price index |
| 月均价 | monthly average |
| 百万英热单位 | million British thermal units (mmBtu) |
| 干吨 | dry metric tonne (dmt) |

新的术语加进这张表之后再用于稿件，避免同一概念出现两种译法。

---

## 七、审核清单（11 项，逐条打勾）

1. 标题是具体的事实，不是标题党，不含夸大词
2. 第一段的事实、时间、数字能在来源里找到
3. 每个数字都能点回来源核对；核不到的已经删掉，没有"预计""据说"当事实
4. 没有整段翻译或照抄来源的表达
5. 文末 `source` 名称与链接正确、可打开
6. "对客户意味着什么"这段符合我们的口径，没有把行业数字说成我们的产能或承诺
7. 没有竞品对比、政策评价、客户与订单信息
8. 中英两版都通顺，术语与第六节的表一致
9. 配图是自有素材、画面与文字相符
10. **以海外买家视角通读一遍**：标题与结论是否对全球客户成立，有没有只在中国语境下才成立的说法
11. `node tools/check_site.mjs` 通过，然后才提交

---

## 八、每月复盘看什么

| 指标 | 从哪看 | 目标方向 |
|---|---|---|
| 新增页面数 | 生成器日志 | ≥8 篇/月 |
| 收录页数 | Google Search Console / 百度搜索资源平台 | 逐月上升 |
| 自然访问 | GSC 的"效果"报告 | 逐月上升 |
| 长尾词排名 | 搜 "ductile iron casting supplier" 类词 | 新词持续出现 |
| 询盘量 | 邮箱 Formspree 通知 | 稳定或上升 |

> 询盘来源目前无法归因（表单没有渠道字段）。想量化"哪篇文章带来询盘"，
> 需要在 `contact.html` 的表单里加一个"从哪了解到我们"的字段——作为第二阶段可选项。

---

## 九、已经改好的技术部分（2026-09-15）

| 能力 | 位置 |
|---|---|
| `industry`（行业动态）分类 | `tools/news.mjs` → `NEWS_META.categoryLabel` |
| `publishAt` 排期、`draft` 草稿 | `tools/news.mjs` 条目字段 |
| 只渲染已发布条目（列表、首页、详情页、feed 一致） | `tools/generate_site.mjs` |
| 详情页来源标注 + NewsArticle 结构化数据 | `tools/generate_site.mjs` → `pageNewsItem` |
| 多来源文章（`source` 可以写成数组，逐条署名并进入结构化数据） | `tools/news.mjs` + `tools/generate_site.mjs` |
| 封面图按真实尺寸输出（`imageW` / `imageH`，默认 2000×800） | `tools/news.mjs` 条目字段 |
| 配图冷却（180 天内不重复、同篇不重复、记录自动同步） | `tools/news_images.mjs` + `tools/image-cooldown.json` |
| 行业动态数据图（内联条形图，无图片文件） | `tools/news.mjs` 的 `charts` 字段 + `tools/generate_site.mjs` → `chart()` |
| 站内图片使用检测（生成后 HTML 为准，新闻条目区块已排除） | `tools/image-usage.mjs` |
| 发布脚本：直连 GitHub 失败自动探测本地代理重试 | `tools/publish_github.ps1` |
| 列表页分类筛选（含 `#news-industry` 直达锚点） | `tools/generate_site.mjs` + `assets/js/site.js` |
| 中英双份 `feed.xml`（RSS） | `tools/generate_site.mjs`，站点根与 `zh/` |
| 缺来源 / 缺翻译 / 缺配图的部署前拦截 | `tools/check_site.mjs` 检查 4 |
