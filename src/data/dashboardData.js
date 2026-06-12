export const safetyMetrics = [
  { label: "CURRENT SAFETY STATUS", value: "SAFE", helper: "Mode aman aktif", tone: "green" },
  { label: "DEVICE CONNECTION", value: "BLE Connected", helper: "Sinyal kuat", tone: "blue" },
  { label: "BATTERY LEVEL", value: "87%", helper: "Estimasi 9 hari standby", tone: "blue" },
  { label: "SOS READINESS SCORE", value: "96%", helper: "Siap digunakan", tone: "orange" },
  { label: "GPS ACCURACY", value: "±8 m", helper: "Last sync 10 detik lalu", tone: "blue" },
  { label: "SAFE ZONE STATUS", value: "Inside", helper: "Radius rumah 250 m", tone: "green" },
  { label: "GUARDIAN ONLINE", value: "3/3", helper: "Kontak siap menerima alert", tone: "green" },
  { label: "SMS FALLBACK", value: "Ready", helper: "Pulsa/gateway tersedia", tone: "orange" }
];

export const emergencyMetrics = [
  { label: "SOS ALERTS TODAY", value: "0", helper: "Tidak ada darurat" },
  { label: "TEST ALERTS THIS WEEK", value: "3", helper: "Semua berhasil" },
  { label: "AVG. ALERT DELIVERY", value: "6.2 s", helper: "Push notification" },
  { label: "CONTACTS REACHED", value: "3/3", helper: "Guardian verified" },
  { label: "FALSE ALARM RATE", value: "0.8%", helper: "Dikontrol PIN cancel" },
  { label: "LAST EMERGENCY TEST", value: "Passed", helper: "Hari ini 12.10" }
];

export const deviceHealth = [
  { label: "PULL-PIN SENSOR", status: "Normal", detail: "Magnetic trigger OK" },
  { label: "SIREN MODULE", status: "Ready", detail: "Target 120–130 dB" },
  { label: "BLE SIGNAL", status: "Strong", detail: "-54 dBm" },
  { label: "BATTERY HEALTH", status: "Good", detail: "Li-Po stable" },
  { label: "USB-C CHARGING", status: "Ready", detail: "Protection active" },
  { label: "FIRMWARE", status: "v1.0.2", detail: "MVP build" }
];

export const safetyTimeline = [
  { time: "06:45", title: "Device connected", detail: "Warning Capsule terhubung via BLE" },
  { time: "07:10", title: "Entered safe zone", detail: "Pengguna memasuki area kampus" },
  { time: "12:30", title: "Battery check", detail: "Baterai 87%, status perangkat optimal" },
  { time: "17:40", title: "Left safe zone", detail: "Guardian menerima notifikasi keluar area" },
  { time: "18:05", title: "Route monitoring", detail: "Live location aktif selama perjalanan" },
  { time: "19:15", title: "Arrived home", detail: "Pengguna kembali ke safe zone rumah" }
];

export const responseChart = [
  { name: "Pin", seconds: 0.2 },
  { name: "Siren", seconds: 0.4 },
  { name: "BLE", seconds: 1.2 },
  { name: "GPS", seconds: 3.5 },
  { name: "Push", seconds: 5.8 },
  { name: "Guardian", seconds: 8.4 }
];

export const weeklyAlerts = [
  { day: "Sen", test: 1, sos: 0 },
  { day: "Sel", test: 0, sos: 0 },
  { day: "Rab", test: 1, sos: 0 },
  { day: "Kam", test: 0, sos: 0 },
  { day: "Jum", test: 1, sos: 0 },
  { day: "Sab", test: 0, sos: 0 },
  { day: "Min", test: 0, sos: 0 }
];

export const guardians = [
  { name: "Ibu", phone: "+62 812-0000-0101", role: "Primary Guardian", push: true, sms: true, live: true },
  { name: "Ayah", phone: "+62 812-0000-0102", role: "Family Guardian", push: true, sms: true, live: true },
  { name: "Teman Dekat", phone: "+62 812-0000-0103", role: "Trusted Contact", push: true, sms: false, live: true },
  { name: "Keamanan Kampus", phone: "+62 812-0000-0104", role: "Institutional Contact", push: false, sms: true, live: false }
];

export const businessMetrics = [
  { label: "DEVICE SOLD", value: "300", helper: "Batch pilot" },
  { label: "ACTIVE DEVICES", value: "264", helper: "88% aktivasi" },
  { label: "PREMIUM SUBSCRIBERS", value: "82", helper: "31% conversion" },
  { label: "MRR SIMULATION", value: "Rp984K", helper: "Rp12K/user" },
  { label: "SOS TEST COMPLETED", value: "3.420", helper: "Akumulasi simulasi" },
  { label: "AVG RESPONSE TIME", value: "7.8 s", helper: "Target <10 s" }
];

export const structuralLayers = [
  {
    id: "shell",
    label: "Silicone / TPU Protective Shell",
    material: "Soft-touch TPU / silicone coating",
    function: "Melindungi perangkat dari goresan ringan, meningkatkan grip, dan membuat alat nyaman dibawa harian.",
    mvp: "Included in MVP/V1"
  },
  {
    id: "housing",
    label: "ABS / PC-ABS Main Housing",
    material: "ABS atau PC-ABS injection molded casing",
    function: "Struktur utama yang menahan sirene, PCB, baterai, tombol, dan mekanisme pull-pin.",
    mvp: "Included in MVP/V1"
  },
  {
    id: "siren",
    label: "High-Decibel Piezo Siren Module",
    material: "Piezo siren / high-decibel buzzer",
    function: "Menghasilkan alarm keras untuk menarik perhatian sekitar dan memberi efek deterrence.",
    mvp: "Included in MVP/V1"
  },
  {
    id: "pcb",
    label: "BLE Microcontroller & Control PCB",
    material: "FR-4 PCB + BLE SoC + control circuit",
    function: "Membaca trigger, mengaktifkan sirene, membaca status baterai, dan mengirim sinyal ke smartphone via BLE.",
    mvp: "Included in MVP/V1"
  },
  {
    id: "trigger",
    label: "Pull-Pin Trigger Assembly",
    material: "Stainless pin + magnetic / micro switch detection",
    function: "Mengubah satu tarikan fisik menjadi sinyal darurat untuk sirene dan aplikasi.",
    mvp: "Included in MVP/V1"
  },
  {
    id: "battery",
    label: "Rechargeable Li-Po Battery Pack",
    material: "3.7V Li-Po battery + protection circuit",
    function: "Menyuplai daya perangkat dan mendukung mode standby harian.",
    mvp: "Included in MVP/V1"
  },
  {
    id: "charging",
    label: "USB-C Charging & Protection Circuit",
    material: "USB-C port + charging IC + battery protection",
    function: "Mengatur pengisian daya dan melindungi baterai dari overcharge/over-discharge.",
    mvp: "Included in MVP/V1"
  },
  {
    id: "carabiner",
    label: "Stainless Steel Carabiner Ring",
    material: "Stainless steel / aluminium alloy",
    function: "Mengaitkan Warning Capsule ke tas, belt loop, atau gantungan agar mudah dijangkau.",
    mvp: "Included in MVP/V1"
  }
];
