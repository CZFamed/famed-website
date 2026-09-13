/**
 * 产品目录 —— 按领导确认的三大类划分：
 *   1. 机床零部件
 *   2. 工程机械零部件
 *   3. 泵阀壳体与本体零部件
 * 每个大类内部再分子组（groups），子组只影响页面排版。
 *
 * slug 决定页面文件名（product-<slug>.html）与图片目录
 * （assets/img/products/<slug>/NN），改 slug 需要同步 build_assets.py。
 *
 * 所有配图与文案均对照 agent/RAG知识库/图片描述/ 中的实拍描述撰写，
 * 不写没有素材支撑的产品名。
 */

export const CATEGORIES_TITLE = {
  en: "Products",
  zh: "产品中心",
};

export const CATEGORIES_LEAD = {
  en: "Three product families, organised by the industry you build for: machine tool parts, construction machinery parts, and pump and valve housings and bodies. Every photo below is our own production.",
  zh: "按下游行业划分为三大类：机床零部件、工程机械零部件、泵阀壳体与本体零部件。以下图片均为本厂在产实物实拍，不是图库素材。",
};

export const PRODUCTS = [
  {
    slug: "machine-tool-parts",
    code: "MT",
    name: { en: "Machine Tool Parts", zh: "机床零部件" },
    tagline: {
      en: "Beds, columns, rams and slides for machine tool builders",
      zh: "面向机床制造厂的床身、立柱、滑枕与滑座",
    },
    intro: [
      {
        en: "Machine tool castings are bought for vibration damping and dimensional stability, not for looks. That means controlled chemistry, a slow cooling practice and a proper stress-relief cycle before the finishing cuts.",
        zh: "机床铸件买的是减振性与尺寸稳定性，不是外观。这要求化学成分受控、冷却过程缓和，并在精加工前完成规范的时效处理。",
      },
      {
        en: "We pour beds, columns, cross beams, rams, slides and connecting parts in HT250 and HT300, and in ductile iron where higher strength is needed — then machine guide faces and mounting pads to the drawing. Parts ship bare, in grey anti-rust primer, or stretch-wrapped on pallets.",
        zh: "生产床身、立柱、横梁、滑枕、滑座与连接件，材质为 HT250、HT300，需要更高强度时采用球墨铸铁，随后按图纸加工导轨面与安装面。交付状态可为毛坯、灰色防锈底漆，或缠绕膜包裹后置于托盘。",
      },
    ],
    groups: [
      {
        title: { en: "Machine beds and base castings", zh: "床身与底座铸件" },
        text: {
          en: "Long, heavily ribbed castings where the guide-way faces and the internal cross ribs decide rigidity.",
          zh: "长条形、密布加强筋的铸件，刚性取决于导轨面与内部交叉筋板的成型质量。",
        },
        imgs: [1, 2, 3],
      },
      {
        title: { en: "Columns, cross beams and slides", zh: "立柱、横梁与滑座" },
        text: {
          en: "Prismatic parts with long guide faces and rectangular openings, stacked and palletised for machining.",
          zh: "带长导轨面与矩形开口的棱柱类零件，码放于托盘转入机加工。",
        },
        imgs: [4, 5, 6],
      },
      {
        title: { en: "Machined and connecting parts", zh: "机加工件与连接件" },
        text: {
          en: "H-shaped and plate-type parts machined to drawing, with inspection marks recorded on the face.",
          zh: "H 形与板类零件按图纸加工，检验标记记录在零件表面。",
        },
        imgs: [7, 8, 9],
      },
      {
        title: { en: "Finishing and packing", zh: "涂装与成品包装" },
        text: {
          en: "Grey anti-rust primer, then stretch film and pallets that survive sea freight.",
          zh: "喷涂灰色防锈底漆，再用缠绕膜与托盘包装，满足海运要求。",
        },
        imgs: [10, 11, 12],
      },
    ],
    typicalTitle: { en: "Typical parts", zh: "典型产品" },
    typical: [
      { en: "Machine beds and lathe beds", zh: "机床床身与车床床身" },
      { en: "Columns and uprights", zh: "立柱与立住体" },
      { en: "Cross beams and rams", zh: "横梁与滑枕" },
      { en: "Slides, saddles and connecting parts", zh: "滑座、拖板与连接件" },
      { en: "Worktable and fixture blanks", zh: "工作台与工装毛坯" },
      { en: "H-shaped and plate-type machined parts", zh: "H 形与板类机加工件" },
      { en: "Spindle housings and headstocks", zh: "主轴箱与床头箱" },
    ],
    specs: [
      { k: { en: "Materials", zh: "材质" }, v: { en: "Grey iron HT250 / HT300; ductile iron QT500-7 / QT600-3", zh: "灰铸铁 HT250 / HT300；球墨铸铁 QT500-7 / QT600-3" } },
      { k: { en: "Unit weight", zh: "单件重量" }, v: { en: "5 – 2,000 kg", zh: "5 – 2000 kg" } },
      { k: { en: "Hardness", zh: "硬度" }, v: { en: "Typically HB170 – HB240, agreed per part", zh: "通常在 HB170 – HB240 之间，逐件商定" } },
      { k: { en: "Heat treatment", zh: "热处理" }, v: { en: "Stress relief before finish machining as standard practice for this category", zh: "该类产品默认在精加工前进行去应力处理" } },
      { k: { en: "Machining", zh: "机加工" }, v: { en: "Guide-way and pad milling, boring, drilling", zh: "导轨面与安装面铣削、镗孔、钻孔" } },
      { k: { en: "Packing", zh: "包装" }, v: { en: "Pallets with stretch-film wrapping; rust-preventive primer on request", zh: "托盘加缠绕膜；可按要求做防锈底漆" } },
    ],
    applications: [
      { en: "CNC lathes and machining centres", zh: "数控车床与加工中心" },
      { en: "Grinding and milling machines", zh: "磨床与铣床" },
      { en: "Presses and forming equipment", zh: "压力机与成形设备" },
      { en: "Special-purpose machine tools", zh: "专用机床" },
    ],
    moq: { en: "5 – 20 pieces depending on size", zh: "视尺寸 5 – 20 件起" },
  },

  {
    slug: "construction-machinery-parts",
    code: "CM",
    name: { en: "Construction Machinery Parts", zh: "工程机械零部件" },
    tagline: {
      en: "Counterweights, arms, brackets, frames and travel-drive housings",
      zh: "配重铁、支臂、支架、机架与行走驱动壳体",
    },
    intro: [
      {
        en: "This is one of our long-established product families. Construction machinery parts are bought for weight, fit and durability: a counterweight has to hit its mass, an arm casting has to be sound in the bored bosses, and a frame has to stay flat after welding.",
        zh: "这是我们做了多年的一条产品线。工程机械零件买的是重量、装配与耐用性：配重要称得准，支臂的镗孔部位不能有缺陷，机架在焊接后还要保持平整。",
      },
      {
        en: "We cast them in HT200–HT300 and in ductile iron where impact resistance matters, with lifting lugs and mounting bosses formed in the casting. Larger pieces are weighed individually against the drawing and marked where required.",
        zh: "材质以 HT200–HT300 为主，需要抗冲击的部位用球墨铸铁；吊装环与安装凸台随铸件一次成型。大件逐件称重并与图纸核对，有要求时在零件上铸出重量标识。",
      },
    ],
    groups: [
      {
        title: { en: "Counterweights and ballast", zh: "配重铁与配重件" },
        text: {
          en: "Arc-shaped and wedge-shaped counterweights with lifting lugs, large yellow-painted counterweights with mounting bosses, and HT200 blocks cast with the FAMED mark and a serial number.",
          zh: "带吊装环的弧形与楔形配重、带安装凸台的大型黄色工程机械配重，以及铸有 FAMED 标识与编号的 HT200 配重块。",
        },
        imgs: [1, 2, 3, 4],
      },
      {
        title: { en: "Weight control on large ballast", zh: "大型配重的重量控制" },
        text: {
          en: "Pieces are stored in rows and weighed one by one; the cast-in weight marking is checked against the certificate.",
          zh: "成排存放并逐件称重，铸出的重量标识与随货证明逐件核对。",
        },
        imgs: [5, 6],
      },
      {
        title: { en: "Arms, brackets and frames", zh: "支臂、支架与机架" },
        text: {
          en: "Finish-machined arm and seat castings with bored bosses and faced flanges, yellow-painted symmetrical supports, and large frame and base castings.",
          zh: "已完成镗孔与法兰面加工的大型支臂／阀座类铸件、黄色涂装对称式支座，以及大型机架与底座铸件。",
        },
        imgs: [7, 8, 9, 10],
      },
      {
        title: { en: "Travel-drive and gearbox housings", zh: "减速机与齿轮箱壳体" },
        text: {
          en: "Reducer housings with several flange ends and machined bores, cast in grey iron and finished in-house.",
          zh: "带多组法兰端面与机加工孔系的减速机箱体，灰铸铁材质，加工在厂内完成。",
        },
        imgs: [11, 12],
      },
    ],
    typicalTitle: { en: "Typical parts", zh: "典型产品" },
    typical: [
      { en: "Construction machinery counterweights", zh: "工程机械配重铁" },
      { en: "Tower-crane hook counterweights", zh: "塔吊大钩配重铁" },
      { en: "Excavator and loader ballast", zh: "挖掘机、装载机配重" },
      { en: "Arc-shaped counterweights with lifting lugs", zh: "带吊装环的弧形配重件" },
      { en: "Wedge-shaped counterweight blocks", zh: "楔形配重块" },
      { en: "Arms, brackets and symmetrical supports", zh: "支臂、支架与对称支座" },
      { en: "Machine frames and base castings", zh: "机架与底座铸件" },
      { en: "Travel-drive and reducer housings", zh: "行走减速机与减速机箱体" },
    ],
    specs: [
      { k: { en: "Materials", zh: "材质" }, v: { en: "Grey iron HT200 / HT250 / HT300; ductile iron QT450-10 where impact resistance is required", zh: "灰铸铁 HT200 / HT250 / HT300；需要抗冲击时用球墨铸铁 QT450-10" } },
      { k: { en: "Unit weight", zh: "单件重量" }, v: { en: "From a few kilograms up to 2.5 t", zh: "几公斤至 2.5 吨" } },
      { k: { en: "Casting process", zh: "铸造工艺" }, v: { en: "Lost-foam moulding; lifting lugs and mounting bosses formed in the casting", zh: "消失模造型，吊装环与安装凸台随铸件一次成型" } },
      { k: { en: "Weight control", zh: "重量控制" }, v: { en: "Every piece weighed against the drawing; weight marked on the part where required", zh: "逐件称重并与图纸核对；有要求时在零件上铸出重量标识" } },
      { k: { en: "Machining", zh: "机加工" }, v: { en: "Boring, face milling, drilling and tapping on mounting and pivot faces", zh: "安装面与铰接面可做镗孔、端面铣削、钻孔与攻丝" } },
      { k: { en: "Finish", zh: "表面处理" }, v: { en: "Shot blasting, then yellow, silver-grey or red-oxide primer / top coat", zh: "抛丸后做黄色、银灰或红丹底漆／面漆" } },
    ],
    applications: [
      { en: "Mobile cranes and tower cranes", zh: "汽车吊与塔式起重机" },
      { en: "Excavators and wheel loaders", zh: "挖掘机与轮式装载机" },
      { en: "Forklifts and material handling", zh: "叉车与物料搬运设备" },
      { en: "Crushing and screening equipment", zh: "破碎与筛分设备" },
    ],
    moq: { en: "5 – 10 pieces for large counterweights, 50 pieces for small blocks", zh: "大件配重 5–10 件起，小配重块 50 件起" },
  },

  {
    slug: "pump-valve-parts",
    code: "PV",
    name: { en: "Pump & Valve Housings and Bodies", zh: "泵阀壳体与本体零部件" },
    tagline: {
      en: "Valve bodies, cocks, pump casings and pipe fittings, cast and machined in-house",
      zh: "阀体、旋塞、泵壳与管件，铸造与加工均在厂内完成",
    },
    intro: [
      {
        en: "Valve bodies and pump housings are the parts where a foundry shows whether it understands pressure. Wall thickness has to be uniform enough that the casting passes its test, flange faces have to be parallel to the bore, and the seat has to be machinable without opening up a blowhole.",
        zh: "阀体与泵壳直接考验一家铸造厂对“承压”的理解。壁厚要均匀到能通过试验，法兰面要与通径平行，密封面加工时不能碰到气孔。",
      },
      {
        en: "We cast Y-type and multi-branch valve bodies, box-type bodies, butterfly valve bodies, Roots pump and compressor casings, and pipe fittings — then machine the flange faces, bores and 8-shaped twin chambers in the same plant.",
        zh: "生产 Y 型与多支管阀体、箱体式阀体、蝶阀阀体、罗茨泵与压缩机壳体以及管件，并在同一厂区完成法兰面、通径与 8 字形双腔的加工。",
      },
    ],
    groups: [
      {
        title: { en: "Valve bodies and cocks", zh: "阀门与旋塞铸件" },
        text: {
          en: "Two large Y-type multi-port valve bodies side by side, black-painted Y-type bodies, large multi-branch bodies in the raw state, and a shot-blasted Y-type tee body showing the cast-in size marking.",
          zh: "两台大型 Y 型多接口阀体、黑色涂装 Y 型阀体、大型多支管阀体毛坯，以及铸出型号标识的喷丸态 Y 型三通阀体。",
        },
        imgs: [1, 2, 3, 4],
      },
      {
        title: { en: "Large-diameter and coated bodies", zh: "大口径与涂装阀体" },
        text: {
          en: "Large-diameter flanged bodies banded for shipment, and machined bodies in yellow anti-rust primer.",
          zh: "以打包带固定、待发货的大口径法兰阀体，以及涂黄色防锈底漆的机加工阀体。",
        },
        imgs: [5, 6],
      },
      {
        title: { en: "Pump and blower casings", zh: "泵与风机壳体" },
        text: {
          en: "Roots pump and compressor housings with finish-bored 8-shaped twin chambers, and a HISKM KH75 machining centre with valve bodies set up on the table.",
          zh: "8 字形双腔精镗端面的罗茨泵／压缩机壳体，以及 HISKM KH75 加工中心上装夹阀体的加工现场。",
        },
        imgs: [7, 8, 9, 10],
      },
      {
        title: { en: "Butterfly valve bodies and pipe fittings", zh: "蝶阀阀体与管件" },
        text: {
          en: "DN300 gear-rim butterfly valve bodies as finished parts, butterfly body blanks with the double-ear profile, Y-branch tee fittings and pallets of flanged elbow fittings.",
          zh: "DN300 齿轮状外缘蝶阀阀体成品、蝶形双耳外形阀体毛坯、Y 型分叉三通管件，以及整托弯头法兰管件套件。",
        },
        imgs: [11, 12, 13, 14],
      },
    ],
    typicalTitle: { en: "Typical parts", zh: "典型产品" },
    typical: [
      { en: "Y-type multi-port valve bodies", zh: "Y 型多接口阀体" },
      { en: "Box-type valve bodies with double bores", zh: "双圆孔箱体式阀体" },
      { en: "Large multi-branch and multi-chamber bodies", zh: "大型多支管与多腔体阀体" },
      { en: "Butterfly valve bodies, including gear-rim designs", zh: "蝶阀阀体（含齿轮状外缘结构）" },
      { en: "Roots pump and compressor casings", zh: "罗茨泵与压缩机壳体" },
      { en: "Pump bodies and valve casings", zh: "泵体与阀体壳体" },
      { en: "Y-branch tees and flanged pipe fittings", zh: "Y 型分叉三通与法兰管件" },
      { en: "Valve cover plates and mounting plates", zh: "阀体盖板与安装板" },
    ],
    specs: [
      { k: { en: "Materials", zh: "材质" }, v: { en: "Grey iron HT200 / HT250 / HT300; ductile iron QT450-10 / QT500-7", zh: "灰铸铁 HT200 / HT250 / HT300；球墨铸铁 QT450-10 / QT500-7" } },
      { k: { en: "Unit weight", zh: "单件重量" }, v: { en: "2 – 800 kg in regular production; larger bodies quoted case by case", zh: "常规 2 – 800 kg，更大件逐单评估" } },
      { k: { en: "Casting process", zh: "铸造工艺" }, v: { en: "Lost-foam moulding with vacuum-assisted dry sand; resin-sand option through group plants", zh: "消失模造型、干砂负压；可由集团工厂改用树脂砂" } },
      { k: { en: "Machining", zh: "机加工" }, v: { en: "Flange facing, bolt-hole drilling, bore and seat machining, twin-chamber (8-shaped) boring, tapping", zh: "法兰车面、螺栓孔钻孔、通径与密封面加工、8 字形双腔镗孔、攻丝" } },
      { k: { en: "Finish", zh: "表面处理" }, v: { en: "Shot blasting, then primer or top coat in red, yellow, grey or RAL colours", zh: "抛丸清理后做底漆或面漆，可选红丹、黄色、灰色或 RAL 色系" } },
      { k: { en: "Standards", zh: "执行标准" }, v: { en: "EN 1092-2, ANSI B16.5 / B16.42, JIS B2239, GB/T 17241 on request", zh: "可按 EN 1092-2、ANSI B16.5 / B16.42、JIS B2239、GB/T 17241 执行" } },
      { k: { en: "Documents", zh: "随附文件" }, v: { en: "Material certificate with heat number, dimensional report; pressure test record on request", zh: "带炉号的材质证明与尺寸检测报告；可按要求附打压试验记录" } },
    ],
    applications: [
      { en: "Water and wastewater networks", zh: "给排水管网" },
      { en: "HVAC and building services", zh: "暖通空调与建筑机电" },
      { en: "Oil, gas and chemical piping", zh: "石油、天然气与化工管道" },
      { en: "Roots blowers and vacuum pumps", zh: "罗茨风机与真空泵" },
      { en: "Pumping stations and irrigation", zh: "泵站与灌溉系统" },
    ],
    moq: { en: "30 – 50 pieces for an existing pattern; tooling carried on the first order for a new part", zh: "已有模具 30–50 件起；新开模具的零件由首单承担模具费" },
  },
];
