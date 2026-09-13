/**
 * 站点全站内容（中英双语）。
 * 所有面向访客的文案都集中在这里，改文案不需要动模板。
 * 标注 PLACEHOLDER 的字段需要老板确认后再上线。
 */

export const SITE = {
  nameEn: "Cangzhou FAMED Machinery Equipment Co., Ltd.",
  nameZh: "沧州菲美得机械设备有限公司",
  shortEn: "FAMED Botou Plant",
  shortZh: "菲美得泊头基地",
  legalEn: "Cangzhou FAMED Machinery Equipment Co., Ltd.",
  // 集团与品牌
  groupEn: "FAMED Group",
  groupZh: "菲美得集团",
  // 联系方式
  phone: "150-3173-5404",
  phoneIntl: "+86 150 3173 5404",
  whatsapp: "8615031735404",
  email: "czfamed1@outlook.com",
  emailService: "czfamed1@outlook.com",
  domain: "https://www.famedcasting.com", // PLACEHOLDER 域名待注册/确认
  icp: "冀ICP备00000000号-1", // PLACEHOLDER 备案号待确认
  // 地址
  plantZh: "河北省沧州市泊头市营子镇玉皇庙村",
  plantEn: "Yuhuangmiao Village, Yingzi Town, Botou, Cangzhou, Hebei, China",
  regZh: "河北省沧州市泊头市大鲁道中庙村",
  regEn: "Dalu Dao Zhongmiao Village, Botou, Cangzhou, Hebei, China",
  postcode: "062150",
  lat: 38.146653,
  lng: 116.421045,
  coordText: "116°25′15.761″E / 38°8′47.951″N",
  hoursEn: "Mon – Sat, 08:00 – 18:00 (GMT+8)",
  hoursZh: "周一至周六 08:00 – 18:00（北京时间）",
  // 关键数字
  stats: [
    { value: "2001", labelEn: "Group founded", labelZh: "集团创立" },
    { value: "30,000 t", labelEn: "Annual casting capacity", labelZh: "年铸造产能" },
    { value: "2.5 t", labelEn: "Maximum single casting weight", labelZh: "铸件单重上限" },
    { value: "96%", labelEn: "Group output exported to US, Japan & Europe", labelZh: "集团产品出口美日欧占比" },
  ],
  facts: [
    { kEn: "Founded", kZh: "成立时间", vEn: "2006 (plant) / 2001 (group)", vZh: "2006 年（本厂）/ 2001 年（集团）" },
    { kEn: "Plant area", kZh: "厂区占地", vEn: "70,000 m² site, 15,000 m² workshops", vZh: "占地 7 万㎡，建筑面积 1.5 万㎡" },
    { kEn: "Materials", kZh: "材质范围", vEn: "Grey iron HT150–HT300, ductile iron QT450-10 – QT800-5, ADI, low-temperature ductile iron", vZh: "灰铸铁 HT150–HT300，球墨铸铁 QT450-10 – QT800-5，ADI、低温球铁" },
    { kEn: "Casting capacity", kZh: "铸造产能", vEn: "Up to 30,000 t per year", vZh: "年产能 30,000 吨" },
    { kEn: "Max part size", kZh: "铸件尺寸上限", vEn: "2,000 × 1,800 × 1,200 mm", vZh: "2000 × 1800 × 1200 mm" },
    { kEn: "Max part weight", kZh: "铸件单重上限", vEn: "2.5 t", vZh: "2.5 吨" },
    { kEn: "Casting process", kZh: "铸造工艺", vEn: "Lost-foam (expendable pattern) as core process; resin-sand and shell moulding available within the group", vZh: "以消失模工艺为主，集团内可配套树脂砂、覆膜砂壳型等工艺" },
    { kEn: "In-house scope", kZh: "厂内工序", vEn: "Pattern foaming, moulding & pouring, cleaning, heat treatment, machining, painting, inspection, packing", vZh: "发泡制模、造型浇注、清理、热处理、机加工、涂装、检测、包装" },
    { kEn: "Quality system", kZh: "质量体系", vEn: "ISO 9001:2015 / GB/T 19001-2016", vZh: "ISO 9001:2015 / GB/T 19001-2016" },
  ],
};

/** 一级导航 */
export const NAV = [
  { id: "home", file: "index.html", en: "Home", zh: "首页" },
  { id: "about", file: "about.html", en: "About Us", zh: "关于我们" },
  {
    id: "products", file: "products.html", en: "Products", zh: "产品中心",
    children: "products",
  },
  { id: "capabilities", file: "capabilities.html", en: "Capabilities", zh: "制造能力" },
  { id: "quality", file: "quality.html", en: "Quality", zh: "质量控制" },
  { id: "applications", file: "applications.html", en: "Applications", zh: "应用领域" },
  { id: "certificates", file: "certificates.html", en: "Certificates", zh: "资质荣誉" },
  { id: "news", file: "news.html", en: "News", zh: "新闻资讯" },
  { id: "faq", file: "faq.html", en: "FAQ", zh: "常见问题" },
  { id: "contact", file: "contact.html", en: "Contact", zh: "联系我们" },
];

/** 通用界面文案 */
export const UI = {
  skipToContent: { en: "Skip to main content", zh: "跳到主要内容" },
  getQuote: { en: "Get a Quote", zh: "获取报价" },
  sendInquiry: { en: "Send Inquiry", zh: "提交询盘" },
  viewProducts: { en: "View Products", zh: "浏览产品" },
  learnMore: { en: "Learn more", zh: "了解更多" },
  viewDetails: { en: "View details", zh: "查看详情" },
  allProducts: { en: "All products", zh: "全部产品" },
  relatedProducts: { en: "Related products", zh: "相关产品" },
  talkToUs: { en: "Talk to an engineer", zh: "联系工程师" },
  whatsapp: { en: "WhatsApp", zh: "WhatsApp 咨询" },
  callUs: { en: "Call us", zh: "电话联系" },
  emailUs: { en: "Email us", zh: "邮件联系" },
  backToTop: { en: "Back to top", zh: "返回顶部" },
  breadcrumbHome: { en: "Home", zh: "首页" },
  langSwitch: { en: "中文", zh: "EN" },
  langSwitchLabel: { en: "Switch to Chinese", zh: "切换到英文" },
  menu: { en: "Menu", zh: "菜单" },
  close: { en: "Close", zh: "关闭" },
  required: { en: "Required", zh: "必填" },
  cookieText: {
    en: "We use cookies to analyse site traffic and improve your experience. You can accept analytics cookies or continue with essential cookies only.",
    zh: "本网站使用 Cookie 分析访问情况并改进体验。你可以接受分析类 Cookie，或仅使用必要的 Cookie 继续访问。",
  },
  cookieAccept: { en: "Accept", zh: "接受" },
  cookieDecline: { en: "Essential only", zh: "仅必要" },
  cookieMore: { en: "Privacy policy", zh: "隐私政策" },
  prev: { en: "Previous", zh: "上一张" },
  next: { en: "Next", zh: "下一张" },
  formSuccess: {
    en: "Thank you — your inquiry has been prepared. Our export team will reply within one working day.",
    zh: "感谢提交，询盘已生成。我们的外贸团队会在一个工作日内回复。",
  },
  formDemoNote: {
    en: "Demo mode: this prototype is not connected to a mail server yet. Submitting opens a pre-filled message in your mail client, addressed to {email}, so nothing is lost. Wire it to your form endpoint before launch.",
    zh: "演示模式：本原型尚未接入邮件服务。提交时会用你的邮件客户端打开一封已填好的询盘邮件，收件人是 {email}，确保信息不丢。上线前请接到正式表单接口。",
  },
  formMailHint: {
    en: "Inquiries go straight to our export mailbox. If the mail window does not open, write to us directly:",
    zh: "询盘会直接发到我们的外贸邮箱。如果邮件窗口没有打开，可直接写信给我们：",
  },
  formMailCopy: { en: "Copy address", zh: "复制邮箱" },
  formMailCopied: { en: "Copied", zh: "已复制" },
  galleryHint: { en: "Click a photo to enlarge", zh: "点击图片可放大查看" },
  mapLoad: { en: "Load interactive map", zh: "加载交互地图" },
  mapNote: {
    en: "The map is loaded from a third-party provider only after you click, so no data is sent before you consent.",
    zh: "地图来自第三方服务，点击后才加载，未点击前不会向第三方发送任何请求。",
  },
  openInMaps: { en: "Open in Google Maps", zh: "在 Google 地图中打开" },
};

