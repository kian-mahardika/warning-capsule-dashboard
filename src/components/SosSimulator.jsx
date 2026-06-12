"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BellRing, CheckCircle2, MapPin, MessageSquareText, Radio, ShieldAlert, Smartphone, TimerReset, WifiOff } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { responseChart } from "@/data/dashboardData";
import MetricCard from "@/components/MetricCard";
import SectionCard from "@/components/SectionCard";

const StructuralExplorer = dynamic(() => import("@/components/StructuralExplorer"), { ssr: false });

const modes = {
  normal: {
    label: "Normal Internet Mode",
    subtitle: "Push notification + live location aktif",
    icon: Radio,
    steps: [
      ["0.0s", "Pull-pin triggered", "Switch internal membaca pin ditarik"],
      ["0.3s", "Siren activated", "Alarm fisik menyala untuk menarik perhatian"],
      ["1.2s", "BLE signal sent", "Device mengirim sinyal ke smartphone"],
      ["3.5s", "GPS captured", "Aplikasi membaca lokasi pengguna"],
      ["5.8s", "Push alert sent", "SOS dikirim ke guardian"],
      ["8.4s", "Guardian received", "3/3 kontak menerima notifikasi"],
      ["10.0s", "Live tracking enabled", "Lokasi dapat dipantau real-time"]
    ]
  },
  weak: {
    label: "Weak Internet Mode",
    subtitle: "Internet lemah, SMS fallback digunakan",
    icon: WifiOff,
    steps: [
      ["0.0s", "Pull-pin triggered", "Aktivasi darurat dimulai"],
      ["0.3s", "Siren activated", "Alarm tetap menyala tanpa internet"],
      ["1.4s", "BLE signal sent", "Smartphone menerima sinyal device"],
      ["4.0s", "Last GPS captured", "Lokasi terakhir tersimpan"],
      ["6.0s", "Internet failed", "Push notification gagal karena sinyal lemah"],
      ["7.5s", "SMS fallback sent", "Lokasi terakhir dikirim via SMS"],
      ["11.2s", "Guardian received", "Kontak darurat menerima SMS fallback"]
    ]
  },
  falseAlarm: {
    label: "False Alarm Test Mode",
    subtitle: "Simulasi pembatalan dengan PIN/cancel mode",
    icon: ShieldAlert,
    steps: [
      ["0.0s", "Pull-pin triggered", "Alarm dan timer pembatalan aktif"],
      ["0.3s", "Siren warning", "Suara peringatan awal menyala"],
      ["2.0s", "Cancel window opened", "Aplikasi meminta PIN/cancel"],
      ["4.5s", "PIN verified", "Pengguna membatalkan alert palsu"],
      ["5.0s", "Siren disabled", "Sirene berhenti"],
      ["5.5s", "Guardian log saved", "Aktivasi dicatat sebagai false alarm"],
      ["6.0s", "System reset", "Device kembali ke mode siap"]
    ]
  }
};

function CapsuleDevice({ activated }) {
  return (
    <div className="relative mx-auto flex h-[330px] max-w-[360px] items-center justify-center rounded-[2rem] border border-white/10 bg-slate-950/80 p-8">
      <div className={`absolute inset-10 rounded-full border border-orange-300/40 ${activated ? "sonar-ring" : "opacity-0"}`} />
      <div className={`absolute inset-10 rounded-full border border-orange-300/40 ${activated ? "sonar-ring sonar-ring-delay" : "opacity-0"}`} />
      <motion.div
        animate={activated ? { scale: [1, 1.06, 1], rotate: [0, -2, 2, 0] } : { scale: 1, rotate: 0 }}
        transition={{ repeat: activated ? Infinity : 0, duration: 0.9 }}
        className={`relative h-56 w-36 rounded-[3.2rem] border-8 border-pink-100 bg-gradient-to-b from-pink-200 to-pink-100 shadow-2xl ${activated ? "glow-orange" : "glow-blue"}`}
      >
        <div className="absolute left-1/2 top-7 h-16 w-16 -translate-x-1/2 rounded-full bg-slate-900/90 p-3">
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, index) => (
              <span key={index} className="h-2 w-2 rounded-full bg-white/80" />
            ))}
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 h-16 w-3 -translate-x-1/2 rounded-full bg-orange-500" />
        <div className="absolute -bottom-8 left-1/2 h-16 w-6 -translate-x-1/2 rounded-b-full border-b-4 border-l-4 border-r-4 border-slate-300" />
        <div className="absolute -top-12 left-1/2 h-10 w-14 -translate-x-1/2 rounded-full border-8 border-slate-300" />
      </motion.div>
      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white backdrop-blur">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-200">Device State</p>
        <p className="mt-1 text-lg font-black">{activated ? "EMERGENCY PROTOCOL ACTIVE" : "READY / STANDBY"}</p>
      </div>
    </div>
  );
}

