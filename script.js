/* ===================================================
   ГРИМУАР ВЕДЬМОЧКИ — GSAP 3D МАГИЯ (SCRIPT.JS)
=================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------
  // 0. PURE PARALLAX PIXEL STARS (CODEPEN LYGbwj IN PURPLE/VIOLET)
  // -------------------------------------------------
  function generatePixelStars(count, colors) {
    const shadows = [];
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      const color = colors[Math.floor(Math.random() * colors.length)];
      shadows.push(`${x}px ${y}px ${color}`);
    }
    return shadows.join(', ');
  }

  const starColors1 = ['#ffffff', '#f5d0fe', '#e9d5ff', '#d8b4f8', '#c084fc'];
  const starColors2 = ['#ffffff', '#e879f9', '#d946ef', '#c084fc', '#f472b6'];
  const starColors3 = ['#ffffff', '#f0abfc', '#d946ef', '#a855f7'];

  const starsEl = document.getElementById('stars');
  const stars2El = document.getElementById('stars2');
  const stars3El = document.getElementById('stars3');

  if (starsEl) starsEl.style.boxShadow = generatePixelStars(700, starColors1);
  if (stars2El) stars2El.style.boxShadow = generatePixelStars(200, starColors2);
  if (stars3El) stars3El.style.boxShadow = generatePixelStars(100, starColors3);

  // -------------------------------------------------
  // 1. SOUND & BACKGROUND MUSIC SYSTEM
  // -------------------------------------------------
  let audioCtx = null;
  let soundEnabled = true;
  let isMusicPlaying = false;

  const bgAudio = document.getElementById('bg-music') || new Audio('Waltz_of_the_Willow_Tree.mp3');
  bgAudio.loop = true;
  bgAudio.volume = 0.42;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  const sounds = {
    // Magic Sparkle
    sparkle() {
      if (!soundEnabled || !audioCtx) return;
      const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      freqs.forEach((f, i) => {
        setTimeout(() => {
          try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.5);
          } catch(e) {}
        }, i * 65);
      });
    },

    // Heavy Book Opening / Page Rustle
    bookOpen() {
      if (!soundEnabled || !audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(160, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(320, audioCtx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
      } catch(e) {}
    },

    // Crisp parchment page flip rustle
    pageFlip() {
      if (!soundEnabled || !audioCtx) return;
      try {
        const bufferSize = audioCtx.sampleRate * 0.22;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(650, audioCtx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.16);
        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.22, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.22);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        noise.start();
      } catch(e) {}
    },

    // Padlock Click
    lockClick() {
      if (!soundEnabled || !audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(240, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
      } catch(e) {}
    },

    // Punch impact
    punch() {
      if (!soundEnabled || !audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.22);
        gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.22);
      } catch(e) {}
    },

    // Cauldron Bubble
    bubble() {
      if (!soundEnabled || !audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300 + Math.random() * 250, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(700 + Math.random() * 300, audioCtx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.18);
      } catch(e) {}
    },

    // Magical Chime
    chime() {
      if (!soundEnabled || !audioCtx) return;
      try {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.08);
          gain.gain.setValueAtTime(0.18, audioCtx.currentTime + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.08 + 0.35);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(audioCtx.currentTime + i * 0.08);
          osc.stop(audioCtx.currentTime + i * 0.08 + 0.35);
        });
      } catch(e) {}
    },

    // Grand Magical Spell Cast / Ritual Whoosh
    spellCast() {
      if (!soundEnabled || !audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.45);
      } catch(e) {}
    },

    // Tactile nail hammering sound
    nail() {
      if (!soundEnabled || !audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(620 + Math.random() * 80, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } catch(e) {}
    }
  };

  // -------------------------------------------------
  // BACKGROUND WALTZ AUDIO PLAYBACK & CONTROLS
  // -------------------------------------------------
  function playMusic() {
    initAudio();
    soundEnabled = true;
    bgAudio.play().then(() => {
      isMusicPlaying = true;
      if (soundIcon) soundIcon.textContent = '🎵';
      if (soundBtn) {
        soundBtn.classList.add('playing');
        soundBtn.title = 'Музыка играет (нажмите, чтобы выключить)';
      }
    }).catch(() => {
      // Browser autoplay policy might defer until user gesture
    });
  }

  function pauseMusic() {
    bgAudio.pause();
    isMusicPlaying = false;
    if (soundIcon) soundIcon.textContent = '🔇';
    if (soundBtn) {
      soundBtn.classList.remove('playing');
      soundBtn.title = 'Музыка выключена (нажмите, чтобы включить)';
    }
  }

  function toggleMusic() {
    if (isMusicPlaying) {
      pauseMusic();
      soundEnabled = false;
    } else {
      playMusic();
      sounds.sparkle();
    }
  }

  const soundBtn = document.getElementById('sound-btn');
  const soundIcon = document.getElementById('sound-icon');
  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMusic();
    });
  }

  // Seamless start on first user interaction anywhere in the window
  const autoPlayOnFirstGesture = () => {
    if (!isMusicPlaying && soundEnabled) {
      playMusic();
    }
    window.removeEventListener('click', autoPlayOnFirstGesture);
    window.removeEventListener('keydown', autoPlayOnFirstGesture);
    window.removeEventListener('touchstart', autoPlayOnFirstGesture);
  };
  window.addEventListener('click', autoPlayOnFirstGesture, { once: true });
  window.addEventListener('keydown', autoPlayOnFirstGesture, { once: true });
  window.addEventListener('touchstart', autoPlayOnFirstGesture, { once: true });


  // -------------------------------------------------
  // 2. AMBIENT PARTICLES CANVAS
  // -------------------------------------------------
  const canvas = document.getElementById('ambient-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.8,
      sy: Math.random() * 0.6 + 0.2,
      sx: (Math.random() - 0.5) * 0.4,
      c: Math.random() > 0.5 ? '#fbc6d9' : '#b3e0fc',
      a: Math.random() * 0.6 + 0.2
    });
  }

  function renderParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y -= p.sy;
      p.x += p.sx;
      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      ctx.save();
      ctx.globalAlpha = p.a;
      ctx.fillStyle = p.c;
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.c;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(renderParticles);
  }
  renderParticles();


  // -------------------------------------------------
  // 3. 3D GRIMOIRE FLIP MECHANICS & MAGICAL RITUAL BURST (GSAP)
  // -------------------------------------------------
  const book3D = document.getElementById('book-3d');
  const bookCoverLeaf = document.getElementById('book-cover-leaf');
  const haspLock = document.getElementById('hasp-lock-mechanism');
  const gemstone = document.getElementById('magical-gemstone');
  const openHelperBar = document.getElementById('open-helper-bar');
  const closeBookLink = document.getElementById('close-book-link');
  const burstOverlay = document.getElementById('magic-burst-overlay');
  const magicChargeRing = document.getElementById('magic-charge-ring');
  const magicEnergyDisc = document.getElementById('magic-energy-disc');
  const ouroborosMedallion = document.getElementById('ouroboros-medallion');

  let isBookOpen = false;
  let isOpeningInProgress = false;

  // Dynamic 3D Cursor Rotation Tracking (Book rotates following the cursor)
  document.addEventListener('mousemove', (e) => {
    if (isBookOpen || isOpeningInProgress) return;
    const xRatio = (e.clientX / window.innerWidth - 0.5) * 2; // -1 (left) to +1 (right)
    const yRatio = (e.clientY / window.innerHeight - 0.5) * 2; // -1 (top) to +1 (bottom)
    
    // Expressive 3D rotation following the cursor, keeping page thickness and back cover visible
    gsap.to(book3D, {
      rotateX: 23 - yRatio * 14,
      rotateY: -24 + xRatio * 16,
      rotateZ: 2.5 + xRatio * 2,
      xPercent: 0,
      x: xRatio * 18,
      y: yRatio * 14,
      duration: 0.45,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });

  // Smoothly return book to base perspective when cursor leaves window
  document.addEventListener('mouseleave', () => {
    if (isBookOpen || isOpeningInProgress) return;
    gsap.to(book3D, {
      rotateX: 23,
      rotateY: -24,
      rotateZ: 2.5,
      xPercent: 0,
      x: 0,
      y: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.6)',
      overwrite: 'auto'
    });
  });

  // Magical Burst Effect: Violet Smoke & Yellow 5-Pointed Stars
  function triggerMagicBurst() {
    const container = document.getElementById('magic-burst-box') || document.getElementById('magic-burst-overlay');
    if (!container) return;
    container.innerHTML = '';

    // 1. Violet Smoke Puffs (Soft Billowing Magic Smoke)
    const smokePuffsCount = 22;
    const smokeGradients = [
      'radial-gradient(circle, rgba(192, 132, 252, 0.95) 0%, rgba(147, 51, 234, 0.7) 45%, rgba(107, 33, 168, 0.25) 75%, transparent 100%)',
      'radial-gradient(circle, rgba(232, 121, 249, 0.95) 0%, rgba(192, 38, 211, 0.7) 45%, rgba(126, 34, 206, 0.25) 75%, transparent 100%)',
      'radial-gradient(circle, rgba(216, 180, 254, 0.98) 0%, rgba(168, 85, 247, 0.75) 45%, rgba(88, 28, 135, 0.3) 75%, transparent 100%)',
      'radial-gradient(circle, rgba(244, 114, 182, 0.95) 0%, rgba(168, 85, 247, 0.7) 50%, rgba(59, 7, 100, 0.25) 80%, transparent 100%)'
    ];

    for (let i = 0; i < smokePuffsCount; i++) {
      const puff = document.createElement('div');
      puff.className = 'magic-smoke-puff';
      const size = 110 + Math.random() * 70;
      puff.style.width = `${size}px`;
      puff.style.height = `${size}px`;
      puff.style.background = smokeGradients[i % smokeGradients.length];
      puff.style.left = '0px';
      puff.style.top = '0px';
      container.appendChild(puff);

      const angle = (Math.PI * 2 / smokePuffsCount) * i + (Math.random() - 0.5) * 0.45;
      const distance = 120 + Math.random() * 220;
      const targetX = Math.cos(angle) * distance;
      const targetY = Math.sin(angle) * distance;

      gsap.fromTo(puff, 
        { scale: 0.3, opacity: 0.95, rotation: Math.random() * 60, x: 0, y: 0 },
        {
          x: targetX,
          y: targetY,
          scale: 2.5 + Math.random() * 1.5,
          rotation: (Math.random() - 0.5) * 260,
          opacity: 0,
          duration: 1.4 + Math.random() * 0.4,
          ease: 'power2.out',
          onComplete: () => puff.remove()
        }
      );
    }

    // 2. Yellow 5-Pointed Stars (Vibrant Sharp Golden-Yellow Stars)
    const starsCount = 38;
    for (let i = 0; i < starsCount; i++) {
      const star = document.createElement('div');
      star.className = 'magic-burst-star';
      const starSize = 24 + Math.random() * 24;
      star.style.width = `${starSize}px`;
      star.style.height = `${starSize}px`;
      star.style.left = '0px';
      star.style.top = '0px';

      const yellowShade = i % 3 === 0 ? '#fff59d' : (i % 3 === 1 ? '#fde047' : '#facc15');
      const strokeShade = '#ca8a04';

      star.innerHTML = `
        <svg viewBox="0 0 50 50" class="magic-star-svg">
          <polygon points="25,2 32,17 49,18 36,30 40,47 25,37 10,47 14,30 1,18 18,17" 
                   fill="${yellowShade}" 
                   stroke="${strokeShade}" 
                   stroke-width="1.4"/>
        </svg>
      `;
      container.appendChild(star);

      const angle = Math.random() * Math.PI * 2;
      const distance = 140 + Math.random() * 320;
      const targetX = Math.cos(angle) * distance;
      const targetY = Math.sin(angle) * distance;
      const rot = (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 720);

      gsap.fromTo(star,
        { scale: 0.15, opacity: 1, rotation: 0, x: 0, y: 0 },
        {
          x: targetX,
          y: targetY,
          rotation: rot,
          scale: 1.25 + Math.random() * 0.4,
          duration: 0.6,
          ease: 'power2.out',
          onComplete() {
            gsap.to(star, {
              scale: 0,
              opacity: 0,
              duration: 0.7 + Math.random() * 0.4,
              ease: 'power1.in',
              onComplete: () => star.remove()
            });
          }
        }
      );
    }
  }

  // Open Grimoire Ritual Action
  function triggerOpenGrimoire() {
    if (isBookOpen || isOpeningInProgress) return;
    isOpeningInProgress = true;
    initAudio();
    playMusic();

    // 1. Initial lock sound and slight unlatch
    sounds.lockClick();
    gsap.to(haspLock, {
      x: 18,
      rotation: 12,
      duration: 0.3,
      ease: 'back.out(2)'
    });

    // 2. Central Circle Charging Animation (fills up the circle over 0.8s)
    if (magicChargeRing) {
      gsap.fromTo(magicChargeRing, 
        { strokeDashoffset: 816.8, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.8, ease: 'power2.inOut' }
      );
    }
    if (magicEnergyDisc) {
      gsap.fromTo(magicEnergyDisc,
        { attr: { r: 0 }, opacity: 0 },
        { attr: { r: 130 }, opacity: 0.85, duration: 0.8, ease: 'power2.inOut' }
      );
    }
    if (gemstone) {
      gsap.to(gemstone, {
        scale: 1.35,
        boxShadow: '0 0 35px #f472b6, 0 0 70px #a855f7',
        duration: 0.8,
        ease: 'power2.in'
      });
    }

    // 3. Climax at 800ms: Violet Smoke & Yellow Stars Flash Burst!
    setTimeout(() => {
      // Magical sounds
      sounds.sparkle();
      sounds.bookOpen();

      // Trigger the burst from the center of the medallion!
      triggerMagicBurst();

      // Lock pops out completely
      gsap.to(haspLock, {
        x: 45,
        rotation: 30,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in'
      });

      // Reset charging ring and disc
      if (magicChargeRing) {
        gsap.to(magicChargeRing, { opacity: 0, duration: 0.5, delay: 0.2 });
      }
      if (magicEnergyDisc) {
        gsap.to(magicEnergyDisc, { opacity: 0, duration: 0.5, delay: 0.2 });
      }
      if (gemstone) {
        gsap.to(gemstone, { scale: 1, boxShadow: '0 0 15px rgba(235, 127, 167, 0.8)', duration: 0.4 });
      }

      // 4. Give the explosion 350ms to bloom in front of the viewer, THEN flip the cover open!
      setTimeout(() => {
        book3D.classList.remove('closed-angle');
        book3D.classList.add('opened-state');

        // TRUE 3D ROTATION: Cover physically swings 180° around the center spine!
        // Animate z to 0 and set zIndex: 1 so it stays behind all flipped pages!
        gsap.to(bookCoverLeaf, {
          rotateY: -180,
          z: 0,
          duration: 1.35,
          ease: 'power2.inOut',
          onStart: () => {
            bookCoverLeaf.style.zIndex = '1';
          }
        });

        // Center the opened 2-page spread in the viewport:
        // Since cover swings left by 100%, shifting book3D right by 50% centers the spread perfectly!
        gsap.to(book3D, {
          rotateX: 10,
          rotateY: 0,
          rotateZ: 0,
          xPercent: 50,
          x: 0,
          y: 0,
          duration: 1.35,
          ease: 'power2.inOut',
          onComplete() {
            isBookOpen = true;
            isOpeningInProgress = false;
            updatePagePointerEvents(0);
            const spreadNav = document.getElementById('book-spread-nav');
            if (spreadNav) spreadNav.classList.add('visible');
          }
        });
      }, 350);

    }, 800);
  }

  // Close Grimoire Action
  function triggerCloseGrimoire() {
    if (!isBookOpen || isOpeningInProgress) return;
    isOpeningInProgress = true;
    initAudio();
    sounds.bookOpen();
    disableAllPagePointerEvents();

    const spreadNav = document.getElementById('book-spread-nav');
    if (spreadNav) spreadNav.classList.remove('visible');

    book3D.classList.remove('opened-state');
    book3D.classList.add('closed-angle');

    // Smoothly fold all currently flipped leaves back to the right
    const flippedCount = currentSpread;
    for (let step = 0; step < flippedCount; step++) {
      const leafIdx = currentSpread - 1 - step; // from top-most open leaf down to leaf-1
      const leaf = leaves[leafIdx];
      if (!leaf) continue;

      gsap.to(leaf, {
        rotateY: 0,
        z: 0,
        duration: 1.05,
        delay: step * 0.04, // graceful cascade folding
        ease: 'power2.inOut',
        onStart: () => {
          leaf.style.zIndex = 35 + (flippedCount - step);
        },
        onComplete: () => {
          leaf.style.zIndex = 26 - leafIdx;
        }
      });
    }

    // Physical 3D Cover Flip back over the spine, closing on top of all leaves!
    gsap.to(bookCoverLeaf, {
      rotateY: 0,
      z: 28,
      duration: 1.2,
      delay: 0.05,
      ease: 'power2.inOut',
      onStart: () => {
        bookCoverLeaf.style.zIndex = '55';
      },
      onComplete: () => {
        bookCoverLeaf.style.zIndex = '30';
      }
    });

    // Translate back to center the closed book on screen
    gsap.to(book3D, {
      rotateX: 23,
      rotateY: -24,
      rotateZ: 2.5,
      xPercent: 0,
      x: 0,
      y: 0,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete() {
        resetAllLeaves();
        isBookOpen = false;
        isOpeningInProgress = false;

        // Reset hasp lock
        gsap.to(haspLock, {
          x: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(2)'
        });
        sounds.lockClick();

        if (magicChargeRing) {
          gsap.set(magicChargeRing, { strokeDashoffset: 816.8, opacity: 0 });
        }
        if (magicEnergyDisc) {
          gsap.set(magicEnergyDisc, { attr: { r: 0 }, opacity: 0 });
        }
      }
    });
  }

  if (haspLock) haspLock.addEventListener('click', triggerOpenGrimoire);
  if (gemstone) gemstone.addEventListener('click', triggerOpenGrimoire);
  if (bookCoverLeaf) {
    bookCoverLeaf.addEventListener('click', (e) => {
      if (!isBookOpen && !isOpeningInProgress) triggerOpenGrimoire();
    });
  }
  if (closeBookLink) closeBookLink.addEventListener('click', triggerCloseGrimoire);


  // -------------------------------------------------
  // 4. 3D MULTI-LEAF SPREAD TURNING MECHANICS
  // -------------------------------------------------
  let currentSpread = 0; // 0 = Анкета, 1 = Способности, 2 = Ch1, 3 = Ch2, 4 = Ch3(1), 5 = Ch3(2), 6 = Ch4
  const totalSpreads = 6;
  const leaves = [
    document.getElementById('leaf-1'),
    document.getElementById('leaf-2'),
    document.getElementById('leaf-3'),
    document.getElementById('leaf-4'),
    document.getElementById('leaf-5'),
    document.getElementById('leaf-6')
  ];
  let isFlipping = false;

  function disableAllPagePointerEvents() {
    document.querySelectorAll('.leaf-face, .cover-face-inside, .book-page-base').forEach(face => {
      face.classList.remove('active-page-face');
      face.style.pointerEvents = 'none';
    });
  }

  function updatePagePointerEvents(spreadIdx) {
    disableAllPagePointerEvents();

    if (spreadIdx === 0) {
      const coverInside = document.querySelector('.cover-face-inside');
      if (coverInside) {
        coverInside.classList.add('active-page-face');
        coverInside.style.pointerEvents = 'auto';
      }
      const leaf1 = document.getElementById('leaf-1');
      if (leaf1) {
        const f = leaf1.querySelector('.leaf-face-front');
        if (f) {
          f.classList.add('active-page-face');
          f.style.pointerEvents = 'auto';
        }
      }
    } else if (spreadIdx >= 1 && spreadIdx <= 5) {
      const leftLeaf = leaves[spreadIdx - 1];
      const rightLeaf = leaves[spreadIdx];
      if (leftLeaf) {
        const leftFace = leftLeaf.querySelector('.leaf-face-back');
        if (leftFace) {
          leftFace.classList.add('active-page-face');
          leftFace.style.pointerEvents = 'auto';
        }
      }
      if (rightLeaf) {
        const rightFace = rightLeaf.querySelector('.leaf-face-front');
        if (rightFace) {
          rightFace.classList.add('active-page-face');
          rightFace.style.pointerEvents = 'auto';
        }
      }
    } else if (spreadIdx === 6) {
      const leftLeaf = leaves[5];
      if (leftLeaf) {
        const leftFace = leftLeaf.querySelector('.leaf-face-back');
        if (leftFace) {
          leftFace.classList.add('active-page-face');
          leftFace.style.pointerEvents = 'auto';
        }
      }
      const basePage = document.getElementById('book-page-base');
      if (basePage) {
        basePage.classList.add('active-page-face');
        basePage.style.pointerEvents = 'auto';
      }
    }
  }

  function resetAllLeaves() {
    leaves.forEach((leaf, idx) => {
      if (leaf) {
        gsap.set(leaf, { rotateY: 0, z: 0 });
        leaf.style.zIndex = 26 - idx;
      }
    });
    currentSpread = 0;
    updateNavTabs();
    updatePagePointerEvents(0);
  }

  function updateNavTabs() {
    const spreadTabBtns = document.querySelectorAll('.spread-tab-btn');
    spreadTabBtns.forEach(btn => {
      const sIdx = parseInt(btn.getAttribute('data-spread'), 10);
      btn.classList.toggle('active', sIdx === currentSpread);
    });
  }

  function goToSpread(targetSpread) {
    if (targetSpread < 0 || targetSpread > totalSpreads || targetSpread === currentSpread || isFlipping) return;
    isFlipping = true;
    sounds.pageFlip();
    disableAllPagePointerEvents();

    // Pre-hide polaroids on the target spread before the page turns so they NEVER vanish mid-flip!
    if (targetSpread === 4 || targetSpread === 5) {
      const gridSelector = targetSpread === 4
        ? '#polaroids-grid-1 .polaroid-card, #polaroids-grid-2 .polaroid-card'
        : '#polaroids-grid-3 .polaroid-card, #polaroids-grid-4 .polaroid-card';
      document.querySelectorAll(gridSelector).forEach(c => {
        c.classList.remove('pinned');
        gsap.killTweensOf(c);
        gsap.set(c, { opacity: 0 });
        const p = c.querySelector('.polaroid-pin');
        if (p) {
          p.classList.remove('pinned');
          gsap.killTweensOf(p);
          gsap.set(p, { opacity: 0 });
        }
      });
    }

    if (targetSpread > currentSpread) {
      // Flipping forward: leaves from currentSpread up to targetSpread - 1
      const count = targetSpread - currentSpread;
      for (let step = 0; step < count; step++) {
        const leafIdx = currentSpread + step; // 0 to 5
        const leaf = leaves[leafIdx];
        if (!leaf) continue;

        gsap.to(leaf, {
          rotateY: -180,
          z: (leafIdx + 1) * 0.8,
          duration: 0.85,
          delay: step * 0.12,
          ease: 'power2.inOut',
          onStart: () => {
            leaf.style.zIndex = 50 + step;
          },
          onComplete: () => {
            leaf.style.zIndex = 11 + leafIdx;
            if (step === count - 1) {
              currentSpread = targetSpread;
              updateNavTabs();
              updatePagePointerEvents(currentSpread);
              if (currentSpread === 4 || currentSpread === 5) {
                launchPolaroidsEntrance(currentSpread);
              }
              isFlipping = false;
            }
          }
        });
      }
    } else {
      // Flipping backward: leaves from currentSpread - 1 down to targetSpread
      const count = currentSpread - targetSpread;
      for (let step = 0; step < count; step++) {
        const leafIdx = currentSpread - 1 - step; // e.g. 5 down to 0
        const leaf = leaves[leafIdx];
        if (!leaf) continue;

        gsap.to(leaf, {
          rotateY: 0,
          z: 0,
          duration: 0.85,
          delay: step * 0.12,
          ease: 'power2.inOut',
          onStart: () => {
            leaf.style.zIndex = 50 + step;
          },
          onComplete: () => {
            leaf.style.zIndex = 26 - leafIdx;
            if (step === count - 1) {
              currentSpread = targetSpread;
              updateNavTabs();
              updatePagePointerEvents(currentSpread);
              if (currentSpread === 4 || currentSpread === 5) {
                launchPolaroidsEntrance(currentSpread);
              }
              isFlipping = false;
            }
          }
        });
      }
    }
  }

  // Handle all click navigation: data-target buttons, dog-ears, close links
  document.addEventListener('click', (e) => {
    const targetBtn = e.target.closest('[data-target]');
    if (targetBtn && isBookOpen && !isOpeningInProgress) {
      const targetSpread = parseInt(targetBtn.getAttribute('data-target'), 10);
      if (!isNaN(targetSpread)) {
        goToSpread(targetSpread);
      }
    }

    const closeBtn = e.target.closest('.page-close-btn');
    if (closeBtn && isBookOpen && !isOpeningInProgress) {
      triggerCloseGrimoire();
    }
  });

  // Spread Ribbon Tabs
  const spreadTabBtns = document.querySelectorAll('.spread-tab-btn');
  const spreadPrevArrow = document.getElementById('spread-prev-arrow');
  const spreadNextArrow = document.getElementById('spread-next-arrow');

  spreadTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (!isBookOpen || isOpeningInProgress) return;
      const targetSpread = parseInt(btn.getAttribute('data-spread'), 10);
      goToSpread(targetSpread);
    });
  });

  if (spreadPrevArrow) {
    spreadPrevArrow.addEventListener('click', () => {
      if (!isBookOpen || isOpeningInProgress) return;
      goToSpread(currentSpread - 1);
    });
  }

  if (spreadNextArrow) {
    spreadNextArrow.addEventListener('click', () => {
      if (!isBookOpen || isOpeningInProgress) return;
      goToSpread(currentSpread + 1);
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!isBookOpen || isOpeningInProgress) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      goToSpread(currentSpread + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      goToSpread(currentSpread - 1);
    } else if (e.key === 'Escape') {
      triggerCloseGrimoire();
    }
  });


  // -------------------------------------------------
  // 5. CHAPTER 1: PUNCH INTERACTIVE ✊💥
  // -------------------------------------------------
  const punchBtn = document.getElementById('punch-action-btn');
  const punchCounterVal = document.getElementById('punch-counter-val');
  const punchBurst = document.getElementById('punch-burst');
  const punchTargetArea = document.getElementById('punch-target-area');
  const punchStatusText = document.getElementById('punch-status-text');
  const panicBar = document.getElementById('panic-meter-bar');
  const panicPercentVal = document.getElementById('panic-percent-val');
  const punchFxContainer = document.getElementById('punch-fx-container');

  let punchCount = 0;
  let panicLevel = 100;

  const punchBursts = ['ПУНЬК!', 'БАМ!', 'ХРЯСЬ!', 'КРЯ!', 'БУМ!', 'МИНУС ПАНИКА!', 'ТОЧНО В ЦЕЛЬ!', 'ДЗЫНЬ!', 'АЙ!'];

  const punchMessages = [
    '«Ай! Паника стремительно тает!»',
    '«Сдашь этот зачёт на изи, я гарантирую!»',
    '«Бей ещё, плечо стальное — главное выдохни!»',
    '«Белорусский язык повержен и трепещет!»',
    '«Порча на понос временно нейтрализована 🛡️»',
    '«Ты самая умная и талантливая, ни капли сомнений!»',
    '«Удар поставлен идеально! Вся тревога испарилась!»',
    '«Автор держит оборону, зачёт уже в кармане!»',
    '«Автомат по сессии всё ближе и ближе!»'
  ];

  const punchEmojis = ['💥', '✨', '✊', '💖', '🍓', '⚡'];

  function triggerPunch(e) {
    punchCount++;
    if (punchCounterVal) punchCounterVal.textContent = punchCount;
    sounds.punch();

    // Decrease panic level
    panicLevel = Math.max(0, 100 - punchCount * 12);
    if (panicBar) {
      panicBar.style.width = panicLevel + '%';
      if (panicLevel === 0) {
        panicBar.style.background = '#10b981';
      } else if (panicLevel < 40) {
        panicBar.style.background = 'linear-gradient(90deg, #10b981, #f59e0b)';
      }
    }

    if (panicPercentVal) {
      if (panicLevel === 0) {
        panicPercentVal.textContent = '0% (ДЗЕН!)';
        panicPercentVal.style.color = '#059669';
      } else {
        panicPercentVal.textContent = panicLevel + '%';
      }
    }

    // Shake target animation
    if (punchTargetArea) {
      punchTargetArea.classList.remove('shake');
      void punchTargetArea.offsetWidth;
      punchTargetArea.classList.add('shake');
    }

    // Comic sound burst
    if (punchBurst) {
      punchBurst.textContent = punchBursts[Math.floor(Math.random() * punchBursts.length)];
      const rot = (Math.random() * 24 - 12).toFixed(1);
      punchBurst.style.setProperty('--rot', rot + 'deg');
      punchBurst.classList.add('show');
      setTimeout(() => punchBurst.classList.remove('show'), 380);
    }

    // Floating particle burst
    if (punchFxContainer) {
      const particle = document.createElement('span');
      particle.className = 'punch-sparkle';
      particle.textContent = punchEmojis[Math.floor(Math.random() * punchEmojis.length)];
      const dx = (Math.random() * 80 - 40) + 'px';
      const dy = -(Math.random() * 40 + 35) + 'px';
      const pRot = (Math.random() * 60 - 30) + 'deg';
      particle.style.setProperty('--dx', dx);
      particle.style.setProperty('--dy', dy);
      particle.style.setProperty('--rot', pRot);
      particle.style.left = '45%';
      particle.style.top = '40%';
      punchFxContainer.appendChild(particle);
      setTimeout(() => particle.remove(), 650);
    }

    // Status message update
    if (punchStatusText) {
      if (panicLevel === 0) {
        punchStatusText.textContent = '✨ ДЗЕН ВЕДЬМОЧКИ ДОСТИГНУТ! 100% СПОКОЙСТВИЯ, ЭКЗАМЕН СДАН! 🍓👑';
        punchStatusText.style.background = 'rgba(209, 250, 229, 0.85)';
        punchStatusText.style.borderColor = '#10b981';
        punchStatusText.style.color = '#065f46';
        sounds.chime();
      } else {
        punchStatusText.textContent = punchMessages[punchCount % punchMessages.length];
      }
    }
  }

  if (punchBtn) punchBtn.addEventListener('click', triggerPunch);
  if (punchTargetArea) punchTargetArea.addEventListener('click', triggerPunch);


  // -------------------------------------------------
  // 6. CHAPTER 2: CAULDRON INGREDIENTS & BREWING 🍲✨
  // -------------------------------------------------
  const ingItems = document.querySelectorAll('.cauldron-ing-item');
  const potStop0 = document.getElementById('pot-stop-0');
  const potStop1 = document.getElementById('pot-stop-1');
  const potStop2 = document.getElementById('pot-stop-2');
  const cauldronResult = document.getElementById('cauldron-result-text');
  const cauldronIngCount = document.getElementById('cauldron-ing-count');
  const cauldronProgressBar = document.getElementById('cauldron-progress-bar');
  const cauldronStageBox = document.getElementById('cauldron-stage-box');
  const cauldronStirBtn = document.getElementById('cauldron-stir-btn');
  const elixirBottleAward = document.getElementById('elixir-bottle-award');
  const cauldronResetBtn = document.getElementById('cauldron-reset-btn');

  let addedIngs = new Set();

  const potionColors = [
    { stop0: '#fda4af', stop1: '#f43f5e', stop2: '#9f1239' }, // Strawberry Pink
    { stop0: '#bae6fd', stop1: '#0ea5e9', stop2: '#0369a1' }, // Dance Azure
    { stop0: '#fef08a', stop1: '#eab308', stop2: '#854d0e' }, // Cuisine Golden Honey
    { stop0: '#f5d0fe', stop1: '#d946ef', stop2: '#4c1d95' }  // Ultimate Serenity Magenta
  ];

  const ingredientMessages = {
    strawberry: '🍓 Спелая клубника наполнила зелье ароматом безграничной радости!',
    dance: '💃 Ритм контемпа закружил варево в грациозном танце легкости!',
    cooking: '🍳 Авторская кухня согрела зелье заботой и домашним уютом!',
    shield: '🛡️ Щит от сессий активирован — паника полностью растворилась!'
  };

  function updateCauldronColor(step) {
    if (step <= 0) {
      if (potStop0) potStop0.setAttribute('stop-color', '#fbcfe8');
      if (potStop1) potStop1.setAttribute('stop-color', '#db2777');
      if (potStop2) potStop2.setAttribute('stop-color', '#831843');
    } else {
      const col = potionColors[Math.min(step - 1, potionColors.length - 1)];
      if (potStop0) potStop0.setAttribute('stop-color', col.stop0);
      if (potStop1) potStop1.setAttribute('stop-color', col.stop1);
      if (potStop2) potStop2.setAttribute('stop-color', col.stop2);
    }
  }

  function triggerCauldronStir() {
    sounds.bubble();
    if (cauldronStageBox) {
      cauldronStageBox.classList.remove('stirring');
      void cauldronStageBox.offsetWidth;
      cauldronStageBox.classList.add('stirring');
    }
  }

  if (cauldronStirBtn) {
    cauldronStirBtn.addEventListener('click', () => {
      triggerCauldronStir();
      if (addedIngs.size < 4) {
        if (cauldronResult) {
          cauldronResult.textContent = `Зелье закружилось в вихре! Добавь ещё ингредиентов: осталось ${4 - addedIngs.size}`;
        }
      } else {
        if (cauldronResult) {
          cauldronResult.innerHTML = `✨ Зелье искрится и благоухает клубникой и танцами! Готово к употреблению! 🍓`;
        }
      }
    });
  }

  if (cauldronStageBox) {
    cauldronStageBox.addEventListener('click', () => {
      triggerCauldronStir();
    });
  }

  ingItems.forEach(item => {
    item.addEventListener('click', () => {
      const ing = item.getAttribute('data-ing');
      if (addedIngs.has(ing)) return;
      addedIngs.add(ing);
      item.classList.add('added');
      const badge = item.querySelector('.ing-badge');
      if (badge) badge.textContent = 'В котле ✓';

      triggerCauldronStir();

      const count = addedIngs.size;
      if (cauldronIngCount) cauldronIngCount.textContent = count;
      if (cauldronProgressBar) cauldronProgressBar.style.width = (count / 4 * 100) + '%';

      updateCauldronColor(count);

      if (count === 4) {
        sounds.chime();
        if (elixirBottleAward) elixirBottleAward.classList.add('show');
        if (cauldronResetBtn) cauldronResetBtn.classList.remove('hidden');
        if (cauldronResult) {
          cauldronResult.innerHTML = `
            🎉 <strong>ЭЛИКСИР АБСОЛЮТНОГО СЧАСТЬЯ СВАРЕН!</strong><br>
            <em>+1000 к спокойствию, бесконечные танцы и море спелой клубники! 🍓👑</em>
          `;
        }
      } else {
        if (cauldronResult) {
          cauldronResult.textContent = ingredientMessages[ing] || `Ингредиент добавлен! Осталось: ${4 - count}`;
        }
      }
    });
  });

  if (cauldronResetBtn) {
    cauldronResetBtn.addEventListener('click', () => {
      addedIngs.clear();
      ingItems.forEach(item => {
        item.classList.remove('added');
        const badge = item.querySelector('.ing-badge');
        if (badge) badge.textContent = 'Бросить ✦';
      });
      if (cauldronIngCount) cauldronIngCount.textContent = '0';
      if (cauldronProgressBar) cauldronProgressBar.style.width = '0%';
      updateCauldronColor(0);
      if (elixirBottleAward) elixirBottleAward.classList.remove('show');
      cauldronResetBtn.classList.add('hidden');
      if (cauldronResult) {
        cauldronResult.textContent = 'Бросай священные ингредиенты слева, чтобы начать варку! 🍓';
      }
      sounds.bubble();
    });
  }


  // -------------------------------------------------
  // 7. CHAPTER 3: POLAROIDS (17 PHOTOS)
  // -------------------------------------------------
  const photos = [
    { src: 'photo_2023-04-24_00-02-47.jpg', title: 'Апрель 2023', desc: 'Первый курс: начало истории ✨' },
    { src: 'photo_2023-04-24_00-12-41.jpg', title: 'Апрель 2023', desc: 'Тот самый взгляд и милая улыбка' },
    { src: 'photo_2023-05-27_02-37-54.jpg', title: 'Май 2023', desc: 'Ночные зачёты и подготовка 📚' },
    { src: 'photo_2023-11-23_22-33-02.jpg', title: 'Ноябрь 2023', desc: 'Уютные осенние дни' },
    { src: 'photo_2024-07-15_01-34-17.jpg', title: 'Июль 2024', desc: 'Летнее тепло и улыбки ☀️' },
    { src: 'photo_2024-09-27_10-46-30.jpg', title: 'Сентябрь 2024', desc: 'Праздничный вайб' },
    { src: 'photo_2025-11-04_17-46-25.jpg', title: 'Ноябрь 2025', desc: 'Преодолели все трудности вместе 🛡️' },
    { src: 'photo_2026-06-24_20-24-38.jpg', title: 'Июнь 2026', desc: 'Грация, ритм и магия танца 💃' },
    { src: 'photo_2026-09-21_17-56-54.jpg', title: '2026', desc: 'Самая прекрасная Ведьмочка 🧙‍♀️' },
    { src: 'photo_2026-09-21_17-57-09.jpg', title: '2026', desc: 'Улыбка, согревающая всё вокруг' },
    { src: 'photo_2026-09-21_17-57-31.jpg', title: '2026', desc: 'Наш неповторимый вайб' },
    { src: 'photo_2026-09-21_17-57-34.jpg', title: '2026', desc: 'Искренний смех и радость' },
    { src: 'photo_2026-09-21_17-57-51.jpg', title: '2026', desc: 'Живые и настоящие моменты' },
    { src: 'photo_2026-09-21_17-57-54.jpg', title: '2026', desc: 'Рядом с тобой всегда светло' },
    { src: 'photo_2026-09-21_17-57-59.jpg', title: '2026', desc: 'Пластика и вдохновение' },
    { src: 'photo_2026-09-21_17-58-02.jpg', title: '2026', desc: 'Тепло, забота и дружба' },
    { src: 'photo_2026-09-21_17-58-21.jpg', title: '2026', desc: 'Впереди ещё столько ярких глав! 🍓' }
  ];

  const photoModal = document.getElementById('photo-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function createPolaroidElement(p, idx, isLetter = false) {
    const card = document.createElement('div');
    card.className = isLetter ? 'polaroid-card letter-mini-polaroid pinned' : 'polaroid-card';
    const naturalRot = ((idx % 4) - 1.5) * 2.2;
    card.style.setProperty('--rot', `${naturalRot}deg`);

    card.innerHTML = `
      <div class="polaroid-pin ${isLetter ? 'pinned' : ''}">
        <div class="pin-head"></div>
      </div>
      <div class="polaroid-img-box">
        <img src="${p.src}" alt="${p.title}" loading="lazy">
      </div>
      <div class="polaroid-label-txt">
        ${p.desc}
        <span class="polaroid-date-tag">${p.title}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      sounds.sparkle();
      if (modalImg) modalImg.src = p.src;
      if (modalTitle) modalTitle.textContent = p.title;
      if (modalDesc) modalDesc.textContent = p.desc;
      if (photoModal) photoModal.classList.remove('hidden');
    });

    return card;
  }

  function initPolaroidGalleries() {
    const grid1 = document.getElementById('polaroids-grid-1');
    const grid2 = document.getElementById('polaroids-grid-2');
    const grid3 = document.getElementById('polaroids-grid-3');
    const grid4 = document.getElementById('polaroids-grid-4');
    const letterWrap = document.getElementById('letter-polaroid-wrap');

    if (grid1) grid1.innerHTML = '';
    if (grid2) grid2.innerHTML = '';
    if (grid3) grid3.innerHTML = '';
    if (grid4) grid4.innerHTML = '';
    if (letterWrap) letterWrap.innerHTML = '';

    // Spread 4 Left: 4 photos
    photos.slice(0, 4).forEach((p, i) => {
      if (grid1) grid1.appendChild(createPolaroidElement(p, i));
    });

    // Spread 4 Right: 4 photos
    photos.slice(4, 8).forEach((p, i) => {
      if (grid2) grid2.appendChild(createPolaroidElement(p, i + 4));
    });

    // Spread 5 Left: 4 photos
    photos.slice(8, 12).forEach((p, i) => {
      if (grid3) grid3.appendChild(createPolaroidElement(p, i));
    });

    // Spread 5 Right: 4 photos
    photos.slice(12, 16).forEach((p, i) => {
      if (grid4) grid4.appendChild(createPolaroidElement(p, i + 4));
    });

    // Spread 6 Left (Letter keepsake): 17th photo
    if (photos[16] && letterWrap) {
      letterWrap.appendChild(createPolaroidElement(photos[16], 16, true));
    }
  }

  function launchPolaroidsEntrance(spreadIdx) {
    let gridLeftId = '';
    let gridRightId = '';
    if (spreadIdx === 4) {
      gridLeftId = 'polaroids-grid-1';
      gridRightId = 'polaroids-grid-2';
    } else if (spreadIdx === 5) {
      gridLeftId = 'polaroids-grid-3';
      gridRightId = 'polaroids-grid-4';
    } else {
      return;
    }

    const leftGrid = document.getElementById(gridLeftId);
    const rightGrid = document.getElementById(gridRightId);
    const leftCards = leftGrid ? Array.from(leftGrid.querySelectorAll('.polaroid-card')) : [];
    const rightCards = rightGrid ? Array.from(rightGrid.querySelectorAll('.polaroid-card')) : [];
    const allCards = [...leftCards, ...rightCards];

    if (!allCards.length) return;

    // 8 Crooked Launch Trajectories from outside the screen boundaries
    const startTrajectories = [
      // Left Page (0..3)
      { x: -window.innerWidth * 0.75, y: -window.innerHeight * 0.6, rot: -55, scale: 1.5 },
      { x: -window.innerWidth * 0.2, y: -window.innerHeight * 0.85, rot: 45, scale: 1.4 },
      { x: -window.innerWidth * 0.85, y: window.innerHeight * 0.55, rot: -40, scale: 1.5 },
      { x: -window.innerWidth * 0.35, y: window.innerHeight * 0.75, rot: 50, scale: 1.4 },
      // Right Page (4..7)
      { x: window.innerWidth * 0.25, y: -window.innerHeight * 0.85, rot: -45, scale: 1.4 },
      { x: window.innerWidth * 0.85, y: -window.innerHeight * 0.6, rot: 55, scale: 1.5 },
      { x: window.innerWidth * 0.35, y: window.innerHeight * 0.75, rot: -35, scale: 1.4 },
      { x: window.innerWidth * 0.85, y: window.innerHeight * 0.65, rot: 48, scale: 1.5 }
    ];

    allCards.forEach((card, idx) => {
      const pin = card.querySelector('.polaroid-pin');
      const targetRot = parseFloat(card.style.getPropertyValue('--rot')) || ((idx % 4) - 1.5) * 2.2;
      const traj = startTrajectories[idx % startTrajectories.length];

      gsap.killTweensOf(card);
      if (pin) gsap.killTweensOf(pin);

      // Hide pin initially
      if (pin) {
        pin.classList.remove('pinned');
        gsap.set(pin, { opacity: 0, scale: 0, y: -45 });
      }

      // Initial off-screen crooked state
      gsap.set(card, {
        x: traj.x,
        y: traj.y,
        rotation: traj.rot,
        scale: traj.scale,
        opacity: 0,
        pointerEvents: 'none'
      });

      // Sequential fly in from outside the screen
      gsap.to(card, {
        x: 0,
        y: 0,
        rotation: targetRot,
        scale: 1,
        opacity: 1,
        duration: 0.62,
        delay: idx * 0.18, // Staggered sequential entrance
        ease: 'power3.out',
        onComplete: () => {
          card.classList.add('pinned');
          card.style.pointerEvents = 'auto';

          // Pin strikes down immediately when card lands!
          if (pin) {
            sounds.nail();
            pin.classList.add('pinned');
            gsap.fromTo(pin,
              { y: -45, scale: 2.5, opacity: 0 },
              {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.2,
                ease: 'back.out(3.5)'
              }
            );
          }

          // Card absorbs impact with micro bounce
          gsap.fromTo(card,
            { scale: 0.95 },
            { scale: 1, duration: 0.16, ease: 'elastic.out(1.2, 0.4)' }
          );
        }
      });
    });
  }

  // Initialize all polaroids in their 4-photo 2x2 grids
  initPolaroidGalleries();

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => photoModal.classList.add('hidden'));
  }
  if (photoModal) {
    photoModal.addEventListener('click', (e) => {
      if (e.target === photoModal) photoModal.classList.add('hidden');
    });
  }


  // -------------------------------------------------
  // 8. CHAPTER 4: WISH & EPIC CONFETTI RITUAL
  // -------------------------------------------------
  const wishFireBtn = document.getElementById('wish-fire-btn');
  const wishDoneMsg = document.getElementById('wish-done-msg');

  function launchEpicRitualCelebration() {
    // Sound symphony
    sounds.sparkle();
    sounds.spellCast();
    setTimeout(() => sounds.chime(), 400);

    // Cake celebration bounce
    const cakeEmoji = document.querySelector('.cake-emoji-wrap');
    if (cakeEmoji && typeof gsap !== 'undefined') {
      gsap.fromTo(cakeEmoji,
        { scale: 0.7, rotation: -20 },
        {
          scale: 1.35,
          rotation: 10,
          duration: 0.45,
          ease: 'back.out(3)',
          onComplete() {
            gsap.to(cakeEmoji, {
              scale: 1,
              rotation: 0,
              duration: 0.7,
              ease: 'elastic.out(1.2, 0.4)'
            });
          }
        }
      );
    }

    // Reveal and animate cosmic wish message
    if (wishDoneMsg) {
      wishDoneMsg.classList.remove('hidden');
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(wishDoneMsg,
          { scale: 0.85, opacity: 0, y: 15 },
          { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(2)' }
        );
      }
    }

    // EPIC MULTI-STAGE CONFETTI & FIREWORKS EXTRAVAGANZA
    if (typeof confetti === 'function') {
      const festiveColors = ['#ff3366', '#ff758f', '#ffb703', '#ffd166', '#7209b7', '#b3e0fc', '#ffffff', '#e0aaff'];

      // 1. Initial Mega Center Blast (180 particles)
      confetti({
        particleCount: 180,
        spread: 100,
        startVelocity: 55,
        origin: { y: 0.65 },
        colors: festiveColors,
        disableForReducedMotion: false
      });

      // 2. Star burst raining down
      confetti({
        particleCount: 90,
        spread: 120,
        startVelocity: 45,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#fff3b0', '#ffb703', '#ffffff'],
        shapes: ['star'],
        scalar: 1.2
      });

      // 3. Continuous Side Cannons streaming fireworks for 3.5 seconds
      const duration = 3500;
      const animationEnd = Date.now() + duration;

      const streamCannons = () => {
        // Left cannon (angled inward and upward)
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 55,
          startVelocity: 55,
          origin: { x: 0, y: 0.8 },
          colors: festiveColors
        });
        // Right cannon (angled inward and upward)
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 55,
          startVelocity: 55,
          origin: { x: 1, y: 0.8 },
          colors: festiveColors
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(streamCannons);
        }
      };
      requestAnimationFrame(streamCannons);

      // 4. Staggered Aerial Firework Bursts across the screen
      setTimeout(() => {
        sounds.sparkle();
        confetti({
          particleCount: 120,
          spread: 140,
          startVelocity: 50,
          origin: { x: 0.35, y: 0.4 },
          colors: festiveColors,
          shapes: ['star']
        });
      }, 750);

      setTimeout(() => {
        sounds.sparkle();
        confetti({
          particleCount: 120,
          spread: 140,
          startVelocity: 50,
          origin: { x: 0.65, y: 0.4 },
          colors: festiveColors,
          shapes: ['star']
        });
      }, 1500);

      setTimeout(() => {
        sounds.chime();
        confetti({
          particleCount: 160,
          spread: 160,
          startVelocity: 60,
          origin: { x: 0.5, y: 0.42 },
          colors: festiveColors
        });
      }, 2300);
    }
  }

  if (wishFireBtn) {
    wishFireBtn.addEventListener('click', launchEpicRitualCelebration);
  }

});