/** 首页 */
export const HOME = {
  metaTitle: {
    en: "Lost-Foam Casting & Machined Parts Manufacturer in China | FAMED Botou Plant",
    zh: "消失模铸造与机加工零部件厂家 | 菲美得泊头生产基地",
  },
  metaDesc: {
    en: "Cangzhou FAMED Machinery Equipment Co., Ltd. is an ISO 9001 certified lost-foam foundry and machining plant in Botou, Hebei — up to 30,000 t/yr casting capacity, castings up to 2.5 t, part of the FAMED group with its export channels to the US, Japan and Europe.",
    zh: "沧州菲美得机械设备有限公司位于河北泊头，是 ISO 9001 认证的消失模铸造与机加工工厂：年铸造产能 30000 吨，铸件单重上限 2.5 吨；依托菲美得集团出口美日欧的渠道体系。",
  },
  heroKicker: {
    en: "FAMED Group · Botou casting & machining plant · Group founded 2001",
    zh: "菲美得集团 · 泊头铸造与机加工基地 · 集团创立于 2001 年",
  },
  heroTitle: {
    en: "Lost-foam & sand casting parts, machined and shipped worldwide",
    zh: "消失模与砂型铸造零部件，加工完成，直供全球",
  },
  heroText: {
    en: "An ISO 9001 certified foundry and machining plant in Botou, Hebei. Up to 30,000 tonnes of castings a year, parts up to 2.5 t and 2,000 × 1,800 × 1,200 mm — supported by the FAMED group's export channels to the United States, Japan and Europe.",
    zh: "河北泊头 ISO 9001 认证的铸造与机加工工厂，年铸造产能 30000 吨，可做单重 2.5 吨、尺寸 2000×1800×1200 mm 的铸件；背靠菲美得集团出口美国、日本、欧洲的成熟渠道。",
  },
  heroBadges: [
    { en: "ISO 9001:2015", zh: "ISO 9001:2015" },
    { en: "National High-Tech Enterprise", zh: "国家高新技术企业" },
    { en: "Hebei Specialised SME", zh: "河北省专精特新中小企业" },
  ],
  quickQuoteTitle: { en: "Request a quotation", zh: "快速询价" },
  quickQuoteText: {
    en: "Send us a drawing, a sample photo or a material grade and we will come back with a price, a lead time and a tooling plan.",
    zh: "发送图纸、样品照片或材质牌号，我们会回复价格、交期与模具方案。",
  },

  productsTitle: { en: "What we make", zh: "主营产品" },
  productsSubtitle: {
    en: "Casting plus machining under one roof — the part arrives finished, inspected and ready to assemble.",
    zh: "铸造与机加工在同一厂区完成，交付的是已完成加工与检验、可直接装配的零件。",
  },

  whyTitle: { en: "Why buyers choose this plant", zh: "为什么选择菲美得泊头基地" },
  whySubtitle: {
    en: "Four practical reasons our export customers keep coming back.",
    zh: "四条让海外客户持续返单的实际理由。",
  },
  why: [
    {
      icon: "group",
      en: "Group export channel behind an established foundry group",
      zh: "背靠成熟的集团出口渠道",
      textEn: "30% of the company is held by Beijing FAMED Machinery Co., Ltd. The group holds a warehouse and subsidiary in Hamburg, Germany, and exports 96% of its output to the US, Japan and Europe — so your order sits inside an established export flow.",
      textZh: "公司 30% 股权由北京菲美得机械有限公司持有。集团在德国汉堡设有仓库与子公司，产品 96% 出口美国、日本与欧洲，订单依托的是成熟稳定的出口体系。",
    },
    {
      icon: "scope",
      en: "From foam pattern to painted part, in-house",
      zh: "从泡沫模到涂装成品，全工序自制",
      textEn: "Foaming, pattern assembly, moulding, melting, cleaning, heat treatment, CNC machining and painting all happen on site, which keeps lead times predictable and quality traceable to a single plant.",
      textZh: "发泡、白模组装、造型、熔炼浇注、清理、热处理、数控加工与涂装均在厂内完成，交期可控，质量可追溯到单一工厂。",
    },
    {
      icon: "shield",
      en: "Clean compliance record and A-grade tax credit",
      zh: "合规记录干净，纳税信用连续 A 级",
      textEn: "No administrative penalties, no abnormal-operation listings, no environmental violations, and an A-grade taxpayer credit rating for 2019–2024 — the kind of paper trail European and Japanese buyers ask for.",
      textZh: "无行政处罚、无经营异常、无环保处罚，2019—2024 年纳税信用连续 A 级——这正是欧美日客户在供应商审核中会查的底子。",
    },
    {
      icon: "gauge",
      en: "Capacity headroom for growth",
      zh: "有产能余量，跟得上你的增长",
      textEn: "A 30,000 t/yr precision casting expansion project passed its environmental impact approval in December 2025 and the first phase is already in commissioning, alongside a completed environmental upgrade of the paint line.",
      textZh: "年产 3 万吨精密铸件扩建项目已于 2025 年 12 月取得环评批复，一期已在推进验收；涂装线环保升级已完成。产能有明确余量。",
    },
  ],
  capabilityTitle: { en: "Inside the plant", zh: "车间实况" },
  capabilitySubtitle: {
    en: "Lost-foam pattern shop, melting and pouring, CNC machining and a sealed paint line — photographed on site.",
    zh: "消失模制模、熔炼浇注、数控加工与全密闭涂装线，均为厂区实拍。",
  },
  capabilityLink: { en: "See full manufacturing capability", zh: "查看完整制造能力" },
  certsTitle: { en: "Certified and audited", zh: "资质与认定" },
  certsSubtitle: {
    en: "National High-Tech Enterprise, provincial specialised-SME and technology-based SME ratings, a green foundry honour, ISO 9001 certification, a valid discharge permit and six straight years of A-grade tax credit. The documents are below.",
    zh: "国家高新技术企业、省级专精特新中小企业、科技型中小企业、绿色铸造示范企业，ISO9001 体系认证、有效排污许可，2019—2024 连续六年纳税信用 A 级。以下为证件原件。",
  },
  featuredTitle: { en: "Recent production", zh: "近期出货" },
  featuredSubtitle: {
    en: "Parts cast, machined and inspected at Botou. Photos are representative of current production.",
    zh: "泊头基地铸造、加工并检验完成的零件，均为当前在产产品实拍。",
  },
  newsTitle: { en: "Company news", zh: "公司动态" },
  newsSubtitle: {
    en: "Investment projects, certifications and plant upgrades, compiled from public records.",
    zh: "投资项目、资质认定与厂区升级，来源为公开披露信息。",
  },
  ctaTitle: { en: "Send us a drawing, get a price", zh: "发图纸，给价格" },
  ctaText: {
    en: "Tell us the material, the annual volume and the finishing you need. Quotes usually go out within one working day.",
    zh: "告诉我们材质、年用量和表面处理要求，通常一个工作日内给出报价。",
  },
};

