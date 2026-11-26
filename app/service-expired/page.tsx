export default function ServiceExpiredPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-crimson">Service Notice</p>
      <h1 className="mt-3 text-3xl font-semibold text-ink">Website Service Temporarily Paused</h1>
      <p className="mt-4 text-sm leading-relaxed text-body">
        This website is currently unavailable pending service renewal. Administrators may sign in via the management console to check account status.
      </p>
    </div>
  )
}
