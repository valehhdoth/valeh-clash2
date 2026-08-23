/**
 * CLASH OF CLANS PORTAL - AAA GAMING FX ENGINE
 * - Web Audio API Synthesizer (No external mp3 downloads needed)
 * - 3D Tilt Physics on Cards
 * - Canvas Floating Elixir Particles & Ambient Glowing Orbs
 * - Sound FX Toggle & Keyboard Shortcuts
 */

// Sound Engine using Web Audio API
class ClashAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('coc_sound_enabled') === 'true';
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('coc_sound_enabled', this.enabled);
    if (this.enabled) {
      this.init();
      this.playLevelUp();
    }
    this.updateSoundBtn();
    return this.enabled;
  }

  updateSoundBtn() {
    const btn = document.getElementById('soundToggleBtn');
    if (btn) {
      btn.innerHTML = this.enabled 
        ? '<i data-lucide="volume-2" class="w-4 h-4 text-amber-400"></i><span class="text-amber-400">Ses: Açık</span>'
        : '<i data-lucide="volume-x" class="w-4 h-4 text-slate-500"></i><span class="text-slate-500">Ses: Kapalı</span>';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  }

  // Hover tick sound
  playHover() {
    if (!this.enabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch(e) {}
  }

  // Button Click / Action Sound
  playClick() {
    if (!this.enabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(640, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch(e) {}
  }

  // Epic War Horn / Trumpet Sound
  playWarHorn() {
    if (!this.enabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(277.18, this.ctx.currentTime + 0.15); // C#
      osc.frequency.linearRampToValueAtTime(329.63, this.ctx.currentTime + 0.3); // E
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.8);
    } catch(e) {}
  }

  // Level Up / Gem Shimmer Sound
  playLevelUp() {
    if (!this.enabled) return;
    this.init();
    try {
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + (idx * 0.06));
        gain.gain.setValueAtTime(0.05, this.ctx.currentTime + (idx * 0.06));
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (idx * 0.06) + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + (idx * 0.06));
        osc.stop(this.ctx.currentTime + (idx * 0.06) + 0.25);
      });
    } catch(e) {}
  }
}

window.clashAudio = new ClashAudioEngine();

// 3D Card Tilt Effect
function init3DTilt() {
  const cards = document.querySelectorAll('.hero-card, .glass-card-hover, .tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
    });
  });
}

// Background Particle Canvas
function initParticleCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'clashParticleCanvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.7';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Create particles (Gold, Elixir, Cyan dust)
  const colors = ['#f59e0b', '#d946ef', '#06b6d4', '#eab308'];
  for (let i = 0; i < 35; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.2,
      size: Math.random() * 2.5 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.6 + 0.2,
      phase: Math.random() * Math.PI * 2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.phase += 0.02;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.save();
      ctx.globalAlpha = p.alpha * (0.6 + Math.sin(p.phase) * 0.4);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  render();
}

// Global Keyboard Shortcut: Press '/' or 'Ctrl+K' to focus search
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    e.preventDefault();
    const search = document.querySelector('.tag-input');
    if (search) {
      search.focus();
      search.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});

// Setup DOM interactions on load
document.addEventListener('DOMContentLoaded', () => {
  window.clashAudio.updateSoundBtn();
  init3DTilt();
  initParticleCanvas();

  // Attach hover & click audio to interactive elements
  document.querySelectorAll('button, a, .interactive-btn').forEach(el => {
    el.addEventListener('mouseenter', () => window.clashAudio.playHover());
    el.addEventListener('click', () => window.clashAudio.playClick());
  });

  document.querySelectorAll('[data-countdown]').forEach(el => {
    el.addEventListener('click', () => window.clashAudio.playWarHorn());
  });
});