/** 关于我们 */
export const ABOUT = {
  metaTitle: {
    en: "About Us | Lost-Foam Foundry in Botou, Hebei — FAMED",
    zh: "关于我们 | 河北泊头消失模铸造工厂 — 菲美得",
  },
  metaDesc: {
    en: "Cangzhou FAMED Machinery Equipment Co., Ltd. — founded 2006, 70,000 m² site in Botou, Hebei, 30% held by Beijing FAMED Machinery. Casting, machining and coating under one roof.",
    zh: "沧州菲美得机械设备有限公司，成立于 2006 年，厂区位于河北泊头，占地 7 万㎡，北京菲美得机械有限公司持股 30%，铸造、机加工与涂装一体完成。",
  },
  title: { en: "About Us", zh: "关于我们" },
  lead: {
    en: "A foundry that grew up inside an export group — and stayed focused on casting and machining metal parts for equipment builders.",
    zh: "一家在出口集团体系内成长起来的铸造企业，长期专注为装备制造客户生产铸件与加工件。",
  },
  sections: [
    {
      id: "profile",
      navEn: "Company Profile", navZh: "公司简介",
      title: { en: "Company profile", zh: "公司简介" },
      paras: [
        {
          en: "Cangzhou FAMED Machinery Equipment Co., Ltd. was registered on 17 February 2006 — as Botou Fengda Machinery Casting Co., Ltd. until it took its present name in 2016, the same year Beijing FAMED Machinery Co., Ltd. took a 30% stake and the company joined what is now the FAMED group structure. The registered standard industry classification is ferrous metal casting (C3391).",
          zh: "沧州菲美得机械设备有限公司于 2006 年 2 月 17 日注册成立，原名泊头市峰达机械铸造有限公司，2016 年更名；同年北京菲美得机械有限公司入股 30%，公司由此进入今天的菲美得集团体系。工商登记的国标行业为黑色金属铸造（C3391）。",
        },
        {
          en: "The plant sits in Yingzi Town, Botou, Hebei — a district that has been casting iron for centuries and is still home to a large cluster of pump, valve and machine-tool casting producers. Our site covers 70,000 m² with 15,000 m² of workshops, 15 km from the Beijing–Shanghai expressway and 10 km from National Highway 104.",
          zh: "厂区位于河北省泊头市营子镇。泊头铸造历史悠久，是国内泵阀与机床铸件的主要产地之一。厂区占地 7 万㎡、建筑面积 1.5 万㎡，距京沪高速 15 公里、104 国道 10 公里。",
        },
        {
          en: "Day to day, we do one thing: turn a drawing into a casting, then machine it to the tolerances the assembly needs. Lost-foam moulding carries most of the volume, with foaming, pattern assembly, coating, melting, cleaning, heat treatment, CNC machining and painting all in-house. Casting capacity at this plant runs up to 30,000 tonnes a year.",
          zh: "我们日常只做一件事：把图纸做成铸件，再按装配要求的公差加工到位。主力工艺为消失模造型，发泡、白模组装、涂料、熔炼、清理、热处理、数控加工与涂装均在厂内完成。本厂年铸造产能 30000 吨。",
        },
        {
          en: "Because three quarters of the group's output leaves China for the United States, Japan and Europe, our working habits are shaped by export expectations: material certificates with every shipment, dimensional reports, packaging that survives a container, and dates we can actually hold.",
          zh: "集团约 96% 的产品出口美国、日本与欧洲，因此我们的作业习惯是按出口标准养成的：每批附带材质证明与尺寸检测报告，包装能经得起海运，承诺的交期能守住。",
        },
      ],
    },
    {
      id: "history",
      navEn: "Milestones", navZh: "发展历程",
      title: { en: "Milestones", zh: "发展历程" },
      timeline: [
        { year: "2001", en: "FAMED Group is founded.", zh: "菲美得集团创立。" },
        { year: "2002", en: "Beijing FAMED Machinery Co., Ltd. is registered — today the group headquarters and a 30% shareholder of this company.", zh: "北京菲美得机械有限公司注册成立，即今天的集团总部，也是本公司 30% 股东。" },
        { year: "2006", en: "Botou Fengda Machinery Casting Co., Ltd. is registered — the legal predecessor of this plant.", zh: "泊头市峰达机械铸造有限公司注册成立，即本公司的前身。" },
        { year: "2013", en: "The group takes a controlling stake in JULAY-FAMED GmbH in Germany and opens a warehouse in Hamburg.", zh: "集团控股德国 JULAY-FAMED.GM 并设立汉堡仓库。" },
        { year: "2016", en: "The company is renamed Cangzhou FAMED Machinery Equipment Co., Ltd.; Beijing FAMED acquires 30% of the equity.", zh: "公司更名为沧州菲美得机械设备有限公司；北京菲美得入股 30%。" },
        { year: "2023", en: "Recognised as a National High-Tech Enterprise. The 30,000 t/yr precision casting technical-renovation project enters environmental review.", zh: "获认定为国家高新技术企业；年产 3 万吨精密铸件技改项目进入环评受理。" },
        { year: "2024", en: "Named a Hebei Specialised, Refined, Distinctive and Innovative SME. The coating process upgrade is filed and completed. Discharge permit first issued.", zh: "获评河北省专精特新中小企业；涂装工艺升级改造项目完成备案并实施；首次取得排污许可证。" },
        { year: "2025–2026", en: "The 30,000 t/yr precision casting expansion is approved (2025-12) and phase one passes completed-project acceptance. A new discharge permit is issued in April 2026, valid to 2031.", zh: "年产 3 万吨精密铸件扩建项目于 2025 年 12 月获批复，一期完成阶段性竣工环保验收；2026 年 4 月换发新排污许可证，有效期至 2031 年。" },
      ],
    },
    {
      id: "culture",
      navEn: "How We Work", navZh: "企业文化",
      title: { en: "How we work", zh: "我们的做法" },
      values: [
        { en: "Say the real date", zh: "承诺可兑现的交期", textEn: "We would rather quote four weeks and deliver in four weeks than quote two and apologise.", textZh: "宁可报四周、如期四周交付，也不报两周再回头道歉。" },
        { en: "Measure, then argue", zh: "用数据说话", textEn: "Material chemistry, hardness and dimensions are recorded per batch. Disagreements get settled with a report, not an opinion.", textZh: "每批记录化学成分、硬度与尺寸。有分歧用检测报告解决，不靠口头解释。" },
        { en: "Fix the process, not the part", zh: "改工艺，不改成品", textEn: "When a defect appears we change the pattern, the gating or the cooling — not the inspection standard.", textZh: "出现缺陷时改的是模具、浇注系统或冷却方式，而不是放宽检验标准。" },
        { en: "Be a supplier you can audit", zh: "经得起审核的供应商", textEn: "Certificates, permits and inspection records are kept current so your audit takes an afternoon, not a month.", textZh: "证照与检验记录保持有效可查，让你的供应商审核一个下午就能完成。" },
      ],
    },
  ],
  galleryTitle: { en: "Plant gallery", zh: "厂区掠影" },
  galleryText: {
    en: "Workshops, pattern shop and finishing lines, photographed on site.",
    zh: "车间、制模工部与涂装线的现场实拍。",
  },
};

