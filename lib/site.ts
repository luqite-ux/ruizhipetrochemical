export const SITE_URL = 'https://www.ruizhipetrochemicalequipment.com'

export const COMPANY = {
  name: 'Jiangsu Ruizhi Petrochemical Engineering Co., Ltd.',
  shortName: 'Ruizhi Petrochemical',
  monogram: 'RZ',
  phone: '+86 13401811628 / +86 19351737555',
  phoneHref: 'tel:+8613401811628',
  phones: [
    { display: '+86 13401811628', zhDisplay: '13401811628', href: 'tel:+8613401811628' },
    { display: '+86 19351737555', zhDisplay: '19351737555', href: 'tel:+8619351737555' },
  ],
  domesticWebsite: 'https://www.ruizhishihua.com',
  email: 'info@ruizhipetrochemicalequipment.com',
  address:
    "No. 19-8 Longshan Road, Economic Development Zone, Xuyi County, Huai'an, Jiangsu, China",
  summary:
    'Jiangsu Ruizhi Petrochemical Engineering Co., Ltd. is a comprehensive service provider focused on the design and manufacturing of pressure vessels and petrochemical equipment, driving petrochemical and electromechanical EPC general contracting from this manufacturing core. Our 22,000 m² (33 mu) base in Xuyi, Jiangsu, is equipped for heavy fabrication with a 50/10 t overhead bridge crane workshop.',
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
    id: 'd-pressure-vessel',
    title: 'Production License of Special Equipment (Class D Pressure Vessel)',
    number: 'TS2232K89-2030',
    scope: 'Fixed Pressure Vessel Manufacturing (Medium & Low Pressure Class D)',
    authority: 'Jiangsu Provincial Administration for Market Regulation',
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/ruizhipetrochemical/certificates/d-pressure-vessel-license-72f9d754a4.jpg',
    width: 634,
    height: 897,
    alt: 'Production License of Special Equipment TS2232K89-2030 of Jiangsu Ruizhi Petrochemical Engineering Co., Ltd.',
  },
  {
    id: 'gc2-piping',
    title: 'Production License of Special Equipment (GC2 Industrial Piping)',
    number: 'TS3832M95-2030',
    scope: 'Industrial Piping Installation (GC2)',
    authority: 'Jiangsu Provincial Administration for Market Regulation',
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/ruizhipetrochemical/certificates/gc2-piping-license-18b3c1b99c.jpg',
    width: 634,
    height: 897,
    alt: 'Production License of Special Equipment TS3832M95-2030 of Jiangsu Ruizhi Petrochemical Engineering Co., Ltd.',
  },
  {
    id: 'safety-license',
    title: 'Work Safety License',
    number: 'JS-JZ-2022-004596',
    scope: 'Building construction',
    authority: 'Jiangsu Provincial Department of Housing and Urban-Rural Development',
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/ruizhipetrochemical/certificates/work-safety-license-2025-07db2994e9.jpg',
    width: 1123,
    height: 794,
    alt: 'Work Safety License JS-JZ-2022-004596 of Jiangsu Ruizhi Petrochemical Engineering Co., Ltd.',
  },
  {
    id: 'construction-qualification',
    title: 'Construction Enterprise Qualification Certificate',
    number: 'D232J05568',
    scope:
      'Grade II General Contracting for Petrochemical Engineering and Grade II General Contracting for Electromechanical Engineering',
    authority: 'Jiangsu Provincial Department of Housing and Urban-Rural Development',
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/ruizhipetrochemical/certificates/construction-qualification-grade2-8443fc7f8d.jpg',
    width: 1000,
    height: 1414,
    alt: 'Construction Enterprise Qualification Certificate D232J05568 of Jiangsu Ruizhi Petrochemical Engineering Co., Ltd.',
  },
  {
    id: 'business-license',
    title: 'Business License',
    number: '91321300MA2116FE3X',
    scope: 'Unified Social Credit Code Registration',
    authority: 'Xuyi County Administrative Approval Bureau',
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/ruizhipetrochemical/certificates/business-license-eca0564239.png',
    width: 1280,
    height: 720,
    alt: 'Business License 91321300MA2116FE3X of Jiangsu Ruizhi Petrochemical Engineering Co., Ltd.',
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
