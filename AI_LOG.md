# LOG PENGGUNAAN AI (AI PROMPTING) & PANDUAN UJIAN LISAN
**Asesmen Sumatif Akhir Semester (ASAS) - Rekayasa Perangkat Lunak (XI RPL 2)**

- **Nama Siswa** : Muhammad Dayyan
- **Kelas**      : XI RPL 2
- **Tema**       : Undangan Pernikahan Digital (*The Wedding of Dayyan & Haimiya*)
- **Teknologi**  : HTML5, CSS3 (Mobile-First, Glassmorphism), Vanilla JavaScript, Web Audio API

---

## Bagian D: Tabel Log Penggunaan AI

Salin tabel berikut langsung ke lembar laporan / asesmen Anda:

| No. | Tahap Pengembangan | Tujuan/Masalah yang Diselesaikan | Ringkasan Prompt ke AI | Penyesuaian Manual yang Dilakukan Siswa |
|---|---|---|---|---|
| **1** | **Kerangka Struktur & UI Cover** | Menyusun struktur HTML5 semantik untuk Hero Cover full-screen dengan cover overlay, nama mempelai, dan tombol *Buka Undangan*. | *"Buatkan kerangka HTML5 untuk Hero Cover undangan pernikahan full-screen dengan nama mempelai Dayyan & Haimiya, kartu nama tamu dinamis, dan tombol interaktif Buka Undangan."* | Menyesuaikan teks judul, menambahkan atribut meta Open Graph, favicon, dan menyusun SVG ornamen bunga agar proporsional di layar HP. |
| **2** | **Desain & Responsivitas (CSS)** | Membangun styling mobile-first (360px–414px) dengan tema warna mewah Deep Emerald Green & Champagne Gold serta efek *glassmorphism*. | *"Buatkan styling CSS mobile-first dengan tema warna emerald green dan champagne gold, layout kartu glassmorphism, dan container terpusat saat dibuka di layar laptop/desktop."* | Menambahkan CSS Custom Properties (`--color-primary`, dll), mengatur `clamp()` untuk tipografi responsif, dan menambahkan keyframes animasi pulsa pada tombol. |
| **3** | **Logika Parameter URL (JS)** | Membaca nama tamu secara dinamis dari query parameter URL (`?to=Nama+Tamu`) dan mengamankannya dari serangan XSS. | *"Buatkan kode JavaScript untuk membaca parameter URL '?to=Nama+Tamu' menggunakan URLSearchParams, menampilkannya di cover, dan sekaligus otomatis mengisikannya ke input form RSVP."* | Menambahkan fungsi proteksi `sanitizeHTML()` untuk mencegah script injection (XSS) dan mengubah judul tab browser secara dinamis sesuai nama tamu. |
| **4** | **Hitung Mundur & Kalender (JS)** | Membuat countdown timer real-time menuju tanggal acara (12 Desember 2027) dan fitur unduh file `.ics` iCalendar. | *"Buatkan logika JavaScript untuk countdown timer real-time (Hari, Jam, Menit, Detik) dengan pembaruan tiap detik dan fungsi unduh pengingat kalender .ics."* | Mengatur format tanggal target sesuai zona waktu WIB (`+07:00`), menambahkan penomoran `padStart(2, '0')`, dan melengkapi tautan langsung Google Calendar. |
| **5** | **Buku Tamu & RSVP (DOM & Storage)** | Membangun formulir RSVP dan daftar ucapan yang tersimpan secara permanen di browser menggunakan `localStorage`. | *"Buatkan logika penanganan form RSVP yang menyimpan ucapan ke localStorage, merender ucapan baru secara langsung ke DOM, serta menghitung total hadir secara otomatis."* | Menambahkan data default sampel ucapan agar buku tamu tidak kosong saat pertama dibuka, menambahkan avatar inisial nama, dan membuat badge status kehadiran (Hadir/Tidak Hadir). |
| **6** | **Kontrol Audio & Autoplay Policy** | Mengatur pemutaran musik otomatis saat tombol Buka Undangan diklik dan tombol floating disk untuk play/pause. | *"Bagaimana cara memutar musik latar secara otomatis saat tombol buka undangan diklik tanpa terblokir oleh autoplay policy browser, serta membuat tombol floating toggle?"* | Menyematkan event listener pada tombol buka undangan yang memanggil `audio.play()`, mengatur volume ke 0.7 agar tidak mengagetkan, dan membuat animasi putar piringan hitam (*vinyl disc*). |
| **7** | **Amplop Digital & Clipboard (JS)** | Membuat fitur salin nomor rekening BCA & Mandiri satu kali klik dilengkapi notifikasi visual (*toast*). | *"Buatkan fungsi salin nomor rekening ke clipboard menggunakan navigator.clipboard.writeText dengan fallback execCommand dan popup toast animasi."* | Mengubah teks tombol secara instan menjadi 'Berhasil Disalin ✓' selama 2.5 detik dan menambahkan efek slide-up pada notifikasi toast. |

