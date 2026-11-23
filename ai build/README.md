# Website Undangan Pernikahan Digital (The Wedding of Dayyan & Amanda)
**Asesmen Sumatif Akhir Semester (ASAS) - Rekayasa Perangkat Lunak (XI RPL 2)**

Proyek website undangan pernikahan digital interaktif dengan pendekatan **Mobile-First Responsive Web Design**, kaya animasi, audio latar, dan fungsionalitas penuh menggunakan **HTML5, CSS3, dan Vanilla JavaScript**.

---

## 🌟 Fitur-Fitur Utama (Sesuai Spesifikasi Wajib ASAS)

| No | Fitur | Implementasi Teknis |
|:---:|:---|:---|
| **1** | **Hero Cover & Nama Tamu Dinamis** | Tampilan sampul *full-screen* dengan transisi *slide-up*. Membaca parameter URL `?to=Nama+Tamu` secara otomatis dengan JavaScript (`URLSearchParams`) dan sanitasi XSS. |
| **2** | **Informasi Acara & Countdown Timer** | Rincian lengkap Akad Nikah & Resepsi dengan hierarki tipografi elegan. Hitung mundur *real-time* (Hari, Jam, Menit, Detik) dan tombol simpan ke Google Calendar serta unduh kalender `.ics`. |
| **3** | **Navigasi Lokasi & Amplop Digital** | Embed Google Maps interaktif + tombol navigasi GPS. Fitur **Salin Nomor Rekening / Alamat** (BCA & Mandiri) dengan animasi feedback dan notifikasi visual (*Toast Notification*). |
| **4** | **Galeri Foto & Scroll Animation** | 6 foto galeri beresolusi tinggi dengan efek *hover zoom*, animasi *fade-in* saat digulir (*Intersection Observer*), dan *Interactive Lightbox Modal* (Next, Prev, Close, Keyboard control). |
| **5** | **Formulir RSVP & Buku Tamu** | Input Nama, Status Kehadiran (Hadir / Tidak Hadir / Ragu), Jumlah Hadir, dan Doa Restu. Ucapan langsung tampil di buku tamu dan **tersimpan persisten di `localStorage`**. Dilengkapi badge kehadiran dan penghitung otomatis. |
| **6** | **Floating Music Toggle** | Tombol melayang di sudut layar dengan animasi piringan hitam (*vinyl disc*). Musik berputar otomatis saat tombol "Buka Undangan" diklik dan dapat dihentikan/diputar kembali kapan saja. |
| **7** | **Desain Responsif (Mobile-First)** | Tampilan optimal pada layar *smartphone* (360px–414px) tanpa overflow horizontal. Pada layar desktop, kartu undangan tampil terpusat dengan dekorasi *side banner* mewah. |

---

## 📂 Struktur Direktori

```text
ai build/
├── assets/
│   ├── audio/
│   │   └── wedding-song.mp3       # Musik instrumental latar
│   └── images/
│       ├── hero-bg.jpg            # Foto latar belakang Hero Cover
│       ├── couple.jpg             # Foto utama mempelai
│       ├── groom.jpg              # Foto mempelai pria (Dayyan)
│       ├── bride.jpg              # Foto mempelai wanita (Amanda)
│       ├── gallery1.jpg           # Foto momen 1
│       ├── gallery2.jpg           # Foto momen 2
│       ├── gallery3.jpg           # Foto momen 3
│       ├── gallery4.jpg           # Foto momen 4
│       ├── gallery5.jpg           # Foto momen 5
│       └── gallery6.jpg           # Foto momen 6
├── index.html                     # Struktur semantik HTML5
├── style.css                      # Styling CSS (Mobile-First & Glassmorphism)
├── script.js                      # Logika JavaScript terstruktur
├── AI_LOG.md                      # Log AI Prompting & Panduan Ujian Lisan
└── README.md                      # Dokumentasi proyek
```

---

## 🚀 Cara Menjalankan & Menguji Proyek

### 1. Menjalankan di Lokal (Localhost / Browser)
Anda dapat membuka file `index.html` langsung di browser Anda, atau menggunakan server lokal sederhana:
- **Menggunakan Python**:
  ```bash
  cd "ai build"
  python -m http.server 3000
  ```
  Lalu buka di browser: `http://localhost:3000`

- **Menggunakan Node.js / npx serve**:
  ```bash
  npx serve "ai build"
  ```

### 2. Menguji Parameter Nama Tamu Dinamis
Buka URL dengan parameter `?to=` di browser:
- `http://localhost:3000/?to=Bapak+Budi+Santoso`
- `http://localhost:3000/?to=Keluarga+Besar+RPL+2`
- `http://localhost:3000/?to=Ibu+Siti+Rahmawati`

Perhatikan bahwa:
1. Nama di sampul undangan akan otomatis berubah sesuai parameter.
2. Form RSVP pada input "Nama Tamu" akan otomatis terisi dengan nama tersebut.
3. Judul tab browser akan diperbarui secara personal.

---

## 📝 Panduan Git & Riwayat Commit Bertahap

Rubrik ASAS mewajibkan pengelolaan kode menggunakan Git dengan riwayat commit bertahap:

```bash
# 1. Inisialisasi Git (jika belum)
git init

# 2. Commit 1: Struktur dasar & aset
git add assets/ "ai build/index.html"
git commit -m "feat: inisialisasi struktur HTML5 dan aset media undangan"

# 3. Commit 2: Styling Mobile-First
git add "ai build/style.css"
git commit -m "style: implementasi styling mobile-first, palet emerald gold, dan glassmorphism"

# 4. Commit 3: Logika JavaScript (Parameter URL, Countdown, Audio)
git add "ai build/script.js"
git commit -m "feat: implementasi parameter URL dinamis, countdown timer, dan kontrol audio"

# 5. Commit 4: Fitur RSVP, Buku Tamu LocalStorage, dan Amplop Digital
git add "ai build/script.js" "ai build/index.html"
git commit -m "feat: integrasi RSVP localStorage, copy to clipboard, dan lightbox galeri"

# 6. Commit 5: Dokumentasi & Log AI
git add "ai build/README.md" "ai build/AI_LOG.md"
git commit -m "docs: dokumentasi lengkap proyek dan log penggunaan AI untuk ASAS"
```

---

## 🌐 Panduan Publikasi / Deployment

### Opsi A: Deploy ke Vercel (Sangat Mudah & Cepat)
1. Buka [https://vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
2. Klik **Add New Project** lalu pilih repository proyek ini.
3. Pada **Root Directory**, pilih folder `ai build`.
4. Klik **Deploy**. Website Anda langsung aktif dengan domain `https://nama-proyek.vercel.app`.

### Opsi B: Deploy ke GitHub Pages
1. Push repository ke GitHub publik.
2. Buka tab **Settings** di repository GitHub Anda.
3. Pilih menu **Pages** di sebelah kiri.
4. Pada bagian **Build and deployment**, pilih branch `main` dan folder `/ (root)` atau folder tempat file berada.
5. Klik **Save**, tunggu 1-2 menit hingga URL GitHub Pages aktif.

---

## 📋 Pengumpulan Tugas
Setelah deploy selesai, kumpulkan tautan repository GitHub dan tautan website live Anda ke Google Form berikut:
👉 [https://forms.gle/w8qCMcuATts8P4Ey8](https://forms.gle/w8qCMcuATts8P4Ey8)