/** 制造能力 */
export const CAPABILITIES = {
  metaTitle: {
    en: "Casting & Machining Capabilities | Lost-Foam Foundry, Hebei",
    zh: "铸造与机加工能力 | 河北消失模铸造工厂",
  },
  metaDesc: {
    en: "Lost-foam pattern foaming, pattern assembly, refractory coating, melting and pouring, cleaning, heat treatment, CNC machining, painting and 3D inspection. Casting capacity up to 30,000 t/yr; castings to 2.5 t and 2,000 × 1,800 × 1,200 mm.",
    zh: "涵盖发泡成型、白模组装、涂料烘干、熔炼浇注、清理热处理、数控加工、涂装与三维检测的完整工序；年铸造产能 30000 吨，可做单重 2.5 吨、尺寸 2000×1800×1200 mm 的铸件。",
  },
  title: { en: "Manufacturing Capabilities", zh: "制造能力" },
  lead: {
    en: "One plant, eight processes, one set of tolerances to hit.",
    zh: "一个厂区、八道主要工序、一套统一的公差标准。",
  },
  flowTitle: { en: "Process route", zh: "工艺路线" },
  flowText: {
    en: "From customer drawing to packed pallet. Everything except a few special processes happens under our own roof.",
    zh: "从客户图纸到打包托盘，除少数特殊工序外全部在厂内完成。",
  },
  flow: [
    { no: "01", en: "Engineering review & 3D verification", zh: "工艺评审与三维验证",
      textEn: "CAD and CAE review of the drawing — shrinkage allowance, gating and feeding, machining stock — with 3D scanning used to verify the tool and the first casting.", textZh: "用 CAD 与 CAE 评审图纸（缩尺、浇冒口、加工余量），并用三维扫描验证模具与首件尺寸。" },
    { no: "02", en: "Foam pattern moulding", zh: "发泡成型",
      textEn: "EPS beads are pre-expanded, aged and steam-moulded in aluminium tooling, then cooled and stripped. Multi-cavity tooling is used for high-volume parts.", textZh: "EPS 珠粒经预发、熟化后在铝合金模具中蒸汽成型，冷却后开模取件；批量件采用多腔模具。" },
    { no: "03", en: "Pattern assembly", zh: "白模修整与组装",
      textEn: "Patterns are trimmed, glued into assemblies, gauged and stored to a controlled drying schedule before coating.", textZh: "白模修整、粘接成组合件、检具校验，并按烘干规范存放后进入涂料工序。" },
    { no: "04", en: "Refractory coating & drying", zh: "涂料与烘干",
      textEn: "Patterns are dipped in refractory slurry — mixed in a large stirred tank — then dried in a controlled room. Coating thickness decides surface finish and burn-on.", textZh: "白模浸涂耐火涂料浆（浆料在搅拌池中调配），再进入受控烘干房。涂层厚度直接决定铸件表面质量与粘砂情况。" },
    { no: "05", en: "Moulding & pouring", zh: "造型与浇注",
      textEn: "Lost-foam moulding in dry sand with vacuum assistance; induction furnace melting with spectrometer checks on chemistry before the pour, and pouring temperature logged per heat.", textZh: "干砂消失模造型并辅以负压；中频电炉熔炼，浇注前用光谱仪确认化学成分，逐炉记录浇注温度。" },
    { no: "06", en: "Cleaning & heat treatment", zh: "清理与热处理",
      textEn: "Knock-out, shot blasting, riser removal and grinding; normalising, annealing or quenching and tempering where the drawing calls for it.", textZh: "落砂、抛丸、去冒口与打磨；按图纸要求进行正火、退火或调质处理。" },
    { no: "07", en: "Machining", zh: "机加工",
      textEn: "CNC machining centres and boring mills rough and finish faces, bores and bolt patterns to the drawing, with CMM checks on critical features.", textZh: "数控加工中心与镗铣床按图纸完成端面、孔系与螺栓孔系的粗精加工，关键尺寸用三坐标复检。" },
    { no: "08", en: "Coating, inspection & packing", zh: "涂装、检测与包装",
      textEn: "Primer and top coat on a hanging conveyor line with a sealed spray booth and off-gas treatment, then final inspection and export packing.", textZh: "悬挂输送线完成底漆与面漆，喷房全密闭并配套废气处理；随后终检并按出口要求包装。" },
  ],
  equipmentTitle: { en: "Equipment & capacity", zh: "设备与产能" },
  equipmentText: {
    en: "Capacity figures below are the plant's own; group figures are labelled as such. Equipment lists are indicative and can be confirmed against the on-site register during an audit.",
    zh: "下表产能为本厂口径，集团口径已单独标注。设备清单为示意，可在验厂时对照现场台账核实。",
  },
  equipment: [
    { kEn: "Casting capacity", kZh: "铸造产能", vEn: "Up to 30,000 t of castings per year", vZh: "年产能 30,000 吨铸件" },
    { kEn: "Max casting size", kZh: "铸件尺寸上限", vEn: "2,000 × 1,800 × 1,200 mm", vZh: "2000 × 1800 × 1200 mm" },
    { kEn: "Max casting weight", kZh: "铸件单重上限", vEn: "2.5 t", vZh: "2.5 吨" },
    { kEn: "Melting", kZh: "熔炼", vEn: "Medium-frequency induction furnaces with spectrometer control", vZh: "中频感应电炉熔炼，光谱仪成分控制" },
    { kEn: "Pattern shop", kZh: "制模", vEn: "Multi-station steam foaming machines with aluminium tooling and a mould store", vZh: "多台蒸汽发泡成型机，配套铝合金模具与模具库" },
    { kEn: "Moulding lines", kZh: "造型", vEn: "Lost-foam (expendable pattern) line with vacuum-assisted dry sand; resin-sand and shell moulding available in group plants", vZh: "消失模造型线，干砂负压；树脂砂与覆膜砂壳型可由集团工厂配套" },
    { kEn: "Machining", kZh: "机加工", vEn: "CNC machining centres, boring and milling machines, CNC lathes", vZh: "数控加工中心、镗铣床、数控车床" },
    { kEn: "Finishing", kZh: "表面处理", vEn: "Shot blasting, gas-fired heat-treatment furnaces, sealed paint line with off-gas treatment", vZh: "抛丸清理、燃气热处理炉、全密闭涂装线并配套废气处理" },
    { kEn: "Inspection", kZh: "检测", vEn: "Optical emission spectrometer, ZEISS bridge-type CMM, hardness testers, handheld 3D laser scanning", vZh: "光谱分析仪、ZEISS 桥式三坐标测量机、硬度计、手持式三维激光扫描" },
    { kEn: "Site", kZh: "厂区", vEn: "70,000 m² site / 15,000 m² workshops; 15 km to the Beijing–Shanghai expressway", vZh: "占地 7 万㎡ / 建筑 1.5 万㎡；距京沪高速 15 公里" },
  ],
  materialTitle: { en: "Materials we pour", zh: "可生产材质" },
  materials: [
    { en: "Grey iron", zh: "灰铸铁", items: "HT150 / HT200 / HT250 / HT300" },
    { en: "Ductile iron", zh: "球墨铸铁", items: "QT450-10 / QT500-7 / QT600-3 / QT700-2" },
    { en: "High-performance ductile iron", zh: "高性能球铁", items: "As-cast QT800-5, Si-strengthened ferritic ductile iron, low-temperature ductile iron" },
    { en: "ADI", zh: "等温淬火球铁", items: "Austempered ductile iron for wear parts" },
    { en: "Steel castings (group)", zh: "铸钢件（集团）", items: "Precision steel castings and high-manganese steel" },
  ],
  materialNote: {
    en: "Weldability, machinability and heat-treatment condition are agreed per part during engineering review.",
    zh: "焊接性、切削性能与热处理状态在工艺评审阶段按零件逐一确认。",
  },
};