---

## Panduan Ujian Lisan (Oral Exam Preparation)

Saat guru penguji menanyakan cara kerja kode Anda, berikut adalah jawaban teknis dan mudah dipahami:

### 1. Bagaimana cara kerja Nama Tamu Dinamis dari URL (`?to=...`)?
- **Fungsi**: Membaca nama tamu yang dikirimkan melalui tautan undangan (contoh: `index.html?to=Bapak+Budi+Sekeluarga`).
- **Penjelasan Teknis**:
  ```javascript
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('to');
  ```
  Objek bawaan JavaScript `URLSearchParams` digunakan untuk mem-parsing string pencarian di browser (`window.location.search`). Nilai parameter `to` diambil dengan method `.get('to')`.
- **Proteksi Keamanan (XSS)**:
  Karakter di-sanitize terlebih dahulu menggunakan fungsi `sanitizeHTML()` agar jika ada pengguna jahil yang memasukkan `?to=<script>alert(1)</script>`, tag HTML tersebut diubah menjadi teks biasa sehingga aman dari injeksi script.

---

### 2. Bagaimana cara kerja RSVP dan Buku Tamu dengan `localStorage`?
- **Fungsi**: Menyimpan ucapan tamu agar tidak hilang saat halaman di-refresh tanpa memerlukan server database rumit.
- **Penjelasan Teknis**:
  - **Membaca Data**:
    ```javascript
    const stored = localStorage.getItem('wedding_dayyan_haimiya_rsvp_data');
    const wishes = stored ? JSON.parse(stored) : [];
    ```
    Data dibaca dalam format JSON String, lalu diubah menjadi Array JavaScript menggunakan `JSON.parse()`.
  - **Menyimpan Data Baru**:
    Saat form di-submit (`e.preventDefault()`), objek data baru dimasukkan ke urutan teratas array menggunakan `wishes.unshift(newWish)`, kemudian disimpan kembali ke `localStorage` menggunakan `localStorage.setItem(key, JSON.stringify(wishes))`.
  - **Manipulasi DOM**:
    Fungsi `renderWishes()` membuat elemen HTML baru (`document.createElement('article')`), mengisi data nama, pesan, dan badge kehadiran, lalu memasukkannya ke dalam container list ucapan (`wishesList.appendChild(...)`).

---

### 3. Mengapa musik latar tidak langsung berputar saat halaman dibuka?
- **Kebijakan Browser (*Autoplay Policy*)**:
  Browser modern (Chrome, Safari, Firefox, Edge) secara default memblokir audio yang otomatis berputar sebelum pengguna berinteraksi dengan halaman. Ini dibuat demi kenyamanan pengguna agar tidak terganggu audio mendadak.
- **Solusi dalam Proyek**:
  Musik dirancang untuk berputar tepat saat pengguna menekan tombol **"Buka Undangan"** (`btnOpenInvitation.addEventListener('click', ...)`). Karena klik tersebut diakui sebagai interaksi fisik pengguna (*user gesture*), browser mengizinkan audio untuk diputar melalui `bgMusic.play()`.

---

### 4. Mengapa tata letak dibuat *Mobile-First*?
- Mayoritas penerima undangan pernikahan (lebih dari 90%) membuka undangan melalui aplikasi pesan instan (WhatsApp, Telegram) di smartphone mereka.
- Dengan pendekatan *mobile-first*, styling dasar dibuat untuk ukuran layar 360px–414px agar ringan, bebas *overflow horizontal*, dan nyaman digulir dengan satu tangan.
- Pada layar laptop/desktop (>1024px), dibuat tampilan *side banner* estetis dan card undangan tetap memiliki proporsi *smartphone frame* yang elegan di tengah layar (seperti platform Satumomen dan Kadio).
