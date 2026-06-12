import { MapPin, Navigation, RadioTower } from "lucide-react";

export default function SafetyMap() {
  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-blue-100 bg-slate-950 map-grid">
      <div className="absolute left-6 top-6 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white backdrop-blur">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">Live Location</p>
        <p className="mt-1 text-lg font-black">Kampus Safe Zone</p>
        <p className="text-xs font-semibold text-blue-100">GPS ±8 m • BLE connected</p>
      </div>

      <div className="absolute left-[50%] top-[52%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/80 bg-emerald-400/10" />
      <div className="absolute left-[50%] top-[52%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/50 sonar-ring" />
      <div className="absolute left-[50%] top-[52%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/50 sonar-ring sonar-ring-delay" />

      <div className="absolute left-[50%] top-[52%] -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-capsuleOrange text-white shadow-2xl shadow-orange-500/40">
          <MapPin size={32} />
        </div>
        <div className="mt-2 rounded-xl bg-white px-3 py-1 text-center text-xs font-black text-navy shadow-lg">User</div>
      </div>

      <div className="absolute right-8 top-10 flex max-w-[270px] items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg">
        <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600">
          <RadioTower size={20} />
        </div>
        <div>
          <p className="text-xs font-black uppercase text-slate-500">Guardian Network</p>
          <p className="text-sm font-black text-slate-950">3 kontak siap menerima SOS</p>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-3">
        {[
          ["Home", "Inside radius 250 m"],
          ["Campus", "Route monitoring active"],
          ["Transit", "Late-night mode ready"]
        ].map(([title, sub]) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-white/10 p-3 text-white backdrop-blur">
            <div className="flex items-center gap-2">
              <Navigation size={15} className="text-capsuleOrange" />
              <p className="text-sm font-black">{title}</p>
            </div>
            <p className="mt-1 text-xs font-semibold text-blue-100">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
