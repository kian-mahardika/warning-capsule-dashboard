import { Activity, BellRing, Cpu, LayoutDashboard } from "lucide-react";

const tabs = [
  { id: "dashboard", label: "1. SAFETY DASHBOARD UTAMA", icon: LayoutDashboard },
  { id: "simulator", label: "2. SOS INTERACTIVE SIMULATOR", icon: BellRing },
  { id: "setup", label: "3. KUSTOMISASI GUARDIAN & DEVICE", icon: Cpu }
];

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <div className="sticky top-0 z-50 border-b border-blue-900/20 bg-navy px-3 py-2 shadow-lg">
      <div className="mx-auto flex max-w-[1800px] flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wide transition ${
                active
                  ? "bg-white text-navy shadow-sm"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
        <div className="ml-auto hidden items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-black text-white/90 lg:flex">
          <Activity size={15} /> Live prototype for pitch demo
        </div>
      </div>
    </div>
  );
}
