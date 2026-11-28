import { NextResponse } from 'next/server'
import { COMPANY } from '@/lib/site'

export function GET() {
  const body = `# ${COMPANY.name}

> Comprehensive service provider focused on the design and manufacturing of pressure vessels and petrochemical equipment, driving petrochemical and electromechanical EPC general contracting from our 22,000 m² Xuyi base.

## Key Facts
- Legal Name: ${COMPANY.name}
- Manufacturing Base: ${COMPANY.address} (22,000 m² / 33 mu)
- Official Phone: ${COMPANY.phone}
- Official Email: ${COMPANY.email}
- Qualifications: Grade III General Contracting for Petrochemical Engineering Construction; Grade III General Contracting for Mechanical & Electrical Engineering Construction; Work Safety License (苏)JZ安许证字[2022]004596

## Primary Routes
- /: Overview, 3D Vessel Cutaway Studio, Featured Equipment, Clients, Certificates
- /products: Full 27-Model Equipment Catalog across 7 Categories
- /projects: 37+ Delivered Engineering Projects & Major Cooperating Clients
- /manufacturing: Xuyi 22,000 m² Plant & 22 Workshop Fabrication Machines
- /quality: Individual Qualification Certificates & NDT / PMI Inspection Lab
- /about: Manufacturing-Core Positioning & Four-Department Standards
- /news: Company Announcements & Technical Updates
- /contact: Direct Engineering Quotation (RFQ)
`
  return new NextResponse(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
