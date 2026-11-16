/**
 * 新闻资讯。内容依据公开披露信息整理（环评批复、备案、资质认定），
 * 上线前建议由公司确认表述口径。
 */

export const NEWS_META = {
  title: { en: "News & Updates", zh: "新闻资讯" },
  metaTitle: {
    en: "News | Investments, Certifications and Plant Upgrades",
    zh: "新闻资讯 | 投资项目、资质认定与厂区升级",
  },
  metaDesc: {
    en: "Investment projects, environmental approvals, certifications and plant upgrades at Cangzhou FAMED Machinery Equipment Co., Ltd.",
    zh: "沧州菲美得机械设备有限公司的投资项目、环评批复、资质认定与厂区升级动态。",
  },
  lead: {
    en: "Investment projects, approvals and certifications, compiled from public filings and company records.",
    zh: "投资项目、审批与资质认定，依据公开披露信息与公司记录整理。",
  },
  disclaimer: {
    en: "Dates and document numbers below are taken from public filings. Figures describing capacity are the plant's own unless the group is named explicitly.",
    zh: "以下日期与文号取自公开披露信息。产能数据除注明集团口径外，均为本厂口径。",
  },
  allNews: { en: "All news", zh: "全部新闻" },
  readMore: { en: "Read more", zh: "阅读全文" },
  published: { en: "Published", zh: "发布时间" },
  sourceLabel: { en: "Source", zh: "来源" },
  sourceNote: {
    en: "Industry Watch articles summarise facts and figures from publicly reported sources; each item links to its source. The assessment of what a development means for buyers is our own.",
    zh: "「行业动态」整理公开来源的事实与数据，每篇文末附来源链接；文中关于「对采购方意味着什么」的判断为本厂观点。",
  },
  filterLabel: { en: "Filter by category", zh: "按分类筛选" },
  filterAll: { en: "All", zh: "全部" },
  emptyText: {
    en: "No articles in this category yet.",
    zh: "该分类暂时还没有内容。",
  },
  /* 分类键的顺序同时决定列表页筛选按钮的顺序 */
  categoryOrder: ["industry", "investment", "certification", "environment", "production"],
  categoryLabel: {
    industry: { en: "Industry Watch", zh: "行业动态" },
    investment: { en: "Investment", zh: "投资项目" },
    certification: { en: "Certification", zh: "资质认定" },
    environment: { en: "Environment", zh: "环保合规" },
    production: { en: "Production", zh: "生产运营" },
  },
};

