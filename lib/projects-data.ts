export interface EngineeringProject {
  no: number
  client: string
  project: string
  period: string
  location: string
  category: 'Equipment Fabrication' | 'Petrochemical EPC & Installation' | 'Environmental & Energy'
}

export const MAJOR_CLIENTS = [
  { name: 'Sinopec Jiangsu Petroleum Branch', sector: 'Oil & Gas Storage' },
  { name: 'Shandong Haiyou Petrochemical Group', sector: 'Petroleum Refining' },
  { name: 'Jiangsu Fuqiang New Materials Co., Ltd.', sector: 'Propylene Oxide & H₂O₂' },
  { name: 'ADAMA Anpon (Jiangsu) Co., Ltd.', sector: 'Agrochemical & Fine Chemical' },
  { name: 'Datang (Jiangsu) Environmental Equipment', sector: 'DeNOx Catalyst Systems' },
  { name: 'Nanjing Jinling Huntsman New Materials', sector: 'Specialty Chemicals' },
  { name: 'Jiangsu Hankang Electronic Materials', sector: 'Lithium Battery Materials' },
  { name: 'Jiangsu Huaihe Chemical Co., Ltd.', sector: 'Synthetic Ammonia & Nitro' },
  { name: 'Gansu Research Institute of Chemical Industry', sector: 'Pilot Reactors & Towers' },
  { name: 'Linyi Dongliang Material Technology Co., Ltd.', sector: 'Industrial Gas Cooling' },
  { name: 'Shandong Head Group Co., Ltd.', sector: 'Polymer & Environmental' },
  { name: 'Jiangsu Weiming Petrochemical Co., Ltd.', sector: 'Cyclohexanone & Tank Farms' },
  { name: 'CITIC Yuanjun Environmental Protection', sector: 'Environmental Materials' },
  { name: 'Hunan Luli Wood Industry Co., Ltd.', sector: 'Industrial Production Lines' },
  { name: 'Nanjing Environmental Protection Innovation Center', sector: 'Process Piping & Tanks' },
  { name: "Ma'anshan Jinxing Chemical Group", sector: 'Titanium Dioxide' },
  { name: "Jiangsu Huai'an Huaneng Power Plant", sector: 'Energy & Power' },
  { name: 'Jiangsu Foster Chemical Co., Ltd.', sector: 'Fine Chemicals' },
] as const

export const FABRICATION_PROJECTS: EngineeringProject[] = [
  { no: 1, client: 'Gansu Research Institute of Chemical Industry', project: 'Custom Tubular Loop Reactor (Lab Pilot & Scale-Up Skid)', period: '2025.08 – 2025.09', location: 'Lanzhou, Gansu', category: 'Equipment Fabrication' },
  { no: 2, client: 'Gansu Research Institute of Chemical Industry', project: 'Multi-Column Chlorination Tower Pilot Unit Fabrication', period: '2025.10 – Present', location: 'Lanzhou, Gansu', category: 'Equipment Fabrication' },
  { no: 3, client: 'Linyi Dongliang Material Technology Co., Ltd.', project: 'Custom Industrial Gas Cooling Heat Exchanger Batch', period: '2025.12', location: 'Linyi, Shandong', category: 'Equipment Fabrication' },
  { no: 4, client: 'Jiangsu Hankang Electronic Materials Co., Ltd.', project: '59,600 t/yr Lithium Battery Additive Complete Unit (Equipment, Piping, Steel Structure, Electrical, Instrumentation)', period: '2023.04 – 2024.11', location: "Huai'an Salt Chemical Park", category: 'Petrochemical EPC & Installation' },
  { no: 5, client: 'Datang (Jiangsu) Environmental Equipment Co., Ltd.', project: '10,000 m³/yr Honeycomb DeNOx Catalyst Manufacturing Line Installation', period: '2023.05 – 2023.11', location: 'Xuyi, Jiangsu', category: 'Environmental & Energy' },
  { no: 6, client: 'Nanjing Environmental Protection Industry Innovation Center', project: 'Lianyungang Project Storage Tanks, Process Piping, Valves & Structural Steel Fabrication & Installation', period: '2023.12 – 2024.02', location: 'Lianyungang, Jiangsu', category: 'Environmental & Energy' },
]

