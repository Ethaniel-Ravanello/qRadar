# 🏢 qRadar (BRITwin 3D)
> **3D Digital Twin & Atlassian Operations Command Center for Squad QCash Bank BRI**

qRadar mengubah dashboard sprint Jira dan Bitbucket yang kaku menjadi **Digital Twin 3D interaktif** bergaya *Pixel / Voxel Art*. Diadaptasi langsung dari denah nyata lantai kantor Bank BRI, Team Lead (TL) dan manajemen dapat memantau detak nadi operasional squad, melacak tiket, mengidentifikasi *blocker*, serta mengawal *governance approval* rilis produksi secara visual dan *fun*.

---

## ✨ Fitur Unggulan

### 1. 🏛️ Denah Kantor 3D Nyata (Real BRI Office Floor Layout)
* **Tata Letak Paralel Asli:** Meja kerja disusun secara paralel saling berhadapan (*bench desking*), lengkap dengan lorong tengah lantai terrazzo bergaris marmer hitam.
* **Ornamen Khas BRI:** Dilengkapi partisi kayu bermotif ukiran batik lotus, pilar panel kayu, jendela kaca besar di sisi kanan dengan tirai gulung, dan unit *air purifier* di ujung lorong.
* **8 Personil Squad QCash:** Menampilkan personil lengkap (Squad Lead, Scrum Master/PO, Backend, Frontend, QA Automation, dan DevOps).

### 2. 🔍 Inspeksi Interaktif Timbal-Balik (Jira & Bitbucket)
* **Klik Meja / Karakter:** Membuka panel drawer detail berisi:
  * **Profil Karyawan:** Nama, PN (Personal Number), dan Role badge (SL, BE, FE, QA, SM).
  * **Jira Sprint Tickets:** Tiket aktif, status (*In Progress*, *In Review*, *Done*), *priority*, dan *story points*.
  * **Bitbucket & Code Quality:** Repositori aktif, branch, Pull Request (`OPEN` / `MERGED`), waktu commit terakhir, dan **SonarQube Quality Gate Score**.
* **Resolve Blocker & Ping:** Fitur aksi langsung untuk menandai blocker teratasi atau melakukan ping ke anggota tim.

### 3. 💬 Floating Blocker & Status Bubble (Awan Chat)
* Di atas kepala setiap avatar terdapat awan status aktivitas terkini.
* **Pulsing Red Alert:** Anggota yang terhambat *blocker* otomatis memunculkan awan peringatan berkedip merah terang untuk atensi instan Team Lead.

### 4. 📑 Governance & Sign-Off Matrix Rilis Produksi
* Klik banner squad atau badge sprint di navbar untuk membuka modal matriks rilis perbankan:
  * `[✓] BRD Sign-Off` (Product & Business User)
  * `[✓] SIT Sign-Off` (QA & Integration)
  * `[✓] UAT Sign-Off` (Business Acceptance)
  * `[ ] Secman Clearance` (IT Security Vulnerability Assessment & Pentest)
  * `[ ] RFC & CAB Approval` (IT Operations Production Release)
* **Simulate Deploy:** Dilengkapi animasi selebrasi *confetti* saat seluruh *quality gate* terpenuhi.

### 5. 💤 Eco-Saver Sleep Mode (0% GPU / Baterai Hemat)
* **Auto-Sleep:** Otomatis aktif saat user **AFK selama 30 detik** atau **beralih tab / minimize browser**.
* **Pangkas Beban GPU ke 0%:** Three.js beralih ke `frameloop="never"`, menghentikan pemanggilan frame 100% sehingga GPU drop ke *idle* (0 FPS).
* **Instant Wake Up:** Layar dilapisi *frosted blur* elegan; cukup gerakkan kursor atau klik di mana saja untuk bangun seketika tanpa *reload*.

### 6. ⚡ Optimasi Ekstrem 60 FPS (Laptop-Ready)
* **DPR Capping & Adaptive DPR:** Otomatis menyesuaikan pixel ratio saat kamera bergerak agar anti *lag*.
* **Mediump 16-Bit GPU Math:** Kalkulasi shader 2x lebih enteng di kartu grafis terintegrasi (Intel Iris Xe / UHD).
* **DOM Virtualization:** Elemen HTML awan chat hanya di-mount saat ada *blocker* atau saat kursor menyorot avatar, menghemat 85% kalkulasi DOM browser.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 19 + TypeScript + Vite
* **3D Engine:** Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
* **Styling & Icons:** Tailwind CSS v4 + Lucide React
* **Effects:** Canvas Confetti + Web Audio API (Synthesized SFX bawaan browser)

---

## 🚀 Panduan Menjalankan Pertama Kali (Quick Start)