export const NEWS = [
  /* ---- 行业动态 · 试刊（面向全球买家）---- */
  {
    slug: "drewry-wci-22-oct-2026",
    date: "2026-10-22",
    draft: true,
    dateText: { en: "22 October 2026", zh: "2026 年 10 月 22 日" },
    category: "industry",
    image: "gallery/factory-20",
    imageW: 1200,
    imageH: 900,
    title: {
      en: "Drewry WCI rises 2% to USD 4,585 as Asia–Europe blank sailings tighten capacity",
      zh: "Drewry 全球集装箱运价指数升至 4585 美元/40 英尺柜，亚欧航线空班增至 8 班",
    },
    summary: {
      en: "Drewry's World Container Index rose 2% to USD 4,585 per 40ft container on 22 October 2026, its highest level in 15 weeks. Shanghai–Rotterdam and Shanghai–Genoa rose 3% and 5%, while eight blank sailings are announced on Asia–Europe for next week, up from two this week.",
      zh: "Drewry 2026 年 10 月 22 日全球集装箱运价指数上涨 2% 至 4585 美元/40 英尺柜，创 15 周新高。上海—鹿特丹与上海—热那亚分别上涨 3% 和 5%；亚欧航线下周公布 8 班空班，本周为 2 班。",
    },
    body: [
      {
        en: "Drewry's assessment for 22 October 2026 put its World Container Index at USD 4,585 per 40ft container, up 2% week on week and the highest in 15 weeks. Shanghai–Los Angeles rose 2% to USD 8,007 and Shanghai–New York 1% to USD 10,166. On Asia–Europe, Shanghai–Rotterdam rose 3% to USD 3,632 and Shanghai–Genoa 5% to USD 4,152.",
        zh: "Drewry 2026 年 10 月 22 日的评估显示，全球集装箱运价指数为 4585 美元/40 英尺柜，环比上涨 2%，为 15 周以来最高。上海—洛杉矶上涨 2% 至 8007 美元，上海—纽约上涨 1% 至 10166 美元；亚欧航线方面，上海—鹿特丹上涨 3% 至 3632 美元，上海—热那亚上涨 5% 至 4152 美元。",
      },
      {
        en: "The capacity picture differs by route. Two transpacific blank sailings are announced for next week, down from six this week, while Asia–Europe has eight, up from two; Drewry expects transpacific rates to stay stable and Asia–Europe rates to rise slightly. Port pressure has eased at Shanghai, where vessel waiting time fell from 97 hours in week 38 to 38 hours in week 42. Drewry also reports 54 Suez Canal sailings in week 41 and 55 in week 42, with two container ships entering the Gulf in week 42 against five in the previous week.",
        zh: "不同航线的运力状况并不一致。跨太平洋航线下周公布 2 班空班，本周为 6 班；亚欧航线则从本周的 2 班增至下周的 8 班。Drewry 预计跨太平洋运价保持稳定，亚欧运价小幅上涨。上海港的船舶等待时间从第 38 周的 97 小时降至第 42 周的 38 小时。Drewry 还记录到，苏伊士运河第 41 周有 54 班航行、第 42 周有 55 班；第 42 周进入海湾的集装箱船为 2 艘，前一周为 5 艘。",
      },
      {
        en: "What this means for buyers — our view: For a European or North American buyer, the composite matters less than the route and the capacity signal behind it. Asia–Europe is being repriced with more blank sailings while transpacific capacity is improving, so a freight number carried over from the other lane can distort a landed-cost comparison. Our advice is to quote the exact port pair and separate sea freight from the casting price, with its own validity date and surcharge basis. Where the selected lane is being supported by capacity withdrawals, confirm space and sailing with the forwarder before fixing a delivery date; the published WCI is a market benchmark, not a booked rate.",
        zh: "对采购方意味着什么（我们的判断）：对欧洲或北美买家而言，真正相关的是具体航线及其背后的运力信号，而不只是综合指数。亚欧航线在增加空班，跨太平洋航线却在改善，把另一条航线的运价直接拿来比较，会扭曲到岸成本的判断。我们建议按确切港口对询价，把海运费与铸件价格分开，并分别写明有效期和附加费口径。如果所选航线正在通过撤运力支撑价格，应在确认交期前与货代核实舱位和船期；公布的 WCI 是市场基准，并不是已经订到的运价。",
      },
    ],
    source: {
      name: {
        en: "Drewry — World Container Index, 22 October 2026",
        zh: "Drewry 全球集装箱运价指数（2026 年 10 月 22 日）",
      },
      url: "https://www.drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index-assessed-by-drewry",
      date: "2026-10-22",
    },
    charts: [
      {
        after: 1,
        title: {
          en: "World Container Index and Shanghai route rates — 22 October 2026 (USD per 40ft container)",
          zh: "全球集装箱运价指数及上海出发航线运价（美元/40 英尺柜，2026 年 10 月 22 日）",
        },
        items: [
          { label: { en: "Shanghai–New York", zh: "上海—纽约" }, value: 10166, text: "$10,166" },
          { label: { en: "Shanghai–Los Angeles", zh: "上海—洛杉矶" }, value: 8007, text: "$8,007" },
          { label: { en: "WCI composite", zh: "WCI 综合指数" }, value: 4585, text: "$4,585" },
          { label: { en: "Shanghai–Genoa", zh: "上海—热那亚" }, value: 4152, text: "$4,152" },
          { label: { en: "Shanghai–Rotterdam", zh: "上海—鹿特丹" }, value: 3632, text: "$3,632" },
        ],
        note: {
          en: "Source: Drewry World Container Index, assessment for 22 October 2026.",
          zh: "来源：Drewry 世界集装箱运价指数，2026 年 10 月 22 日评估。",
        },
      },
      {
        after: 2,
        title: {
          en: "Blank sailings announced for next week versus this week",
          zh: "下周与本周公布的空班数量",
        },
        items: [
          { label: { en: "Transpacific — this week", zh: "跨太平洋——本周" }, value: 6, text: "6" },
          { label: { en: "Transpacific — next week", zh: "跨太平洋——下周" }, value: 2, text: "2" },
          { label: { en: "Asia–Europe — this week", zh: "亚欧——本周" }, value: 2, text: "2" },
          { label: { en: "Asia–Europe — next week", zh: "亚欧——下周" }, value: 8, text: "8" },
        ],
        note: {
          en: "Number of blank sailings. Source: Drewry World Container Index, 22 October 2026.",
          zh: "空班数量。来源：Drewry 世界集装箱运价指数，2026 年 10 月 22 日。",
        },
      },
    ],
  },
  {
    slug: "worldsteel-crude-steel-sep-2026",
    date: "2026-10-23",
    draft: true,
    dateText: { en: "23 October 2026", zh: "2026 年 10 月 23 日" },
    category: "industry",
    image: "process/blasting-2",
    imageW: 1200,
    imageH: 900,
    title: {
      en: "Global crude steel output falls 0.2% in September as Germany drops 13% and Vietnam rises 29.1%",
      zh: "9 月全球粗钢产量下降 0.2%：德国减少 13%，越南增长 29.1%",
    },
    summary: {
      en: "worldsteel reports that the 70 reporting countries produced 142.4 Mt of crude steel in September 2026, down 0.2% year on year. The Middle East fell 20.4% and the EU 5.0%, while North America rose 3.4%; among individual producers, Germany fell 13.0% and Vietnam rose 29.1%.",
      zh: "世界钢铁协会：2026 年 9 月 70 个报告国粗钢产量 1.424 亿吨，同比下降 0.2%。中东下降 20.4%，欧盟下降 5.0%，北美增长 3.4%；主要产钢国中，德国下降 13.0%，越南增长 29.1%。",
    },
    body: [
      {
        en: "The World Steel Association (worldsteel) reported on 23 October 2026 that the 70 countries in its monthly dataset produced 142.4 million tonnes of crude steel in September, 0.2% less than in September 2025. Output in January–September was 1,367.5 Mt, down 0.7%. The 70 countries accounted for about 98% of world crude steel production in 2025.",
        zh: "世界钢铁协会于 2026 年 10 月 23 日发布数据：其月度统计覆盖的 70 个国家 9 月粗钢产量为 1.424 亿吨，比 2025 年 9 月减少 0.2%；1—9 月累计 13.675 亿吨，同比下降 0.7%。这 70 个国家约占 2025 年全球粗钢产量的 98%。",
      },
      {
        en: "Regional results moved further apart. Africa rose 10.6%, Asia and Oceania 0.7%, North America 3.4% and South America 0.2%. The EU (27) fell 5.0%, other Europe 1.4%, Russia and other CIS plus Ukraine 1.9% and the Middle East 20.4%. Among the largest producers, Germany fell 13.0% to 2.6 Mt, China edged up 0.1% to 73.6 Mt, the United States was estimated at 7.2 Mt (+4.3%) and Vietnam at 2.6 Mt (+29.1%).",
        zh: "区域走势进一步分化。非洲增长 10.6%，亚洲与大洋洲增长 0.7%，北美增长 3.4%，南美增长 0.2%；欧盟（27 国）下降 5.0%，欧洲其他地区下降 1.4%，俄罗斯及其他独联体国家加乌克兰下降 1.9%，中东下降 20.4%。主要产钢国中，德国产量降至 260 万吨、下降 13.0%；中国微增 0.1% 至 7360 万吨；美国估计为 720 万吨、增长 4.3%；越南为 260 万吨、增长 29.1%。",
      },
      {
        en: "What this means for buyers — our view: Crude-steel output does not set a casting price on its own, so we would not use this monthly total as a direct reason to raise or accept a quote. The more useful signal is the widening regional spread, which points to different operating rates and availability across supplier regions. For a sourcing decision, ask a supplier which specific metal-input index it uses and whether its material plan relies on local or imported supply, then check lead time against the delivery and quality terms in the offer. Treat the worldsteel figure as context for a review, not as a standalone price trigger.",
        zh: "对采购方意味着什么（我们的判断）：粗钢产量本身并不决定铸件价格，因此不应仅凭这一月度总量要求涨价或接受涨价。更有价值的是区域分化加大，它意味着不同供应地区的开工水平与材料可得性存在差异。做采购判断时，可以问清供应商引用的是哪一种具体金属投入指数、其材料计划依赖本地还是进口供应，再把交期与报价中的交付和质量条款一起核对。世界钢铁协会的数据适合作为复核背景，不应单独作为价格触发条件。",
      },
    ],
    source: {
      name: {
        en: "World Steel Association (worldsteel) — September 2026 crude steel production",
        zh: "世界钢铁协会《2026 年 9 月全球粗钢产量》",
      },
      url: "https://worldsteel.org/media/press-releases/2026/september-2026-crude-steel-production/",
      date: "2026-10-23",
    },
    charts: [
      {
        after: 1,
        title: {
          en: "Crude steel output by region — September 2026 versus September 2025",
          zh: "粗钢产量分区域同比（2026 年 9 月 vs 2025 年 9 月）",
        },
        items: [
          { label: { en: "Africa", zh: "非洲" }, value: 10.6, text: "+10.6%" },
          { label: { en: "North America", zh: "北美" }, value: 3.4, text: "+3.4%" },
          { label: { en: "Asia and Oceania", zh: "亚洲与大洋洲" }, value: 0.7, text: "+0.7%" },
          { label: { en: "South America", zh: "南美" }, value: 0.2, text: "+0.2%" },
          { label: { en: "Europe, other", zh: "欧洲其他地区" }, value: -1.4, text: "−1.4%" },
          { label: { en: "Russia, other CIS and Ukraine", zh: "俄罗斯及独联体、乌克兰" }, value: -1.9, text: "−1.9%" },
          { label: { en: "EU (27)", zh: "欧盟（27 国）" }, value: -5.0, text: "−5.0%" },
          { label: { en: "Middle East", zh: "中东" }, value: -20.4, text: "−20.4%" },
        ],
        note: {
          en: "Source: worldsteel, September 2026 crude steel production, 70 reporting countries.",
          zh: "来源：世界钢铁协会《2026 年 9 月全球粗钢产量》，70 个报告国。",
        },
      },
      {
        after: 2,
        title: {
          en: "Selected crude steel producers — September 2026 versus September 2025",
          zh: "主要粗钢生产国同比变化（2026 年 9 月 vs 2025 年 9 月）",
        },
        items: [
          { label: { en: "Vietnam", zh: "越南" }, value: 29.1, text: "+29.1%" },
          { label: { en: "United States (estimated)", zh: "美国（估计）" }, value: 4.3, text: "+4.3%" },
          { label: { en: "India", zh: "印度" }, value: 1.9, text: "+1.9%" },
          { label: { en: "Türkiye", zh: "土耳其" }, value: 0.8, text: "+0.8%" },
          { label: { en: "China", zh: "中国" }, value: 0.1, text: "+0.1%" },
          { label: { en: "Germany", zh: "德国" }, value: -13.0, text: "−13.0%" },
        ],
        note: {
          en: "Source: worldsteel, September 2026 crude steel production. US figure is an estimate; other selected countries are reported figures.",
          zh: "来源：世界钢铁协会《2026 年 9 月全球粗钢产量》。美国为估计值，其余为报告值。",
        },
      },
    ],
  },
  {
    slug: "global-crude-steel-july-2026",
    date: "2026-08-24",
    publishAt: "2026-09-16",
    dateText: { en: "24 August 2026", zh: "2026 年 8 月 24 日" },
    category: "industry",
    image: "gallery/factory-13",
    imageW: 1200,
    imageH: 900,
    title: {
      en: "Global crude steel output steady at 149.2 Mt as regions pull apart",
      zh: "全球粗钢月产量 1.492 亿吨：总量持平，区域冷热分化",
    },
    summary: {
      en: "worldsteel: the 70 reporting countries produced 149.2 Mt of crude steel in July 2026, down 0.3% year on year. North America rose 4.9% and the EU 3.8%, the Middle East fell 13.4%, and Asia and Oceania — about 73% of the total — slipped 1.2%.",
      zh: "世界钢铁协会：2026 年 7 月 70 个报告国粗钢产量 1.492 亿吨，同比下降 0.3%。北美增长 4.9%、欧盟增长 3.8%，中东下降 13.4%；占全球约 73% 的亚洲与大洋洲下降 1.2%。",
    },
    body: [
      {
        en: "The World Steel Association (worldsteel) published July 2026 production figures on 24 August. The 70 countries that report to it — about 98% of world output in 2025 — produced 149.2 million tonnes of crude steel in July, 0.3% less than in July 2025. For January to July the total was 1,081.2 Mt, down 0.6% year on year.",
        zh: "世界钢铁协会于 2026 年 8 月 24 日发布 7 月产量数据。向其报告的 70 个国家（其产量约占 2025 年全球产量的 98%）7 月粗钢产量 1.492 亿吨，比 2025 年 7 月减少 0.3%；1—7 月累计 10.812 亿吨，同比下降 0.6%。",
      },
      {
        en: "The movement is in the regional split. In July, North America produced 9.6 Mt (+4.9%), the EU 10.5 Mt (+3.8%), other Europe including Türkiye and the UK 3.7 Mt (+5.8%) and Africa 2.0 Mt (+6.1%), while the Middle East fell to 3.8 Mt (−13.4%) and Asia and Oceania — 109.4 Mt, about 73% of the world total — slipped 1.2%. Year to date the same pattern holds: North America +5.4%, other Europe +5.5% and Africa +9.5%, against the Middle East at −8.1% and Russia, other CIS and Ukraine at −6.0%.",
        zh: "变化主要发生在区域结构上。7 月北美 960 万吨（+4.9%）、欧盟 1050 万吨（+3.8%）、含土耳其与英国的欧洲其他地区 370 万吨（+5.8%）、非洲 200 万吨（+6.1%）；中东降至 380 万吨（−13.4%），占全球约 73% 的亚洲与大洋洲 1.094 亿吨、下降 1.2%。1—7 月累计延续同样格局：北美 +5.4%、欧洲其他 +5.5%、非洲 +9.5%，而中东 −8.1%、俄罗斯及其他独联体国家与乌克兰 −6.0%。",
      },
      {
        en: "What this means for buyers: total tonnage is stable, so there is no system-wide shortage or collapse in steel supply — but the map underneath is shifting. North America and Europe are adding volume while the Middle East and the CIS are losing it, and shifts of this size usually surface in two places: the cost base behind each region's quotes (energy, scrap and coke, inland freight), and how hard a regional producer is willing to chase export business. For sourcing, the practical move is to keep the comparison window open — a framework agreement with a reviewable re-quote window at a fixed interval tends to beat locking a full year at one number while regional costs diverge this much.",
        zh: "对采购方意味着什么：全球总量稳定，说明钢铁供给既没有系统性短缺、也没有崩塌，但底下这张地图在移动。北美与欧洲在增产、中东与独联体在减产，这种量级的区域位移通常出现在两件事上：各产区报价背后的成本基础（能源、废钢与焦炭、内陆运费），以及该产区厂商争取出口订单的意愿。落到采购动作上：保持比价窗口开着——在框架协议里约定固定周期的可复核重新报价窗口，通常比在区域成本如此分化时一次性锁定全年价格更稳妥。",
      },
    ],
    source: {
      name: {
        en: "World Steel Association (worldsteel) — July 2026 crude steel production",
        zh: "世界钢铁协会《2026 年 7 月全球粗钢产量》",
      },
      url: "https://worldsteel.org/media/press-releases/2026/july-2026-crude-steel-production/",
      date: "2026-08-24",
    },
    /* 正文配图用按当期数据画的内联图，不用照片：
       照片池里 204 张几乎全部已被站内页面使用，而数据图是每期独有的。 */
    charts: [
      {
        after: 1,
        title: {
          en: "Crude steel output by region — July 2026 vs July 2025",
          zh: "粗钢产量分区域同比（2026 年 7 月 vs 2025 年 7 月）",
        },
        items: [
          { label: { en: "Africa", zh: "非洲" }, value: 6.1, text: "+6.1%" },
          { label: { en: "North America", zh: "北美" }, value: 4.9, text: "+4.9%" },
          { label: { en: "EU (27)", zh: "欧盟（27 国）" }, value: 3.8, text: "+3.8%" },
          { label: { en: "South America", zh: "南美" }, value: 2.8, text: "+2.8%" },
          { label: { en: "Russia, other CIS, Ukraine", zh: "俄罗斯及独联体、乌克兰" }, value: 2.2, text: "+2.2%" },
          { label: { en: "Asia and Oceania", zh: "亚洲与大洋洲" }, value: -1.2, text: "−1.2%" },
          { label: { en: "Middle East", zh: "中东" }, value: -13.4, text: "−13.4%" },
        ],
        note: {
          en: "Source: worldsteel, 70 reporting countries (about 98% of world output).",
          zh: "来源：世界钢铁协会，70 个报告国（约占全球产量 98%）。",
        },
      },
      {
        after: 2,
        title: {
          en: "The same pattern year to date — January–July 2026 vs 2025",
          zh: "1—7 月累计同比：分化格局一致",
        },
        items: [
          { label: { en: "Africa", zh: "非洲" }, value: 9.5, text: "+9.5%" },
          { label: { en: "Europe, other", zh: "欧洲其他（含土耳其、英国）" }, value: 5.5, text: "+5.5%" },
          { label: { en: "North America", zh: "北美" }, value: 5.4, text: "+5.4%" },
          { label: { en: "EU (27)", zh: "欧盟（27 国）" }, value: 0.4, text: "+0.4%" },
          { label: { en: "South America", zh: "南美" }, value: 0, text: "0.0%" },
          { label: { en: "Asia and Oceania", zh: "亚洲与大洋洲" }, value: -0.9, text: "−0.9%" },
          { label: { en: "Russia, other CIS, Ukraine", zh: "俄罗斯及独联体、乌克兰" }, value: -6.0, text: "−6.0%" },
          { label: { en: "Middle East", zh: "中东" }, value: -8.1, text: "−8.1%" },
        ],
      },
    ],
  },
  {
    slug: "container-freight-rates-sep-2026",
    date: "2026-09-10",
    publishAt: "2026-09-16",
    dateText: { en: "10 September 2026", zh: "2026 年 9 月 10 日" },
    category: "industry",
    image: "gallery/factory-14",
    imageW: 1200,
    imageH: 900,
    title: {
      en: "Container rates hold at $4,476 per 40ft for a second week",
      zh: "集装箱运价连续第二周持平于 4476 美元/40 英尺柜",
    },
    summary: {
      en: "Drewry's World Container Index stayed at $4,476 per 40ft container. Shanghai–Los Angeles rose 2% to $7,352 and Shanghai–New York 1% to $9,726, while Shanghai–Genoa fell 3% to $4,216 and Shanghai–Rotterdam 2% to $3,997.",
      zh: "Drewry 全球集装箱运价指数连续第二周持平于 4476 美元/40 英尺柜。上海—洛杉矶上涨 2% 至 7352 美元，上海—纽约上涨 1% 至 9726 美元；上海—热那亚下降 3% 至 4216 美元，上海—鹿特丹下降 2% 至 3997 美元。",
    },
    body: [
      {
        en: "Drewry's World Container Index (WCI) for 10 September 2026 held at USD 4,476 per 40ft container, unchanged for a second consecutive week. On the transpacific, Shanghai–Los Angeles rose 2% to USD 7,352 and Shanghai–New York edged up 1% to USD 9,726. On Asia–Europe, Shanghai–Genoa fell 3% to USD 4,216 and Shanghai–Rotterdam 2% to USD 3,997. Drewry expects rates to stay broadly flat next week.",
        zh: "Drewry 2026 年 9 月 10 日发布的全球集装箱运价指数（WCI）为 4476 美元/40 英尺柜，连续第二周持平。跨太平洋航线：上海—洛杉矶上涨 2% 至 7352 美元，上海—纽约上涨 1% 至 9726 美元；亚欧航线：上海—热那亚下降 3% 至 4216 美元，上海—鹿特丹下降 2% 至 3997 美元。Drewry 预计下周运价大体持平。",
      },
      {
        en: "Behind the flat headline, capacity is being managed rather than demanded. Eight blank sailings are announced for next week on the transpacific, up from seven this week, and three on Asia–Europe, up from one — carriers withdrawing capacity to hold rates. Shanghai port congestion improved from 94 hours in week 35 to 64 hours in week 36 but remains elevated. The Panama Canal Authority postponed a 0.15 m draft reduction for Neopanamax vessels, though transit restrictions stay in place, and the selective return of services to the Suez Canal is restoring effective capacity on Asia–Europe and pushing rates down. Iran–US tensions continue to disrupt shipping through the Strait of Hormuz.",
        zh: "持平的数字背后是运力管理，而不是需求拉动。跨太平洋航线下周公布的空班为 8 班，比本周的 7 班增加；亚欧航线 3 班，比本周的 1 班增加——船公司在撤运力撑运价。上海港拥堵从第 35 周的 94 小时降到第 36 周的 64 小时，但仍处高位。巴拿马运河管理局推迟了对新巴拿马型船 0.15 米吃水的削减，不过通行限制仍在；部分航线回归苏伊士运河，正在恢复亚欧航线的有效运力，对运价形成下行压力。伊朗与美国局势继续扰动霍尔木兹海峡的航运。",
      },
      {
        en: "What this means for buyers: freight is now the fastest-moving part of a landed cost, so it is worth quoting separately. First, because carriers are holding rates through capacity management, space rather than price is usually the binding constraint around month-end and in peak weeks — booking three to four weeks out protects a delivery date better than chasing the last few dollars off the rate. Second, with Shanghai congestion still well above normal, allow a buffer on the China loading side, and note that the validity period of a sea freight quote is normally far shorter than that of a casting quotation; printing both dates on the same offer avoids the usual argument later about which one expired first.",
        zh: "对采购方意味着什么：到岸成本里，海运这一段现在是变化最快的部分，值得单独列出来报价。一是船公司靠运力管理撑价，意味着月底与旺季里真正卡住的是舱位而不是运价——提前 3–4 周订舱，比为了砍掉最后一二十美元而拖延更能保住交期；二是上海港拥堵仍显著高于常态，从中国发货的计划要留出缓冲，同时注意海运报价的有效期通常远短于铸件报价的有效期，把两个日期写在同一份报价单上，可以避免事后争论哪一个先过期。",
      },
    ],
    source: {
      name: {
        en: "Drewry — World Container Index, 10 September 2026",
        zh: "Drewry 全球集装箱运价指数（2026 年 9 月 10 日）",
      },
      url: "https://www.drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index-assessed-by-drewry",
      date: "2026-09-10",
    },
    charts: [
      {
        after: 1,
        title: {
          en: "Freight per 40ft container by route — 10 September 2026",
          zh: "各航线运价（美元/40 英尺柜，2026 年 9 月 10 日）",
        },
        items: [
          { label: { en: "Shanghai–New York", zh: "上海—纽约" }, value: 9726, text: "$9,726" },
          { label: { en: "Shanghai–Los Angeles", zh: "上海—洛杉矶" }, value: 7352, text: "$7,352" },
          { label: { en: "WCI composite", zh: "WCI 综合指数" }, value: 4476, text: "$4,476" },
          { label: { en: "Shanghai–Genoa", zh: "上海—热那亚" }, value: 4216, text: "$4,216" },
          { label: { en: "Shanghai–Rotterdam", zh: "上海—鹿特丹" }, value: 3997, text: "$3,997" },
        ],
        note: {
          en: "Source: Drewry World Container Index, 10 September 2026.",
          zh: "来源：Drewry 世界集装箱运价指数，2026 年 9 月 10 日。",
        },
      },
      {
        after: 2,
        title: {
          en: "Week-on-week change by route",
          zh: "各航线周环比变化",
        },
        items: [
          { label: { en: "Shanghai–Los Angeles", zh: "上海—洛杉矶" }, value: 2, text: "+2%" },
          { label: { en: "Shanghai–New York", zh: "上海—纽约" }, value: 1, text: "+1%" },
          { label: { en: "Shanghai–Rotterdam", zh: "上海—鹿特丹" }, value: -2, text: "−2%" },
          { label: { en: "Shanghai–Genoa", zh: "上海—热那亚" }, value: -3, text: "−3%" },
        ],
        note: {
          en: "The composite index was unchanged for a second week; Drewry expects rates to stay flat next week.",
          zh: "综合指数连续第二周持平；Drewry 预计下周运价大体持平。",
        },
      },
    ],
  },
  {
    slug: "world-bank-energy-prices-sep-2026",
    date: "2026-09-02",
    dateText: { en: "2 September 2026", zh: "2026 年 9 月 2 日" },
    category: "industry",
    image: "gallery/factory-23",
    imageW: 1200,
    imageH: 900,
    title: {
      en: "World Bank: energy index up 8.8% in August, European gas at USD 21.11/mmBtu",
      zh: "世界银行：8 月能源价格指数上涨 8.8%，欧洲天然气均价 21.11 美元/百万英热单位",
    },
    summary: {
      en: "The World Bank's September Pink Sheet puts its energy price index up 8.8% in August, led by natural gas (+10.1%) and crude oil (+5.7%). European gas averaged USD 21.11/mmBtu against USD 2.77 in the United States; the metals index rose 4.0% while iron ore eased to USD 96.3/dmt.",
      zh: "世界银行 2026 年 9 月版 Pink Sheet：8 月能源价格指数上涨 8.8%，以天然气（+10.1%）和原油（+5.7%）为主；欧洲天然气均价 21.11 美元/百万英热单位，美国为 2.77 美元。金属价格指数上涨 4.0%，铁矿石回落至 96.3 美元/干吨。",
    },
    body: [
      {
        en: "The World Bank's September Pink Sheet, published on 2 September 2026 and covering August, shows its energy price index up 8.8% month on month, led by natural gas (+10.1%) and crude oil (+5.7%). The metals index gained 4.0%, food prices rose 1.4% and fertilizer prices eased 1.9%. European natural gas averaged USD 21.11 per million British thermal units in August, against USD 2.77 in the United States and USD 13.94 for LNG delivered to Japan. Australian coal averaged USD 135.2 a tonne, iron ore USD 96.3 a dry metric tonne and zinc USD 3,875 a tonne.",
        zh: "世界银行 2026 年 9 月版《大宗商品价格数据（Pink Sheet）》于 9 月 2 日发布，数据对应 8 月：当月能源价格指数环比上涨 8.8%，以天然气（+10.1%）和原油（+5.7%）为主；金属价格指数上涨 4.0%，食品价格上涨 1.4%，化肥价格下降 1.9%。8 月欧洲天然气均价 21.11 美元/百万英热单位，美国为 2.77 美元，日本进口 LNG 为 13.94 美元；澳大利亚煤炭均价 135.2 美元/吨，铁矿石 96.3 美元/干吨，锌 3875 美元/吨。",
      },
      {
        en: "Set against the 2025 annual averages in the same table, the levels have moved a long way. European gas at USD 21.11 is about 76% above its 2025 average of USD 11.96, and the energy index at 118.4 stands roughly 32% above its 2025 average of 90.0. The metals and minerals index at 146.2 is about 30% above its 112.2 average for 2025, and zinc at USD 3,875 is about 35% above last year's USD 2,868; iron ore went the other way, easing to USD 96.3 from a 2025 average of USD 100.2. The Pink Sheet reports monthly averages, so August's figures describe the month as a whole rather than a spot price on any single day.",
        zh: "对照同一张表里的 2025 年年度均价，各项目已移动了相当距离：8 月欧洲天然气 21.11 美元，比 2025 年均价 11.96 美元高约 76%；能源价格指数 118.4，比 2025 年均值 90.0 高约 32%；金属与矿产指数 146.2，比 2025 年均值 112.2 高约 30%；锌 3875 美元/吨，比 2025 年均价 2868 美元高约 35%。铁矿石反向走低，从 2025 年均价 100.2 美元/干吨降至 96.3 美元/干吨。Pink Sheet 记录的是月均价，因此 8 月数据代表整月水平，而不是某一天的现货价。",
      },
      {
        en: "What this means for buyers: energy is now the widest single gap between producing regions, and it lands on the two process steps a casting price cannot avoid — melting and heat treatment. European gas at more than seven times the US price does not by itself set a casting price, but it is a real and moving part of the cost base behind European quotes, so a buyer sourcing in Europe should ask which energy assumption a quotation carries and whether an energy surcharge applies. The same table also argues against treating metal as one number: iron ore eased while base metals rose, so a re-quote is worth checking against the specific index a supplier names — pig iron, scrap or zinc — rather than against steel prices in general. Finally, mind the timing: the Pink Sheet is a monthly average published about two weeks after the month it covers, so a quote citing current energy costs is usually citing data that is already a month old.",
        zh: "对采购方意味着什么：能源已成为各产区之间最大的一项单项差距，而它恰好落在铸件成本绕不开的两道工序上——熔炼与热处理。欧洲天然气价格是美国的七倍以上，这本身不决定铸件价格，但它是欧洲报价成本基础中真实且在变动的一部分；从欧洲采购时，应问清报价采用的是哪一档能源假设、是否附带能源附加费。同一张表也说明不宜把金属当成一个笼统的数字：铁矿石在回落、基本金属在上涨，供应商重新报价时，值得对照其明确引用的具体指数（生铁、废钢或锌），而不是笼统的钢价。另外要注意时点：Pink Sheet 是月均价、在月末约两周后发布，因此一份引用“当前能源成本”的报价，引用的通常已是一个月前的数据。",
      },
    ],
    source: [
      {
        name: {
          en: "World Bank — Commodity Markets: Pink Sheet, September 2026",
          zh: "世界银行《大宗商品价格数据（Pink Sheet）》2026 年 9 月版",
        },
        url: "https://thedocs.worldbank.org/en/doc/74e8be41ceb20fa0da750cda2f6b9e4e-0050012026/related/CMO-Pink-Sheet-September-2026.pdf",
        date: "2026-09-02",
      },
      {
        name: {
          en: "World Bank — Commodity Markets: latest commodity prices (2 September 2026)",
          zh: "世界银行 Commodity Markets：最新大宗商品价格（2026 年 9 月 2 日）",
        },
        url: "https://www.worldbank.org/en/research/commodity-markets",
        date: "2026-09-02",
      },
    ],
    charts: [
      {
        after: 1,
        title: {
          en: "Natural gas prices, August 2026 average (USD per million Btu)",
          zh: "天然气价格：2026 年 8 月均价（美元/百万英热单位）",
        },
        items: [
          { label: { en: "Europe — August 2026", zh: "欧洲—2026 年 8 月" }, value: 21.11, text: "21.11" },
          { label: { en: "LNG, Japan — August 2026", zh: "日本 LNG—2026 年 8 月" }, value: 13.94, text: "13.94" },
          { label: { en: "Europe — 2025 average", zh: "欧洲—2025 年均价" }, value: 11.96, text: "11.96" },
          { label: { en: "United States — August 2026", zh: "美国—2026 年 8 月" }, value: 2.77, text: "2.77" },
        ],
        note: {
          en: "Source: World Bank Pink Sheet, September 2026 (August 2026 monthly averages; the 2025 row is the annual average).",
          zh: "来源：世界银行 Pink Sheet，2026 年 9 月版（2026 年 8 月均价；2025 年为年度均价）。",
        },
      },
      {
        after: 2,
        title: {
          en: "World Bank price measures, change in August 2026 (month on month)",
          zh: "世界银行价格指标：2026 年 8 月环比变化",
        },
        items: [
          { label: { en: "Natural gas", zh: "天然气" }, value: 10.1, text: "+10.1%" },
          { label: { en: "Energy index", zh: "能源价格指数" }, value: 8.8, text: "+8.8%" },
          { label: { en: "Precious metals", zh: "贵金属" }, value: 8.8, text: "+8.8%" },
          { label: { en: "Crude oil", zh: "原油" }, value: 5.7, text: "+5.7%" },
          { label: { en: "Metals", zh: "金属" }, value: 4.0, text: "+4.0%" },
          { label: { en: "Food", zh: "食品" }, value: 1.4, text: "+1.4%" },
          { label: { en: "Fertilizers", zh: "化肥" }, value: -1.9, text: "−1.9%" },
        ],
        note: {
          en: "Source: World Bank, Commodity Markets — latest commodity prices, published 2 September 2026.",
          zh: "来源：世界银行 Commodity Markets，2026 年 9 月 2 日发布的最新大宗商品价格说明。",
        },
      },
    ],
  },
  {
    slug: "us-rebar-duties-bulgaria-egypt-vietnam",
    date: "2026-09-18",
    dateText: { en: "18 September 2026", zh: "2026 年 9 月 18 日" },
    category: "industry",
    image: "gallery/factory-19",
    imageW: 1200,
    imageH: 900,
    title: {
      en: "US issues final rebar duties of up to 136.57% on Bulgaria, Egypt and Vietnam",
      zh: "美国对保加利亚、埃及、越南螺纹钢发布终裁：反倾销税率最高 136.57%",
    },
    summary: {
      en: "Commerce published final antidumping and countervailing duty orders on steel concrete reinforcing bar from Bulgaria, Egypt and Vietnam on 18 September 2026. Dumping margins run from 34.20% for Egypt's Ezz Group to 136.57% for Vietnam's all-others rate, with subsidy rates of 23.27% for Egypt and 6.80% for Vietnam.",
      zh: "美国商务部于 2026 年 9 月 18 日对保加利亚、埃及、越南的混凝土用钢筋（螺纹钢）发布反倾销与反补贴终裁命令。反倾销加权平均税率自埃及 Ezz 集团的 34.20% 到越南全国统一税率的 136.57%；反补贴税率为埃及 23.27%、越南 6.80%。",
    },
    body: [
      {
        en: "The US Department of Commerce published final orders on 18 September 2026 covering steel concrete reinforcing bar (rebar) from Bulgaria, Egypt and Vietnam, after the US International Trade Commission determined on 11 September that a domestic industry is materially injured by reason of dumped imports. The antidumping orders set weighted-average dumping margins of 53.27% for Bulgaria; 34.20% for Egypt's Ezz Group and for all other Egyptian producers, with 52.73% for El Marakby Steel and Suez Steel; and 128.53% for Vietnam's Hoa Phat group, with a country-wide rate of 136.57% for all other Vietnamese exporters. Companion countervailing duty orders issued the same day set subsidy rates of 23.27% for Egypt and 6.80% for Vietnam. There is no countervailing duty case on rebar from Bulgaria.",
        zh: "美国商务部于 2026 年 9 月 18 日发布终裁命令，对来自保加利亚、埃及和越南的混凝土用钢筋（螺纹钢）征收反倾销税。此前，美国国际贸易委员会于 9 月 11 日认定国内产业因倾销进口受到实质损害。反倾销加权平均税率为：保加利亚 53.27%；埃及 Ezz 集团及其他埃及生产商 34.20%，El Marakby Steel 与 Suez Steel 为 52.73%；越南和发集团（Hoa Phat）128.53%，其他越南出口商适用全国统一税率 136.57%。同日发布的反补贴命令税率为埃及 23.27%、越南 6.80%；保加利亚没有对应的反补贴案。",
      },
      {
        en: "Two details sit underneath the headline rates. First, Vietnam is the outlier by a wide margin: after adjustment for export subsidy offsets, the cash deposit rate is 123.49% for the Hoa Phat group and 131.53% for the Vietnam-wide entity, against 53.27% for Bulgaria and 34.20% for most Egyptian producers. Second, timing: the provisional measures in the antidumping cases ran from 13 March 2026 and expired on 8 September, so rebar entered between 9 September and publication of the ITC's final injury determination is liquidated without antidumping duties, while suspension of liquidation and cash deposits resume from publication of that determination; in the countervailing duty cases the provisional measures ended on 13 May 2026. Egypt's two largest mills, El Marakby Steel and Suez Steel, received rates based on facts available with adverse inferences.",
        zh: "在总体税率之外，还有两个细节。一是越南明显高出其他两国：按出口补贴抵扣调整后，和发集团的现金保证金税率为 123.49%，越南全国实体为 131.53%，而保加利亚为 53.27%、埃及大部分生产商为 34.20%。二是时间口径：反倾销案的临时措施自 2026 年 3 月 13 日起实施、9 月 8 日到期，因此在 9 月 9 日至美国国际贸易委员会终裁公告发布日之间报关的货物不征收反倾销税，清算中止与现金保证金的恢复自该终裁公告发布之日起；反补贴案的临时措施于 2026 年 5 月 13 日结束。埃及两家主要钢厂 El Marakby Steel 与 Suez Steel 的税率基于可获得的不利事实确定。",
      },
      {
        en: "What this means for buyers: margins running from 34.20% to 136.57% across three origins change where US-bound rebar can come from, and they change landed cost at once rather than gradually. Buyers outside the United States should read the orders as a diversion signal — tonnes that would have gone to the US now look for other outlets, which adds supply to the EU (Bulgaria is an EU producer) as well as to Middle Eastern and Asian markets, and tends to soften rebar pricing there. On the parts you buy, the practical step is to ask the supplier to name the origin of the steel, give the HS or HTS code and confirm in writing whether a duty order covers the product, so that duty exposure appears in the quotation as a line item instead of surfacing at customs.",
        zh: "对采购方意味着什么：三个来源地 34.20% 至 136.57% 的反倾销税率会改变美国市场螺纹钢的来源结构，到岸成本的变化是即时的而不是渐进的。对美国以外的买家，更值得关注的是贸易转向：原本销往美国的资源要寻找其他出路，会增加欧盟（保加利亚本身是欧盟生产国）、中东与亚洲市场的供应，通常对这些地区的螺纹钢价格形成下行压力。落到自己采购的零件上，做法还是一样：要求供应商说明钢材的原产地、提供 HS/HTS 编码，并以书面形式确认该产品是否被某项贸易措施覆盖，让关税敞口以一条明确的报价条目出现，而不是到清关时才浮现。",
      },
    ],
    source: [
      {
        name: {
          en: "Federal Register — Steel Concrete Reinforcing Bar From Bulgaria, Egypt, and the Socialist Republic of Vietnam: Antidumping Duty Orders (18 September 2026)",
          zh: "美国《联邦公报》——保加利亚、埃及、越南混凝土用钢筋反倾销税命令（2026 年 9 月 18 日）",
        },
        url: "https://www.federalregister.gov/documents/2026/09/18/2026-19102/steel-concrete-reinforcing-bar-from-bulgaria-egypt-and-the-socialist-republic-of-vietnam-antidumping",
        date: "2026-09-18",
      },
      {
        name: {
          en: "Federal Register — Steel Concrete Reinforcing Bar From the Socialist Republic of Vietnam and Egypt: Countervailing Duty Orders (18 September 2026)",
          zh: "美国《联邦公报》——越南、埃及混凝土用钢筋反补贴税命令（2026 年 9 月 18 日）",
        },
        url: "https://www.federalregister.gov/documents/2026/09/18/2026-19103/steel-concrete-reinforcing-bar-from-the-socialist-republic-of-vietnam-and-egypt-countervailing-duty",
        date: "2026-09-18",
      },
    ],
    charts: [
      {
        after: 1,
        title: {
          en: "US antidumping margins on rebar, final orders of 18 September 2026",
          zh: "美国螺纹钢反倾销终裁税率（2026 年 9 月 18 日）",
        },
        items: [
          { label: { en: "Vietnam, all other exporters", zh: "越南：其他出口商" }, value: 136.57, text: "136.57%" },
          { label: { en: "Vietnam, Hoa Phat group", zh: "越南：和发集团" }, value: 128.53, text: "128.53%" },
          { label: { en: "Bulgaria, all exporters", zh: "保加利亚：全部出口商" }, value: 53.27, text: "53.27%" },
          { label: { en: "Egypt, El Marakby / Suez Steel", zh: "埃及：El Marakby / Suez Steel" }, value: 52.73, text: "52.73%" },
          { label: { en: "Egypt, Ezz Group and all others", zh: "埃及：Ezz 集团及其他企业" }, value: 34.2, text: "34.20%" },
        ],
        note: {
          en: "Source: Federal Register, 18 September 2026 (cases A-487-002, A-729-805, A-552-853). The 52.73% rate is based on facts available with adverse inferences.",
          zh: "来源：美国《联邦公报》2026 年 9 月 18 日（案号 A-487-002、A-729-805、A-552-853）。52.73% 为基于可获得的不利事实确定的税率。",
        },
      },
      {
        after: 2,
        title: {
          en: "Combined antidumping and countervailing duty rates by origin",
          zh: "各来源地反倾销与反补贴税率合计",
        },
        items: [
          { label: { en: "Vietnam, all other exporters", zh: "越南：其他出口商" }, value: 143.37, text: "143.37%" },
          { label: { en: "Vietnam, Hoa Phat group", zh: "越南：和发集团" }, value: 135.33, text: "135.33%" },
          { label: { en: "Egypt, El Marakby / Suez Steel", zh: "埃及：El Marakby / Suez Steel" }, value: 76, text: "76.00%" },
          { label: { en: "Egypt, Ezz Group and all others", zh: "埃及：Ezz 集团及其他企业" }, value: 57.47, text: "57.47%" },
          { label: { en: "Bulgaria, all exporters", zh: "保加利亚：全部出口商" }, value: 53.27, text: "53.27%" },
        ],
        note: {
          en: "Sum of the weighted-average dumping margin and the subsidy rate published in the two orders of 18 September 2026; Bulgaria has no countervailing duty order.",
          zh: "为 2026 年 9 月 18 日两项命令中反倾销加权平均税率与反补贴税率的合计；保加利亚无反补贴命令。",
        },
      },
    ],
  },
  {
    slug: "container-rates-golden-week-sep-2026",
    date: "2026-09-24",
    dateText: { en: "24 September 2026", zh: "2026 年 9 月 24 日" },
    category: "industry",
    image: "gallery/factory-18",
    imageW: 1200,
    imageH: 900,
    title: {
      en: "Drewry index slips 1% to $4,468 per 40ft as carriers pull sailings before Golden Week",
      zh: "Drewry 运价指数回落 1% 至 4468 美元/40 英尺柜：船公司抢在黄金周前撤运力",
    },
    summary: {
      en: "Drewry's World Container Index fell 1% to USD 4,468 per 40ft container on 24 September 2026. Shanghai–Los Angeles rose 2% to $7,838 and Shanghai–New York held at $10,373, while Shanghai–Genoa fell 5% to $3,835 and Shanghai–Rotterdam 4% to $3,485. Carriers have announced 15 blank sailings on the transpacific for next week, up from nine.",
      zh: "Drewry 2026 年 9 月 24 日全球集装箱运价指数下降 1% 至 4468 美元/40 英尺柜。上海—洛杉矶上涨 2% 至 7838 美元，上海—纽约持平于 10,373 美元；上海—热那亚下降 5% 至 3835 美元，上海—鹿特丹下降 4% 至 3485 美元。跨太平洋航线下周公布的空班增至 15 班，本周为 9 班。",
    },
    body: [
      {
        en: "Drewry's World Container Index (WCI) fell 1% to USD 4,468 per 40ft container in its assessment for Thursday 24 September 2026, with the decline coming from the Asia–Europe trade. On the transpacific, Shanghai–Los Angeles rose 2% to USD 7,838 per 40ft container and Shanghai–New York held flat at USD 10,373. On Asia–Europe, Shanghai–Genoa fell 5% to USD 3,835 and Shanghai–Rotterdam 4% to USD 3,485. Drewry expects rates to decrease again next week ahead of China's Golden Week holiday in early October.",
        zh: "Drewry 全球集装箱运价指数（WCI）2026 年 9 月 24 日（周四）的评估值为 4468 美元/40 英尺柜，环比下降 1%，降幅来自亚欧航线。跨太平洋航线：上海—洛杉矶上涨 2% 至 7838 美元/40 英尺柜，上海—纽约持平于 10,373 美元。亚欧航线：上海—热那亚下降 5% 至 3835 美元，上海—鹿特丹下降 4% 至 3485 美元。Drewry 预计，随着中国黄金周假期在 10 月初临近，下周运价将继续下行。",
      },
      {
        en: "Capacity rather than demand is setting the tone. Drewry's Container Capacity Insight shows 15 blank sailings announced for next week on the transpacific, up from nine this week, and seven on Asia–Europe, up from three. Suez Canal transits rose from 41 in week 37 to 48 in week 38, restoring effective capacity on Asia–Europe even as carriers withdraw sailings — Drewry expects that recovery to outweigh the blank sailings and push Asia–Europe rates down again. The same commentary flags low water levels on the Rhine and labour disruption in Germany as continuing constraints on European supply chains, with Panama Canal capacity still restricted and Middle East tensions an open risk.",
        zh: "当前主导走势的是运力而不是需求。Drewry 的集装箱运力洞察显示，跨太平洋航线下周公布的空班为 15 班，高于本周的 9 班；亚欧航线为 7 班，高于本周的 3 班。苏伊士运河通行量从第 37 周的 41 班增至第 38 周的 48 班，在船公司撤运力的同时恢复了亚欧航线的有效运力——Drewry 认为这一恢复的影响将超过空班，使亚欧运价继续走低。同一份评论还指出，莱茵河低水位与德国的劳工中断仍在制约欧洲供应链，巴拿马运河通行能力依旧受限，中东局势仍是未消的风险。",
      },
      {
        en: "What this means for buyers — our assessment: the direction of the index matters less than the reason behind it. Carriers are withdrawing 15 transpacific and seven Asia–Europe sailings next week, so the scarce item around Golden Week and the two weeks after it is space rather than the rate itself; booking two to three weeks ahead usually costs less than letting the delivery date slip. Because Drewry expects further declines into October, a shorter validity on the ocean leg plus a re-quote window before the vessel cuts tends to beat locking a number today. For European delivery, build buffer into the German and Rhine inland legs, and carry freight as its own line on the quotation so a falling spot rate can be passed through instead of disappearing inside the casting price.",
        zh: "对采购方意味着什么（我们的判断）：指数的方向不如它背后的原因重要。船公司下周在跨太平洋与亚欧航线分别撤掉 15 班和 7 班运力，因此黄金周前后两周真正稀缺的是舱位，而不是运价本身——提前 2–3 周订舱，通常比让交期往后拖更划算。由于 Drewry 预计 10 月运价继续下行，海运段采用较短的有效期，并在开船前保留可复核的重新报价窗口，往往优于今天一次性锁价。交付到欧洲的订单，要为德国境内与莱茵河段预留缓冲；报价时把海运单独列成一行，运价下行才能传导出去，而不是消失在铸件价格里。",
      },
    ],
    source: {
      name: {
        en: "Drewry — World Container Index, assessed 24 September 2026",
        zh: "Drewry 全球集装箱运价指数（2026 年 9 月 24 日评估值）",
      },
      url: "https://www.drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index-assessed-by-drewry",
      date: "2026-09-24",
    },
    charts: [
      {
        after: 1,
        title: {
          en: "Container freight rates from Shanghai — 24 September 2026 (USD per 40ft)",
          zh: "上海出发主要航线运价（美元/40 英尺柜，2026 年 9 月 24 日）",
        },
        items: [
          { label: { en: "Shanghai–New York", zh: "上海—纽约" }, value: 10373, text: "$10,373" },
          { label: { en: "Shanghai–Los Angeles", zh: "上海—洛杉矶" }, value: 7838, text: "$7,838" },
          { label: { en: "WCI composite", zh: "WCI 综合指数" }, value: 4468, text: "$4,468" },
          { label: { en: "Shanghai–Genoa", zh: "上海—热那亚" }, value: 3835, text: "$3,835" },
          { label: { en: "Shanghai–Rotterdam", zh: "上海—鹿特丹" }, value: 3485, text: "$3,485" },
        ],
        note: {
          en: "Source: Drewry World Container Index, assessed 24 September 2026.",
          zh: "来源：Drewry 世界集装箱运价指数，2026 年 9 月 24 日评估值。",
        },
      },
      {
        after: 2,
        title: {
          en: "Week-on-week change by route, 24 September 2026",
          zh: "各航线周环比变化（2026 年 9 月 24 日）",
        },
        items: [
          { label: { en: "Shanghai–Los Angeles", zh: "上海—洛杉矶" }, value: 2, text: "+2%" },
          { label: { en: "Shanghai–New York", zh: "上海—纽约" }, value: 0, text: "0%" },
          { label: { en: "WCI composite", zh: "WCI 综合指数" }, value: -1, text: "−1%" },
          { label: { en: "Shanghai–Rotterdam", zh: "上海—鹿特丹" }, value: -4, text: "−4%" },
          { label: { en: "Shanghai–Genoa", zh: "上海—热那亚" }, value: -5, text: "−5%" },
        ],
        note: {
          en: "Blank sailings announced for next week: 15 on the transpacific (nine this week) and seven on Asia–Europe (three this week).",
          zh: "下周公布的空班：跨太平洋 15 班（本周 9 班），亚欧 7 班（本周 3 班）。",
        },
      },
    ],
  },
  {
    slug: "eu-industrial-production-jul-2026",
    date: "2026-09-16",
    dateText: { en: "16 September 2026", zh: "2026 年 9 月 16 日" },
    category: "industry",
    image: "process/machining-6",
    imageW: 1200,
    imageH: 900,
    title: {
      en: "Eurostat: EU industrial output up 0.3% year on year as capital goods lead",
      zh: "Eurostat：欧盟 7 月工业生产同比微增 0.3%，资本品领涨",
    },
    summary: {
      en: "Eurostat's first estimate for July 2026 puts euro area industrial production down 0.1% from June and EU output down 0.3%. Year on year the euro area was flat and the EU up 0.3%, with capital goods output up 2.4% in the EU against a 3.2% fall in non-durable consumer goods.",
      zh: "Eurostat 2026 年 7 月初值：欧元区工业生产环比下降 0.1%，欧盟下降 0.3%；同比欧元区持平、欧盟增长 0.3%。欧盟资本品产出同比增长 2.4%，非耐用消费品下降 3.2%。",
    },
    body: [
      {
        en: "Eurostat's first estimate, published on 16 September 2026, puts euro area industrial production in July 2026 down 0.1% from June and EU production down 0.3%, after both fell 0.1% in June. Year on year, euro area output was unchanged and EU output up 0.3%. Inside the euro area, capital goods output rose 0.5% on the month and 1.7% on the year, while non-durable consumer goods fell 1.6% month on month and 4.5% year on year.",
        zh: "Eurostat 于 2026 年 9 月 16 日发布初值：2026 年 7 月欧元区工业生产环比下降 0.1%，欧盟下降 0.3%；两者 6 月均为下降 0.1%。同比看，欧元区持平，欧盟增长 0.3%。欧元区内部，资本品产出环比增长 0.5%、同比增长 1.7%；非耐用消费品环比下降 1.6%、同比下降 4.5%。",
      },
      {
        en: "Across the EU the split is wider: capital goods output rose 2.4% year on year and energy 2.5%, against intermediate goods at +0.4% and non-durable consumer goods at −3.2%. Monthly moves diverged by country — Denmark −4.2%, Bulgaria −2.9% and Lithuania −2.4% against Luxembourg +4.5%, Croatia +3.9% and Ireland +2.6%. On the 2021 = 100 base, the EU index stood at 100.3 in July and the euro area at 98.3, with Germany at 90.5 and Italy at 94.2; German output was down 2.2% year on year. The Netherlands led annual gains at +8.2%, while Bulgaria (−6.8%), Romania (−6.3%) and Belgium (−5.6%) fell furthest. Eurostat publishes the next estimate on 15 October 2026.",
        zh: "欧盟整体的分化更明显：资本品产出同比增长 2.4%、能源增长 2.5%，中间品为 +0.4%，非耐用消费品为 −3.2%。环比变动在成员国之间差异很大——丹麦 −4.2%、保加利亚 −2.9%、立陶宛 −2.4%，而卢森堡 +4.5%、克罗地亚 +3.9%、爱尔兰 +2.6%。以 2021 年 = 100 为基期，7 月欧盟指数为 100.3、欧元区为 98.3，德国 90.5、意大利 94.2；德国产出同比下降 2.2%。同比涨幅最大的是荷兰（+8.2%），跌幅最大的是保加利亚（−6.8%）、罗马尼亚（−6.3%）与比利时（−5.6%）。Eurostat 将于 2026 年 10 月 15 日发布下一次数据。",
      },
      {
        en: "What this means for buyers — our assessment: capital goods are the strongest part of European manufacturing and consumer-facing production the weakest, and the castings we ship sit mainly in the capital-goods chain — machine-tool beds, pump and valve housings, counterweights. A flat EU total with capital goods 2.4% higher year on year points to European demand for machined castings that is holding rather than expanding, which argues for keeping a European and an imported option live in the same quotation cycle instead of switching over entirely. For lead-time planning the base-year comparison is the more useful number: with German output at 90.5 and Italian output at 94.2 against a 2021 base of 100, European foundry capacity is not stretched, so local lead times look unlikely to move sharply either way. Actual lead times and prices still have to be confirmed against each supplier's own booking level rather than a national index.",
        zh: "对采购方意味着什么（我们的判断）：资本品是欧洲制造业中相对最强的部分，面向消费的产出最弱，而我们交付的铸件大多处在资本品链条上——机床床身、泵阀壳体、配重件。欧盟总量平稳、资本品同比增长 2.4%，说明欧洲对加工铸件的需求是维持而非扩张，这支持在同一个比价周期里同时保留欧洲本地与进口两个选项，而不是整体切换。做交期规划时，基期对比更有参考价值：德国产出为基期 100 的 90.5、意大利为 94.2，说明欧洲铸造产能并未被拉满，本地交期大幅波动的可能性不大。具体交期与价格仍要以各供应商自身的接单情况为准，不能只看一国指数。",
      },
    ],
    source: {
      name: {
        en: "Eurostat — Industrial production down by 0.1% in the euro area and by 0.3% in the EU (16 September 2026)",
        zh: "Eurostat《欧元区工业生产下降 0.1%、欧盟下降 0.3%》（2026 年 9 月 16 日）",
      },
      url: "https://ec.europa.eu/eurostat/en/web/products-euro-indicators/w/4-16092026-ap",
      date: "2026-09-16",
    },
    charts: [
      {
        after: 1,
        title: {
          en: "EU industrial production, July 2026 vs July 2025, by main industrial grouping",
          zh: "欧盟工业生产同比变化（2026 年 7 月 vs 2025 年 7 月，按主要工业组别）",
        },
        items: [
          { label: { en: "Energy", zh: "能源" }, value: 2.5, text: "+2.5%" },
          { label: { en: "Capital goods", zh: "资本品" }, value: 2.4, text: "+2.4%" },
          { label: { en: "Intermediate goods", zh: "中间品" }, value: 0.4, text: "+0.4%" },
          { label: { en: "Total industry", zh: "工业总计" }, value: 0.3, text: "+0.3%" },
          { label: { en: "Durable consumer goods", zh: "耐用消费品" }, value: -0.5, text: "−0.5%" },
          { label: { en: "Non-durable consumer goods", zh: "非耐用消费品" }, value: -3.2, text: "−3.2%" },
        ],
        note: {
          en: "Source: Eurostat, first estimate published 16 September 2026 (calendar adjusted).",
          zh: "来源：Eurostat，2026 年 9 月 16 日发布的初值（经日历调整）。",
        },
      },
      {
        after: 2,
        title: {
          en: "Industrial production, July 2026 vs July 2025 — selected EU Member States",
          zh: "工业生产同比变化（2026 年 7 月 vs 2025 年 7 月，部分欧盟成员国）",
        },
        items: [
          { label: { en: "Netherlands", zh: "荷兰" }, value: 8.2, text: "+8.2%" },
          { label: { en: "Croatia", zh: "克罗地亚" }, value: 7.2, text: "+7.2%" },
          { label: { en: "Lithuania", zh: "立陶宛" }, value: 6.5, text: "+6.5%" },
          { label: { en: "Poland", zh: "波兰" }, value: 4.3, text: "+4.3%" },
          { label: { en: "Italy", zh: "意大利" }, value: 0, text: "0.0%" },
          { label: { en: "Germany", zh: "德国" }, value: -2.2, text: "−2.2%" },
          { label: { en: "Belgium", zh: "比利时" }, value: -5.6, text: "−5.6%" },
          { label: { en: "Romania", zh: "罗马尼亚" }, value: -6.3, text: "−6.3%" },
          { label: { en: "Bulgaria", zh: "保加利亚" }, value: -6.8, text: "−6.8%" },
        ],
        note: {
          en: "Calendar adjusted. Euro area total 0.0%, EU total +0.3%.",
          zh: "经日历调整。欧元区整体 0.0%，欧盟整体 +0.3%。",
        },
      },
    ],
  },
  {
    slug: "global-crude-steel-august-2026",
    date: "2026-09-24",
    dateText: { en: "24 September 2026", zh: "2026 年 9 月 24 日" },
    category: "industry",
    image: "process/pouring-4",
    imageW: 1200,
    imageH: 900,
    title: {
      en: "worldsteel: August crude steel output down 1.2% as the gains shift to Africa and North America",
      zh: "世界钢铁协会：8 月全球粗钢产量同比下降 1.2%，增量转向非洲与北美",
    },
    summary: {
      en: "worldsteel reports 144.2 Mt of crude steel in August 2026, down 1.2% year on year, and 1,225.2 Mt for January–August, down 0.7%. Africa rose 8.8% and North America 3.9%; Asia and Oceania, about 74% of the month's total, fell 1.4%. Viet Nam was the fastest-growing top-ten producer at +36.4%.",
      zh: "世界钢铁协会：2026 年 8 月全球粗钢产量 1.442 亿吨，同比下降 1.2%；1—8 月累计 12.252 亿吨，同比下降 0.7%。非洲增长 8.8%、北美增长 3.9%；占当月总量约 74% 的亚洲与大洋洲下降 1.4%。前十产钢国中越南增幅最大，达 36.4%。",
    },
    body: [
      {
        en: "The World Steel Association (worldsteel) reported on 24 September that crude steel production in the 70 countries it tracks was 144.2 million tonnes in August 2026, a 1.2% decrease from August 2025. For January to August the total was 1,225.2 Mt, down 0.7% year on year. The 70 reporting countries accounted for about 98% of world crude steel production in 2025.",
        zh: "世界钢铁协会于 2026 年 9 月 24 日发布数据：向其报告的 70 个国家 8 月粗钢产量 1.442 亿吨，比 2025 年 8 月减少 1.2%；1—8 月累计 12.252 亿吨，同比下降 0.7%。这 70 个报告国的产量约占 2025 年全球粗钢产量的 98%。",
      },
      {
        en: "The split is regional. Africa produced 2.1 Mt in August, up 8.8% year on year, and North America 9.4 Mt, up 3.9%, while South America fell 4.9% to 3.4 Mt and Russia, other CIS countries and Ukraine dropped 5.6% to 6.3 Mt. Asia and Oceania, at 106.7 Mt, still made up about 74% of the month's total and slipped 1.4%. By country, China produced 74.6 Mt, down 3.7%, and India 14.8 Mt, up 4.6%; Viet Nam posted the sharpest gain in the top ten, up 36.4% to 2.7 Mt. Year to date the same pattern holds: Africa +9.4% and North America +5.2%, against the Middle East at −7.8% and Russia, other CIS and Ukraine at −5.7%.",
        zh: "分化仍发生在区域层面。8 月非洲产量 210 万吨，同比增长 8.8%；北美 940 万吨，增长 3.9%；南美下降 4.9% 至 340 万吨，俄罗斯及其他独联体国家与乌克兰下降 5.6% 至 630 万吨。占当月全球约 74% 的亚洲与大洋洲为 1.067 亿吨，下降 1.4%。分国家看，中国 7460 万吨、下降 3.7%，印度 1480 万吨、增长 4.6%；前十中越南增幅最大，增长 36.4% 至 270 万吨。1—8 月累计延续同一格局：非洲 +9.4%、北美 +5.2%，而中东 −7.8%、俄罗斯及其他独联体国家与乌克兰 −5.7%。",
      },
      {
        en: "What this means for buyers — our assessment: the headline total is drifting down slowly, so there is no broad shortage behind it, but the mix underneath keeps moving, and that is what reaches a quotation. Africa and North America are adding tonnage while the Middle East, South America and most of the CIS are cutting it, which means the cost base behind a regional quote — energy, scrap and coke, inland freight — is moving at different speeds from one supplier region to the next. Viet Nam's 36.4% increase is worth noting for a different reason: it points to new export capacity in Southeast Asia, so it is a region worth adding to a bid list rather than treating as a fallback. Practically, that argues for keeping two clocks separate on an offer — a validity window for the casting price and a separate one for sea freight, because they do not expire at the same speed.",
        zh: "对采购方意味着什么（我们的判断）：总量在缓慢下滑，说明背后并没有全面短缺，但底下这块结构一直在移动，而真正进入报价的正是这个结构。非洲与北美在增产，中东、南美与独联体多数地区在减产，这意味着各产区报价背后的成本基础——能源、废钢与焦炭、内陆运费——变化速度并不一致。越南 36.4% 的增幅则值得从另一个角度看：它指向东南亚新增的出口产能，值得放进比价名单，而不只是当作备选。落到操作上，建议把铸件价格的有效期与海运费的有效期分开写在同一份报价里，因为两者的变化节奏并不相同。",
      },
    ],
    source: {
      name: {
        en: "World Steel Association (worldsteel) — August 2026 crude steel production",
        zh: "世界钢铁协会《2026 年 8 月全球粗钢产量》",
      },
      url: "https://worldsteel.org/media/press-releases/2026/august-2026-crude-steel-production/",
      date: "2026-09-24",
    },
    charts: [
      {
        after: 1,
        title: {
          en: "Crude steel output by region — August 2026 vs August 2025",
          zh: "粗钢产量分区域同比（2026 年 8 月 vs 2025 年 8 月）",
        },
        items: [
          { label: { en: "Africa", zh: "非洲" }, value: 8.8, text: "+8.8%" },
          { label: { en: "North America", zh: "北美" }, value: 3.9, text: "+3.9%" },
          { label: { en: "Europe, other", zh: "欧洲其他（含土耳其、英国）" }, value: 1.2, text: "+1.2%" },
          { label: { en: "EU (27)", zh: "欧盟（27 国）" }, value: -1.0, text: "−1.0%" },
          { label: { en: "Asia and Oceania", zh: "亚洲与大洋洲" }, value: -1.4, text: "−1.4%" },
          { label: { en: "Middle East", zh: "中东" }, value: -4.6, text: "−4.6%" },
          { label: { en: "South America", zh: "南美" }, value: -4.9, text: "−4.9%" },
          { label: { en: "Russia, other CIS, Ukraine", zh: "俄罗斯及独联体、乌克兰" }, value: -5.6, text: "−5.6%" },
        ],
        note: {
          en: "Source: worldsteel, 70 reporting countries (about 98% of world output in 2025).",
          zh: "来源：世界钢铁协会，70 个报告国（约占 2025 年全球产量 98%）。",
        },
      },
      {
        after: 2,
        title: {
          en: "Top ten steel-producing countries — August 2026 vs August 2025",
          zh: "前十产钢国同比（2026 年 8 月 vs 2025 年 8 月）",
        },
        items: [
          { label: { en: "Viet Nam", zh: "越南" }, value: 36.4, text: "+36.4%" },
          { label: { en: "India", zh: "印度" }, value: 4.6, text: "+4.6%" },
          { label: { en: "United States (e)", zh: "美国（估计值）" }, value: 3.0, text: "+3.0%" },
          { label: { en: "South Korea", zh: "韩国" }, value: 2.6, text: "+2.6%" },
          { label: { en: "Germany", zh: "德国" }, value: 1.7, text: "+1.7%" },
          { label: { en: "Japan", zh: "日本" }, value: 0.4, text: "+0.4%" },
          { label: { en: "Russia (e)", zh: "俄罗斯（估计值）" }, value: -0.3, text: "−0.3%" },
          { label: { en: "Türkiye", zh: "土耳其" }, value: -0.4, text: "−0.4%" },
          { label: { en: "China", zh: "中国" }, value: -3.7, text: "−3.7%" },
          { label: { en: "Brazil", zh: "巴西" }, value: -6.2, text: "−6.2%" },
        ],
        note: {
          en: "Source: worldsteel. (e) = estimated. Ranking by year-to-date tonnage.",
          zh: "来源：世界钢铁协会。(e) 为估计值。排名按累计产量。",
        },
      },
    ],
  },
  {
    slug: "eu-cbam-certificate-price-oct-2026",
    date: "2026-10-05",
    dateText: { en: "5 October 2026", zh: "2026 年 10 月 5 日" },
    category: "industry",
    image: "gallery/factory-25",
    imageW: 1200,
    imageH: 900,
    title: {
      en: "EU due to publish its third CBAM certificate price, after €75.36 and €75.28 in the first half",
      zh: "欧盟公布第三季度 CBAM 证书价格：上半年两次分别为 75.36 与 75.28 欧元",
    },
    summary: {
      en: "The European Commission was due to publish the CBAM certificate price for Q3 2026 on 5 October. Q1 2026 was €75.36 per tonne of CO2 (published 7 April) and Q2 €75.28 (6 July), calculated from EU ETS auction prices. CBAM has applied in its definitive regime since 1 January 2026; importers above a 50-tonne threshold must be authorised declarants, and the first declaration falls due on 30 September 2027.",
      zh: "欧盟委员会定于 2026 年 10 月 5 日公布 2026 年第三季度 CBAM 证书价格。一季度为 75.36 欧元/吨二氧化碳（4 月 7 日公布），二季度为 75.28 欧元（7 月 6 日公布），均按欧盟碳排放交易体系拍卖价格计算。CBAM 自 2026 年 1 月 1 日起进入正式期：进口量超过 50 吨门槛的进口商须申请成为授权申报人，首次申报期限为 2027 年 9 月 30 日。",
    },
    body: [
      {
        en: "The European Commission was due to publish the CBAM certificate price for the third quarter of 2026 on 5 October, the third of four quarterly prices for the year. Each quarterly price applies to the emissions in CBAM goods imported during that quarter. The two published so far are €75.36 per tonne of CO2 for Q1 2026, published on 7 April, and €75.28 for Q2 2026, published on 6 July. The price is the weighted average of the auction clearing prices of EU Emissions Trading System allowances, calculated under Regulation (EU) 2023/956 and Commission Implementing Regulation (EU) 2025/2548.",
        zh: "欧盟委员会定于 10 月 5 日公布 2026 年第三季度 CBAM 证书价格，这是全年四个季度价格中的第三个，每个季度价格对应同期进口货物所含的排放。目前已公布的两个价格是：一季度 75.36 欧元/吨二氧化碳（4 月 7 日公布）、二季度 75.28 欧元（7 月 6 日公布）。该价格按欧盟碳排放交易体系配额拍卖成交价的加权平均计算，依据为欧盟第 2023/956 号条例与第 2025/2548 号实施条例。",
      },
      {
        en: "CBAM has applied in its definitive regime since 1 January 2026. Importers bringing more than a single mass-based threshold of 50 tonnes of CBAM goods into the EU must apply for the status of authorised CBAM declarant, buy certificates from the national competent authority, declare the emissions embedded in their imports and surrender the corresponding number of certificates each year; a carbon price already paid during production can be deducted. Iron and steel is one of the six sectors in scope. In an assessment published on 30 September, the Commission found that for 1 April 2025 to 31 March 2026 the 50-tonne threshold would exempt 0.87% of the embedded emissions in imported goods and processed products, below the 1% ceiling set in the regulation. From 2027 the price is calculated weekly, certificates move to a common central platform from February 2027, and the first declaration and surrender fall due on 30 September 2027.",
        zh: "CBAM 自 2026 年 1 月 1 日起进入正式期。进口 CBAM 货物超过 50 吨单一质量门槛的欧盟进口商，须申请成为授权 CBAM 申报人，向所在国主管机构购买证书，申报进口货物所含排放并按年上缴相应数量的证书；生产环节已支付的碳价可以相应扣减。钢铁是纳入范围的六个行业之一。欧盟委员会 9 月 30 日发布的评估显示，在 2025 年 4 月 1 日至 2026 年 3 月 31 日期间，50 吨门槛可豁免进口货物及加工产品所含排放的 0.87%，低于条例设定的 1% 上限。自 2027 年起价格改为按周计算，证书自 2027 年 2 月起在统一中央平台购买，首次申报与上缴期限为 2027 年 9 月 30 日。",
      },
      {
        en: "What this means for buyers — our assessment: the certificate price is only half of the carbon cost. What an importer actually pays is that price multiplied by the embedded emissions per tonne of the goods concerned, so the figure worth requesting from a supplier is a verified emissions value per tonne, not the headline price. Two quarterly prices €0.08 apart also point to a carbon component that is currently stable rather than volatile, which helps when a casting price has to hold for months while sea freight is re-quoted weekly. Before the 30 September 2027 deadline, three things are worth settling in the contract: who is the importer of record and therefore the authorised declarant, who carries the certificate cost, and whether the supplier can provide verified embedded-emissions data plus evidence of any carbon price already paid. Where a buyer's annual volume of covered goods stays under the 50-tonne threshold the authorisation requirement does not apply, but the CN code of each item still has to be checked against the CBAM list.",
        zh: "对采购方意味着什么（我们的判断）：证书价格只是碳成本的一半。进口商实际支付的是该价格乘以货物每吨所含排放，因此值得向供应商索取的是经核证的吨排放数据，而不是这个公开价格。两个季度价格相差 0.08 欧元，也说明当前碳成本处于稳定而非剧烈波动的状态——在铸件价格需要维持数月、而海运费按周重报的情况下，这一点对报价有帮助。在 2027 年 9 月 30 日期限之前，有三件事值得在合同里定清楚：谁是进口记录方、也就是授权申报人；证书成本由谁承担；供应商能否提供经核证的排放数据以及已支付碳价的证明。若采购方年度受控货物进口量低于 50 吨门槛，则不适用授权申报要求，但每一项货物的 CN 编码仍需对照 CBAM 清单核对。",
      },
    ],
    source: [
      {
        name: {
          en: "European Commission — Price of CBAM certificates",
          zh: "欧盟委员会《CBAM 证书价格》",
        },
        url: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/price-cbam-certificates_en",
        date: "2026-10-05",
      },
      {
        name: {
          en: "European Commission — CBAM definitive regime",
          zh: "欧盟委员会《CBAM 正式期》",
        },
        url: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-definitive-regime_en",
        date: "2026-10-05",
      },
      {
        name: {
          en: "European Commission — CBAM communication and news (de minimis threshold assessment, 30 September 2026)",
          zh: "欧盟委员会《CBAM 沟通与新闻》（50 吨门槛评估，2026 年 9 月 30 日）",
        },
        url: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-communication-and-news_en",
        date: "2026-09-30",
      },
    ],
    charts: [
      {
        after: 1,
        title: {
          en: "CBAM certificate price for 2026, quarters published so far (EUR per tonne of CO2)",
          zh: "CBAM 证书价格：2026 年已公布季度（欧元/吨二氧化碳）",
        },
        items: [
          { label: { en: "Q1 2026 (published 7 April)", zh: "2026 年一季度（4 月 7 日公布）" }, value: 75.36, text: "€75.36" },
          { label: { en: "Q2 2026 (published 6 July)", zh: "2026 年二季度（7 月 6 日公布）" }, value: 75.28, text: "€75.28" },
        ],
        note: {
          en: "Source: European Commission. The Q3 2026 price is scheduled for publication on 5 October 2026 and the Q4 price on 4 January 2027.",
          zh: "来源：欧盟委员会。2026 年三季度价格定于 10 月 5 日公布，四季度价格定于 2027 年 1 月 4 日公布。",
        },
      },
      {
        after: 2,
        title: {
          en: "CBAM de minimis: share of embedded emissions exempted, against the ceiling in the regulation",
          zh: "CBAM 最低门槛：豁免的排放占比与条例上限",
        },
        items: [
          { label: { en: "Exempted by the 50-tonne threshold", zh: "50 吨门槛豁免的排放占比" }, value: 0.87, text: "0.87%" },
          { label: { en: "Ceiling set in the CBAM Regulation", zh: "条例设定的上限" }, value: 1, text: "1%" },
        ],
        note: {
          en: "Assessment period 1 April 2025 – 31 March 2026. Source: European Commission.",
          zh: "评估期：2025 年 4 月 1 日—2026 年 3 月 31 日。来源：欧盟委员会。",
        },
      },
    ],
  },
  {
    slug: "world-bank-commodity-prices-oct-2026",
    date: "2026-10-12",
    draft: true,
    dateText: { en: "12 October 2026", zh: "2026 年 10 月 12 日" },
    category: "industry",
    image: "gallery/factory-24",
    imageW: 1200,
    imageH: 900,
    title: {
      en: "World Bank: energy index jumps 25.7% in September, crude oil averages USD 102.3 a barrel",
      zh: "世界银行：9 月能源价格指数上涨 25.7%，原油月均价 102.3 美元/桶",
    },
    summary: {
      en: "The World Bank's October Pink Sheet, published on 2 October, puts its energy price index up 25.7% in September: crude oil rose 21.2% to an average of USD 102.3 a barrel and natural gas 15.3%, leaving European gas at USD 25.42 per million British thermal units. Metals edged up 0.4%, with zinc at USD 4,021 a tonne and iron ore at USD 97.7 a dry metric tonne.",
      zh: "世界银行 10 月版 Pink Sheet 于 10 月 2 日发布：9 月能源价格指数环比上涨 25.7%，原油上涨 21.2%、月均价 102.3 美元/桶，天然气上涨 15.3%，欧洲天然气均价 25.42 美元/百万英热单位。金属价格指数微涨 0.4%，锌 4021 美元/吨、铁矿石 97.7 美元/干吨。",
    },
    body: [
      {
        en: "The World Bank published the October 2026 edition of its Commodity Markets \u201cPink Sheet\u201d on 2 October, covering September. Its energy price index rose 25.7% month on month, led by crude oil (+21.2%) and natural gas (+15.3%). Crude oil averaged USD 102.3 a barrel in September against USD 84.4 in August, and Brent averaged USD 116.8; Australian coal averaged USD 147.1 a tonne. European natural gas averaged USD 25.42 per million British thermal units, up from USD 21.11 in August, while US gas was USD 2.95 and LNG delivered to Japan USD 14.25. The metals index rose 0.4%: aluminium averaged USD 3,283 a tonne, copper USD 14,474, zinc USD 4,021 and iron ore USD 97.7 a dry metric tonne.",
        zh: "世界银行于 2026 年 10 月 2 日发布 10 月版《大宗商品价格数据（Pink Sheet）》，数据对应 9 月。当月能源价格指数环比上涨 25.7%，以原油（+21.2%）和天然气（+15.3%）为主。9 月原油均价 102.3 美元/桶，8 月为 84.4 美元；布伦特均价 116.8 美元；澳大利亚煤炭均价 147.1 美元/吨。欧洲天然气均价 25.42 美元/百万英热单位，高于 8 月的 21.11 美元；美国天然气为 2.95 美元，日本进口 LNG 为 14.25 美元。金属价格指数上涨 0.4%：铝均价 3283 美元/吨、铜 14474 美元/吨、锌 4021 美元/吨，铁矿石 97.7 美元/干吨。",
      },
      {
        en: "The index values show how far the move goes. The World Bank's energy index stood at 148.9 in September (2010 = 100), against 108.8 in July, and the overall index reached 142.8. Non-energy commodities moved far less: the non-energy index rose 1.3%, with metals up 0.4%, raw materials 0.9%, fertilizers 0.4% and precious metals down 1.9%, while beverages fell 4.6%. The same file shows where a casting's inputs sit against their 2025 averages: zinc at USD 4,021 against USD 2,868, aluminium at USD 3,283 against USD 2,632, copper at USD 14,474 against USD 9,947, and iron ore at USD 97.7 against USD 100.2. The Pink Sheet reports monthly averages, so September's figures describe the whole month rather than a single day's spot price; the next edition is scheduled for 3 November 2026.",
        zh: "指数本身说明了这轮涨幅的幅度。世界银行的能源价格指数 9 月为 148.9（2010 年 = 100），7 月为 108.8，整体指数升至 142.8。非能源类变化小得多：非能源指数上涨 1.3%，其中金属上涨 0.4%、原材料上涨 0.9%、化肥上涨 0.4%、贵金属下跌 1.9%，饮料下跌 4.6%。同一份数据也能看出铸件投入品相对 2025 年均价的位置：锌 4021 美元/吨（2025 年均价 2868 美元）、铝 3283 美元（2632 美元）、铜 14474 美元（9947 美元）、铁矿石 97.7 美元/干吨（100.2 美元）。Pink Sheet 记录的是月均价，因此 9 月数据代表整月水平，而不是某一天现货价；下一期定于 2026 年 11 月 3 日发布。",
      },
      {
        en: "What this means for buyers \u2014 our assessment: energy and metal inputs are moving in different directions, and they land on a casting quotation at different points. Energy is the widest gap between producing regions \u2014 European gas at USD 25.42 per million British thermal units is over eight times the US price of USD 2.95, and it falls on the two steps a foundry cannot avoid: melting and heat treatment. A European buyer should ask which energy assumption a quotation carries and whether an energy surcharge applies, rather than treating the gas price as background. Base metals moved the other way from iron ore, so zinc at USD 4,021 a tonne has a direct effect where a part is coated or cast from a zinc-bearing alloy, while iron ore at USD 97.7 is close to its 2025 average and does not by itself justify an increase. Because the Pink Sheet publishes monthly averages while sea freight is re-quoted weekly, the practical step is to agree a reviewable re-quote window on the casting price and keep the freight validity separate \u2014 then ask which of the two lines a proposed increase is actually attached to.",
        zh: "对采购方意味着什么（我们的判断）：能源与金属投入正朝不同方向走，而它们落在铸件报价上的位置并不相同。能源是各产区之间差异最大的一项——欧洲天然气 25.42 美元/百万英热单位，是美国 2.95 美元的八倍以上，而它正好落在铸造厂无法回避的两道工序上：熔炼与热处理。因此欧洲买家值得问清楚报价采用了什么能源假设、是否适用能源附加费，而不是把气价当作背景信息。基本金属与铁矿石方向相反：若零件需要镀层或使用含锌合金，锌 4021 美元/吨有直接影响；而铁矿石 97.7 美元/干吨接近 2025 年均价，本身不足以支撑一次涨价。由于 Pink Sheet 公布的是月均价、而海运费按周重报，可操作的做法是在铸件价格上约定可复核的重新报价窗口，并把海运有效期分开处理，再问清楚拟议的涨价究竟挂在哪一条上。",
      },
    ],
    source: [
      {
        name: {
          en: "World Bank \u2014 Commodity Markets Price Data (Pink Sheet), October 2026 edition, published 2 October 2026",
          zh: "世界银行《大宗商品价格数据（Pink Sheet）》2026 年 10 月版（2026 年 10 月 2 日发布）",
        },
        url: "https://thedocs.worldbank.org/en/doc/74e8be41ceb20fa0da750cda2f6b9e4e-0050012026/related/CMO-Pink-Sheet-October-2026.pdf",
        date: "2026-10-02",
      },
      {
        name: {
          en: "World Bank \u2014 Commodity Markets: latest commodity prices and month-on-month changes, published 2 October 2026",
          zh: "世界银行《大宗商品市场》最新价格与环比变化（2026 年 10 月 2 日发布）",
        },
        url: "https://www.worldbank.org/en/research/commodity-markets",
        date: "2026-10-02",
      },
    ],
    charts: [
      {
        after: 1,
        title: {
          en: "World Bank commodity price indices and prices, September 2026 vs August 2026",
          zh: "世界银行大宗商品价格指数与价格：2026 年 9 月 vs 8 月环比",
        },
        items: [
          { label: { en: "Energy index", zh: "能源价格指数" }, value: 25.7, text: "+25.7%" },
          { label: { en: "Crude oil, average", zh: "原油（均价）" }, value: 21.2, text: "+21.2%" },
          { label: { en: "Natural gas", zh: "天然气" }, value: 15.3, text: "+15.3%" },
          { label: { en: "Food", zh: "食品" }, value: 3.8, text: "+3.8%" },
          { label: { en: "Non-energy index", zh: "非能源价格指数" }, value: 1.3, text: "+1.3%" },
          { label: { en: "Raw materials", zh: "原材料" }, value: 0.9, text: "+0.9%" },
          { label: { en: "Fertilizers", zh: "化肥" }, value: 0.4, text: "+0.4%" },
          { label: { en: "Metals", zh: "金属" }, value: 0.4, text: "+0.4%" },
          { label: { en: "Precious metals", zh: "贵金属" }, value: -1.9, text: "\u22121.9%" },
          { label: { en: "Beverages", zh: "饮料" }, value: -4.6, text: "\u22124.6%" },
        ],
        note: {
          en: "Source: World Bank, Commodity Markets \u2014 Pink Sheet, October 2026 edition (published 2 October 2026). Month-on-month change in September 2026; the Pink Sheet reports monthly averages.",
          zh: "来源：世界银行《大宗商品价格数据（Pink Sheet）》2026 年 10 月版（2026 年 10 月 2 日发布）。为 2026 年 9 月环比变化；Pink Sheet 记录月均价。",
        },
      },
      {
        after: 2,
        title: {
          en: "Natural gas prices, September 2026 (USD per million British thermal units)",
          zh: "天然气价格（美元/百万英热单位，2026 年 9 月）",
        },
        items: [
          { label: { en: "Europe", zh: "欧洲" }, value: 25.42, text: "25.42" },
          { label: { en: "LNG delivered to Japan", zh: "日本进口 LNG" }, value: 14.25, text: "14.25" },
          { label: { en: "United States", zh: "美国" }, value: 2.95, text: "2.95" },
        ],
        note: {
          en: "Source: World Bank Pink Sheet, October 2026 edition \u2014 September 2026 monthly averages.",
          zh: "来源：世界银行 Pink Sheet 2026 年 10 月版——2026 年 9 月月均价。",
        },
      },
    ],
  },
  {
    slug: "us-hydraulic-cylinder-dumping-investigation",
    date: "2026-10-12",
    draft: true,
    dateText: { en: "12 October 2026", zh: "2026 年 10 月 12 日" },
    category: "industry",
    image: "process/machining-7",
    imageW: 1200,
    imageH: 900,
    title: {
      en: "US opens AD/CVD cases on hydraulic cylinders, with petition margins up to 744.85%",
      zh: "美国对液压缸发起反倾销与反补贴调查：诉状主张幅度最高 744.85%",
    },
    summary: {
      en: "Commerce initiated antidumping investigations into linear hydraulic cylinders and parts from Canada, China, India, Korea and Mexico on 14 September 2026, and countervailing duty investigations into China, India and Mexico. The margins alleged in the petitions run from 56.79% for Mexico to 744.85% for Canada; the scope covers steel barrels and piston rods plus the parts shipped with them.",
      zh: "美国商务部于 2026 年 9 月 14 日对加拿大、中国、印度、韩国、墨西哥的直线液压缸及零部件发起反倾销调查，并对中国、印度、墨西哥发起反补贴调查。诉状主张的幅度自墨西哥的 56.79% 到加拿大的 744.85%；涉案范围包括钢制缸筒与活塞杆，以及随其一同发运的零部件。",
    },
    body: [
      {
        en: "The US Department of Commerce initiated less-than-fair-value (antidumping) investigations into certain linear hydraulic cylinders and parts thereof from Canada, China, India, Korea and Mexico, in a notice published on 14 September 2026 and applicable from 8 September (cases A-122-879, A-570-240, A-533-952, A-580-923 and A-201-870). The petitions were filed on 29 July 2026 by the Hydraulic Cylinders Fair Trade Coalition and named US producers. The estimated dumping margins alleged in the petitions are 248.33% to 744.85% for Canada; 149.86% to 394.07% (Malaysia surrogate), 103.05% to 197.07% (Mexico surrogate) and 299.38% to 440.48% (T\u00fcrkiye surrogate) for China; 85.31% to 370.67% for India; 73.09% to 158.74% for Korea; and 56.79% to 157.12% for Mexico. Separate countervailing duty investigations were initiated the same day on imports from China, India and Mexico. These are margins alleged by the petitioners, not duty rates: at the initiation stage no duties apply.",
        zh: "美国商务部于 2026 年 9 月 14 日发布公告（适用日期自 9 月 8 日起），对来自加拿大、中国、印度、韩国、墨西哥的直线液压缸及零部件发起低于公平价值（反倾销）调查（案号 A-122-879、A-570-240、A-533-952、A-580-923、A-201-870）。诉状由液压缸公平贸易联盟与数家美国生产商于 2026 年 7 月 29 日提交。诉状主张的倾销幅度为：加拿大 248.33%—744.85%；中国分别按马来西亚替代价 149.86%—394.07%、墨西哥替代价 103.05%—197.07%、土耳其替代价 299.38%—440.48%；印度 85.31%—370.67%；韩国 73.09%—158.74%；墨西哥 56.79%—157.12%。同日还对中国、印度、墨西哥的进口发起反补贴调查。上述数字是诉状主张的幅度，不是税率：在立案阶段不征收任何税款。",
      },
      {
        en: "The scope is what decides whether a shipment is caught. Covered cylinders are hydraulically activated, have steel barrels, a bore of 25.4 mm (one inch) or more and a retracted length of 101.6 mm (four inches) or more, and the notice lists tie-rod, welded body, telescopic, plunger, rodless and other designs. Beyond complete cylinders, the scope covers steel barrels honed or skived and finished for cylinder use, hard-chrome-plated and machined steel piston rods, and any part attached to, assembled with or shipped with a covered barrel or rod \u2014 end caps, mounting flanges, trunnions, clevises, pistons, rings, seals and valves among them. Parts of that kind imported or invoiced separately are outside the scope. Goods stay in scope if they are only assembled or lightly processed in a third country, and a cylinder attached to equipment classified in Chapter 84 of the HTSUS is covered while the surrounding equipment is not. The merchandise is classified under HTSUS 8412.21.0015, 8412.21.0030, 8412.21.0045, 8412.21.0060, 8412.21.0075 and 8412.90.9005. The period of investigation is 1 July 2025 to 30 June 2026 for Canada, India, Korea and Mexico, and 1 January to 30 June 2026 for China, which Commerce treats as a non-market economy.",
        zh: "决定一票货是否涉案的是范围条款。受调查的液压缸为液压驱动、钢制缸筒、内径不低于 25.4 毫米（1 英寸）、收起长度不低于 101.6 毫米（4 英寸），公告列举了拉杆式、焊接式、伸缩式、柱塞式、无杆式等结构。除整缸外，涉案范围还包括：经过珩磨或刮削滚光并完成缸筒用途加工的钢制缸筒；镀硬铬并机加工成活塞杆的钢棒或钢管；以及与涉案缸筒或活塞杆连接、组装或一并发运的任何零部件，例如端盖、安装法兰、耳轴、耳环、活塞、挡圈、密封件与阀。此类零部件若单独进口或单独开票，则不在范围内。仅在第三国组装或简单加工并不改变涉案属性；与《美国协调关税表》第 84 章设备一同进口的液压缸属于涉案产品，而该设备本身不属于。涉案商品的 HTSUS 编码为 8412.21.0015、8412.21.0030、8412.21.0045、8412.21.0060、8412.21.0075 与 8412.90.9005。调查期为加拿大、印度、韩国、墨西哥的 2025 年 7 月 1 日至 2026 年 6 月 30 日；中国被美方视为非市场经济体，调查期为 2026 年 1 月 1 日至 6 月 30 日。",
      },
      {
        en: "What this means for buyers \u2014 our assessment: an investigation at this stage adds no duty, but it changes what is worth settling when an order is placed. The scope follows the part and not only the complete cylinder, so an end cap, a mounting flange or a piston rod shipped with a covered barrel carries the cylinder's exposure with it. The questions to put to a supplier are therefore documentary rather than commercial: which HTSUS code is used, whether a component is invoiced on its own or bundled with a cylinder, and whether the origin of the barrel and the rod can be stated and not only the place of final assembly \u2014 the third-country rule means assembling outside the five named countries does not by itself take a cylinder out of scope. On price, petition margins in this range usually appear as a shorter validity period rather than a cost line, so it is worth expecting hydraulic cylinder and cylinder-component quotations for US delivery to be dated more tightly, and to keep a second origin on the bid list. For buyers outside the United States the effect is indirect: volumes displaced from the US market look for other outlets, which is worth keeping in mind when comparing hydraulic or machined-cylinder quotes.",
        zh: "对采购方意味着什么（我们的判断）：调查在此阶段不产生任何税款，但它改变了下单时值得一并确认的内容。涉案范围跟着零件走，而不只是整缸，因此与涉案缸筒一并发运的端盖、安装法兰或活塞杆会连同整缸一起承担相应敞口。因此要问供应商的问题偏文件性而非商务性：采用哪个 HTSUS 编码；某个零部件是单独开票还是与液压缸打包；以及能否说明缸筒与活塞杆的原产地，而不只是最终组装地——第三国条款意味着在这五个国家之外组装，本身并不使液压缸脱离涉案范围。价格方面，这一量级的诉状幅度通常表现为报价有效期缩短，而不是立刻增加一条成本：销往美国的液压缸与缸体零部件报价，有效期值得按更短的周期来安排，同时在比价名单里保留第二个产地来源。对美国以外的买家，影响是间接的——从美国市场被挤出的量会寻找其他出路，比较液压件或机加工缸体报价时值得考虑这一点。",
      },
    ],
    source: [
      {
        name: {
          en: "Federal Register \u2014 Certain Linear Hydraulic Cylinders and Parts Thereof From Canada, the People's Republic of China, India, the Republic of Korea, and Mexico: Initiation of Less-Than-Fair-Value Investigations (14 September 2026)",
          zh: "美国《联邦公报》——加拿大、中国、印度、韩国、墨西哥直线液压缸及零部件反倾销调查立案公告（2026 年 9 月 14 日）",
        },
        url: "https://www.federalregister.gov/documents/2026/09/14/2026-18706/certain-linear-hydraulic-cylinders-and-parts-thereof-from-canada-the-peoples-republic-of-china-india",
        date: "2026-09-14",
      },
      {
        name: {
          en: "Federal Register \u2014 Certain Linear Hydraulic Cylinders and Parts Thereof From the People's Republic of China, India, and Mexico: Initiation of Countervailing Duty Investigations (14 September 2026)",
          zh: "美国《联邦公报》——中国、印度、墨西哥直线液压缸及零部件反补贴调查立案公告（2026 年 9 月 14 日）",
        },
        url: "https://www.federalregister.gov/documents/2026/09/14/2026-18707/certain-linear-hydraulic-cylinders-and-parts-thereof-from-the-peoples-republic-of-china-india-and",
        date: "2026-09-14",
      },
    ],
    charts: [
      {
        after: 1,
        title: {
          en: "Estimated dumping margins alleged in the petitions, by origin",
          zh: "诉状主张的倾销幅度（按来源地）",
        },
        items: [
          { label: { en: "Canada", zh: "加拿大" }, value: 744.85, text: "248.33\u2013744.85%" },
          { label: { en: "China (T\u00fcrkiye surrogate)", zh: "中国（土耳其替代价）" }, value: 440.48, text: "299.38\u2013440.48%" },
          { label: { en: "China (Malaysia surrogate)", zh: "中国（马来西亚替代价）" }, value: 394.07, text: "149.86\u2013394.07%" },
          { label: { en: "India", zh: "印度" }, value: 370.67, text: "85.31\u2013370.67%" },
          { label: { en: "China (Mexico surrogate)", zh: "中国（墨西哥替代价）" }, value: 197.07, text: "103.05\u2013197.07%" },
          { label: { en: "Korea", zh: "韩国" }, value: 158.74, text: "73.09\u2013158.74%" },
          { label: { en: "Mexico", zh: "墨西哥" }, value: 157.12, text: "56.79\u2013157.12%" },
        ],
        note: {
          en: "Source: Federal Register, 14 September 2026 (China case A-570-240). Bars show the top of the range alleged in the petitions; the label gives the full range. Alleged margins are not duty rates, and no duties apply at the initiation stage.",
          zh: "来源：美国《联邦公报》2026 年 9 月 14 日（中国案号 A-570-240）。条长为诉状主张区间的上限，文字为完整区间。主张幅度不等于税率，立案阶段不征税。",
        },
      },
      {
        after: 2,
        title: {
          en: "Structure of the two investigations opened on 14 September 2026 (number of countries)",
          zh: "2026 年 9 月 14 日立案的两项调查覆盖范围（国家数）",
        },
        items: [
          { label: { en: "Countries in the antidumping investigation", zh: "反倾销调查涉及国家" }, value: 5, text: "5" },
          { label: { en: "Countries in the countervailing duty investigation", zh: "反补贴调查涉及国家" }, value: 3, text: "3" },
          { label: { en: "Surrogate economies used to value Chinese inputs", zh: "用于评估中国投入成本的替代经济体" }, value: 3, text: "3" },
        ],
        note: {
          en: "Source: Federal Register, 14 September 2026. Antidumping: Canada, China, India, Korea, Mexico. Countervailing duty: China, India, Mexico. Surrogate economies named in the petition: Malaysia, Mexico, T\u00fcrkiye.",
          zh: "来源：美国《联邦公报》2026 年 9 月 14 日。反倾销：加拿大、中国、印度、韩国、墨西哥；反补贴：中国、印度、墨西哥；诉状列举的替代经济体：马来西亚、墨西哥、土耳其。",
        },
      },
    ],
  },
  {
    slug: "worldsteel-demand-outlook-oct-2026",
    date: "2026-10-12",
    draft: true,
    dateText: { en: "12 October 2026", zh: "2026 年 10 月 12 日" },
    category: "industry",
    image: "gallery/factory-17",
    imageW: 1200,
    imageH: 900,
    title: {
      en: "worldsteel holds 2026 steel demand flat at 1,722 Mt, sees 1.7% growth in 2027",
      zh: "世界钢铁协会：2026 年全球钢铁需求持平于 17.22 亿吨，2027 年预计增长 1.7%",
    },
    summary: {
      en: "worldsteel's October 2026 outlook puts global steel demand at 1,722 Mt in 2026, unchanged from 2025, before growth of 1.7% to 1,752 Mt in 2027. Demand outside China is forecast to rise 1.5% this year and 4.0% next year.",
      zh: "世界钢铁协会 2026 年 10 月展望预计，2026 年全球钢铁需求为 17.22 亿吨，与 2025 年持平；2027 年增长 1.7% 至 17.52 亿吨。中国以外需求今年预计增长 1.5%，明年增长 4.0%。",
    },
    body: [
      {
        en: "The World Steel Association (worldsteel) published its October 2026 Short Range Outlook on 12 October, based on information available in early September. It forecasts global steel demand unchanged from 2025 at 1,722 million tonnes in 2026, followed by growth of 1.7% to 1,752 Mt in 2027. Outside China, demand is forecast to rise 1.5% in 2026 and 4.0% in 2027; within China, it is forecast to fall 2.0% in 2026 and 1.0% in 2027.",
        zh: "世界钢铁协会于 2026 年 10 月 12 日发布 10 月版短期展望，所用信息截至 9 月初。展望预计，2026 年全球钢铁需求为 17.22 亿吨，与 2025 年持平；2027 年增长 1.7% 至 17.52 亿吨。中国以外需求预计 2026 年增长 1.5%、2027 年增长 4.0%；中国需求预计 2026 年下降 2.0%、2027 年下降 1.0%。",
      },
      {
        en: "The regional forecasts put the recovery on different timetables. Developed-world demand is forecast to grow 1.0% in 2026 and 2.2% in 2027; the United States 2.0% and approximately 1.5%; and the EU -0.3% and 3.1%. India is projected to grow 7.9% to 172.4 Mt in 2026 and 8.0% to 186.2 Mt in 2027. GCC demand is forecast to fall about 11% in 2026 before rebounding 11.3% in 2027, while ASEAN-5 growth is put at 5.2% and 3.2% in the two years.",
        zh: "各区域复苏节奏并不一致。发达经济体需求预计 2026 年增长 1.0%、2027 年增长 2.2%；美国分别为 2.0% 和约 1.5%；欧盟为下降 0.3% 和增长 3.1%。印度需求预计 2026 年增长 7.9% 至 1.724 亿吨，2027 年增长 8.0% 至 1.862 亿吨。海湾合作委员会需求预计 2026 年下降约 11%，2027 年反弹 11.3%；东盟五国两年增速预计分别为 5.2% 和 3.2%。",
      },
      {
        en: "What this means for buyers \u2014 our assessment: a flat global total hides a split in order momentum. The stronger outlook for the United States and India points to firmer demand for machinery, energy and infrastructure components, where long lead times for large machined castings can become the constraint before price does. The EU forecast is weaker in 2026 and stronger in 2027, so a buyer should phase a volume increase rather than commit the whole year on one outlook. We would keep rolling volume reviews, use separate validity periods for casting price and freight, and ask suppliers to confirm capacity for moulding, machining and surface treatment before a 2027 ramp-up. The outlook is a demand forecast, not an order book or a price commitment.",
        zh: "对采购方意味着什么（我们的判断）：全球总量持平，掩盖了订单动能的区域分化。美国与印度前景较强，意味着机械、能源与基础设施零部件的需求更稳；在这类项目中，大型机加工铸件的长交期可能先于价格成为约束。欧盟需求预计 2026 年偏弱、2027 年转强，因此采购方宜分批增加用量，而不是依据一份展望一次性锁定全年。我们建议保留滚动用量复核，把铸件价格与海运有效期分开约定，并在 2027 年放量前向供应商确认造型、机加工与表面处理的产能。该展望是需求预测，不是订单簿，也不是价格承诺。",
      },
    ],
    source: {
      name: {
        en: "World Steel Association (worldsteel) \u2014 Short Range Outlook, October 2026",
        zh: "世界钢铁协会《2026 年 10 月短期展望》",
      },
      url: "https://worldsteel.org/media/press-releases/2026/worldsteel-short-range-outlook-october-2026/",
      date: "2026-10-12",
    },
    charts: [
      {
        after: 1,
        title: {
          en: "Worldsteel steel demand growth forecast for 2026",
          zh: "世界钢铁协会 2026 年钢铁需求增长预测",
        },
        items: [
          { label: { en: "World", zh: "全球" }, value: 0, text: "0.0%" },
          { label: { en: "Outside China", zh: "中国以外" }, value: 1.5, text: "+1.5%" },
          { label: { en: "China", zh: "中国" }, value: -2, text: "\u22122.0%" },
          { label: { en: "Developed world", zh: "发达经济体" }, value: 1, text: "+1.0%" },
          { label: { en: "Developing economies excl. China", zh: "中国以外发展中经济体" }, value: 1.9, text: "+1.9%" },
          { label: { en: "United States", zh: "美国" }, value: 2, text: "+2.0%" },
          { label: { en: "EU", zh: "欧盟" }, value: -0.3, text: "\u22120.3%" },
          { label: { en: "India", zh: "印度" }, value: 7.9, text: "+7.9%" },
          { label: { en: "GCC", zh: "海湾合作委员会" }, value: -11, text: "\u2248\u221211%" },
        ],
        note: {
          en: "Source: worldsteel, Short Range Outlook, October 2026, published 12 October 2026. Year-on-year change in apparent steel use; outlook based on information available in early September 2026.",
          zh: "来源：世界钢铁协会《2026 年 10 月短期展望》，2026 年 10 月 12 日发布。为表观钢铁需求同比变化；展望所用信息截至 2026 年 9 月初。",
        },
      },
      {
        after: 2,
        title: {
          en: "Worldsteel steel demand growth forecast for 2027",
          zh: "世界钢铁协会 2027 年钢铁需求增长预测",
        },
        items: [
          { label: { en: "World", zh: "全球" }, value: 1.7, text: "+1.7%" },
          { label: { en: "Outside China", zh: "中国以外" }, value: 4, text: "+4.0%" },
          { label: { en: "China", zh: "中国" }, value: -1, text: "\u22121.0%" },
          { label: { en: "Developed world", zh: "发达经济体" }, value: 2.2, text: "+2.2%" },
          { label: { en: "Developing economies excl. China", zh: "中国以外发展中经济体" }, value: 5.1, text: "+5.1%" },
          { label: { en: "United States", zh: "美国" }, value: 1.5, text: "\u2248+1.5%" },
          { label: { en: "EU", zh: "欧盟" }, value: 3.1, text: "+3.1%" },
          { label: { en: "India", zh: "印度" }, value: 8, text: "+8.0%" },
          { label: { en: "GCC", zh: "海湾合作委员会" }, value: 11.3, text: "+11.3%" },
        ],
        note: {
          en: "Source: worldsteel, Short Range Outlook, October 2026, published 12 October 2026. Year-on-year change in apparent steel use.",
          zh: "来源：世界钢铁协会《2026 年 10 月短期展望》，2026 年 10 月 12 日发布。为表观钢铁需求同比变化。",
        },
      },
    ],
  },
  {
    slug: "us-fluid-end-block-duties-oct-2026",
    date: "2026-10-19",
    draft: true,
    dateText: { en: "19 October 2026", zh: "2026 年 10 月 19 日" },
    category: "industry",
    image: "process/machining-5",
    imageW: 1200,
    imageH: 900,
    title: {
      en: "US sets 58.48% anti-dumping cash deposit for reviewed Italian fluid end blocks",
      zh: "美国对意大利锻钢流体端块复审企业设定 58.48% 反倾销现金保证金率",
    },
    summary: {
      en: "The US Federal Register published final results of the 2024 administrative review of forged steel fluid end blocks from Italy on 19 October 2026. The reviewed producer group received a 58.48% estimated weighted-average dumping margin based on total adverse facts available; the all-others cash deposit rate remains 7.33%.",
      zh: "美国《联邦公报》于 2026 年 10 月 19 日公布意大利锻钢流体端块 2024 年行政复审终裁。受复审的生产商集团适用基于全部可获得不利事实确定的 58.48% 估计加权平均倾销幅度；其他企业现金保证金率仍为 7.33%。",
    },
    body: [
      {
        en: "The US Department of Commerce published the final results of its 2024 administrative review of the antidumping duty order on forged steel fluid end blocks from Italy in the Federal Register on 19 October 2026. The notice applies from that date and assigns Lucchini Mam\u00e9 Forge S.p.A., Lucchini Industries S.r.l. and Lucchini RS S.p.A., collectively Lucchini, an estimated weighted-average dumping margin of 58.48% for the review period from 1 January to 31 December 2024. Commerce says the rate is based on total adverse facts available, and it becomes the cash deposit rate for shipments by the reviewed companies entered, or withdrawn from warehouse, for consumption on or after publication.",
        zh: "美国商务部于 2026 年 10 月 19 日在《联邦公报》公布意大利锻钢流体端块反倾销税令 2024 年行政复审终裁。公告自当日起适用，对 Lucchini Mam\u00e9 Forge S.p.A.、Lucchini Industries S.r.l. 与 Lucchini RS S.p.A.（合称 Lucchini）在 2024 年 1 月 1 日至 12 月 31 日复审期内适用 58.48% 的估计加权平均倾销幅度。商务部称该幅度基于全部可获得不利事实，并成为受复审企业在公告日或之后申报进入美国消费或从仓库提取时的现金保证金率。",
      },
      {
        en: "The notice leaves the all-others cash deposit rate at 7.33%, the rate set in the original less-than-fair-value investigation. It also sets the timing for entries under review: Commerce intends to issue assessment instructions to US Customs and Border Protection no earlier than 35 days after publication. If a timely summons is filed at the US Court of International Trade, those instructions will keep liquidation open until the 90-day period for seeking a statutory injunction has expired. Before liquidation, importers must also file a certificate on the reimbursement of antidumping duties.",
        zh: "公告将其他企业现金保证金率维持在 7.33%，即原反倾销调查确定的其他企业税率。公告还明确了复审所涉进口记录的后续时间：商务部拟在公告发布至少 35 天后向美国海关与边境保护局发出评估指令。若当事方及时向美国国际贸易法院提交传票，相关指令将在 90 天的法定禁令申请期届满前维持进口记录不予清算。清算前，进口商还须提交反倾销税补偿证明。",
      },
      {
        en: "What this means for buyers \u2014 our assessment: this is a landed-cost issue before it is a price issue. For a US-bound order, confirm the exact producer and exporter, the entry date and the cash deposit rate that applies to that entity; an Italian quotation cannot be compared with another origin on product price alone while the reviewed supplier carries 58.48% and all others carry 7.33%. Ask the supplier and customs broker to reconcile the invoice, origin and deposit line before releasing the order, and keep duty changes separate from the casting price and freight in the quotation. Buyers with non-US destinations should still note the origin-specific exposure when comparing delivery options, but this notice does not itself impose a charge on those shipments.",
        zh: "对采购方意味着什么（我们的判断）：这首先是到岸成本问题，其次才是产品价格问题。对美国目的地的订单，应确认实际生产商与出口商、进口申报日期及适用于该主体的现金保证金率；受复审供应商适用 58.48%，其他企业适用 7.33%，因此不能只比较产品单价来判断不同产地的报价。放行订单前，可要求供应商与报关代理核对发票、原产地和保证金项目，并在报价中把关税变化、铸件价格与海运费用分开列示。非美国目的地的买家在比较交付方案时也应留意产地相关的贸易措施敞口，但本公告本身不会对这些货物直接加征费用。",
      },
    ],
    source: {
      name: {
        en: "Federal Register \u2014 Forged Steel Fluid End Blocks From Italy: Final Results of Antidumping Duty Administrative Review; 2024 (19 October 2026)",
        zh: "美国《联邦公报》——意大利锻钢流体端块反倾销行政复审终裁：2024 年复审期（2026 年 10 月 19 日）",
      },
      url: "https://www.federalregister.gov/documents/2026/10/19/2026-21292/forged-steel-fluid-end-blocks-from-italy-final-results-of-antidumping-duty-administrative-review",
      date: "2026-10-19",
    },
    charts: [
      {
        after: 1,
        title: {
          en: "US cash deposit rates after the 2024 review: reviewed producer vs all others",
          zh: "2024 年复审后的美国现金保证金率：受复审生产商与其他企业",
        },
        items: [
          { label: { en: "Reviewed producer group", zh: "受复审生产商集团" }, value: 58.48, text: "58.48%" },
          { label: { en: "All other producers/exporters", zh: "其他生产商/出口商" }, value: 7.33, text: "7.33%" },
        ],
        note: {
          en: "Source: Federal Register, final results published 19 October 2026. The reviewed rate is based on total adverse facts available; the all-others rate was established in the original less-than-fair-value investigation.",
          zh: "来源：美国《联邦公报》2026 年 10 月 19 日终裁公告。受复审税率基于全部可获得不利事实；其他企业税率来自原反倾销调查。",
        },
      },
      {
        after: 2,
        title: {
          en: "Post-publication timing in the Federal Register notice",
          zh: "《联邦公报》公告发布后的法定时间节点",
        },
        items: [
          { label: { en: "Earliest assessment instructions", zh: "最早发出评估指令" }, value: 35, text: "35 days" },
          { label: { en: "Court injunction window", zh: "法院禁令申请期" }, value: 90, text: "90 days" },
        ],
        note: {
          en: "Source: Federal Register, 19 October 2026. Commerce intends to issue assessment instructions to CBP no earlier than 35 days after publication; a timely summons keeps liquidation open until the 90-day statutory injunction period expires.",
          zh: "来源：美国《联邦公报》2026 年 10 月 19 日。商务部拟在公告后至少 35 天向美国海关与边境保护局发出评估指令；若及时提交传票，清算将在 90 天法定禁令申请期届满前维持开放。",
        },
      },
    ],
  },
  {
    slug: "expansion-approved",
    date: "2025-12-24",
    dateText: { en: "24 December 2025", zh: "2025 年 12 月 24 日" },
    category: "investment",
    image: "news/news-expansion",
    title: {
      en: "30,000 t/yr precision casting expansion clears environmental approval",
      zh: "年产 3 万吨精密铸件扩建项目获环评批复",
    },
    summary: {
      en: "The Botou plant's precision casting expansion received environmental approval on 24 December 2025 (approval no. 泊审环表〔2025〕55号), covering an investment of RMB 5.1 million. Phase one has already entered completed-project environmental acceptance.",
      zh: "泊头基地精密铸件扩建项目于 2025 年 12 月 24 日取得环评批复（泊审环表〔2025〕55 号），项目投资 510 万元。一期已进入阶段性竣工环保验收。",
    },
    body: [
      {
        en: "The expansion project was filed under project code 2503-130981-04-01-573274 and registered with the Botou development and reform authority (filing no. 泊发改审批备字〔2025〕304号). It follows an earlier 30,000 t/yr technical-renovation project that entered environmental review in October 2023.",
        zh: "该项目项目代码为 2503-130981-04-01-573274，已在泊头市发改部门完成备案（泊发改审批备字〔2025〕304 号）。此前，年产 3 万吨精密铸件技改项目已于 2023 年 10 月进入环评受理程序。",
      },
      {
        en: "The approval sets out the emission control equipment for the new capacity: dust collection with bag filters and a 15 m stack for grinding and shot-blasting; collection, paper-cartridge filtration and catalytic combustion for puttying, pre-heating, painting and drying; and a separate bag-filter line for putty and touch-up sanding. No process wastewater is discharged, and hazardous waste is handed to licensed treatment companies.",
        zh: "批复对新增产能的废气治理设施提出了明确要求：打磨与抛丸废气采用集气装置加布袋除尘器，经 15 米排气筒排放；刮腻子、毛坯预热、喷漆与烘干废气采用集气、纸盒过滤加催化燃烧装置；腻子打磨与修补打磨废气单独设布袋除尘。生产过程无废水外排，危险废物交由有资质单位处理。",
      },
      {
        en: "For customers, the practical effect is capacity: with the expansion in place, casting capacity at this plant runs up to 30,000 t/yr, without adding headcount to the existing shifts.",
        zh: "对客户而言，这一项目的实际意义是产能：扩建完成后，本厂年铸造产能可达 30000 吨，且不新增劳动定员。",
      },
    ],
    /* 正文配图：after = 插在第几段之后；img 路径相对 assets/img/，
       画面内容可在 assets/img/manifest.json 的 rag_description 字段核对 */
    figures: [
      {
        img: "gallery/factory-04",
        w: 1200,
        h: 900,
        after: 1,
        caption: {
          en: "Expansion capacity: the new second-floor production platform inside the steel-frame workshop.",
          zh: "新增产能所在的新建钢结构厂房二层车间平台。",
        },
      },
      {
        img: "banner/banner-contact",
        w: 2000,
        h: 800,
        after: 2,
        caption: {
          en: "Dust collection and off-gas treatment equipment in the plant yard — the equipment the approval requires for the added capacity.",
          zh: "厂区除尘与废气处理设施——批复对新增产能提出的治理要求正落在这一类设备上。",
        },
      },
    ],
  },
  {
    slug: "coating-line-upgrade",
    date: "2024-06-17",
    dateText: { en: "17 June 2024", zh: "2024 年 6 月 17 日" },
    category: "environment",
    image: "news/news-coating",
    title: {
      en: "Paint line rebuilt as a sealed, negative-pressure coating workshop",
      zh: "涂装线改造为全密闭微负压涂装车间",
    },
    summary: {
      en: "The coating process upgrade was filed in June 2024 (filing no. 泊发改审批备字〔2024〕127号) and built inside a new workshop of about 1,500 m², with sealed sanding and spray booths under indoor negative pressure.",
      zh: "涂装工艺升级改造项目于 2024 年 6 月完成备案（泊发改审批备字〔2024〕127 号），在约 1500 ㎡ 的新建车间内实施，打磨房与喷漆房全密闭、室内微负压。",
    },
    body: [
      {
        en: "The rebuilt line separates sanding, puttying, priming and top-coating into dedicated booths, so overspray and dust are captured at the source instead of drifting through the workshop.",
        zh: "改造后的涂装线把打磨、刮腻子、底漆与面漆分设工位，漆雾与粉尘在源头被收集，不再扩散到整个车间。",
      },
      {
        en: "The upgrade also improves what the customer sees. Parts come out of a controlled booth environment, which reduces dust nibs and uneven film thickness on visible faces — the defects that show up first on a delivered casting.",
        zh: "改造同样提升了客户能看到的部分。零件在受控的喷房环境中完成涂装，外露面的颗粒与膜厚不均明显减少——这些正是铸件交付后容易被挑出的外观问题。",
      },
      {
        en: "The site now runs primer and top coat in house rather than subcontracting them, which removes a transport leg from the lead time.",
        zh: "底漆与面漆现已全部在厂内完成，不再外协，交期中去掉了一段运输时间。",
      },
    ],
    figures: [
      {
        img: "process/paint-1",
        w: 1200,
        h: 900,
        after: 1,
        caption: {
          en: "On the coating line: castings hanging from the overhead conveyor.",
          zh: "涂装线作业现场：大型铸件悬挂在输送链下方。",
        },
      },
      {
        img: "products/machine-tool-parts/10",
        w: 1200,
        h: 900,
        after: 2,
        caption: {
          en: "A machine-tool bed casting after primer — primer and top coat are now both applied in house.",
          zh: "喷涂底漆后的机床床身铸件——底漆与面漆现已全部在厂内完成。",
        },
      },
    ],
  },
  {
    slug: "specialised-sme",
    date: "2024-03-28",
    dateText: { en: "28 March 2024", zh: "2024 年 3 月 28 日" },
    category: "certification",
    image: "news/news-hitech",
    title: {
      en: "Recognised as a Hebei Specialised, Refined, Distinctive and Innovative SME",
      zh: "获评河北省专精特新中小企业",
    },
    summary: {
      en: "The provincial rating recognises companies with a focused product line, proprietary technology and steady growth. This certificate is valid until 28 March 2027.",
      zh: "该省级认定面向产品聚焦、拥有自主技术且保持稳定增长的中小企业。本证书有效期至 2027 年 3 月 28 日。",
    },
    body: [
      {
        en: "The assessment looks at how concentrated a company's product range is, how much of its revenue comes from that range, and whether it holds its own intellectual property. In our case the answer is straightforward: castings and machined castings, with 13 granted patents around wear-resistant castings, counterweights, gear-ring blanks and lost-foam coating equipment.",
        zh: "评审关注企业产品线的聚焦程度、主营收入占比以及是否拥有自主知识产权。我们的答案很直接：铸件与加工铸件，并围绕耐磨铸件、配重件、齿圈毛坯与消失模涂料设备取得 13 项授权专利。",
      },
      {
        en: "For buyers who cannot visit, a provincial rating is a useful third-party signal: it was granted after a document review and site check by the provincial authority, not self-declared.",
        zh: "对无法到厂的采购方来说，省级认定是一份有用的第三方信号：它经过省级主管部门的资料审核与现场核查，并非自我声明。",
      },
    ],
    figures: [
      {
        img: "process/machining-2",
        w: 1200,
        h: 900,
        after: 1,
        caption: {
          en: "Machining a heavy-wall iron housing on a CNC boring and milling machine — the kind of in-house process the assessment looks at.",
          zh: "数控镗铣床加工厚壁铸铁箱体——评审关注的正是这类自有工艺能力。",
        },
      },
      {
        img: "quality/scan-hoist",
        w: 1200,
        h: 900,
        after: 2,
        caption: {
          en: "3D scanning of a large housing casting with the crane holding the part — dimensional checks run in-house rather than at an outside laboratory.",
          zh: "吊运状态下对大型箱体铸件做三维扫描——尺寸检测在厂内完成，不外送实验室。",
        },
      },
    ],
  },
  {
    slug: "high-tech-enterprise",
    date: "2023-11-01",
    dateText: { en: "2023", zh: "2023 年" },
    category: "certification",
    image: "news/news-techrenov",
    title: {
      en: "Certified as a National High-Tech Enterprise",
      zh: "获认定为国家高新技术企业",
    },
    summary: {
      en: "The national high-tech enterprise designation is granted to companies that meet R&D spending, technology-transfer and intellectual-property thresholds in their field.",
      zh: "国家高新技术企业认定面向在所属领域达到研发投入、成果转化与知识产权门槛的企业。",
    },
    body: [
      {
        en: "For a foundry, this designation is really a statement about process engineering rather than about the iron itself. The work behind it was pattern and process design, coating and drying development, and the tooling improvements that now carry our patent portfolio.",
        zh: "对铸造企业而言，这项认定的实质指向工艺工程能力，而不只是铁水本身。支撑它的是模具与工艺设计、涂料与烘干工艺开发，以及构成我们专利组合的工装改进。",
      },
      {
        en: "In practice it also matters commercially: high-tech status is one of the documents public tender and larger OEM audits frequently ask to see.",
        zh: "它同时具有商业价值：在公开招投标与大型主机厂的供应商审核中，高新技术企业资质是被频繁要求的文件之一。",
      },
    ],
    figures: [
      {
        img: "certs/hitech-enterprise",
        w: 1400,
        h: 1000,
        after: 1,
        caption: {
          en: "National High-Tech Enterprise certificate (no. GR202313000812), valid for three years.",
          zh: "国家高新技术企业证书（证书编号 GR202313000812，有效期三年）。",
        },
      },
      {
        img: "process/scan-1",
        w: 1200,
        h: 900,
        after: 2,
        caption: {
          en: "3D scanning a large grey-iron housing casting.",
          zh: "大型灰铁箱体铸件的三维扫描检测。",
        },
      },
    ],
  },
];

