import { CAPABILITIES, COMPANY, FAQS, METRICS, NAV_ITEMS } from '@/lib/site'
import { CATEGORIES } from '@/lib/catalog'
import { FABRICATION_PROJECTS, INSTALLATION_TRACK_RECORD, MAJOR_CLIENTS } from '@/lib/projects-data'
import { R2_BANNERS, R2_CERTIFICATES } from '@/lib/r2-assets'

export type Locale = 'en' | 'zh'

export function getLocaleFromPathname(pathname: string | null | undefined): Locale {
  if (!pathname) return 'en'
  return pathname === '/zh' || pathname.startsWith('/zh/') ? 'zh' : 'en'
}

export function stripLocale(pathname: string | null | undefined): string {
  if (!pathname) return '/'
  if (pathname === '/zh') return '/'
  if (pathname.startsWith('/zh/')) return pathname.slice(3) || '/'
  return pathname
}

export function withLocale(href: string, locale: Locale): string {
  if (locale === 'en') return href
  if (!href.startsWith('/')) return href
  if (href === '/zh' || href.startsWith('/zh/')) return href
  if (href === '/') return '/zh'
  if (href.startsWith('/#') || href.startsWith('/?')) return `/zh${href.slice(1)}`
  return `/zh${href}`
}

export function getCompany(locale: Locale) {
  if (locale === 'en') return COMPANY
  return {
    ...COMPANY,
    name: '江苏锐志石化工程有限公司',
    shortName: '锐志石化',
    address: '中国江苏省淮安市盱眙县经济开发区龙山路19-8号',
    summary:
      '江苏锐志石化工程有限公司是集石油化工压力容器、储罐、换热器、冷凝器、精馏塔及反应釜设计、制造与现场安装于一体的源头工厂。公司坐落于江苏盱眙经济开发区，建有 22,000 平方米（33 亩）现代化重型制造基地，配备 50/10 吨桥式起重机重型车间。',
  }
}

const NAV_ZH: Record<string, string> = {
  '/': '首页',
  '/products': '产品中心',
  '/projects': '工程案例',
  '/manufacturing': '制造实力',
  '/quality': '质量与资质',
  '/about': '关于我们',
  '/news': '新闻动态',
  '/contact': '联系我们',
}

export function getNavItems(locale: Locale) {
  return NAV_ITEMS.map((item) => ({
    href: item.href,
    label: locale === 'zh' ? NAV_ZH[item.href] || item.label : item.label,
  }))
}

export const CATEGORY_ZH_MAP: Record<string, string> = {
  'storage-tanks-pressure-vessels': '储罐与压力容器',
  reactors: '反应釜与反应系统',
  'columns-towers': '塔器与工艺塔',
  'packaged-process-units': '撬装工艺装置',
  'heat-exchangers-condensers': '换热器与冷凝器',
  'environmental-water-treatment': '环保水处理设备',
  'filtration-equipment': '过滤设备',
}

export function getCategoriesNav(locale: Locale) {
  return CATEGORIES.map((c) => ({
    slug: c.slug,
    name: locale === 'zh' ? CATEGORY_ZH_MAP[c.slug] || c.name : c.name,
  }))
}

export function getMetrics(locale: Locale) {
  if (locale === 'en') return METRICS
  return [
    { value: '16+', label: '年行业制造与工程经验', note: '集设计、制造与安装于一体' },
    { value: '22,000 m²', label: '盱眙现代化制造基地', note: '江苏盱眙 33 亩自建厂区' },
    { value: '37+', label: '大型石化与环保工程实绩', note: '覆盖炼化、化工与能源行业' },
    { value: '30–45 天', label: '常规配置交付周期', note: '按图定制、严谨排产' },
  ] as const
}

