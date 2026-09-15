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
    slug: "global-crude-steel-july-2026",
    date: "2026-08-24",
    publishAt: "2026-09-16",
    dateText: { en: "24 August 2026", zh: "2026 年 8 月 24 日" },
    category: "industry",
    image: "process/pouring-1",
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
    figures: [
      {
        img: "gallery/factory-09",
        w: 1200,
        h: 900,
        after: 1,
        caption: {
          en: "Lost-foam pouring area at our Botou plant — the melting end that regional scrap, coke and power costs feed into.",
          zh: "泊头基地的消失模浇铸区——各区域的废钢、焦炭与电力成本最终作用在这一端。",
        },
      },
      {
        img: "featured/ship-02",
        w: 1200,
        h: 900,
        after: 2,
        caption: {
          en: "A counterweight casting for construction machinery — one of the downstream uses of steel.",
          zh: "一件大型工程机械配重铸件——钢铁的下游应用之一。",
        },
      },
    ],
  },
  {
    slug: "container-freight-rates-sep-2026",
    date: "2026-09-10",
    publishAt: "2026-09-16",
    dateText: { en: "10 September 2026", zh: "2026 年 9 月 10 日" },
    category: "industry",
    image: "featured/ship-01",
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
    figures: [
      {
        img: "banner/banner-faq",
        w: 2000,
        h: 800,
        after: 2,
        caption: {
          en: "Valve body castings staged for dispatch in our warehouse.",
          zh: "仓库内成排待发货的阀体铸件。",
        },
      },
      {
        img: "banner/banner-products",
        w: 2000,
        h: 800,
        after: 3,
        caption: {
          en: "Grey iron valve bodies on pallets, banded and ready for container loading.",
          zh: "托盘上码放的灰铁阀体成品，已打带、等待装箱。",
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
        img: "quality/cmm",
        w: 1200,
        h: 900,
        after: 2,
        caption: {
          en: "ZEISS bridge-type CMM in the metrology room.",
          zh: "计量室内的 ZEISS 桥式三坐标测量机。",
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
