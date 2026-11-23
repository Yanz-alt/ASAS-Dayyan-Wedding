/**
 * ==============================================================================
 * THE WEDDING OF DAYYAN & HAIMIYA - JAVASCRIPT LOGIC
 * Asesmen Sumatif Akhir Semester (ASAS) XI RPL 2
 * 
 * Modul Lengkap:
 * 1. Parameter URL Dinamis (?to=Nama+Tamu) & Proteksi XSS
 * 2. Buka Undangan (Hero Cover Transition & Autoplay Audio)
 * 3. Kontrol Musik Latar (Floating Music Button)
 * 4. Hitung Mundur Real-time (Countdown Timer) & Simpan Kalender (.ics)
 * 5. Navigasi & Salin ke Clipboard (Amplop Digital & Toast Notification)
 * 6. Galeri Foto & Interactive Lightbox Modal
 * 7. Konfirmasi RSVP & Buku Tamu Persisten (localStorage)
 * 8. Animasi Gulir Halaman (Intersection Observer)
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================================
  // 1. FITUR 1: NAMA TAMU DINAMIS VIA URL PARAMETER (?to=Nama+Tamu)
  // ============================================================================
  const guestNameElement = document.getElementById('guest-name');
  const rsvpNameInput = document.getElementById('rsvp-name');

  /**
   * Mengamankan teks dari potensi serangan Cross-Site Scripting (XSS)
   * Menggantikan karakter <, >, ", ', & dengan HTML entities
   */
  function sanitizeHTML(str) {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }

  /**
   * Membaca query parameter ?to= dari URL
   * Contoh: index.html?to=Budi+Santoso+Sekeluarga
   */
  function initDynamicGuestName() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to') || urlParams.get('n') || urlParams.get('guest');

    if (guestParam && guestParam.trim() !== '') {
      const cleanGuestName = sanitizeHTML(guestParam.trim());
      if (guestNameElement) {
        guestNameElement.textContent = cleanGuestName;
      }
      // Otomatis isikan ke form RSVP agar tamu tidak perlu mengetik ulang nama
      if (rsvpNameInput) {
        rsvpNameInput.value = cleanGuestName;
      }
      // Perbarui judul halaman agar lebih personal
      document.title = `The Wedding of Dayyan & Haimiya - Untuk ${cleanGuestName}`;
    } else {
      if (guestNameElement) {
        guestNameElement.textContent = 'Tamu Undangan';
      }
    }
  }

  initDynamicGuestName();


  // ============================================================================
  // 2. FITUR 1 & 6: KONTROL MUSIK & MEMBUKA SAMPUL (HERO COVER)
  // ============================================================================
  const heroCover = document.getElementById('hero-cover');
  const btnOpenInvitation = document.getElementById('btn-open-invitation');
  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');
  const musicDisc = document.getElementById('music-disc');
  const musicIconState = document.getElementById('music-icon-state');

  let isPlaying = false;

  /**
   * Memutar audio dengan menangani Browser Autoplay Policy
   */
  function playAudio() {
    if (!bgMusic) return;
    bgMusic.volume = 0.7; // Volume seimbang
    bgMusic.play().then(() => {
      isPlaying = true;
      if (musicDisc) musicDisc.classList.add('playing');
      if (musicIconState) {
        musicIconState.classList.remove('fa-play');
        musicIconState.classList.add('fa-pause');
      }
    }).catch((err) => {
      console.warn('Autoplay diblokir browser sebelum interaksi pengguna:', err);
      isPlaying = false;
    });
  }

  /**
   * Menghentikan audio
   */
  function pauseAudio() {
    if (!bgMusic) return;
    bgMusic.pause();
    isPlaying = false;
    if (musicDisc) musicDisc.classList.remove('playing');
    if (musicIconState) {
      musicIconState.classList.remove('fa-pause');
      musicIconState.classList.add('fa-play');
    }
  }

  // Event klik "Buka Undangan"
  if (btnOpenInvitation && heroCover) {
    btnOpenInvitation.addEventListener('click', () => {
      // Buka animasi slide up cover
      heroCover.classList.add('opened');
      // Aktifkan scroll pada halaman utama
      document.body.classList.remove('no-scroll');

      // Putar musik latar otomatis
      playAudio();

      // Trigger scroll ke intro secara halus setelah transisi cover
      setTimeout(() => {
        const introSection = document.getElementById('intro');
        if (introSection) {
          introSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    });
  }

  // Event klik floating music button untuk toggle play/pause
  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    });
  }


  // ============================================================================
  // 3. FITUR 2: COUNTDOWN TIMER & SIMPAN KALENDER
  // ============================================================================
  const countdownElement = document.getElementById('countdown-timer');
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  // Format angka dengan dua digit (contoh: 07)
  const padZero = (num) => String(num).padStart(2, '0');

  function initCountdown() {
    if (!countdownElement) return;

    // Tanggal acara: Sabtu, 12 Desember 2027 pukul 08:00 WIB
    const targetDateAttr = countdownElement.getAttribute('data-target-date');
    const targetDate = targetDateAttr ? new Date(targetDateAttr).getTime() : new Date('2027-12-12T08:00:00+07:00').getTime();

    function updateTimer() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minutesEl) minutesEl.textContent = '00';
        if (secondsEl) secondsEl.textContent = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = padZero(days);
      if (hoursEl) hoursEl.textContent = padZero(hours);
      if (minutesEl) minutesEl.textContent = padZero(minutes);
      if (secondsEl) secondsEl.textContent = padZero(seconds);
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  initCountdown();

  // Tombol Unduh File Kalender .ICS (iCalendar standard untuk Apple/Outlook/Google)
  const btnIcsCalendar = document.getElementById('btn-ics-calendar');
  if (btnIcsCalendar) {
    btnIcsCalendar.addEventListener('click', () => {
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Dayyan & Haimiya Wedding//ID',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'UID:wedding-dayyan-haimiya-2027@domain.com',
        'DTSTAMP:20270101T000000Z',
        'DTSTART:20271212T010000Z',
        'DTEND:20271212T080000Z',
        'SUMMARY:The Wedding of Dayyan & Haimiya',
        'DESCRIPTION:Pernikahan Dayyan & Haimiya di Grand Ballroom Grand Pacific Hotel Bandung.',
        'LOCATION:Grand Pacific Hotel, Jl. Pasir Kaliki No. 100, Bandung',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Pernikahan_Dayyan_Haimiya.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('File kalender (.ics) berhasil diunduh!');
    });
  }


  // ============================================================================
  // 4. FITUR 3: SALIN NOMOR REKENING / ALAMAT & TOAST NOTIFICATION
  // ============================================================================
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Tangani semua tombol salin data
  const copyButtons = document.querySelectorAll('.btn-copy');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetSelector = btn.getAttribute('data-clipboard-target');
      const label = btn.getAttribute('data-label') || 'Data';
      const targetElement = document.querySelector(targetSelector);

      if (!targetElement) return;

      const textToCopy = targetElement.textContent.trim();

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          handleCopySuccess(btn, label);
        }).catch(() => {
          fallbackCopyText(textToCopy, btn, label);
        });
      } else {
        fallbackCopyText(textToCopy, btn, label);
      }
    });
  });

  function fallbackCopyText(text, btn, label) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      handleCopySuccess(btn, label);
    } catch (err) {
      showToast('Gagal menyalin. Silakan salin manual.');
    }
    document.body.removeChild(textArea);
  }

  function handleCopySuccess(btn, label) {
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Berhasil Disalin';
    btn.classList.add('copied');

    showToast(`${label} berhasil disalin ke clipboard!`);

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('copied');
    }, 2500);
  }


  // ============================================================================
  // 5. FITUR 4: GALERI FOTO & INTERACTIVE LIGHTBOX
  // ============================================================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentGalleryIndex = 0;
  const galleryData = [];

  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const caption = item.getAttribute('data-caption') || `Foto Kenangan ${index + 1}`;
    if (img) {
      galleryData.push({
        src: img.getAttribute('src'),
        caption: caption
      });

      item.addEventListener('click', () => {
        openLightbox(index);
      });
    }
  });

  function openLightbox(index) {
    if (!lightbox || !galleryData[index]) return;
    currentGalleryIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    // Pulihkan scroll body jika hero cover sudah dibuka
    if (heroCover && heroCover.classList.contains('opened')) {
      document.body.style.overflow = '';
    }
  }

  function updateLightboxContent() {
    const item = galleryData[currentGalleryIndex];
    if (!item) return;
    lightboxImg.src = item.src;
    lightboxCaption.textContent = item.caption;
    lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${galleryData.length}`;
  }

  function showNextPhoto() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
    updateLightboxContent();
  }

  function showPrevPhoto() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextPhoto);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevPhoto);

  // Keyboard navigation untuk lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextPhoto();
    if (e.key === 'ArrowLeft') showPrevPhoto();
  });

  // Tutup lightbox saat klik di luar gambar
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }


  // ============================================================================
  // 6. FITUR 5: FORMULIR RSVP & BUKU TAMU PERSISTEN (LOCALSTORAGE)
  // ============================================================================
  const rsvpForm = document.getElementById('rsvp-form');
  const wishesList = document.getElementById('wishes-list');
  const totalWishesBadge = document.getElementById('total-wishes-badge');
  const totalAttendingBadge = document.getElementById('total-attending-badge');

  const STORAGE_KEY = 'wedding_dayyan_haimiya_rsvp_data';

  // Data bawaan awal agar buku tamu langsung terlihat indah saat pertama kali dibuka
  const defaultWishes = [
    {
      id: 'default-1',
      name: 'Bpk. Budi Santoso',
      attendance: 'Hadir',
      guests: '2',
      message: 'Barakallahu lakum wa baraka alaikum. Selamat menempuh hidup baru untuk Dayyan & Haimiya! Semoga selalu sakinah mawaddah warahmah.',
      date: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    {
      id: 'default-2',
      name: 'Siti Rahmawati & Rekan',
      attendance: 'Hadir',
      guests: '2',
      message: 'Alhamdulillah, selamat ya Mba Haimiya dan Mas Dayyan! Ikut bahagia melihat perjalanan kalian berdua.',
      date: new Date(Date.now() - 3600000 * 12).toISOString()
    },
    {
      id: 'default-3',
      name: 'Dimas Aditya',
      attendance: 'Tidak Hadir',
      guests: '1',
      message: 'Selamat berbahagia sahabatku Dayyan & Haimiya! Maaf belum bisa hadir langsung karena dinas luar kota. Doa terbaik selalu untuk kalian!',
      date: new Date(Date.now() - 3600000 * 24).toISOString()
    }
  ];

  /**
   * Mengambil data ucapan dari localStorage atau inisialisasi default
   */
  function getStoredWishes() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (err) {
      console.warn('Gagal membaca localStorage:', err);
    }
    // Jika belum ada data, simpan data default
    saveWishesToStorage(defaultWishes);
    return defaultWishes;
  }

  /**
   * Menyimpan array ucapan ke localStorage
   */
  function saveWishesToStorage(wishes) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch (err) {
      console.error('Gagal menulis ke localStorage:', err);
    }
  }

  /**
   * Format waktu ramah pengguna (contoh: "Baru saja", "2 jam lalu", atau tanggal)
   */
  function formatRelativeTime(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 1) return 'Baru saja';
    if (diffMin < 60) return `${diffMin} menit yang lalu`;
    if (diffHour < 24) return `${diffHour} jam yang lalu`;
    if (diffDay < 7) return `${diffDay} hari yang lalu`;

    return past.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  /**
   * Mengambil inisial nama untuk avatar
   */
  function getInitials(name) {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  /**
   * Merender daftar ucapan ke elemen DOM
   */
  function renderWishes() {
    if (!wishesList) return;

    const wishes = getStoredWishes();
    wishesList.innerHTML = '';

    // Hitung statistik
    let totalAttending = 0;

    wishes.forEach((item) => {
      if (item.attendance === 'Hadir') {
        totalAttending += parseInt(item.guests || '1', 10);
      }

      // Tentukan badge kehadiran
      let badgeClass = 'hadir';
      let badgeIcon = 'fa-check';
      if (item.attendance === 'Tidak Hadir') {
        badgeClass = 'tidak';
        badgeIcon = 'fa-xmark';
      } else if (item.attendance === 'Masih Ragu') {
        badgeClass = 'ragu';
        badgeIcon = 'fa-question';
      }

      const wishItemEl = document.createElement('article');
      wishItemEl.className = 'wish-item';
      wishItemEl.innerHTML = `
        <div class="wish-header">
          <div class="wish-user">
            <div class="wish-avatar">${sanitizeHTML(getInitials(item.name))}</div>
            <div>
              <div class="wish-name">${sanitizeHTML(item.name)}</div>
              <span class="wish-status-badge ${badgeClass}">
                <i class="fa-solid ${badgeIcon}"></i> ${sanitizeHTML(item.attendance)} ${item.attendance === 'Hadir' ? `(${item.guests} orang)` : ''}
              </span>
            </div>
          </div>
        </div>
        <p class="wish-message">${sanitizeHTML(item.message)}</p>
        <div class="wish-footer">
          <i class="fa-regular fa-clock"></i> <span>${formatRelativeTime(item.date)}</span>
        </div>
      `;

      wishesList.appendChild(wishItemEl);
    });

    // Update badges statistik
    if (totalWishesBadge) {
      totalWishesBadge.innerHTML = `<i class="fa-solid fa-envelope"></i> ${wishes.length} Ucapan`;
    }
    if (totalAttendingBadge) {
      totalAttendingBadge.innerHTML = `<i class="fa-solid fa-user-check"></i> ${totalAttending} Hadir`;
    }
  }

  // Render saat pertama kali dimuat
  renderWishes();

  // Tangani submit formulir RSVP
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('rsvp-name');
      const messageInput = document.getElementById('rsvp-message');
      const guestsInput = document.getElementById('rsvp-guests');
      const attendanceRadio = document.querySelector('input[name="attendance"]:checked');

      const name = nameInput ? nameInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';
      const guests = guestsInput ? guestsInput.value : '1';
      const attendance = attendanceRadio ? attendanceRadio.value : 'Hadir';

      if (!name || !message) {
        showToast('Mohon lengkapi nama dan doa ucapan Anda.');
        return;
      }

      const newWish = {
        id: 'wish-' + Date.now(),
        name: name,
        attendance: attendance,
        guests: guests,
        message: message,
        date: new Date().toISOString()
      };

      const wishes = getStoredWishes();
      // Tambahkan data baru di urutan teratas
      wishes.unshift(newWish);
      saveWishesToStorage(wishes);

      // Render ulang daftar ucapan
      renderWishes();

      // Reset textarea pesan
      if (messageInput) messageInput.value = '';

      showToast('Terima kasih! Konfirmasi & ucapan Anda telah tersimpan.');
    });
  }


  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target); // Cukup animasi sekali untuk performa optimal
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback jika browser lama tidak mendukung IntersectionObserver
    animatedElements.forEach((el) => el.classList.add('visible'));
  }

});