export function getFaqs(locale: Locale) {
  if (locale === 'en') return FAQS
  return [
    {
      q: '设备的最小起订量是多少？',
      a: '1 台起订。每台压力容器、储罐、换热器或塔器均根据买方工艺参数定制工程设计与制造，单台采购即为标准订单。',
    },
    {
      q: '是否支持 OEM / ODM 按图定制？',
      a: '支持。我们既可严格按您的工程图纸制造（OEM），也可依据您的工艺工况开展热工、机械及布置设计（ODM），包含接管方位、内件、支座及操作平台定制。',
    },
    {
      q: '常规交付周期需要多久？',
      a: '常规配置在设计图纸确认后 30–45 天内发货；大型塔器、现场组焊储罐及特种合金设备将按项目总进度计划排产并在报价单中明确。',
    },
    {
      q: '设备的设计寿命是多少？',
      a: '在约定工况条件下，设备按 10 年设计寿命进行工程设计，并结合介质特性选取合适的腐蚀裕量与耐蚀材质。',
    },
    {
      q: '出厂时提供哪些技术资料和检验文件？',
      a: '每台设备随附技术数据表、总装配图、材质检验报告及无损检测（NDT）记录；发货前可配合安排第三方驻厂检验。',
    },
    {
      q: '是否提供现场吊装与安装工程服务？',
      a: '提供。公司具备石油化工工程施工总承包三级与机电工程施工总承包三级资质，可由自有工程团队承接重型吊装、设备就位、工艺配管及现场调试配合。',
    },
  ] as const
}

export function getCapabilities(locale: Locale) {
  if (locale === 'en') return CAPABILITIES
  return [
    { title: '重型制造车间', body: '大跨度无柱重型厂房，配备 50/10 吨桥式起重机，满足大型筒体、封头及成套设备吊装制造。', metric: '50/10 吨' },
    { title: '数控激光下料', body: '大台面数控光纤激光下料系统，严格控制筒节、封头坯料及接管开孔几何公差。', metric: 'CNC 数控' },
    { title: '自动埋弧焊接', body: '自动化纵缝与环缝埋弧焊接工艺，由持证焊工按评定合格工艺规程执行。', metric: 'SAW 埋弧焊' },
    { title: '无损检测 (NDT)', body: '对承压焊缝全面开展射线、超声、磁粉及渗透无损检测，确保焊接质量可追溯。', metric: 'RT · UT · MT · PT' },
    { title: '材质光谱复检', body: '合金钢与不锈钢原材料及关键部件投产前均经直读光谱仪进行牌号复检（PMI）。', metric: 'PMI 光谱' },
    { title: '出厂水压试验', body: '设备在喷砂涂装及发运前逐台完成水压耐压试验并留存见证记录。', metric: '出厂全检' },
  ] as const
}

