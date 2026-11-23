# Website Undangan Pernikahan Digital (The Wedding of Dayyan & Haimiya)
**Asesmen Sumatif Akhir Semester (ASAS) - Rekayasa Perangkat Lunak (XI RPL 2)**

Proyek website undangan pernikahan digital interaktif dengan pendekatan **Mobile-First Responsive Web Design**, animasi halus, kontrol audio latar, dan fungsionalitas penuh menggunakan **HTML5, CSS3, dan Vanilla JavaScript**.

---

## 🌟 Fitur-Fitur Utama (Sesuai Spesifikasi Wajib ASAS)

| No | Fitur | Implementasi Teknis |
|:---:|:---|:---|
| **1** | **Hero Cover & Nama Tamu Dinamis** | Tampilan sampul *full-screen* dengan transisi *slide-up*. Membaca parameter URL `?to=Nama+Tamu` secara otomatis dengan JavaScript (`URLSearchParams`) dan sanitasi XSS (`sanitizeHTML`). |
| **2** | **Informasi Acara & Countdown Timer** | Rincian lengkap Akad Nikah & Resepsi dengan hierarki tipografi elegan. Hitung mundur *real-time* (Hari, Jam, Menit, Detik) dan tombol simpan ke Google Calendar serta unduh kalender `.ics`. |
| **3** | **Navigasi Lokasi & Amplop Digital** | Embed Google Maps interaktif + tombol navigasi GPS. Fitur **Salin Nomor Rekening / Alamat** (BCA & Mandiri) dengan animasi feedback dan notifikasi visual (*Toast Notification*). |
| **4** | **Galeri Foto & Scroll Animation** | 6 foto galeri beresolusi tinggi dengan efek *hover zoom*, animasi *fade-in* saat digulir (*Intersection Observer*), dan *Interactive Lightbox Modal* (Next, Prev, Close, Keyboard control). |
| **5** | **Formulir RSVP & Buku Tamu** | Input Nama, Status Kehadiran (Hadir / Tidak Hadir / Ragu), Jumlah Hadir, dan Doa Restu. Ucapan langsung tampil di buku tamu dan **tersimpan persisten di `localStorage`**. Dilengkapi badge kehadiran dan penghitung otomatis. |
| **6** | **Floating Music Toggle** | Tombol melayang di sudut layar dengan animasi piringan hitam (*vinyl disc*). Musik berputar otomatis saat tombol "Buka Undangan" diklik dan dapat dihentikan/diputar kembali kapan saja. |
| **7** | **Desain Responsif (Mobile-First)** | Tampilan optimal pada layar *smartphone* (360px–414px) tanpa overflow horizontal. Pada layar desktop, kartu undangan tampil terpusat dengan dekorasi *side banner* mewah. |

---

## 📂 Struktur Direktori Proyek

```text
ASAS_Dayyan/
├── audio/
│   ├── I Need a Love Story.mp3    # Lagu pernikahan pilihan
│   └── wedding-song.mp3           # Lagu instrumental cadangan
├── images/
│   ├── hero-bg.jpg                # Foto latar belakang Hero Cover
│   ├── couple.jpg                 # Foto utama kedua mempelai
│   ├── groom.jpg                  # Foto mempelai pria (Dayyan)
│   ├── bride.jpg                  # Foto mempelai wanita (Haimiya)
│   ├── gallery1.jpg               # Foto galeri 1
│   ├── gallery2.jpg               # Foto galeri 2
│   ├── gallery3.jpg               # Foto galeri 3
│   ├── gallery4.jpg               # Foto galeri 4
│   ├── gallery5.jpg               # Foto galeri 5
│   └── gallery6.jpg               # Foto galeri 6
├── index.html                     # Struktur semantik HTML5 utama
├── style.css                      # Styling CSS (Mobile-First & Glassmorphism)
├── script.js                      # Logika JavaScript terstruktur
├── AI_LOG.md                      # Log AI Prompting & Panduan Ujian Lisan
└── README.md                      # Dokumentasi proyek
```

---

## 🚀 Cara Menjalankan & Menguji Proyek

### 1. Menjalankan di Lokal (Localhost / Browser)
Buka file `index.html` langsung di browser, atau jalankan web server lokal sederhana:
- **Menggunakan Python**:
  ```bash
  python -m http.server 3000
  ```
  Lalu buka di browser: `http://localhost:3000`

- **Menggunakan Node.js / npx serve**:
  ```bash
  npx serve .
  ```

### 2. Menguji Parameter Nama Tamu Dinamis (URL & Supabase Database)
Website mendukung dua metode pemuatan nama tamu dinamis sesuai rubrik ASAS:

**Metode A: Berdasarkan ID Tamu di Database Supabase (`?id=`)**
- `http://localhost:3000/?id=1` -> Mengambil data *Dr. Rina Kusumawati, M.Pd.* (Universitas Indonesia)
- `http://localhost:3000/?id=2` -> Mengambil data *Budi Santoso, S.Kom.* (PT Telkom Indonesia)
- `http://localhost:3000/?id=3` -> Mengambil data *Siti Rahmawati* (Institut Teknologi Bandung)
- `http://localhost:3000/?id=4` -> Mengambil data *Ahmad Fauzi* (Alumni Angkatan 2022)

**Metode B: Berdasarkan Teks URL Langsung (`?to=`)**
- `http://localhost:3000/?to=Bapak+Budi+Santoso`
- `http://localhost:3000/?to=Keluarga+Besar+RPL+2`
- `http://localhost:3000/?to=Ibu+Siti+Rahmawati`

Perhatikan bahwa:
1. Nama di sampul undangan akan otomatis berubah sesuai parameter URL.
2. Form RSVP pada input "Nama Tamu" akan otomatis terisi dengan nama tersebut.
3. Judul tab browser akan diperbarui secara personal.

---

## 📋 Pengumpulan Tugas
Tautan pengumpulan Asesmen Sumatif Akhir Semester:
👉 [https://forms.gle/w8qCMcuATts8P4Ey8](https://forms.gle/w8qCMcuATts8P4Ey8)
