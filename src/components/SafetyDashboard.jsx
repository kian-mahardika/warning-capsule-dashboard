import { AlertTriangle, BatteryCharging, BellRing, CheckCircle2, Clock3, MapPinned, ShieldCheck, Smartphone, UsersRound, Wifi } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { businessMetrics, deviceHealth, emergencyMetrics, safetyMetrics, safetyTimeline, weeklyAlerts } from "@/data/dashboardData";
import Header from "@/components/Header";
import MetricCard from "@/components/MetricCard";
import SafetyMap from "@/components/SafetyMap";
import SectionCard from "@/components/SectionCard";

const icons = [ShieldCheck, Wifi, BatteryCharging, CheckCircle2, MapPinned, ShieldCheck, UsersRound, Smartphone];

export default function SafetyDashboard() {
  return (
    <div className="space-y-5">
      <Header />

      <div className="grid gap-5 xl:grid-cols-[1.9fr_0.9fr]">
        <SectionCard
          title="Safety Monitoring"
          subtitle="Pantau status pengguna, device, koneksi, dan kesiapan SOS dalam satu dashboard."
          icon={<ShieldCheck size={24} />}
          action={<span className="rounded-full bg-orange-50 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-capsuleOrange">Live Data</span>}
        >
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {safetyMetrics.map((item, index) => {
              const Icon = icons[index] || ShieldCheck;
              return <MetricCard key={item.label} {...item} icon={<Icon size={17} />} />;
            })}
          </div>
          <div className="mt-4">
            <SafetyMap />
          </div>
        </SectionCard>

        <SectionCard
          title="Emergency Response Metrics"
          subtitle="Metrik performa respons ketika pull-pin ditarik atau tombol SOS ditekan."
          icon={<BellRing size={24} />}
        >
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {emergencyMetrics.map((item, index) => (
              <MetricCard key={item.label} {...item} tone={index % 2 === 0 ? "orange" : "blue"} />
            ))}
          </div>
          <div className="mt-4 h-[210px] rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="mb-2 text-center text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">Weekly Test vs SOS Alert</p>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyAlerts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="test" fill="#03449d" radius={[8, 8, 0, 0]} />
                <Bar dataKey="sos" fill="#ff6b00" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.95fr]">
        <SectionCard
          title="Device Health Performance"
          subtitle="Kondisi komponen inti: pull-pin sensor, sirene, BLE, baterai, dan firmware."
          icon={<Smartphone size={23} />}
        >
          <div className="grid gap-3 md:grid-cols-3">
            {deviceHealth.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{item.label}</p>
                <p className="mt-2 text-xl font-black text-emerald-600">{item.status}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Activity & Safety Timeline"
          subtitle="Riwayat aktivitas pengguna, device sync, dan notifikasi guardian."
          icon={<Clock3 size={23} />}
        >
          <div className="space-y-3">
            {safetyTimeline.map((item) => (
              <div key={`${item.time}-${item.title}`} className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
                <div className="min-w-14 rounded-xl bg-white px-2 py-2 text-center text-xs font-black text-navy shadow-sm">{item.time}</div>
                <div>
                  <p className="text-sm font-black text-slate-950">{item.title}</p>
                  <p className="text-xs font-semibold text-slate-500">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Business & Safety Impact Snapshot"
        subtitle="Simulasi data untuk pitch: adopsi device, subscription, dan dampak keselamatan."
        icon={<AlertTriangle size={23} />}
      >
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {businessMetrics.map((item, index) => (
            <MetricCard key={item.label} {...item} tone={index % 3 === 0 ? "blue" : index % 3 === 1 ? "orange" : "green"} />
          ))}
        </div>
        <div className="mt-4 h-[230px] rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="mb-2 text-center text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">Projected Active Device Growth</p>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[{ month: "Jan", devices: 40 }, { month: "Feb", devices: 90 }, { month: "Mar", devices: 155 }, { month: "Apr", devices: 210 }, { month: "May", devices: 264 }, { month: "Jun", devices: 360 }]}>
              <defs>
                <linearGradient id="deviceGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#03449d" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#03449d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="devices" stroke="#03449d" fillOpacity={1} fill="url(#deviceGrowth)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>
  );
}