export function getHeroSlides(locale: Locale) {
  if (locale === 'en') {
    return [
      {
        id: 'banner-1',
        image: R2_BANNERS[0],
        eyebrow: 'Xuyi 22,000 m² Source Factory',
        headline: 'Integrated Petrochemical Equipment Fabrication & Plant Engineering',
        description:
          '16+ years integrating design, heavy fabrication, and site installation for pressure vessels, storage tanks, heat exchangers, and distillation columns.',
        ctaLabel: 'Explore Equipment Catalog',
        ctaHref: '/products',
        secondaryLabel: 'Request Quotation',
        secondaryHref: '/contact#inquiry-rfq',
        side: 'left' as const,
        tone: 'light' as const,
        objectPos: 'object-right',
      },
      {
        id: 'banner-2',
        image: R2_BANNERS[1],
        eyebrow: 'Heavy Vessel Fabrication Workshop',
        headline: 'Custom Pressure Vessels, Heat Exchangers & Distillation Columns',
        description:
          '50/10-ton overhead crane bays, CNC laser blanking, automated submerged-arc welding, alloy PMI spectroscopy, and full NDT weld inspection.',
        ctaLabel: 'Inspect Manufacturing Facility',
        ctaHref: '/manufacturing',
        secondaryLabel: 'Quality & Certifications',
        secondaryHref: '/quality',
        side: 'right' as const,
        tone: 'dark' as const,
        objectPos: 'object-left',
      },
      {
        id: 'banner-3',
        image: R2_BANNERS[2],
        eyebrow: '37+ Delivered Engineering Projects',
        headline: 'Proven Across Major Refining, Chemical & Energy Complexes',
        description:
          'Trusted by Sinopec Jiangsu, Shandong Haiyou, Jiangsu Fuqiang, ADAMA Anpon, Datang Environmental, and Nanjing Jinling Huntsman.',
        ctaLabel: 'View Project Case Studies',
        ctaHref: '/projects',
        secondaryLabel: 'Contact Engineering Team',
        secondaryHref: '/contact#inquiry-rfq',
        side: 'left' as const,
        tone: 'light' as const,
        objectPos: 'object-right',
      },
    ]
  }
  return [
    {
      id: 'banner-1',
      image: R2_BANNERS[0],
      eyebrow: '盱眙 22,000 m² 源头制造基地',
      headline: '石化装备制造与装置工程一体化服务商',
      description:
        '深耕行业 16 余年，集压力容器、大型储罐、换热器与精馏塔的设计、重型制造及现场总包安装于一体。',
      ctaLabel: '浏览产品中心',
      ctaHref: '/products',
      secondaryLabel: '获取技术报价',
      secondaryHref: '/contact#inquiry-rfq',
      side: 'left' as const,
      tone: 'light' as const,
      objectPos: 'object-right',
    },
    {
      id: 'banner-2',
      image: R2_BANNERS[1],
      eyebrow: '重型压力容器制造车间',
      headline: '非标压力容器、管壳式换热器与工艺精馏塔定制',
      description:
        '配备 50/10 吨重型行车、数控激光下料、自动埋弧焊、合金材质光谱复检及全流程无损检测体系。',
      ctaLabel: '查看制造实力',
      ctaHref: '/manufacturing',
      secondaryLabel: '质量与资质认证',
      secondaryHref: '/quality',
      side: 'right' as const,
      tone: 'dark' as const,
      objectPos: 'object-left',
    },
    {
      id: 'banner-3',
      image: R2_BANNERS[2],
      eyebrow: '37+ 项大型工程交付实绩',
      headline: '广泛服务于国内大型炼化、精细化工与环保能源项目',
      description:
        '长期合作中石化江苏石油、山东海右石化、江苏富强新材料、安道麦安邦、大唐环保及南京金陵亨斯迈等知名企业。',
      ctaLabel: '查看工程案例',
      ctaHref: '/projects',
      secondaryLabel: '联系工程技术团队',
      secondaryHref: '/contact#inquiry-rfq',
      side: 'left' as const,
      tone: 'light' as const,
      objectPos: 'object-right',
    },
  ]
}

const FACILITY_CAPTIONS_ZH: Record<string, string> = {
  'rd-building': '锐志石化研发办公大楼',
  'aerial-manufacturing-base': '盱眙 22,000 平方米（33 亩）制造基地航拍全景',
  'heavy-fabrication-workshop': '配备 50/10 吨桥式起重机的重型容器制造车间',
  'cnc-laser-cutting-line': '大台面数控光纤激光钢板下料生产线',
  'shot-blasting-chamber': '自动化钢板抛丸喷砂与表面预处理室',
}

export function getFacilityCaption(slug: string, fallback: string, locale: Locale) {
  return locale === 'zh' ? FACILITY_CAPTIONS_ZH[slug] || fallback : fallback
}

const CASES_CAPTIONS_ZH: Record<string, string> = {
  'gansu-loop-reactor-pilot': '甘肃省化工研究院 — 定制管式环流反应器中试与放大装置（2025）',
  'gansu-chlorination-tower': '甘肃省化工研究院 — 多塔撬装氯化反应中试装置（2025）',
  'linyidongliang-gas-cooler': '山东临沂东亮有限公司 — 定制工业气体冷却器成套设备（2025）',
  'sinopec-qihu-oil-depot': '中石化江苏石油分公司 — 淮安齐湖油库储罐群工程（8×5000m³、4×3000m³、2×1000m³）',
  'fuqiang-po-main-reactor': '江苏富强新材料 — 10 万吨/年环氧丙烷主反应装置（含 3×386 吨主反应器吊装）',
  'huaihe-coal-gasification': '江苏淮河化工 — 合成氨 240 t/d 粉煤气化成套装置',
  'huaihe-psa-hydrogen-overview': '江苏淮河化工 — 变压吸附（PSA）脱碳提氢装置全景',
  'huaihe-psa-hydrogen-valves': '江苏淮河化工 — PSA 提氢程控阀组撬块与仪表安装',
  'hankang-lithium-additive': '江苏瀚康电子材料 — 59,600 吨/年锂电池添加剂成套工艺设备安装',
  'huaihe-ammonia-shift': '江苏淮河化工 — 合成氨变换与脱硫塔系统',
}