/* ------------------------------------------------- 发布状态、排期与草稿

   每周固定发行业动态靠的是这张表里的三个字段，不需要人工记得发版：

     date      显示与排序用的日期（必填，YYYY-MM-DD）
     publishAt 上线日期（选填）。写了就以它为准，用来把稿件排到未来某一天；
               到期后随下一次生成自动出现在列表里
     draft     草稿（选填，true）。只留在数据文件里，不生成页面、不进列表
     source    来源（行业动态必填）：{ name, url }

   由此，"每周固定发送"的实际操作是：一次性排产未来几周，
   再加上每周一次的定时生成与推送（定时任务见《新闻周更SOP.md》）。

   本地预览未来排期效果：
     $env:NEWS_TODAY="2026-10-06"; node tools/generate_site.mjs
*/

function localToday() {
  const override = process.env.NEWS_TODAY;
  if (override && /^\d{4}-\d{2}-\d{2}$/.test(override)) return override;
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** 生成当天（可用 NEWS_TODAY 覆盖，便于本地预览） */
export const NEWS_TODAY = localToday();

/** 决定上线日期的字段：publishAt 优先于 date */
export const publishDate = (n) => n.publishAt || n.date;

export const isDraft = (n) => n.draft === true;

/** 已发布：非草稿且已到上线日期。列表、首页与页面生成只用这个数组 */
export const LIVE_NEWS = NEWS
  .filter((n) => !isDraft(n) && publishDate(n) <= NEWS_TODAY)
  .sort((a, b) => publishDate(b).localeCompare(publishDate(a)));

/** 已排期未到期：留在数据文件里，到期后随下一次生成自动上线 */
export const SCHEDULED_NEWS = NEWS
  .filter((n) => !isDraft(n) && publishDate(n) > NEWS_TODAY)
  .sort((a, b) => publishDate(a).localeCompare(publishDate(b)));

/** 草稿：只存在于数据文件，不生成页面 */
export const DRAFT_NEWS = NEWS.filter(isDraft);

/** 列表页筛选按钮的顺序与内容 */
export const NEWS_CATEGORIES = NEWS_META.categoryOrder.filter((k) => NEWS_META.categoryLabel[k]);

/** 来源可以写成一个对象，也可以写成数组（多来源文章）；统一取成数组 */
export const sourcesOf = (n) => (Array.isArray(n.source) ? n.source : n.source ? [n.source] : []);
