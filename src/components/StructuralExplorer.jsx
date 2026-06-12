"use client";

import { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, RoundedBox } from "@react-three/drei";
import { structuralLayers } from "@/data/dashboardData";

function Label({ position, children }) {
  return (
    <Html position={position} center distanceFactor={9} style={{ pointerEvents: "none" }}>
      <div className="whitespace-nowrap rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-[10px] font-black text-white shadow-xl backdrop-blur">
        ← {children}
      </div>
    </Html>
  );
}

function CapsuleLayer({ id, selected, setSelected, position, children }) {
  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        setSelected(id);
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
      scale={selected === id ? 1.06 : 1}
    >
      {children}
    </group>
  );
}

function CapsuleDeviceModel({ exploded, selected, setSelected }) {
  const positions = useMemo(() => {
    if (!exploded) {
      return {
        shell: [0, 0, 0],
        housing: [0, -0.01, 0.03],
        siren: [0, 0.08, 0.15],
        pcb: [0, -0.08, -0.03],
        trigger: [0, -1.18, 0.05],
        battery: [0, -0.22, -0.17],
        charging: [0, -0.9, -0.22],
        carabiner: [0, 1.22, 0.05]
      };
    }
    return {
      shell: [-1.8, 0.72, 0],
      housing: [-1.05, 0.35, 0.05],
      siren: [-0.25, 0.12, 0.2],
      pcb: [0.55, -0.12, 0.02],
      trigger: [1.25, -0.78, 0.1],
      battery: [1.35, 0.25, -0.16],
      charging: [0.65, -0.9, -0.16],
      carabiner: [-1.25, 1.45, 0.1]
    };
  }, [exploded]);

  return (
    <group rotation={[-0.15, -0.45, 0.06]}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 6]} intensity={1.8} />
      <pointLight position={[-4, -2, 4]} intensity={1.2} color="#ff6b00" />

      <CapsuleLayer id="shell" selected={selected} setSelected={setSelected} position={positions.shell}>
        <RoundedBox args={[1.35, 2.15, 0.24]} radius={0.22} smoothness={8}>
          <meshStandardMaterial color="#f7a6c8" transparent opacity={0.58} roughness={0.55} metalness={0.05} />
        </RoundedBox>
        <Label position={[1.38, 0.82, 0.12]}>Silicone / TPU Protective Shell</Label>
      </CapsuleLayer>

      <CapsuleLayer id="housing" selected={selected} setSelected={setSelected} position={positions.housing}>
        <RoundedBox args={[1.12, 1.82, 0.3]} radius={0.18} smoothness={8}>
          <meshStandardMaterial color="#f3e7df" roughness={0.48} />
        </RoundedBox>
        <Label position={[1.27, 0.46, 0.18]}>ABS / PC-ABS Main Housing</Label>
      </CapsuleLayer>

      <CapsuleLayer id="siren" selected={selected} setSelected={setSelected} position={positions.siren}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.08, 48]} />
          <meshStandardMaterial color="#172554" roughness={0.45} />
        </mesh>
        {[-0.16, 0, 0.16].map((x) => (
          <mesh key={x} position={[x, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.025, 20]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        ))}
        <Label position={[1.0, 0.14, 0.24]}>High-Decibel Piezo Siren Module</Label>
      </CapsuleLayer>

      <CapsuleLayer id="pcb" selected={selected} setSelected={setSelected} position={positions.pcb}>
        <RoundedBox args={[0.86, 1.08, 0.05]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color="#0f766e" roughness={0.35} />
        </RoundedBox>
        <mesh position={[0.14, 0.18, 0.04]}>
          <boxGeometry args={[0.22, 0.22, 0.045]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
        <mesh position={[-0.18, -0.16, 0.04]}>
          <boxGeometry args={[0.16, 0.14, 0.04]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        <Label position={[0.9, 0.36, 0.16]}>BLE Microcontroller & Control PCB</Label>
      </CapsuleLayer>

      <CapsuleLayer id="trigger" selected={selected} setSelected={setSelected} position={positions.trigger}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.055, 0.055, 0.68, 24]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.75} roughness={0.2} />
        </mesh>
        <mesh position={[0.44, 0, 0]}>
          <torusGeometry args={[0.15, 0.025, 12, 40]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
        <Label position={[1.1, 0.08, 0.14]}>Pull-Pin Trigger Assembly</Label>
      </CapsuleLayer>

      <CapsuleLayer id="battery" selected={selected} setSelected={setSelected} position={positions.battery}>
        <RoundedBox args={[0.62, 0.92, 0.16]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color="#334155" roughness={0.42} />
        </RoundedBox>
        <mesh position={[0, 0.32, 0.1]}>
          <boxGeometry args={[0.28, 0.06, 0.04]} />
          <meshStandardMaterial color="#22c55e" />
        </mesh>
        <Label position={[0.9, 0.08, 0.1]}>Rechargeable Li-Po Battery Pack</Label>
      </CapsuleLayer>

      <CapsuleLayer id="charging" selected={selected} setSelected={setSelected} position={positions.charging}>
        <RoundedBox args={[0.52, 0.22, 0.1]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color="#1d4ed8" roughness={0.35} />
        </RoundedBox>
        <mesh position={[0, -0.02, 0.07]}>
          <boxGeometry args={[0.2, 0.045, 0.04]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.7} roughness={0.15} />
        </mesh>
        <Label position={[0.92, 0, 0.12]}>USB-C Charging & Protection Circuit</Label>
      </CapsuleLayer>

      <CapsuleLayer id="carabiner" selected={selected} setSelected={setSelected} position={positions.carabiner}>
        <mesh>
          <torusGeometry args={[0.32, 0.045, 18, 64]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.18} />
        </mesh>
        <Label position={[0.92, 0.16, 0.12]}>Stainless Steel Carabiner Ring</Label>
      </CapsuleLayer>
    </group>
  );
}

export default function StructuralExplorer() {
  const [exploded, setExploded] = useState(true);
  const [selected, setSelected] = useState("trigger");
  const selectedLayer = structuralLayers.find((layer) => layer.id === selected) || structuralLayers[0];

  return (
    <div className="grid gap-4 xl:grid-cols-[1.4fr_0.75fr]">
      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-deepNavy">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-100">Interactive 3D Structural Explorer</p>
            <p className="text-xs font-semibold text-slate-400">Drag model untuk rotasi bebas • Scroll untuk zoom • Klik layer untuk detail</p>
          </div>
          <button
            type="button"
            onClick={() => setExploded((prev) => !prev)}
            className="rounded-xl bg-capsuleOrange px-4 py-2 text-xs font-black uppercase text-white shadow-lg shadow-orange-500/20"
          >
            {exploded ? "Collapse Layers" : "Explode Layers"}
          </button>
        </div>
        <div className="h-[440px] w-full">
          <Canvas camera={{ position: [0, 0.4, 5.5], fov: 44 }}>
            <color attach="background" args={["#071226"]} />
            <Suspense fallback={null}>
              <CapsuleDeviceModel exploded={exploded} selected={selected} setSelected={setSelected} />
            </Suspense>
            <OrbitControls enableDamping dampingFactor={0.08} minDistance={3.1} maxDistance={8.5} />
          </Canvas>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-capsuleOrange">Selected Component</p>
        <h3 className="mt-2 text-2xl font-black leading-tight text-navy">{selectedLayer.label}</h3>
        <div className="mt-4 space-y-3">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-[10px] font-black uppercase tracking-wider text-blue-500">Material / Module</p>
            <p className="mt-1 text-sm font-bold text-slate-900">{selectedLayer.material}</p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
            <p className="text-[10px] font-black uppercase tracking-wider text-orange-500">Emergency Function</p>
            <p className="mt-1 text-sm font-bold leading-relaxed text-slate-900">{selectedLayer.function}</p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-[10px] font-black uppercase tracking-wider text-emerald-600">MVP Status</p>
            <p className="mt-1 text-sm font-bold text-slate-900">{selectedLayer.mvp}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {structuralLayers.map((layer) => (
            <button
              key={layer.id}
              type="button"
              onClick={() => setSelected(layer.id)}
              className={`rounded-xl border px-3 py-2 text-left text-[10px] font-black uppercase leading-tight transition ${
                selected === layer.id
                  ? "border-capsuleOrange bg-orange-50 text-capsuleOrange"
                  : "border-slate-200 bg-slate-50 text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-navy"
              }`}
            >
              {layer.label.replace("Silicone / TPU ", "").replace("ABS / PC-ABS ", "").replace("High-Decibel ", "")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
