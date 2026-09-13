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
  categoryLabel: {
    investment: { en: "Investment", zh: "投资项目" },
    certification: { en: "Certification", zh: "资质认定" },
    environment: { en: "Environment", zh: "环保合规" },
    production: { en: "Production", zh: "生产运营" },
  },
};

export const NEWS = [
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
  },
];