/** 质量控制 */
export const QUALITY = {
  metaTitle: {
    en: "Quality Control | ISO 9001 Foundry with In-House Testing",
    zh: "质量控制 | ISO 9001 认证铸造厂，检测在厂内完成",
  },
  metaDesc: {
    en: "ISO 9001:2015 quality system, in-house spectrometer, CMM, hardness testing, NDT, 3D scanning, tensile and low-temperature impact testing. Material certificates shipped with every batch.",
    zh: "ISO 9001:2015 质量体系，厂内配备光谱分析仪、三坐标、硬度检测、无损探伤、三维扫描、拉力与低温冲击试验，每批随附材质证明。",
  },
  title: { en: "Quality Control", zh: "质量控制" },
  lead: {
    en: "Quality in a foundry is decided before the pour. Our control points start with the incoming scrap and the pattern, not with the final inspection.",
    zh: "铸造的质量在浇注前就已决定。我们的控制点从入厂炉料与模具开始，而不是从终检开始。",
  },
  systemTitle: { en: "Quality system", zh: "质量体系" },
  systemText: {
    en: "Our management system is certified to GB/T 19001-2016 / ISO 9001:2015. The certificate covers the design and manufacture of castings and machined parts, and is currently valid.",
    zh: "公司质量管理体系通过 GB/T 19001-2016 / ISO 9001:2015 认证，覆盖铸件与加工件的设计与制造，证书在有效期内。",
  },
  pointsTitle: { en: "Control points", zh: "控制要点" },
  points: [
    { en: "Incoming materials", zh: "原材料入厂",
      textEn: "Charge materials and alloys are verified on arrival; scrap returns are sorted by grade to keep chemistry predictable.", textZh: "炉料与合金入厂即核验；回炉料按牌号分类，保证成分稳定。" },
    { en: "Pattern and coating", zh: "模具与涂料",
      textEn: "Foam patterns are measured and assembled against the tool drawing; coating thickness and drying are controlled before moulding.", textZh: "白模按模具图测量并组装；涂料厚度与烘干状态在造型前受控。" },
    { en: "Chemistry", zh: "化学成分",
      textEn: "Every heat is checked on the optical emission spectrometer, with the result recorded against the heat number.", textZh: "每炉用光谱分析仪检测成分，结果与该炉次编号一一记录。" },
    { en: "Pouring", zh: "浇注过程",
      textEn: "Pouring temperature and time are logged per mould; inoculation is controlled for ductile iron.", textZh: "逐箱记录浇注温度与时间；球铁孕育处理受控。" },
    { en: "Dimensional & mechanical", zh: "尺寸与力学",
      textEn: "CMM and calliper checks for machined features; hardness on every batch and tensile or impact tests where the drawing calls for them.", textZh: "加工部位用三坐标与卡尺检测；每批测硬度，图纸要求时做拉力或冲击试验。" },
    { en: "Final & documentation", zh: "终检与文件",
      textEn: "Surface, finish and marking are checked at packing, and a material certificate accompanies every shipment.", textZh: "包装前检查外观、涂装与标识，每批出货随附材质证明。" },
  ],
  equipmentTitle: { en: "Testing equipment", zh: "检测设备" },
  equipment: [
    { en: "Optical emission spectrometer", zh: "光谱分析仪" },
    { en: "ZEISS bridge-type coordinate measuring machine (CMM)", zh: "ZEISS 桥式三坐标测量机" },
    { en: "Handheld 3D laser scanning for pattern and part verification", zh: "手持式三维激光扫描（模具与零件验证）" },
    { en: "Hardness testers (Brinell / portable)", zh: "硬度计（布氏 / 便携式）" },
    { en: "Non-destructive testing (dye penetrant / ultrasonic)", zh: "无损探伤（渗透 / 超声）" },
    { en: "Tensile testing machine", zh: "拉力试验机" },
    { en: "Low-temperature impact testing", zh: "低温冲击试验机" },
    { en: "Metallographic and laboratory facilities", zh: "金相与化验室" },
  ],
  equipmentNote: {
    en: "Equipment list is indicative of current capability; the on-site register is available for verification during supplier audits.",
    zh: "设备清单反映当前能力范围，验厂时可对照现场台账逐项核实。",
  },
  standardsTitle: { en: "Standards we work to", zh: "执行标准" },
  standards: [
    { en: "Material grades", zh: "材质牌号", vEn: "GB/T 9439 (grey iron), GB/T 1348 (ductile iron), equivalent ISO and ASTM grades on request", vZh: "GB/T 9439 灰铸铁、GB/T 1348 球墨铸铁，可对应 ISO 与 ASTM 牌号" },
    { en: "Castings", zh: "铸件标准", vEn: "GB/T 6414 dimensional tolerances; ISO 8062 for general tolerances", vZh: "GB/T 6414 尺寸公差；通用公差参照 ISO 8062" },
    { en: "Machining", zh: "加工标准", vEn: "General tolerances to GB/T 1804-m unless the drawing specifies tighter", vZh: "未注公差按 GB/T 1804-m 执行，图纸有更严要求时按图纸" },
    { en: "Flanges", zh: "法兰", vEn: "EN 1092, ANSI B16.5, JIS and GB flange standards", vZh: "EN 1092、ANSI B16.5、JIS 与 GB 法兰标准" },
    { en: "Documents", zh: "随附文件", vEn: "Material certificate, dimensional report, hardness record, packing list", vZh: "材质证明、尺寸检测报告、硬度记录、装箱单" },
  ],
};

/** 应用领域 */
export const APPLICATIONS = {
  metaTitle: {
    en: "Applications | Castings for Machinery, Mining, Railway & Oil Equipment",
    zh: "应用领域 | 工程机械、矿山、铁路与石油设备铸件",
  },
  metaDesc: {
    en: "Cast and machined parts for construction machinery, mining, oil and gas, railway, elevators, gearboxes, machine tools, valves and metallurgical equipment.",
    zh: "用于工程机械、矿山机械、石油装备、铁路、电梯、减速机、机床、阀门与冶金设备等领域的铸件与加工件。",
  },
  title: { en: "Applications", zh: "应用领域" },
  lead: {
    en: "Buyers usually arrive with a machine in mind, not a material grade. These are the equipment segments our castings end up in.",
    zh: "客户通常是带着一台设备来找供应商，而不是带着材质牌号。以下是我们铸件最终装上去的设备类型。",
  },
  items: [
    { icon: "excavator", en: "Construction machinery", zh: "工程机械",
      textEn: "Counterweights, front and rear axle housings, bases, boom and arm brackets, tower-crane hook counterweights.", textZh: "配重铁、前后桥壳、底座、大臂与支架、塔吊大钩配重铁。" },
    { icon: "mining", en: "Mining & crushing", zh: "矿山与破碎设备",
      textEn: "Wear-resistant wear plates, crusher frames, liners and heavy duty housings.", textZh: "耐磨衬板、破碎机机架、衬套与重型箱体。" },
    { icon: "oil", en: "Oil & gas equipment", zh: "石油机械",
      textEn: "Valve bodies, manifolds and pressure-retaining castings for wellhead and pipeline equipment.", textZh: "阀体、管汇及井口与管道设备用承压铸件。" },
    { icon: "rail", en: "Railway & transit", zh: "铁路与轨道交通",
      textEn: "Brake system components, brackets and castings for rolling-stock fittings.", textZh: "制动系统配件、支架及车辆配套铸件。" },
    { icon: "elevator", en: "Elevators & escalators", zh: "电梯与扶梯",
      textEn: "Machine bases, counterweights, traction sheave blanks and safety gear components.", textZh: "曳引机底座、配重块、曳引轮毛坯与安全部件。" },
    { icon: "gearbox", en: "Gearboxes & reducers", zh: "减速机与齿轮箱",
      textEn: "Gear ring blanks, housings and bearing seats for industrial gear units.", textZh: "齿圈毛坯、箱体与轴承座。" },
    { icon: "machine", en: "Machine tools & general machinery", zh: "机床与通用机械",
      textEn: "Machine frames, beds, columns, slide components, electric motor bodies and end shields.", textZh: "机床机身、床身、立柱、滑板部件、电机机体与端盖。" },
    { icon: "valve", en: "Valves, pumps & piping", zh: "阀门、泵与管道",
      textEn: "Valve bodies and cocks, pipe fittings, flanges and pump casings.", textZh: "阀体与旋塞、管件、法兰与泵壳。" },
    { icon: "metallurgy", en: "Metallurgy & coking", zh: "冶金与焦化",
      textEn: "Furnace fittings, charging equipment parts and heat-resistant structural castings.", textZh: "护炉铁件、加料设备配件与耐热结构铸件。" },
  ],
  note: {
    en: "Application examples are drawn from the group's product literature and the plant's enquiry history. Send a drawing and we will confirm feasibility within two working days.",
    zh: "以上应用取自集团产品资料与本厂询盘记录。发送图纸后我们会在两个工作日内回复可行性判断。",
  },
  ctaTitle: { en: "Not sure which material fits your part?", zh: "不确定零件该用什么材质？" },
  ctaText: {
    en: "Send the drawing and the service conditions. We will propose a grade, a process and a price — then tell you honestly if the part is outside our range.",
    zh: "把图纸和工况发给我们，我们会给出材质、工艺与报价；如果超出我们的能力范围，也会如实告知。",
  },
};