export function getCaseCaption(slug: string, fallback: string, locale: Locale) {
  return locale === 'zh' ? CASES_CAPTIONS_ZH[slug] || fallback : fallback
}

const EQUIPMENT_TITLES_ZH: Record<string, string> = {
  'mzc-submerged-arc-welder': 'MZC 自动埋弧焊小车',
  'optical-spectrometer-1': '便携式合金材质直读光谱仪',
  'optical-spectrometer-2': '合金成分光谱复检系统',
  'bore-dial-gauge': '精密内径百分表',
  'plate-rolling-machine-1': '重型数控液压卷板机',
  'plate-rolling-machine-2': '筒体板材卷制工位',
  'sandblasting-machine': '工业喷砂抛丸除锈系统',
  'digital-depth-caliper': '数显精密深度千分尺与卡尺',
  'ndt-inspection': '焊缝无损检测（NDT）设备',
  'overhead-bridge-crane': '重型桥式起重机吊装系统',
  'laser-blanking-1': '数控光纤激光钢板下料系统',
  'laser-blanking-2': '精密中厚板激光切割平台',
  'laser-cutter': '高功率数控激光金属切割机',
  'welding-servo-positioner': '伺服驱动容器焊接变位机',
  'digital-vernier-caliper': '电子数显游标卡尺',
  'plasma-cutting-machine': '数控重型钢板等离子切割机',
  'micrometer-gauge': '精密外径千分尺',
  'rail-submerged-arc-welder': '轨道式自动埋弧焊机',
  'edge-milling-1': '重型钢板铣边与坡口加工机',
  'edge-milling-2': '焊缝坡口精密铣边工位',
  'edge-milling-3': '高精度板材坡口加工线',
  'leeb-hardness-tester': '高精度数显里氏硬度计',
}

const EQUIPMENT_GROUP_ZH: Record<string, string> = {
  Welding: '焊接工艺',
  'Quality & NDT': '质检与无损检测',
  Forming: '成型加工',
  'Surface Treatment': '表面处理',
  Lifting: '重型吊装',
  Cutting: '数控下料',
}

export function getEquipmentTitle(slug: string, fallback: string, locale: Locale) {
  return locale === 'zh' ? EQUIPMENT_TITLES_ZH[slug] || fallback : fallback
}

export function getEquipmentGroup(group: string, locale: Locale) {
  return locale === 'zh' ? EQUIPMENT_GROUP_ZH[group] || group : group
}

export function getCertificates(locale: Locale) {
  if (locale === 'en') return R2_CERTIFICATES
  return [
    {
      ...R2_CERTIFICATES[0],
      title: '安全生产许可证',
      holder: '江苏锐志石化工程有限公司',
      scope: '建筑施工',
      issuer: '江苏省住房和城乡建设厅',
    },
    {
      ...R2_CERTIFICATES[1],
      title: '建筑业企业资质证书',
      holder: '江苏锐志石化工程有限公司',
      scope: '石油化工工程施工总承包三级、机电工程施工总承包三级',
      issuer: '淮安市住房和城乡建设局',
    },
  ]
}

const CLIENTS_ZH = [
  { name: '中国石化江苏石油分公司', sector: '油气储运与油库' },
  { name: '山东海右石化集团', sector: '石油炼制' },
  { name: '江苏富强新材料有限公司', sector: '环氧丙烷与双氧水' },
  { name: '安道麦安邦（江苏）有限公司', sector: '农化与精细化工' },
  { name: '大唐（江苏）环保装备有限公司', sector: '脱硝催化剂系统' },
  { name: '南京金陵亨斯迈新材料有限公司', sector: '特种化学品' },
  { name: '江苏瀚康电子材料有限公司', sector: '锂电池电子材料' },
  { name: '江苏淮河化工有限公司', sector: '合成氨与硝基化工' },
  { name: '甘肃省化工研究院', sector: '中试反应器与塔器' },
  { name: '山东临沂东亮有限公司', sector: '工业气体冷却' },
  { name: '山东赫达集团股份有限公司', sector: '高分子材料与环保' },
  { name: '江苏威明石化有限公司', sector: '环己酮与大型罐区' },
  { name: '中信元钧环保科技', sector: '环保新材料' },
  { name: '湖南鲁丽木业有限公司', sector: '工业成套生产线' },
  { name: '南京环保产业创新中心', sector: '工艺管道与储罐' },
  { name: '马鞍山金星化工集团', sector: '钛白粉化工' },
  { name: '华能淮安电厂', sector: '能源与电力' },
  { name: '江苏福斯特化工有限公司', sector: '精细化工' },
] as const

