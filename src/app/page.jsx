"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import SafetyDashboard from "@/components/SafetyDashboard";
import SosSimulator from "@/components/SosSimulator";
import DeviceSetup from "@/components/DeviceSetup";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <main className="min-h-screen bg-[#f4f7fb]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mx-auto max-w-[1800px] p-4 sm:p-6">
        {activeTab === "dashboard" ? <SafetyDashboard /> : null}
        {activeTab === "simulator" ? <SosSimulator /> : null}
        {activeTab === "setup" ? <DeviceSetup /> : null}
      </div>
    </main>
  );
}