/** 资质荣誉 */
export const CERTIFICATES = {
  metaTitle: {
    en: "Certificates & Honours | High-Tech Enterprise, ISO 9001",
    zh: "资质荣誉 | 高新技术企业、ISO9001 认证",
  },
  metaDesc: {
    en: "National High-Tech Enterprise, Hebei Specialised SME, technology-based SME, green foundry enterprise, ISO 9001:2015, A-grade tax credit 2019–2024, valid discharge permit and 13 granted patents.",
    zh: "国家高新技术企业、河北省专精特新中小企业、科技型中小企业、绿色铸造企业、ISO9001:2015 认证、2019—2024 年纳税信用 A 级、有效排污许可与 13 项授权专利。",
  },
  title: { en: "Certificates & Honours", zh: "资质荣誉" },
  lead: {
    en: "Certificates matter to procurement because they replace a site visit. Here is what we hold, with the year it was granted.",
    zh: "对采购而言，证照的价值在于可以替代一次现场考察。以下是我们持有的认定与年度。",
  },
  honouredTitle: { en: "Recognition & honours", zh: "认定与荣誉" },
  honoured: [
    { year: "2023", titleEn: "National High-Tech Enterprise", titleZh: "国家高新技术企业", descEn: "Awarded for R&D capability and technology transfer in casting and machining.", descZh: "面向铸造与机加工领域的技术研发与成果转化能力认定。", img: "certs/hitech-enterprise" },
    { year: "2024", titleEn: "Hebei Specialised, Refined, Distinctive & Innovative SME", titleZh: "河北省专精特新中小企业", descEn: "Valid until 28 March 2027.", descZh: "有效期至 2027 年 3 月 28 日。" },
    { year: "2023", titleEn: "Technology-Based SME", titleZh: "科技型中小企业", descEn: "Certificate no. SKX202312J1560037, issued by the Hebei Department of Science and Technology; valid three years.", descZh: "认定编号 SKX202312J1560037，河北省科学技术厅发证，有效期 3 年。", img: "certs/tech-sme" },
    { year: "2018", titleEn: "Green Foundry Demonstration Enterprise", titleZh: "绿色铸造示范企业", descEn: "Honour certificate from the Hebei Foundry Industry Association, October 2018.", descZh: "河北省铸造行业协会 2018 年 10 月颁发的荣誉证书。", img: "certs/green-foundry" },
  ],
  complianceTitle: { en: "Compliance & credit", zh: "合规与信用" },
  compliance: [
    { titleEn: "ISO 9001:2015 / GB/T 19001-2016", titleZh: "ISO 9001:2015 / GB/T 19001-2016", descEn: "Quality management system certificate no. 785Q1250263R1M, issued 6 September 2025 by Tianjin Zheng Tong Gong Xin Certification Co., Ltd., valid until 5 September 2028.", descZh: "质量管理体系认证，证书编号 785Q1250263R1M，天津证通公信认证有限公司 2025 年 9 月 6 日颁发，有效期至 2028 年 9 月 5 日。", img: "certs/iso9001" },
    { titleEn: "A-grade taxpayer credit, 2019–2024", titleZh: "纳税信用 A 级（2019—2024）", descEn: "Six consecutive years at A grade.", descZh: "2019—2024 连续六年获评纳税信用 A 级。" },
    { titleEn: "Pollutant discharge permit", titleZh: "排污许可证", descEn: "Reissued 10 April 2026 by the Cangzhou Administrative Approval Bureau, valid until 9 April 2031 (certificate no. 91130981784093371Y001C).", descZh: "沧州市行政审批局 2026 年 4 月 10 日换发，有效期至 2031 年 4 月 9 日（证书编号 91130981784093371Y001C）。", img: "certs/discharge-permit" },
    { titleEn: "Clean record", titleZh: "无不良记录", descEn: "No administrative penalties, no abnormal-operation listing, no environmental violations, no unpaid-tax notices.", descZh: "无行政处罚、无经营异常、无环保处罚、无欠税公告。" },
    { titleEn: "Import & export credit registration", titleZh: "进出口信用备案", descEn: "Registered for self-operated import and export since 31 October 2023.", descZh: "2023 年 10 月 31 日完成备案，具备自营进出口资格。" },
  ],
  scansTitle: { en: "Certificate scans", zh: "证书扫描件" },
  scansLead: {
    en: "The documents behind the list above, exactly as issued. Click a certificate to enlarge it.",
    zh: "以上认定与合规项对应的证件原件，点击可查看大图。",
  },
  scansCta: { en: "See the certificate scans", zh: "查看证书扫描件" },
  allCta: { en: "All certificates, compliance & patents", zh: "查看全部资质、合规与专利" },
  viewScan: { en: "View scan", zh: "查看扫描件" },
  scans: [
    {
      img: "certs/hitech-enterprise", w: 1400, h: 1000, year: "2023",
      titleEn: "National High-Tech Enterprise Certificate",
      titleZh: "国家高新技术企业证书",
      metaEn: "Certificate no. GR202313000812 · Approved 16 October 2023 by the Hebei Department of Science and Technology, the Hebei Department of Finance and the Hebei office of the State Taxation Administration · Valid three years",
      metaZh: "证书编号 GR202313000812 · 2023 年 10 月 16 日由河北省科学技术厅、河北省财政厅、国家税务总局河北省税务局批准 · 有效期三年",
    },
    {
      img: "certs/tech-sme", w: 1400, h: 1000, year: "2023",
      titleEn: "Hebei Technology-Based SME Certificate",
      titleZh: "河北省科技型中小企业证书",
      metaEn: "Recognition no. SKX202312J1560037 · Issued 14 December 2023 by the Hebei Department of Science and Technology · Valid three years",
      metaZh: "认定编号 SKX202312J1560037 · 河北省科学技术厅 2023 年 12 月 14 日发证 · 有效期 3 年",
    },
    {
      img: "certs/green-foundry", w: 1400, h: 1000, year: "2018",
      titleEn: "Green Foundry Demonstration Enterprise",
      titleZh: "绿色铸造示范企业",
      metaEn: "Honour certificate awarded by the Hebei Foundry Industry Association, October 2018",
      metaZh: "河北省铸造行业协会 2018 年 10 月颁发的荣誉证书",
    },
    {
      img: "certs/iso9001", w: 1130, h: 1500, year: "2025",
      titleEn: "Quality Management System Certificate",
      titleZh: "质量管理体系认证证书",
      metaEn: "GB/T 19001-2016 / ISO 9001:2015 · Certificate no. 785Q1250263R1M · Issued 6 September 2025 by Tianjin Zheng Tong Gong Xin Certification Co., Ltd. · Valid until 5 September 2028",
      metaZh: "GB/T19001-2016 / ISO9001:2015 · 证书编号 785Q1250263R1M · 天津证通公信认证有限公司 2025 年 9 月 6 日颁发 · 有效期至 2028 年 9 月 5 日",
    },
    {
      img: "certs/discharge-permit", w: 1400, h: 1000, year: "2026",
      titleEn: "Pollutant Discharge Permit",
      titleZh: "排污许可证正本",
      metaEn: "Certificate no. 91130981784093371Y001C · Valid 10 April 2026 to 9 April 2031 · Issued by the Cangzhou Administrative Approval Bureau",
      metaZh: "证书编号 91130981784093371Y001C · 有效期 2026 年 4 月 10 日至 2031 年 4 月 9 日 · 沧州市行政审批局核发",
    },
  ],
  patentsTitle: { en: "Patents", zh: "专利" },
  patentsText: {
    en: "13 granted patents, concentrated on wear-resistant castings, counterweights, gear-ring blanks and lost-foam coating equipment. A selection:",
    zh: "累计 13 项授权专利，集中在耐磨铸件、配重件、齿圈毛坯与消失模涂料设备等自身产品线关键环节。以下为部分授权专利：",
  },
  patents: [
    { id: "CN223924500U", date: "2026-02-17", titleEn: "Wear-resistant, stackable casting blank", titleZh: "一种耐磨损且方便堆叠存放的铸件毛坯" },
    { id: "—", date: "2025-12-06", titleEn: "Wear-resistant gear-ring casting blank", titleZh: "一种耐磨损的齿圈铸件毛坯" },
    { id: "—", date: "2025-12-02", titleEn: "Wear-resistant tower-crane hook counterweight", titleZh: "一种新型塔吊用耐磨损的大钩配重铁" },
    { id: "—", date: "2025-04-29", titleEn: "Positioning fixture for counterweight machining", titleZh: "一种配重块加工用定位工装" },
    { id: "—", date: "2023-12-26", titleEn: "Cutting device for casting machining", titleZh: "一种铸件加工用切削装置" },
    { id: "—", date: "2023-03-24", titleEn: "Device for rapid drying of lost-foam coating", titleZh: "一种用于消失模涂料快速干燥的装置" },
    { id: "—", date: "2023-03-21", titleEn: "Lost-foam coating recovery device", titleZh: "一种消失模涂料回收装置" },
  ],
  docsNote: {
    en: "The key certificates are published above as scans. Other documents, translations or notarised copies can be provided on request during supplier qualification.",
    zh: "关键证照的原件扫描已在上方公开。供应商审核所需的其它文件、翻译件或公证副本，可另行提供。",
  },
};