export function getMajorClients(locale: Locale) {
  return locale === 'zh' ? CLIENTS_ZH : MAJOR_CLIENTS
}

const FAB_PROJECTS_ZH = [
  { no: 1, client: '甘肃省化工研究院', project: '定制管式环流反应器（实验室小试及中试放大撬块）', period: '2025.08 – 2025.09', location: '甘肃兰州', category: '非标设备制造' },
  { no: 2, client: '甘肃省化工研究院', project: '多塔氯化反应中试装置制造', period: '2025.10 – 至今', location: '甘肃兰州', category: '非标设备制造' },
  { no: 3, client: '山东临沂东亮有限公司', project: '定制工业气体冷却换热器批次制造', period: '2025.12', location: '山东临沂', category: '非标设备制造' },
  { no: 4, client: '江苏瀚康电子材料有限公司', project: '59,600 吨/年锂电池添加剂成套装置（设备、管道、钢结构、电气仪表）', period: '2023.04 – 2024.11', location: '淮安盐化新材料园区', category: '石化安装总包' },
  { no: 5, client: '大唐（江苏）环保装备有限公司', project: '10,000 m³/年蜂窝脱硝催化剂生产线设备安装', period: '2023.05 – 2023.11', location: '江苏盱眙', category: '环保与能源工程' },
  { no: 6, client: '南京环保产业创新中心', project: '连云港项目储罐、工艺管道、阀门及钢结构制造安装', period: '2023.12 – 2024.02', location: '江苏连云港', category: '环保与能源工程' },
]

export function getFabricationProjects(locale: Locale) {
  return locale === 'zh' ? FAB_PROJECTS_ZH : FABRICATION_PROJECTS
}

