"use client";

import { useState } from "react";
import { BellRing, Check, CircleAlert, ContactRound, Cpu, LockKeyhole, MapPinned, MessageCircle, Plus, ShieldCheck, Smartphone, Trash2 } from "lucide-react";
import { guardians } from "@/data/dashboardData";
import MetricCard from "@/components/MetricCard";
import SectionCard from "@/components/SectionCard";

export default function DeviceSetup() {
  const [deviceCode, setDeviceCode] = useState("WC-MVP-2026-001");
  const [verified, setVerified] = useState(false);
  const [radius, setRadius] = useState(250);

  return (
    <div className="space-y-5">
      <SectionCard
        title="Kustomisasi Guardian & Device"
        subtitle="Kelola profil pengguna, pairing device, kontak darurat, safe zone, dan pengaturan privasi."
        icon={<Cpu size={24} />}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-sm font-black uppercase tracking-wider text-navy">Profil Pengguna</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Nama Pengguna</span>
                <input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-blue-300" defaultValue="Demo User" />
              </label>
              <label className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Nomor HP / Email</span>
                <input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-blue-300" defaultValue="+62 812-0000-0000" />
              </label>
              <label className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Tipe Pengguna</span>
                <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-blue-300" defaultValue="Mahasiswa">
                  <option>Pelajar</option>
                  <option>Mahasiswa</option>
                  <option>Pekerja Urban</option>
                  <option>Anak</option>
                  <option>Lansia</option>
                </select>
              </label>
              <label className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Paket</span>
                <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-blue-300" defaultValue="Family Premium">
                  <option>Basic</option>
                  <option>Family Premium</option>
                  <option>Institutional</option>
                </select>
              </label>
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
            <h3 className="text-sm font-black uppercase tracking-wider text-navy">Registrasi Kode Unik Device</h3>
            <p className="mt-2 text-xs font-semibold text-slate-500">Ketik kode unik perangkat untuk menghubungkan Warning Capsule ke dashboard.</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input value={deviceCode} onChange={(e) => setDeviceCode(e.target.value)} className="min-w-0 flex-1 rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-black uppercase tracking-wider text-slate-800 outline-none focus:border-blue-300" />
              <button type="button" onClick={() => setVerified(true)} className="rounded-2xl bg-navy px-5 py-3 text-sm font-black uppercase tracking-wide text-white">Konfirmasi Device</button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <MetricCard label="PAIRING STATUS" value={verified ? "Verified" : "Waiting"} helper={verified ? "BLE ready" : "Belum dikonfirmasi"} tone={verified ? "green" : "orange"} />
              <MetricCard label="DEVICE ID" value="WC-001" helper="MVP pilot" tone="blue" />
              <MetricCard label="FIRMWARE" value="v1.0.2" helper="Latest build" tone="blue" />
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard
          title="Emergency Guardian Contacts"
          subtitle="Kontak yang menerima notifikasi SOS, SMS fallback, dan akses live location saat darurat."
          icon={<ContactRound size={24} />}
          action={<button type="button" className="flex items-center gap-2 rounded-xl bg-capsuleOrange px-4 py-2 text-xs font-black uppercase text-white"><Plus size={15} /> Tambah Guardian</button>}
        >
          <div className="space-y-3">
            {guardians.map((guardian) => (
              <div key={guardian.phone} className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_auto] md:items-center">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-950">{guardian.name}</p>
                    <p className="text-xs font-semibold text-slate-500">{guardian.role} • {guardian.phone}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {guardian.push ? <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-black uppercase text-blue-700">Push</span> : null}
                      {guardian.sms ? <span className="rounded-full bg-orange-100 px-2 py-1 text-[10px] font-black uppercase text-orange-700">SMS</span> : null}
                      {guardian.live ? <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-black uppercase text-emerald-700">Live Location</span> : null}
                    </div>
                  </div>
                </div>
                <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-500 hover:text-dangerRed">
                  <Trash2 size={15} /> Remove
                </button>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Safe Zone Configuration"
          subtitle="Atur area aman rumah, kampus, kos, atau sekolah agar guardian menerima notifikasi otomatis."
          icon={<MapPinned size={24} />}
        >
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <label className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Nama Safe Zone</span>
              <input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-blue-300" defaultValue="Kampus / Area Kelas" />
            </label>
            <label className="mt-4 block space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Radius Safe Zone: {radius} m</span>
              <input type="range" min="100" max="1000" step="50" value={radius} onChange={(e) => setRadius(e.target.value)} className="w-full accent-orange-500" />
            </label>
            <div className="mt-4 h-56 overflow-hidden rounded-3xl border border-blue-100 bg-slate-950 map-grid">
              <div className="relative h-full w-full">
                <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300 bg-emerald-400/10" />
                <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-capsuleOrange text-white">
                  <MapPinned size={24} />
                </div>
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/10 p-3 text-white backdrop-blur">
                  <p className="text-xs font-black uppercase tracking-wider text-blue-100">Safe Zone Preview</p>
                  <p className="mt-1 text-sm font-black">Alert aktif ketika pengguna keluar dari radius {radius} m</p>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Privacy, Consent & Emergency Rules"
        subtitle="Pengaturan ini penting supaya produk keamanan tidak terasa invasif dan tetap dipercaya pengguna."
        icon={<LockKeyhole size={24} />}
      >
        <div className="grid gap-3 md:grid-cols-4">
          {[
            [Smartphone, "Live Location Access", "Only during emergency", "green"],
            [MessageCircle, "SMS Fallback", "Send last known location", "orange"],
            [BellRing, "False Alarm Cancel", "PIN within cancel window", "blue"],
            [CircleAlert, "Incident Log", "Saved for user review", "green"]
          ].map(([Icon, title, sub, tone]) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <div className={`rounded-xl p-2 ${tone === "green" ? "bg-emerald-100 text-emerald-700" : tone === "orange" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>
                  <Icon size={19} />
                </div>
                <Check size={18} className="ml-auto text-emerald-600" />
              </div>
              <p className="mt-3 text-sm font-black text-slate-950">{title}</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">{sub}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
