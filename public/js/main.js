// Clash of Clans Portal — Frontend Scripts
// ==========================================

// Global Client Language Setter
window.setClientLang = function(lang) {
  if (lang) {
    localStorage.setItem('coc_portal_lang', lang);
    document.cookie = `coc_lang=${lang}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
  }
};

document.addEventListener('DOMContentLoaded', () => {

  // ── Sync Client Language from localStorage if needed ──────────────
  const savedLang = localStorage.getItem('coc_portal_lang');
  const cookieMatch = document.cookie.match(/coc_lang=([a-z]{2})/);
  if (savedLang && (!cookieMatch || cookieMatch[1] !== savedLang)) {
    document.cookie = `coc_lang=${savedLang}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
  }

  // ── Mobile Navigation Toggle ──────────────────────────────────────
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      const icon = mobileMenuBtn.querySelector('[data-lucide]');
      if (icon) {
        icon.setAttribute('data-lucide', isHidden ? 'menu' : 'x');
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });
  }

  // ── Tag Input Auto-format ─────────────────────────────────────────
  const tagInputs = document.querySelectorAll('input[name="tag"], .tag-input');
  tagInputs.forEach(input => {
    input.addEventListener('blur', (e) => {
      let val = e.target.value.trim();
      if (val && !val.startsWith('#')) {
        e.target.value = '#' + val.toUpperCase();
      } else if (val) {
        e.target.value = val.toUpperCase();
      }
    });

    // Prevent double # on paste
    input.addEventListener('paste', (e) => {
      setTimeout(() => {
        let val = e.target.value.trim().replace(/^#+/, '#');
        e.target.value = val.toUpperCase();
      }, 50);
    });
  });

  // ── Tab Switching with Smooth Transition ──────────────────────────
  const tabButtons = document.querySelectorAll('[data-tab-target]');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab-target');
      const container = btn.closest('.tab-container') || document;

      // Deactivate all buttons
      container.querySelectorAll('[data-tab-target]').forEach(b => {
        b.classList.remove('bg-amber-500/20', 'text-amber-400', 'border-amber-500');
        b.classList.add('text-slate-400', 'border-transparent');
      });

      // Activate clicked button
      btn.classList.add('bg-amber-500/20', 'text-amber-400', 'border-amber-500');
      btn.classList.remove('text-slate-400', 'border-transparent');

      // Hide all panes with fade
      container.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.add('hidden');
        pane.style.opacity = '0';
      });

      // Show selected pane with fade in
      const activePane = container.querySelector(targetId);
      if (activePane) {
        activePane.classList.remove('hidden');
        requestAnimationFrame(() => {
          activePane.style.transition = 'opacity 0.25s ease';
          activePane.style.opacity = '1';
        });
      }
    });
  });

  // ── Copy Tag to Clipboard ─────────────────────────────────────────
  window.copyToClipboard = function(text, el) {
    navigator.clipboard.writeText(text).then(() => {
      if (el) {
        const originalHTML = el.innerHTML;
        el.innerHTML = '<span class="text-emerald-400 text-xs font-bold">✓ Kopyalandı!</span>';
        el.disabled = true;
        setTimeout(() => {
          el.innerHTML = originalHTML;
          el.disabled = false;
        }, 2000);
      }
    }).catch(() => {
      // Fallback for browsers without clipboard API
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    });
  };

  // ── Countdown Timers ──────────────────────────────────────────────
  const countdownElements = document.querySelectorAll('[data-countdown]');
  countdownElements.forEach(el => {
    const rawDate = el.getAttribute('data-countdown');
    if (!rawDate) return;

    let targetDate;
    if (rawDate.match(/^\d{8}T\d{6}/)) {
      const d = rawDate;
      targetDate = new Date(
        `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}T${d.slice(9,11)}:${d.slice(11,13)}:${d.slice(13,15)}.000Z`
      ).getTime();
    } else {
      targetDate = new Date(rawDate).getTime();
    }

    function pad(n) { return String(n).padStart(2, '0'); }

    function updateTimer() {
      const dist = targetDate - Date.now();
      if (dist <= 0) {
        el.textContent = 'Süre Doldu';
        el.classList.add('text-slate-500');
        return;
      }
      const d = Math.floor(dist / 86400000);
      const h = Math.floor((dist % 86400000) / 3600000);
      const m = Math.floor((dist % 3600000) / 60000);
      const s = Math.floor((dist % 60000) / 1000);
      if (d > 0) {
        el.textContent = `${d}g ${pad(h)}s ${pad(m)}d ${pad(s)}sn`;
      } else {
        el.textContent = `${pad(h)}s ${pad(m)}d ${pad(s)}sn`;
      }
    }

    updateTimer();
    const interval = setInterval(() => {
      if (targetDate - Date.now() <= 0) clearInterval(interval);
      updateTimer();
    }, 1000);
  });

  // ── Smooth Image Fallback Handler ─────────────────────────────────
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      if (this.src.includes('town_hall')) {
        this.src = '/images/assets/town_hall_18.png';
      } else if (this.src.includes('hero') || this.src.includes('king') || this.src.includes('queen')) {
        this.src = '/images/assets/barbarian_king_info.png';
      } else if (this.src.includes('equipment') || this.src.includes('gauntlet')) {
        this.src = '/images/assets/giant_gauntlet.png';
      } else {
        this.src = '/images/assets/barbarian_info.png';
      }
    });
  });

  // ── Animate Cards on Scroll (Intersection Observer) ───────────────
  const cards = document.querySelectorAll('.glass-card, .hero-card, .item-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      card.style.transition = `opacity 0.4s ease ${i * 0.03}s, transform 0.4s ease ${i * 0.03}s`;
      observer.observe(card);
    });
  }

  // ── Verify Modal Close on outside click / Esc ─────────────────────
  const verifyModal = document.getElementById('verifyModal');
  if (verifyModal) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') verifyModal.classList.add('hidden');
    });
  }

  // Re-init Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

});