export const INSTALLATION_TRACK_RECORD: EngineeringProject[] = [
  { no: 1, client: 'Sinopec Jiangsu Petroleum Branch', project: "Huai'an Qihu Oil Depot Project (8×5,000 m³, 4×3,000 m³, 2×1,000 m³ Storage Tanks, Process Piping, Fire Protection, Anti-Corrosion, Electrical & Instrumentation)", period: '2013.04 – 2014.11', location: "Qingpu, Huai'an", category: 'Petrochemical EPC & Installation' },
  { no: 2, client: 'Shandong Haiyou Petrochemical Group', project: '1,000,000 t/yr Delayed Coking Integrated Unit Steel Structure & 108 m Coking Tower + Pipe Racks', period: '2018.05 – 2019.01', location: 'Rizhao, Shandong', category: 'Petrochemical EPC & Installation' },
  { no: 3, client: 'Jiangsu Fuqiang New Materials Co., Ltd.', project: '100,000 t/yr Propylene Oxide Unit (Incl. Hoisting 3×386-Ton Main Reactors, Steel Structure & Anti-Corrosion)', period: '2019.03 – 2019.10', location: "Huai'an, Jiangsu", category: 'Petrochemical EPC & Installation' },
  { no: 4, client: 'Jiangsu Fuqiang New Materials Co., Ltd.', project: 'Hydrogen Peroxide Unit Assembly, Welding & Equipment Platform Erection (6 Main Process Units)', period: '2020.01 – 2020.07', location: "Huai'an, Jiangsu", category: 'Petrochemical EPC & Installation' },
  { no: 5, client: 'Jiangsu Weiming Petrochemical Co., Ltd.', project: '150,000 t/yr Cyclohexanone Project (4×5,000 m³ & 3×3,000 m³ Storage Tanks, Process Piping & Equipment)', period: '2018.01 – 2018.10', location: 'Rudong, Nantong', category: 'Petrochemical EPC & Installation' },
  { no: 6, client: 'ADAMA Anpon (Jiangsu) Co., Ltd.', project: '13,000 t/yr Ethephon Relocation & Upgrade — Process & Heating External Pipe Racks', period: '2021.03 – 2021.06', location: "Huai'an, Jiangsu", category: 'Petrochemical EPC & Installation' },
  { no: 7, client: 'Nanjing Jinling Huntsman New Materials Co., Ltd.', project: 'Propylene Oxide Project — Wastewater Treatment Anaerobic Reactor Tank & Internals Fabrication & Installation', period: '2016.04 – 2017.03', location: 'Nanjing, Jiangsu', category: 'Environmental & Energy' },
  { no: 8, client: 'Jiangsu Huaihe Chemical Co., Ltd.', project: 'Synthetic Ammonia Energy-Saving Retrofit — 240 t/d Pulverized Coal Gasification Complete Unit', period: '2019.03 – 2020.10', location: "Xuyi, Huai'an", category: 'Petrochemical EPC & Installation' },
  { no: 9, client: 'Jiangsu Huaihe Chemical Co., Ltd.', project: 'PSA Pressure Swing Adsorption Decarbonization & Hydrogen Purification Unit', period: '2014.10 – 2015.05', location: "Xuyi, Huai'an", category: 'Petrochemical EPC & Installation' },
  { no: 10, client: 'Jiangsu Huaihe Chemical Co., Ltd.', project: 'Synthetic Ammonia Shift & Desulfurization Retrofit External Pipe Gallery', period: '2015.04 – 2015.06', location: "Xuyi, Huai'an", category: 'Petrochemical EPC & Installation' },
  { no: 11, client: 'Jiangsu Huaihe Chemical Co., Ltd.', project: 'Nitrotoluene Exhaust Gas Upgrade — Nitric Oxide Absorption & Dilute Nitric Acid Unit', period: '2017.10 – 2018.01', location: "Xuyi, Huai'an", category: 'Environmental & Energy' },
  { no: 12, client: 'Shandong Head Group Co., Ltd.', project: 'Environmental Wastewater Treatment Station Upgrade (Equipment, Piping, Steel Structure, Aeration, Electrical)', period: '2021.09 – 2022.02', location: 'Zibo, Shandong', category: 'Environmental & Energy' },
  { no: 13, client: 'Zibo Head Polymer Materials Co., Ltd.', project: 'New Industrial Wastewater Treatment Station Fabrication & Installation', period: '2022.05 – 2022.10', location: 'Gaoqing, Zibo', category: 'Environmental & Energy' },
  { no: 14, client: 'CITIC Yuanjun Environmental Protection (Jiangsu)', project: '600,000 m³/yr Ceramsite Production Line Equipment, Piping & Steel Structure Installation', period: '2020.03 – 2020.07', location: "Xuyi, Huai'an", category: 'Environmental & Energy' },
  { no: 15, client: 'Hunan Luli Wood Industry Co., Ltd.', project: '800,000 m³/yr FOSB Production Line Equipment, Non-Standard Fabrication, Ducting & Instrumentation', period: '2023.02 – 2023.12', location: 'Yongzhou, Hunan', category: 'Petrochemical EPC & Installation' },
  { no: 16, client: 'Jiangsu Foster Chemical Manufacturing Co., Ltd.', project: 'Distillation Unit Fabrication, Installation, Anti-Corrosion & Thermal Insulation', period: '2017.07 – 2017.11', location: "Hongze, Huai'an", category: 'Petrochemical EPC & Installation' },
  { no: 17, client: 'Jiangsu Huanxin Advanced Materials Co., Ltd.', project: 'Isophorone Project — 1,000 m³ Acetone Floating-Roof Storage Tank Fabrication & Erection', period: '2012.06 – 2012.08', location: 'Dafeng Port, Yancheng', category: 'Petrochemical EPC & Installation' },
  { no: 18, client: 'Xiangshui Henglida Chemical Technology Co., Ltd.', project: 'Workshops 1, 2 & 4 Process Equipment, Piping, Electrical & Instrumentation Installation', period: '2016.08 – 2017.03', location: 'Xiangshui, Yancheng', category: 'Petrochemical EPC & Installation' },
  { no: 19, client: 'Anhui Kelihua Chemical Co., Ltd.', project: 'Agrochemical Technical & Formulation Capacity Expansion Equipment Installation', period: '2017.03 – 2017.07', location: 'Suzhou, Anhui', category: 'Petrochemical EPC & Installation' },
  { no: 20, client: 'Qianjiang Industrial Wastewater Treatment Plant', project: 'Advanced Treatment Unit Equipment Fabrication, Installation, Anti-Corrosion & Electrical', period: '2017.10 – 2018.01', location: 'Qianjiang, Hubei', category: 'Environmental & Energy' },
]
