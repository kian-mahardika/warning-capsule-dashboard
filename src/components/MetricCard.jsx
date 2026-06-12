const toneClass = {
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
  orange: "border-orange-200 bg-orange-50 text-orange-700",
  red: "border-red-200 bg-red-50 text-red-700",
  slate: "border-slate-200 bg-slate-50 text-slate-700"
};

export default function MetricCard({ label, value, helper, tone = "slate", icon }) {
  return (
    <div className={`rounded-2xl border p-4 ${toneClass[tone] || toneClass.slate}`}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-black uppercase tracking-wider opacity-70">{label}</p>
        {icon ? <div className="opacity-80">{icon}</div> : null}
      </div>
      <p className="mt-2 text-2xl font-black tracking-tight text-slate-950">{value}</p>
      {helper ? <p className="mt-1 text-[11px] font-semibold opacity-75">{helper}</p> : null}
    </div>
  );
}
