document.addEventListener('DOMContentLoaded', () => {

  const guestNameElement = document.getElementById('guest-name');
  const rsvpNameInput = document.getElementById('rsvp-name');

  function sanitizeHTML(str) {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }

  const SUPABASE_CONFIG = {
    url: 'https://rxtcbmuhogublhqhielx.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4dGNibXVob2d1YmxocWhpZWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUzODQwODcsImV4cCI6MjExMDk2MDA4N30.FhMNhQX-xYbr1XKPwQCf0VNrs9cmGQzx0ZoO5KLA6xA'
  };

  function applyGuestName(name, subtitle = '') {
    const cleanName = sanitizeHTML(name);
    if (guestNameElement) {
      guestNameElement.textContent = cleanName;
      if (subtitle) {
        const guestNote = document.querySelector('.guest-note');
        if (guestNote) guestNote.textContent = subtitle;
      }
    }
    if (rsvpNameInput) {
      rsvpNameInput.value = cleanName;
    }
    document.title = `The Wedding of Dayyan & Haimiya - Untuk ${cleanName}`;
  }

  function initDynamicGuestName() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestId = urlParams.get('id');
    const guestParam = urlParams.get('to') || urlParams.get('n') || urlParams.get('guest');

    if (guestId && !isNaN(guestId)) {
      if (guestNameElement) guestNameElement.textContent = 'Memuat Data Tamu...';

      fetch(`${SUPABASE_CONFIG.url}/rest/v1/tamu_undangan?id=eq.${guestId}&select=nama_tamu,instansi,kategori`, {
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const guest = data[0];
          const subtitle = guest.instansi ? `Spesial Mengundang dari ${guest.instansi}` : 'Spesial Mengundang Anda Untuk Hadir';
          applyGuestName(guest.nama_tamu, subtitle);
        } else if (guestParam && guestParam.trim() !== '') {
          applyGuestName(guestParam.trim());
        } else {
          applyGuestName('Tamu Undangan');
        }
      })
      .catch(err => {
        console.warn('Gagal memuat data dari Supabase, beralih ke parameter lokal:', err);
        if (guestParam && guestParam.trim() !== '') {
          applyGuestName(guestParam.trim());
        } else {
          applyGuestName('Tamu Undangan');
        }
      });
      return;
    }


    if (guestParam && guestParam.trim() !== '') {
      applyGuestName(guestParam.trim());
    } else {
      if (guestNameElement) {
        guestNameElement.textContent = 'Tamu Undangan';
      }
    }
  }

  initDynamicGuestName();

  const heroCover = document.getElementById('hero-cover');
  const btnOpenInvitation = document.getElementById('btn-open-invitation');
  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');
  const musicDisc = document.getElementById('music-disc');
  const musicIconState = document.getElementById('music-icon-state');

  let isPlaying = false;


  function playAudio() {
    if (!bgMusic) return;
    bgMusic.volume = 0.7; 
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


  if (btnOpenInvitation && heroCover) {
    btnOpenInvitation.addEventListener('click', () => {
   
      heroCover.classList.add('opened');

      document.body.classList.remove('no-scroll');


      playAudio();


      setTimeout(() => {
        const introSection = document.getElementById('intro');
        if (introSection) {
          introSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    });
  }

  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    });
  }


  const countdownElement = document.getElementById('countdown-timer');
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');


  const padZero = (num) => String(num).padStart(2, '0');

  function initCountdown() {
    if (!countdownElement) return;


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


  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextPhoto();
    if (e.key === 'ArrowLeft') showPrevPhoto();
  });


  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }


  const rsvpForm = document.getElementById('rsvp-form');
  const wishesList = document.getElementById('wishes-list');
  const totalWishesBadge = document.getElementById('total-wishes-badge');
  const totalAttendingBadge = document.getElementById('total-attending-badge');

  const STORAGE_KEY = 'wedding_dayyan_haimiya_rsvp_data';

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


  function getStoredWishes() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (err) {
      console.warn('Gagal membaca localStorage:', err);
    }

    saveWishesToStorage(defaultWishes);
    return defaultWishes;
  }


  function saveWishesToStorage(wishes) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch (err) {
      console.error('Gagal menulis ke localStorage:', err);
    }
  }

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


  function getInitials(name) {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

 
  function renderWishes() {
    if (!wishesList) return;

    const wishes = getStoredWishes();
    wishesList.innerHTML = '';

    let totalAttending = 0;

    wishes.forEach((item) => {
      if (item.attendance === 'Hadir') {
        totalAttending += parseInt(item.guests || '1', 10);
      }

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

    if (totalWishesBadge) {
      totalWishesBadge.innerHTML = `<i class="fa-solid fa-envelope"></i> ${wishes.length} Ucapan`;
    }
    if (totalAttendingBadge) {
      totalAttendingBadge.innerHTML = `<i class="fa-solid fa-user-check"></i> ${totalAttending} Hadir`;
    }
  }


  renderWishes();


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
   
      wishes.unshift(newWish);
      saveWishesToStorage(wishes);

   
      renderWishes();

    
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
          obs.unobserve(entry.target);
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
