import { ShieldCheck, UserRound } from "lucide-react";

export default function Header() {
  return (
    <header className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white shadow-lg shadow-blue-900/20">
            <ShieldCheck size={28} />
          </div>
          <div>
            <div className="flex flex-wrap items-end gap-2">
              <h1 className="text-2xl font-black uppercase tracking-tight text-navy">WARNING CAPSULE</h1>
              <span className="mb-1 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Safety Command Center</span>
            </div>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-capsuleOrange">Personal safety technology monitoring</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-white">
            <UserRound size={20} />
          </div>
          <div>
            <p className="text-sm font-black text-navy">Demo User / Guardian View</p>
            <p className="text-xs font-semibold text-slate-500">warningcapsule.demo@gmail.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