export default function SosSimulator() {
  const [modeKey, setModeKey] = useState("normal");
  const [activated, setActivated] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);
  const selectedMode = modes[modeKey];
  const ModeIcon = selectedMode.icon;

  useEffect(() => {
    if (!activated) return undefined;
    setStepIndex(0);
    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= selectedMode.steps.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 850);
    return () => clearInterval(interval);
  }, [activated, selectedMode.steps.length, modeKey]);

  const completedCount = useMemo(() => (stepIndex < 0 ? 0 : stepIndex + 1), [stepIndex]);

  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.35fr]">
        <SectionCard
          title="Interactive SOS Response Simulation"
          subtitle="Klik pull-pin untuk melihat alur respons darurat: sirene, BLE, GPS, notifikasi, dan SMS fallback."
          icon={<BellRing size={24} />}
        >
          <CapsuleDevice activated={activated} />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setActivated(true)}
              className="rounded-2xl bg-capsuleOrange px-5 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600"
            >
              Pull Pin / Trigger SOS
            </button>
            <button
              type="button"
              onClick={() => {
                setActivated(false);
                setStepIndex(-1);
              }}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-black uppercase tracking-wide text-navy hover:bg-blue-50"
            >
              Reset Simulation
            </button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <MetricCard label="SIREN" value={activated ? "ON" : "Ready"} helper="120–130 dB target" tone={activated ? "orange" : "blue"} />
            <MetricCard label="PROGRESS" value={`${completedCount}/${selectedMode.steps.length}`} helper="Emergency flow" tone="green" />
            <MetricCard label="TARGET RESPONSE" value="<10s" helper="Normal mode" tone="blue" />
          </div>
        </SectionCard>

        <SectionCard
          title="Emergency Flow Timeline"
          subtitle="Tahapan respons sistem sesuai skenario koneksi yang dipilih."
          icon={<TimerReset size={24} />}
          action={<span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase text-navy">{selectedMode.label}</span>}
        >
          <div className="mb-4 grid gap-3 md:grid-cols-3">
            {Object.entries(modes).map(([key, mode]) => {
              const Icon = mode.icon;
              const active = key === modeKey;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setModeKey(key);
                    setActivated(false);
                    setStepIndex(-1);
                  }}
                  className={`rounded-2xl border p-4 text-left transition ${active ? "border-capsuleOrange bg-orange-50" : "border-slate-200 bg-slate-50 hover:bg-blue-50"}`}
                >
                  <Icon className={active ? "text-capsuleOrange" : "text-navy"} size={22} />
                  <p className="mt-2 text-sm font-black text-slate-950">{mode.label}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{mode.subtitle}</p>
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            {selectedMode.steps.map(([time, title, detail], index) => {
              const complete = activated && index <= stepIndex;
              const current = activated && index === stepIndex;
              return (
                <div key={`${time}-${title}`} className={`flex gap-3 rounded-2xl border p-3 transition ${complete ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-50"}`}>
                  <div className={`flex h-12 w-16 items-center justify-center rounded-xl text-xs font-black ${complete ? "bg-emerald-600 text-white" : "bg-white text-slate-500"}`}>{time}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-black text-slate-950">{title}</p>
                      {complete ? <CheckCircle2 size={18} className={current ? "text-capsuleOrange" : "text-emerald-600"} /> : null}
                    </div>
                    <p className="text-xs font-semibold text-slate-500">{detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.9fr]">
        <SectionCard
          title="Response Time Chart"
          subtitle="Simulasi waktu respons normal dari pull-pin hingga guardian menerima alert."
          icon={<Smartphone size={24} />}
        >
          <div className="h-[300px] rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} unit="s" />
                <Tooltip />
                <Line type="monotone" dataKey="seconds" stroke="#ff6b00" strokeWidth={4} dot={{ r: 6, fill: "#03449d" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard
          title="Guardian Alert Preview"
          subtitle="Contoh pesan yang diterima kontak darurat ketika SOS aktif."
          icon={<MessageSquareText size={24} />}
        >
          <div className="rounded-3xl bg-slate-950 p-4 text-white">
            <div className="rounded-2xl bg-white p-4 text-slate-950 shadow-xl">
              <p className="text-xs font-black uppercase tracking-wider text-dangerRed">Emergency Alert</p>
              <h3 className="mt-2 text-lg font-black">Warning Capsule SOS Active</h3>
              <p className="mt-2 text-sm font-semibold text-slate-600">Demo User membutuhkan bantuan. Lokasi terakhir berhasil dibaca dan live tracking sedang aktif.</p>
              <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-3">
                <div className="flex items-center gap-2 text-navy">
                  <MapPin size={18} />
                  <p className="text-sm font-black">Kampus Safe Zone • GPS ±8m</p>
                </div>
                <p className="mt-1 text-xs font-semibold text-slate-500">Tap untuk membuka rute dan memantau lokasi.</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Interactive 3D Structural Explorer"
        subtitle="Visualisasi layer internal Warning Capsule yang bisa diputar, di-zoom, dan di-collapse seperti referensi Enerva."
        icon={<ModeIcon size={24} />}
      >
        <StructuralExplorer />
      </SectionCard>
    </div>
  );
}
