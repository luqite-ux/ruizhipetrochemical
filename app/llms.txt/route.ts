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
- China Official Website: ${COMPANY.domesticWebsite}
- Qualifications: Production License of Special Equipment — Class D Stationary Pressure Vessel Manufacturing (TS2232K89-2030); GC2 Industrial Piping Installation (TS3832M95-2030); Grade II General Contracting for Petrochemical Engineering Construction & Grade II General Contracting for Electromechanical Engineering Construction (D232J05568); Work Safety License (JS-JZ-2022-004596); Business License (91321300MA2116FE3X)

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
