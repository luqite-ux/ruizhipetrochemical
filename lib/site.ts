export const SITE_URL = 'https://www.ruizhipetrochemicalequipment.com'

export const COMPANY = {
  name: 'Jiangsu Ruizhi Petrochemical Engineering Co., Ltd.',
  shortName: 'Ruizhi Petrochemical',
  monogram: 'RZ',
  phone: '+86 195 9993 1811',
  phoneHref: 'tel:+8619599931811',
  email: 'info@ruizhipetrochemicalequipment.com',
  address:
    "No. 19-8 Longshan Road, Economic Development Zone, Xuyi County, Huai'an, Jiangsu, China",
  summary:
    'Jiangsu Ruizhi Petrochemical Engineering Co., Ltd. is a direct source factory that integrates design, fabrication and site installation of petrochemical pressure vessels, storage tanks, heat exchangers, condensers, distillation columns and reactors. Our 22,000 m² (33 mu) base in Xuyi, Jiangsu, is equipped for heavy fabrication with a 50/10 t overhead bridge crane workshop.',
}

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Projects', href: '/projects' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'Quality', href: '/quality' },
  { label: 'About', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
] as const

export const METRICS = [
  { value: '16+', label: 'Years of Experience', note: 'Design to installation' },
  { value: '22,000 m²', label: 'Xuyi Manufacturing Base', note: '33 mu in Jiangsu' },
  { value: '37+', label: 'Delivered Projects', note: 'Across petrochemical sectors' },
  { value: '30–45 Days', label: 'Typical Delivery', note: 'Standard configurations' },
] as const

export const CLIENTS = [
  'Sinopec Jiangsu Petroleum Branch',
  'Shandong Haiyou Petrochemical',
  'Jiangsu Fuqiang New Materials',
  'ADAMA Anpon (Jiangsu)',
  'Datang (Jiangsu) Environmental Equipment',
  'Nanjing Jinling Huntsman',
  'Jiangsu Hankang Electronic Materials',
  'Jiangsu Huaihe Chemical',
  'Gansu Research Institute of Chemical Industry',
  'Shandong Head Group',
  'Weiming Petrochemical',
  'CITIC Yuanjun',
] as const

export const FAQS = [
  {
    q: 'What is your minimum order quantity?',
    a: 'One unit. Every vessel, tank, exchanger or column is engineered to the buyer’s process data, so a single unit is a normal order.',
  },
  {
    q: 'Do you support OEM / ODM customization?',
    a: 'Yes. We build to your drawings (OEM) or develop the thermal, mechanical and layout design from your process conditions (ODM), including nozzle orientations, internals, supports and platforms.',
  },
  {
    q: 'What is the typical lead time?',
    a: 'Standard configurations ship in 30–45 days after design approval. Large columns, tanks and special alloys are scheduled against the project plan and confirmed in the quotation.',
  },
  {
    q: 'What design life do your vessels have?',
    a: 'Equipment is designed for a 10-year design life under the specified operating conditions, with corrosion allowance and materials selected for the service.',
  },
  {
    q: 'Which documents and inspections are available?',
    a: 'Technical datasheets, general arrangement drawings, material test reports and NDT records are issued with each unit. Third-party inspection can be arranged at our Xuyi base before shipment.',
  },
  {
    q: 'Can you install the equipment on site?',
    a: 'Yes. Our construction qualifications cover petrochemical and electromechanical general contracting, so the same team handles heavy lifting, erection, piping tie-ins and commissioning support.',
  },
] as const

export const CERTIFICATES = [
  {
    id: 'safety-license',
    title: 'Work Safety License',
    number: '(苏)JZ安许证字[2022]004596',
    scope: 'Building construction',
    authority: 'Jiangsu Provincial Department of Housing and Urban-Rural Development',
    image: '/images/11-cert-safety-license.jpg',
    width: 550,
    height: 413,
    alt: 'Work Safety License of Jiangsu Ruizhi Petrochemical Engineering Co., Ltd., number (苏)JZ安许证字[2022]004596',
  },
  {
    id: 'construction-qualification',
    title: 'Construction Enterprise Qualification Certificate',
    number: 'D332462680',
    scope:
      'Grade III General Contracting for Petrochemical Engineering and Grade III General Contracting for Electromechanical Engineering',
    authority: 'Housing and Urban-Rural Development Authority, Jiangsu',
    image: '/images/12-cert-construction-qual.jpg',
    width: 450,
    height: 585,
    alt: 'Construction Enterprise Qualification Certificate D332462680 of Jiangsu Ruizhi Petrochemical Engineering Co., Ltd.',
  },
] as const

export const CAPABILITIES = [
  {
    title: 'Heavy Fabrication Hall',
    body: 'Column-free bays served by a 50/10 t overhead bridge crane for shells, heads and large assemblies.',
    metric: '50/10 t',
  },
  {
    title: 'Laser Cutting',
    body: 'CNC laser profiling of plate for tight shell-course, head-blank and nozzle-cutout tolerances.',
    metric: 'CNC',
  },
  {
    title: 'Submerged-Arc Welding',
    body: 'Automated longitudinal and circumferential seams with qualified procedures and welders.',
    metric: 'SAW',
  },
  {
    title: 'NDT Inspection',
    body: 'Radiographic, ultrasonic, magnetic-particle and penetrant testing on pressure-retaining welds.',
    metric: 'RT · UT · MT · PT',
  },
  {
    title: 'Spectrometer Analysis',
    body: 'Positive material identification on alloy components before they enter fabrication.',
    metric: 'PMI',
  },
  {
    title: 'Hydrostatic Testing',
    body: 'Pressure tests witnessed and recorded before blasting, coating and dispatch.',
    metric: 'Pre-ship',
  },
] as const