const INSTALL_RECORDS_ZH = [
  { no: 1, client: '中国石化江苏石油分公司', project: '淮安齐湖油库工程（8×5000m³、4×3000m³、2×1000m³ 储罐、工艺管道、消防、防腐及电仪）', period: '2013.04 – 2014.11', location: '淮安清浦' },
  { no: 2, client: '山东海右石化集团', project: '100 万吨/年延迟焦化联合装置钢结构、101 米焦化塔及管廊工程', period: '2018.05 – 2019.01', location: '山东日照' },
  { no: 3, client: '江苏富强新材料有限公司', project: '10 万吨/年环氧丙烷装置（含 3×386 吨主反应器吊装、钢结构及防腐）', period: '2019.03 – 2019.10', location: '江苏淮安' },
  { no: 4, client: '江苏富强新材料有限公司', project: '双氧水装置 6 套主设备组焊与设备操作平台安装', period: '2020.01 – 2020.07', location: '江苏淮安' },
  { no: 5, client: '江苏威明石化有限公司', project: '15 万吨/年环己酮项目（4×5000m³、3×3000m³ 储罐、工艺管道及设备安装）', period: '2018.01 – 2018.10', location: '南通如东' },
  { no: 6, client: '安道麦安邦（江苏）有限公司', project: '1.3 万吨/年乙烯利搬迁升级项目 — 工艺及伴热外管廊', period: '2021.03 – 2021.06', location: '江苏淮安' },
  { no: 7, client: '南京金陵亨斯迈新材料有限公司', project: '环氧丙烷项目 — 污水处理厌氧反应罐及内件制造安装', period: '2016.04 – 2017.03', location: '江苏南京' },
  { no: 8, client: '江苏淮河化工有限公司', project: '合成氨节能改造 — 240 t/d 粉煤气化成套装置安装', period: '2019.03 – 2020.10', location: '淮安盱眙' },
  { no: 9, client: '江苏淮河化工有限公司', project: 'PSA 变压吸附脱碳与提氢装置安装工程', period: '2014.10 – 2015.05', location: '淮安盱眙' },
  { no: 10, client: '江苏淮河化工有限公司', project: '合成氨变换及脱硫改造外管廊工程', period: '2015.04 – 2015.06', location: '淮安盱眙' },
  { no: 11, client: '江苏淮河化工有限公司', project: '硝基甲苯尾气升级 — 一氧化氮吸收及稀硝酸装置', period: '2017.10 – 2018.01', location: '淮安盱眙' },
  { no: 12, client: '山东赫达集团股份有限公司', project: '环保污水处理站升级工程（设备、管道、钢结构、曝气与电气）', period: '2021.09 – 2022.02', location: '山东淄博' },
  { no: 13, client: '淄博赫达高分子材料有限公司', project: '新建工业污水处理站设备制造与安装工程', period: '2022.05 – 2022.10', location: '淄博高青' },
  { no: 14, client: '中信元钧环保科技（江苏）', project: '60 万 m³/年陶粒生产线设备、管道及钢结构安装', period: '2020.03 – 2020.07', location: '淮安盱眙' },
  { no: 15, client: '湖南鲁丽木业有限公司', project: '80 万 m³/年 FOSB 生产线设备、非标制造、风管及仪表安装', period: '2023.02 – 2023.12', location: '湖南永州' },
  { no: 16, client: '江苏福斯特化工制造有限公司', project: '精馏装置制造、安装、防腐及绝热保温工程', period: '2017.07 – 2017.11', location: '淮安洪泽' },
  { no: 17, client: '江苏环新新材料有限公司', project: '异佛尔酮项目 — 1,000 m³ 丙酮内浮顶储罐制造与组焊', period: '2012.06 – 2012.08', location: '盐城大丰港' },
  { no: 18, client: '响水恒利达化工科技有限公司', project: '1、2、4 号车间工艺设备、管道及电仪安装工程', period: '2016.08 – 2017.03', location: '盐城响水' },
  { no: 19, client: '安徽科立华化工有限公司', project: '农化原药与制剂扩产设备安装工程', period: '2017.03 – 2017.07', location: '安徽宿州' },
  { no: 20, client: '潜江工业污水处理厂', project: '深度处理单元设备制造、安装、防腐及电气工程', period: '2017.10 – 2018.01', location: '湖北潜江' },
]

export function getInstallationTrackRecord(locale: Locale) {
  return locale === 'zh' ? INSTALL_RECORDS_ZH : INSTALLATION_TRACK_RECORD
}

export function getDepartmentValues(locale: Locale) {
  if (locale === 'en') {
    return [
      {
        dept: 'R&D Department',
        body: 'Continuous exploration of process fabrication technologies, workflow optimization, hands-on engineering learning, integrity, and long-term equipment competitiveness.',
      },
      {
        dept: 'Technical Engineering Department',
        body: 'Focused on technical reliability, operational safety, and buyer requirements — maintaining strict standards across product quality, system stability, and engineering drawings.',
      },
      {
        dept: 'Production Department',
        body: 'Strict adherence to fabrication procedure integrity, dimensional compliance, weld traceability, and on-schedule workshop delivery.',
      },
      {
        dept: 'Market & Project Coordination',
        body: 'Client-oriented communication, transparent technical quotation, and coordinated cross-departmental support from inquiry to site commissioning.',
      },
    ]
  }
  return [
    { dept: '研发部', body: '持续探索工艺装备制造技术，优化生产工艺流程，注重工程实践积累与诚信经营，打造长期装备竞争力。' },
    { dept: '工程技术部', body: '聚焦技术可靠性、运行安全与客户工况需求，对图纸设计、系统稳定性及产品质量执行严格标准。' },
    { dept: '生产制造部', body: '严守制造工艺纪律、尺寸公差标准与焊缝可追溯要求，确保重型装备按期高质量出厂。' },
    { dept: '市场与项目协调部', body: '坚持客户导向沟通，提供清晰透明的技术报价，统筹跨部门资源支持从询盘到现场投运全流程。' },
  ]
}
