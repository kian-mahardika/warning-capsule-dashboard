export default function SectionCard({ title, subtitle, icon, action, children, className = "" }) {
  return (
    <section className={`rounded-3xl border border-slate-200 bg-white p-5 shadow-soft ${className}`}>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          {icon ? <div className="mt-1 text-capsuleOrange">{icon}</div> : null}
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight text-navy sm:text-xl">{title}</h2>
            {subtitle ? <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">{subtitle}</p> : null}
          </div>
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      {children}
    </section>
  );
}
