import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Login | Jiangsu Ruizhi Petrochemical Engineering Co., Ltd.',
  robots: { index: false, follow: false },
}

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
