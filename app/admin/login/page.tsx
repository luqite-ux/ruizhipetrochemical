import Link from 'next/link'

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; reason?: string }>
}) {
  const sp = await searchParams
  const errorMsg = sp.error
    ? decodeURIComponent(sp.error)
    : sp.reason === 'unauthorized'
      ? 'Please sign in to access the website management console.'
      : null

  return (
    <div className="min-h-screen bg-[#f6f7f9] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
        <div className="mb-6 text-center">
          <Link href="/" className="inline-block mb-4">
            <img
              src="/icon.png"
              alt="Jiangsu Ruizhi Petrochemical Engineering Co., Ltd."
              className="h-10 w-auto mx-auto object-contain"
            />
          </Link>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
            Admin Console Login
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Jiangsu Ruizhi Petrochemical Engineering Co., Ltd.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMsg}
          </div>
        )}

        <form action="/api/auth/login" method="post" className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
              Account Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="info@ruizhipetrochemicalequipment.com"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Enter password"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#0f4c81] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#0c3d68] transition-colors cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-slate-500 hover:text-slate-800 transition-colors">
            &larr; Return to public website
          </Link>
        </div>
      </div>
    </div>
  )
}