/** 常见问题 */
export const FAQ = {
  metaTitle: {
    en: "FAQ | MOQ, Tooling, Lead Time & Export Terms",
    zh: "常见问题 | 起订量、模具、交期与出口条款",
  },
  metaDesc: {
    en: "Answers on minimum order quantity, tooling cost and lead time, samples, export terms, inspection documents, packaging, payment and confidentiality.",
    zh: "关于起订量、模具费用与周期、打样、出口条款、检测文件、包装、付款方式与保密的常见问题解答。",
  },
  title: { en: "Frequently Asked Questions", zh: "常见问题" },
  lead: {
    en: "Common questions our export desk receives, answered without the sales padding.",
    zh: "外贸团队常被问到的问题，这里去掉客套直接回答。",
  },
  items: [
    { q: { en: "What is your minimum order quantity?", zh: "起订量是多少？" },
      a: { en: "For an existing pattern, we are comfortable starting at 50–100 pieces for small parts and 5–10 pieces for large castings. For a new part that needs a foam tool, the first order has to carry the tooling, so we usually look for a volume that amortises it — often 100–500 pieces depending on size.", zh: "已有模具的零件，小件可从 50–100 件起做，大件 5–10 件起做。若需要新开泡沫模，首单需要覆盖模具费，我们希望订单量能把模具摊薄，常见区间是 100–500 件，视尺寸而定。" } },
    { q: { en: "Who pays for tooling, and how long does it take?", zh: "模具费由谁承担？周期多久？" },
      a: { en: "The buyer pays for tooling on the first order and owns it. Typical lead time for a lost-foam pattern is 10–20 working days after drawing approval, depending on complexity. Tooling is usually charged at cost and itemised separately on the quotation.", zh: "首单模具费由买方承担，模具所有权归买方。消失模模具在图纸确认后通常 10–20 个工作日完成，视复杂程度而定。模具费一般按成本计收，在报价单中单独列明。" } },
    { q: { en: "Can I get a sample before committing to a production order?", zh: "批量下单前可以先打样吗？" },
      a: { en: "Yes. We quote a sample price and a sample lead time separately. Once the sample is approved and the tooling is verified, series production usually takes 20–35 days for the first batch and 15–25 days for repeat orders.", zh: "可以。我们会单独报打样价格与打样周期。样品确认、模具验证通过后，首批批量生产通常 20–35 天，返单 15–25 天。" } },
    { q: { en: "Which material grades can you pour?", zh: "可以做哪些材质牌号？" },
      a: { en: "Grey iron from HT150 to HT300, ductile iron from QT450-10 to QT700-2, as-cast QT800-5, low-temperature ductile iron, Si-strengthened ferritic ductile iron and ADI. Steel castings, including high-manganese grades, can be sourced through group plants.", zh: "灰铸铁 HT150–HT300，球墨铸铁 QT450-10 至 QT700-2，铸态 QT800-5、低温球铁、硅强化铁素体基体球铁与 ADI。铸钢件（含高锰钢）可通过集团工厂配套。" } },
    { q: { en: "What documents come with a shipment?", zh: "出货随附哪些文件？" },
      a: { en: "Material certificate with heat number, dimensional inspection report, hardness record and packing list as standard. Third-party inspection (SGS, BV, TÜV) can be arranged at the buyer's cost if your procedure requires it.", zh: "标准随附：带炉号的材质证明、尺寸检测报告、硬度记录与装箱单。如你的流程要求第三方检验（SGS、BV、TÜV），可代为安排，费用由买方承担。" } },
    { q: { en: "Which Incoterms and payment terms do you work with?", zh: "采用哪些贸易术语与付款方式？" },
      a: { en: "FOB Xingang/Tianjin or Qingdao is our usual term. CIF and DDP are available for regular lanes. Payment is normally 30% deposit with the balance against the bill of lading copy; for established customers we can discuss other terms.", zh: "通常采用 FOB 新港/天津或青岛；常规航线可做 CIF 与 DDP。付款通常为 30% 预付款，余款见提单副本；长期客户可另行商议。" } },
    { q: { en: "How do you handle packing for sea freight?", zh: "海运包装怎么处理？" },
      a: { en: "Machined faces are protected with rust-preventive oil and film, parts are braced on fumigated or heat-treated pallets, and heavy castings are secured with steel strapping. Wooden packing complies with ISPM 15. Customer-specified marking and labels are applied on request.", zh: "加工面涂防锈油并覆膜防护；零件在熏蒸或热处理过的托盘上固定，重型铸件用钢带加固。木质包装符合 ISPM 15 标准。可按客户要求加贴标识与标签。" } },
    { q: { en: "Will you sign an NDA and keep my drawings confidential?", zh: "可以签保密协议吗？图纸会保密吗？" },
      a: { en: "Yes. We sign customer NDAs as a matter of routine and do not use customer drawings, patterns or parts in our own marketing without written permission.", zh: "可以。我们按惯例签署客户保密协议；未经书面许可，不会把客户图纸、模具或零件用于自身宣传。" } },
    { q: { en: "Do you supply assembled products or only castings?", zh: "只供铸件，还是可以做组件？" },
      a: { en: "Primarily castings and machined castings. We can also add sub-components, fasteners or surface treatments bought in against your drawing, and ship a kitted assembly — this is quoted case by case.", zh: "以铸件与加工铸件为主。也可按图纸配套外购件、紧固件或表面处理，做成组件交付；此类需求逐单评估报价。" } },
    { q: { en: "How do I start an enquiry?", zh: "如何开始询价？" },
      a: { en: "Send the drawing (PDF, STEP or DWG), the material grade if you have one, the annual volume and the finish you need. If you only have a sample part, send photos and a few key dimensions and we will work from that.", zh: "发送图纸（PDF、STEP 或 DWG）、材质牌号（若有）、年用量与表面处理要求。若只有实物样品，发照片和几个关键尺寸也可以，我们从那里开始。" } },
  ],
  stillTitle: { en: "Still have a question?", zh: "还有其他问题？" },
  stillText: {
    en: "Send it to our export desk. Technical questions get answered by the production team, not a chatbot.",
    zh: "直接发给我们的外贸团队。技术问题由生产部门回复，不是自动应答。",
  },
};