### 1. Prasyarat
Pastikan komputer kamu sudah terinstall:
* **Node.js** versi `>= 18.0.0` (disarankan Node 20 LTS atau Node 22+)
* **npm** versi `>= 9.0.0`

### 2. Clone Repository
```bash
git clone <URL_REPOSITORY_KAMU>
cd Hackaton
```

### 3. Install Dependensi
Karena proyek ini menggunakan React 19 terbaru bersama Three.js ekosistem, gunakan flag `--legacy-peer-deps`:
```bash
npm install --legacy-peer-deps
```

### 4. Jalankan Development Server
```bash
npm run dev
```
Setelah server aktif, buka browser dan akses URL lokal:
👉 **`http://localhost:5173/`**

### 5. Build untuk Produksi (Opsional)
Untuk melakukan kompilasi file statis produksi:
```bash
npm run build
```
Hasil build akan tersimpan di folder `dist/` dan siap dideploy ke server / web server internal (Nginx, S3, Apache, Docker).

---

## 🎮 Kontrol Navigasi & Panduan Penggunaan

| Interaksi | Kontrol |
| :--- | :--- |
| **Putar Kamera (Orbit)** | Klik kiri mouse & drag |
| **Geser Kamera (Pan)** | Klik kanan mouse & drag / tombol tengah |
| **Zoom In / Zoom Out** | Scroll roda mouse / pinch trackpad |
| **Inspeksi Personil** | Klik pada avatar atau meja kerja karyawan |
| **Lihat Governance Matrix** | Klik banner biru QCash di tengah ruangan atau badge sprint di navbar atas |
| **Shortcut Kamera Cepat** | Klik tombol preset di navbar atas: `Overview`, `BE`, `QA`, `FE`, atau `Lead` |
| **Filter Status** | Klik chip `Blockers` (hanya tampilkan yang bermasalah) atau `Standby` di navbar atas |
| **Mode Sleep Manual** | Klik tombol `💤 Sleep Mode` di pojok kanan bawah |

---

## 📁 Struktur Direktori Proyek

```text
Hackaton/
├── public/                 # Aset statis & favicon
├── src/
│   ├── components/
│   │   ├── canvas/         # Komponen Three.js / WebGL 3D
│   │   │   ├── AvatarCharacter.tsx   # Model karakter voxel, animasi ngetik, lanyard BRI
│   │   │   ├── DeskUnit.tsx          # Meja kayu, monitor ganda, laptop, es kopi
│   │   │   ├── OfficeFloor.tsx       # Lantai terrazzo, partisi batik, jendela, air purifier
│   │   │   └── OfficeScene.tsx       # Canvas Three.js, lighting, kamera & OrbitControls
│   │   └── ui/             # Komponen Dashboard Web 2D
│   │       ├── BottomControls.tsx    # Legend role, reset view, audio toggle
│   │       ├── EcoModeOverlay.tsx    # Layar frosted blur hemat daya (0% GPU)
│   │       ├── MemberDrawer.tsx      # Slide-out drawer detail Jira & Bitbucket
│   │       ├── Navbar.tsx            # Header status, filter blockers, shortcut kamera
│   │       └── SquadModal.tsx        # Modal checklist approval governance rilis
│   ├── data/
│   │   └── officeData.ts   # Data personil QCash, koordinat meja, tiket Jira & status
│   ├── types/
│   │   └── index.ts        # TypeScript interface & types
│   ├── App.tsx             # Root component & state management
│   ├── index.css           # Tailwind CSS imports & global reset
│   └── main.tsx            # Entry point React
├── package.json
├── vite.config.ts          # Konfigurasi Vite & Tailwind v4
└── README.md
```

---

## ⚙️ Kustomisasi & Modifikasi Data

Ingin mengubah data personil, nama tiket Jira, atau koordinat meja?
1. Buka file **`src/data/officeData.ts`**.
2. Setiap personil memiliki atribut `deskPosition: [X, Y, Z]` dan `rotationY`:
   * **Sumbu X:** Nilai minus (`-`) untuk sisi kiri, nilai plus (`+`) untuk sisi kanan.
   * **Sumbu Z:** Nilai minus (`-`) untuk baris atas, nilai plus (`+`) untuk baris bawah.
   * **`rotationY`:** `0` untuk menghadap ke atas/belakang, `Math.PI` untuk menghadap ke bawah/depan.
3. Simpan file (`Ctrl + S`), Vite akan melakukan *Hot Module Replacement (HMR)* dan tampilan langsung ter-update otomatis di browser!

---

<p align="center">
  Dibuat dengan ❤️ untuk Hackathon Bank BRI • <b>Squad QCash & QRIS Ecosystem</b>
</p>