/** 联系我们 */
export const CONTACT = {
  metaTitle: {
    en: "Contact Us | Casting & Machining Enquiries",
    zh: "联系我们 | 铸件与机加工询盘",
  },
  metaDesc: {
    en: "Contact Cangzhou FAMED Machinery Equipment Co., Ltd. in Botou, Hebei. Phone +86 150 3173 5404, WhatsApp available, plant visits welcome by appointment.",
    zh: "联系沧州菲美得机械设备有限公司（河北泊头）。电话 +86 150 3173 5404，支持 WhatsApp，欢迎预约到厂参观。",
  },
  title: { en: "Contact Us", zh: "联系我们" },
  lead: {
    en: "Tell us what you need built. Drawings, photos of an existing part, or even a rough sketch all work as a starting point.",
    zh: "告诉我们你要做什么零件。图纸、现成零件的照片，甚至草图，都可以作为起点。",
  },
  formTitle: { en: "Send an enquiry", zh: "在线询盘" },
  fields: {
    name: { en: "Your name", zh: "您的姓名" },
    company: { en: "Company", zh: "公司名称" },
    country: { en: "Country / region", zh: "国家 / 地区" },
    email: { en: "Business email", zh: "企业邮箱" },
    phone: { en: "Phone / WhatsApp", zh: "电话 / WhatsApp" },
    interest: { en: "Product of interest", zh: "感兴趣的产品" },
    quantity: { en: "Estimated annual quantity", zh: "预计年用量" },
    message: { en: "Part description, material and requirements", zh: "零件说明、材质与要求" },
    messageHint: { en: "Drawing numbers, material grade, dimensions, finishing, target price — the more the better.", zh: "图号、材质牌号、尺寸、表面处理、目标价——越具体越好。" },
    consent: { en: "I agree that my details may be used to answer this enquiry.", zh: "我同意贵司使用以上信息回复本次询盘。" },
    submit: { en: "Send enquiry", zh: "提交询盘" },
    interestOther: { en: "Other / not listed", zh: "其他 / 未列出" },
    interestCustom: { en: "Custom part (drawing to follow)", zh: "定制件（稍后提供图纸）" },
  },
  infoTitle: { en: "Direct contacts", zh: "直接联系" },
  infoLabels: {
    phone: { en: "Phone", zh: "电话" },
    whatsapp: { en: "WhatsApp", zh: "WhatsApp" },
    email: { en: "Email", zh: "邮箱" },
    plant: { en: "Plant address", zh: "工厂地址" },
    office: { en: "Registered address", zh: "注册地址" },
    hours: { en: "Working hours", zh: "工作时间" },
    coords: { en: "Coordinates", zh: "厂区坐标" },
  },
  visitTitle: { en: "Visiting the plant", zh: "到厂参观" },
  visitText: {
    en: "Botou is roughly two hours by high-speed train from Beijing and 40 minutes from Cangzhou West. We are happy to arrange a plant tour, an audit or a third-party inspection — please give us a few days' notice so the right people are on site.",
    zh: "泊头距北京高铁约两小时，距沧州西站约 40 分钟。我们可安排参观、审核或第三方验厂，请提前几天告知，以便相关人员到场。",
  },
  mapTitle: { en: "Find us", zh: "位置" },
  contactPersonNote: {
    en: "Bilingual sales contacts will be listed here once confirmed.",
    zh: "中英双语对接人信息待确认后补充在此处。",
  },
};

/** 隐私政策 */
export const PRIVACY = {
  metaTitle: { en: "Privacy Policy", zh: "隐私政策" },
  metaDesc: {
    en: "How Cangzhou FAMED Machinery Equipment Co., Ltd. collects, uses and protects personal data submitted through this website.",
    zh: "沧州菲美得机械设备有限公司如何收集、使用与保护通过本网站提交的个人信息。",
  },
  title: { en: "Privacy Policy", zh: "隐私政策" },
  updated: { en: "Last updated: 12 September 2026", zh: "最后更新：2026 年 9 月 12 日" },
  sections: [
    { h: { en: "What we collect", zh: "我们收集什么" },
      p: { en: "When you submit an enquiry we collect the name, company, country, email address, phone number and the technical details you choose to send. Our server also logs standard technical data such as IP address and browser type for security and traffic analysis.", zh: "当你提交询盘时，我们会收集姓名、公司、国家、邮箱、电话以及你主动填写的技术信息。服务器同时会记录用于安全与流量分析的标准技术数据，如 IP 地址与浏览器类型。" } },
    { h: { en: "Why we use it", zh: "使用目的" },
      p: { en: "We use enquiry data only to answer your request, prepare quotations and manage the resulting order. We do not sell personal data, and we do not send marketing emails without your consent.", zh: "询盘信息仅用于回复你的请求、准备报价与管理后续订单。我们不出售个人信息，也不会在未获同意的情况下发送营销邮件。" } },
    { h: { en: "Cookies and analytics", zh: "Cookie 与分析" },
      p: { en: "Essential cookies keep the site working. Analytics cookies are loaded only if you accept them in the cookie banner. Embedded maps from third parties load only after you click, so no data reaches those providers before you consent.", zh: "必要 Cookie 用于维持网站运行。分析类 Cookie 仅在你于弹窗中接受后加载。第三方地图需点击后才加载，未点击前不会向第三方传输数据。" } },
    { h: { en: "How long we keep it", zh: "保存期限" },
      p: { en: "Enquiry records are kept for as long as needed to serve the commercial relationship and to meet accounting and export documentation requirements, then deleted.", zh: "询盘记录在服务商业关系以及满足财务与出口单证要求所需的期限内保存，之后删除。" } },
    { h: { en: "Your rights", zh: "你的权利" },
      p: { en: "If you are in the EU/EEA or another jurisdiction with data protection law, you may request access to, correction of, or deletion of your personal data, or object to its processing. Write to us at the email address below and we will respond within 30 days.", zh: "若你位于欧盟/欧洲经济区或其他有数据保护法的司法辖区，你可以要求查询、更正或删除个人信息，或反对处理。请发送邮件至下方地址，我们将在 30 天内回复。" } },
    { h: { en: "Contact", zh: "联系方式" },
      p: { en: "Data protection enquiries: see the contact details on our Contact page.", zh: "数据保护相关事宜：请使用“联系我们”页面中的联系方式。" } },
  ],
};
