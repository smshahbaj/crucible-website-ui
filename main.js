document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------------------
  // 0. Path & Route Mapping Configuration
  // ----------------------------------------------------
  const routeMap = {
    '/install': {
      modalId: 'modalInstall',
      title: 'Install Crucible — Claude Code Plugin & Marketplace',
      description: 'Install Crucible in Claude Code via /plugin marketplace add smshahbaj/crucible, or clone locally with --plugin-dir. No database or API key required for normal use.',
    },
    '/how': {
      modalId: 'modalHow',
      title: 'Adaptive Scrutiny Architecture — Crucible',
      description: 'How Crucible routes decisions across QUICK, REVIEW, and DEEP depths based on stakes, uncertainty, reversibility, and evidence needs — without turning every question into a multi-agent debate.',
    },
    '/agents': {
      modalId: 'modalAgents',
      title: '14 Specialist Agents — Crucible',
      description: 'Meet the 14 specialist agent lenses in Crucible, from claim-compressor and evidence-auditor to risk-red-team and final-judge, each challenging a different facet of a decision.',
    },
    '/docs': {
      modalId: 'modalDocs',
      title: 'Docs & References — Crucible',
      description: 'Reference documentation for Crucible: adaptive routing, evidence gates, adversarial red-teaming, output schema, quality gates, and the local decision ledger.',
    },
    '/faq': {
      modalId: 'modalFAQ',
      title: 'Frequently Asked Questions — Crucible',
      description: 'Answers to common questions about Crucible: installation, API key requirements, how the 14 agents are routed, licensing, and what Crucible is not.',
    },
    '/ledger': {
      modalId: 'modalLedger',
      title: 'Local Decision Ledger — Crucible',
      description: 'Record decisions, reasoning, risks, and real-world outcomes locally in .crucible/ledger.jsonl using Crucible\'s offline decision ledger tools.',
    },
    '/changelog': {
      modalId: 'modalChangelog',
      title: 'Changelog & Releases — Crucible',
      description: 'Release history for Crucible, including the v1.0.0 launch with adaptive routing, 14 specialist agents, evidence gates, and the local decision ledger.',
    },
    '/about': {
      modalId: 'modalAbout',
      title: 'About Crucible — Claude Code Skill',
      description: 'Crucible is an adaptive decision-review skill and plugin for Claude Code, built by SM Shahbaj, released under the MIT license.',
    },
  };

  const defaultDescription = 'Crucible is a Claude Code skill that pressure-tests important decisions, plans, proposals, architecture, and recommendations. Adaptive routing, 14 specialist agents, evidence gates, and failure-first analysis — without turning every question into a multi-agent debate.';
  const siteOrigin = 'https://crucible.smshahbaj.com';

  const setMetaContent = (selector, content) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute('content', content);
  };

  const setCanonical = (path) => {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', `${siteOrigin}${path === '/' ? '' : path}`);
  };

  const applyRouteMeta = (path, routeInfo) => {
    const title = routeInfo ? routeInfo.title : defaultTitle;
    const description = routeInfo ? routeInfo.description : defaultDescription;
    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', `${siteOrigin}${path === '/' ? '' : path}`);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
    setCanonical(path);
  };

  const modalToPath = {
    'modalInstall': '/install',
    'modalHow': '/how',
    'modalAgents': '/agents',
    'modalDocs': '/docs',
    'modalFAQ': '/faq',
    'modalLedger': '/ledger',
    'modalChangelog': '/changelog',
    'modalAbout': '/about',
  };

  const defaultTitle = 'Crucible — Adaptive Decision Pressure-Testing for Claude Code';

  // ----------------------------------------------------
  // 0b. Minimal Crucible Loading Screen Controller
  // ----------------------------------------------------
  const loaderScreen = document.getElementById('loaderScreen');
  const loaderBarFill = document.getElementById('loaderBarFill');
  const loaderPercentText = document.getElementById('loaderPercentText');

  // ----------------------------------------------------
  // 0a. Conditional Background Video Loading (perf / Core Web Vitals)
  // Skips the heavy autoplay video on reduced-motion, save-data, or slow
  // connections, and only attaches sources after first paint otherwise.
  // ----------------------------------------------------
  const bgVideoEl = document.getElementById('bgVideo');
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const conn = navigator.connection || navigator.webkitConnection || navigator.mozConnection;
  const isConstrainedConnection = !!(conn && (conn.saveData || /2g/.test(conn.effectiveType || '')));

  if (bgVideoEl && !prefersReducedMotion && !isConstrainedConnection) {
    const loadVideoSources = () => {
      const webmSrc = bgVideoEl.getAttribute('data-src-webm');
      const mp4Src = bgVideoEl.getAttribute('data-src-mp4');
      if (webmSrc) {
        const sourceWebm = document.createElement('source');
        sourceWebm.setAttribute('src', webmSrc);
        sourceWebm.setAttribute('type', 'video/webm');
        bgVideoEl.appendChild(sourceWebm);
      }
      if (mp4Src) {
        const sourceMp4 = document.createElement('source');
        sourceMp4.setAttribute('src', mp4Src);
        sourceMp4.setAttribute('type', 'video/mp4');
        bgVideoEl.appendChild(sourceMp4);
      }
      bgVideoEl.load();
      bgVideoEl.play().catch(() => {});
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadVideoSources, { timeout: 2000 });
    } else {
      window.addEventListener('load', loadVideoSources, { once: true });
    }
  }

  const runLoaderSequence = () => {
    if (!loaderScreen || !loaderBarFill) return;

    let currentPercent = 0;
    let targetPercent = 20;
    let isComplete = false;
    const startTime = performance.now();
    const minDuration = 650; // crisp, responsive loading duration
    const maxDuration = 1400; // safety fallback

    let windowLoaded = document.readyState === 'complete';
    let videoReady = false;
    let fontsReady = false;

    if (!windowLoaded) {
      window.addEventListener('load', () => { windowLoaded = true; }, { once: true });
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { fontsReady = true; }).catch(() => { fontsReady = true; });
    } else {
      fontsReady = true;
    }

    const bgVideoCheck = document.getElementById('bgVideo');
    if (bgVideoCheck) {
      if (bgVideoCheck.readyState >= 2) {
        videoReady = true;
      } else {
        bgVideoCheck.addEventListener('canplay', () => { videoReady = true; }, { once: true });
      }
    } else {
      videoReady = true;
    }

    const frame = (now) => {
      if (isComplete) return;

      const elapsed = now - startTime;
      const timeRatio = Math.min(elapsed / minDuration, 1);
      const isMaxTimeout = elapsed >= maxDuration;

      let calculatedTarget = timeRatio * 70;
      if (fontsReady) calculatedTarget += 10;
      if (videoReady) calculatedTarget += 10;
      if (windowLoaded) calculatedTarget += 10;

      if (timeRatio >= 1 && (windowLoaded || videoReady || isMaxTimeout)) {
        targetPercent = 100;
      } else {
        targetPercent = Math.min(calculatedTarget, 95);
      }

      if (isMaxTimeout) {
        targetPercent = 100;
      }

      currentPercent += (targetPercent - currentPercent) * 0.18;

      if (targetPercent >= 100 && (100 - currentPercent) < 0.8) {
        currentPercent = 100;
        isComplete = true;
      }

      const displayPct = Math.min(Math.round(currentPercent), 100);
      loaderBarFill.style.width = `${currentPercent}%`;
      if (loaderPercentText) {
        loaderPercentText.textContent = `${displayPct}%`;
      }

      if (!isComplete) {
        requestAnimationFrame(frame);
      } else {
        if (loaderPercentText) loaderPercentText.textContent = '100%';
        loaderBarFill.style.width = '100%';

        setTimeout(() => {
          loaderScreen.classList.add('fade-out');
          document.body.classList.add('app-loaded');

          setTimeout(() => {
            loaderScreen.style.display = 'none';
          }, 500);
        }, 150);
      }
    };

    requestAnimationFrame(frame);
  };

  runLoaderSequence();

  // ----------------------------------------------------
  // 0c. Background Video Loop Controller
  // ----------------------------------------------------
  const bgVideo = document.getElementById('bgVideo');
  if (bgVideo) {
    bgVideo.muted = true;
    bgVideo.defaultMuted = true;
    bgVideo.playsInline = true;
    bgVideo.loop = true;

    const forcePlayVideo = () => {
      if (!bgVideo) return;
      bgVideo.muted = true;
      const playPromise = bgVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          bgVideo.muted = true;
          setTimeout(() => {
            bgVideo.play().catch(() => {});
          }, 100);
        });
      }
    };

    bgVideo.load();
    forcePlayVideo();

    bgVideo.addEventListener('loadedmetadata', forcePlayVideo, { passive: true });
    bgVideo.addEventListener('canplay', forcePlayVideo, { passive: true });
    bgVideo.addEventListener('pause', forcePlayVideo, { passive: true });
    bgVideo.addEventListener('ended', () => {
      bgVideo.currentTime = 0;
      forcePlayVideo();
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        forcePlayVideo();
      }
    }, { passive: true });

    const unlockAutoplay = () => {
      forcePlayVideo();
    };
    window.addEventListener('pointerdown', unlockAutoplay, { passive: true, once: true });
    window.addEventListener('touchstart', unlockAutoplay, { passive: true, once: true });
  }

  // ----------------------------------------------------
  // 1. Mobile Menu Interactivity
  // ----------------------------------------------------
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  const openMobileMenu = () => {
    if (!burgerBtn || !mobileMenu || !mobileOverlay) return;
    burgerBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.removeAttribute('hidden');
    mobileOverlay.removeAttribute('hidden');
    document.body.classList.add('menu-open');
  };

  const closeMobileMenu = () => {
    if (!burgerBtn || !mobileMenu || !mobileOverlay) return;
    burgerBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('hidden', '');
    mobileOverlay.setAttribute('hidden', '');
    document.body.classList.remove('menu-open');
  };

  const toggleMobileMenu = () => {
    const isExpanded = burgerBtn?.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  if (burgerBtn) {
    burgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // ----------------------------------------------------
  // 2. Modals & Deep-Link Route Management
  // ----------------------------------------------------
  const allModals = document.querySelectorAll('.modal-backdrop');
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  const updateNavActive = (pathOrAction) => {
    allNavLinks.forEach((link) => {
      const linkPath = link.getAttribute('data-path');
      const action = link.getAttribute('data-action');
      if (linkPath === pathOrAction || (pathOrAction === '/' && action === 'home')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  const openModal = (modalId, shouldPushHistory = true) => {
    closeMobileMenu();
    allModals.forEach((m) => {
      if (m.id !== modalId) {
        m.setAttribute('hidden', '');
      }
    });

    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.removeAttribute('hidden');
      document.body.classList.add('menu-open');

      const path = modalToPath[modalId] || '/';
      const routeInfo = routeMap[path];

      if (routeInfo) {
        applyRouteMeta(path, routeInfo);
        updateNavActive(path);
      }

      if (shouldPushHistory && window.history && window.history.pushState) {
        if (window.location.pathname !== path) {
          window.history.pushState({ modalId, path }, routeInfo?.title || defaultTitle, path);
        }
      }
    }
  };

  const closeAllModals = (shouldPushHistory = true) => {
    allModals.forEach((modal) => {
      modal.setAttribute('hidden', '');
    });
    document.body.classList.remove('menu-open');
    applyRouteMeta('/', null);
    updateNavActive('/');

    if (shouldPushHistory && window.history && window.history.pushState) {
      if (window.location.pathname !== '/' && window.location.pathname !== '') {
        window.history.pushState({ modalId: null, path: '/' }, defaultTitle, '/');
      }
    }
  };

  // Bind modal trigger buttons
  const modalTriggers = document.querySelectorAll('[data-modal]');
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal');
      if (modalId) {
        openModal(modalId, true);
      }
    });
  });

  // Modal close buttons
  const closeBtns = document.querySelectorAll('.modal-close-btn');
  closeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeAllModals(true);
    });
  });

  // Click outside modal panel to close
  allModals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeAllModals(true);
      }
    });
  });

  // Escape key closes modals and mobile menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals(true);
      closeMobileMenu();
    }
  });

  // Overview / Home buttons
  const homeLinks = document.querySelectorAll('[data-action="home"]');
  homeLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeAllModals(true);
    });
  });

  // Handle browser Back / Forward buttons
  window.addEventListener('popstate', (e) => {
    const currentPath = window.location.pathname;
    const route = routeMap[currentPath];
    if (route) {
      openModal(route.modalId, false);
    } else {
      closeAllModals(false);
    }
  });

  // Initial deep-link check on load
  const initialPath = window.location.pathname;
  let handledRoute = false;

  if (routeMap[initialPath]) {
    openModal(routeMap[initialPath].modalId, false);
    handledRoute = true;
  } else if (window.location.hash) {
    const rawHash = window.location.hash.replace('#', '').replace('/', '');
    const mappedByHash = Object.entries(routeMap).find(([p, r]) => p.replace('/', '') === rawHash || r.modalId === rawHash);
    if (mappedByHash) {
      openModal(mappedByHash[1].modalId, false);
      handledRoute = true;
    }
  }

  // If loaded with unrecognized hashes or parameters (e.g. dev iframe #cases or ?appParams=cases),
  // cleanly normalize the browser address bar to '/' for crucible.smshahbaj.com
  if (!handledRoute && (window.location.hash || window.location.search || (initialPath !== '/' && initialPath !== ''))) {
    if (window.history && window.history.replaceState) {
      window.history.replaceState({ modalId: null, path: '/' }, defaultTitle, '/');
    }
  }

  // ----------------------------------------------------
  // 3. Copy to Clipboard Functionality
  // ----------------------------------------------------
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }

        const originalHtml = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Copied!</span>';

        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalHtml;
        }, 2200);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    });
  });

  // ----------------------------------------------------
  // 4. Cursor-Interactive Atmospheric Purple Smoke Simulation
  // ----------------------------------------------------
  const initSmokeSimulation = () => {
    const canvas = document.getElementById('smokeCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      canvas.style.display = 'none';
      return;
    }

    const isMobile = window.innerWidth <= 760 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const maxParticles = isMobile ? 40 : 120;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      // Reset the transform on every resize; otherwise DPR scaling accumulates
      // after orientation/viewport changes on mobile browsers.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    class SmokeParticle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + Math.random() * 40;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = -(0.3 + Math.random() * 0.55);
        this.baseRadius = 45 + Math.random() * 85;
        this.radius = this.baseRadius;
        this.maxLife = 180 + Math.random() * 160;
        this.life = init ? Math.random() * this.maxLife : 0;
        this.alpha = 0;
        this.maxAlpha = 0.05 + Math.random() * 0.08;
        this.colorType = Math.random() > 0.4 ? 'purple' : 'deepViolet';
        this.active = true;
      }

      spawnAt(x, y, power = 1) {
        this.x = x + (Math.random() - 0.5) * 20;
        this.y = y + (Math.random() - 0.5) * 20;
        this.vx = (Math.random() - 0.5) * 1.2 * power;
        this.vy = -(0.5 + Math.random() * 1.0 * power);
        this.baseRadius = 35 + Math.random() * 55;
        this.radius = this.baseRadius;
        this.maxLife = 120 + Math.random() * 120;
        this.life = 0;
        this.maxAlpha = 0.12 + Math.random() * 0.1;
        this.colorType = Math.random() > 0.3 ? 'purple' : 'ambient';
        this.active = true;
      }

      update() {
        if (!this.active) return;

        this.life++;
        if (this.life >= this.maxLife) {
          this.reset(false);
          return;
        }

        const progress = this.life / this.maxLife;

        if (progress < 0.25) {
          this.alpha = (progress / 0.25) * this.maxAlpha;
        } else if (progress > 0.65) {
          this.alpha = ((1 - progress) / 0.35) * this.maxAlpha;
        } else {
          this.alpha = this.maxAlpha;
        }

        this.radius = this.baseRadius * (1 + progress * 0.85);
        this.x += this.vx;
        this.y += this.vy;
        this.vx += (Math.random() - 0.5) * 0.03;
      }

      draw(context) {
        if (!this.active || this.alpha <= 0.001) return;

        const rad = Math.max(this.radius, 1);
        const grad = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, rad);

        if (this.colorType === 'purple') {
          grad.addColorStop(0, `rgba(168, 85, 247, ${this.alpha * 0.9})`);
          grad.addColorStop(0.4, `rgba(147, 51, 234, ${this.alpha * 0.5})`);
          grad.addColorStop(1, 'rgba(88, 28, 135, 0)');
        } else if (this.colorType === 'deepViolet') {
          grad.addColorStop(0, `rgba(192, 132, 252, ${this.alpha * 0.75})`);
          grad.addColorStop(0.5, `rgba(126, 34, 206, ${this.alpha * 0.35})`);
          grad.addColorStop(1, 'rgba(30, 27, 75, 0)');
        } else {
          grad.addColorStop(0, `rgba(216, 180, 254, ${this.alpha * 0.8})`);
          grad.addColorStop(0.6, `rgba(147, 51, 234, ${this.alpha * 0.4})`);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }

        context.save();
        context.fillStyle = grad;
        context.beginPath();
        context.arc(this.x, this.y, rad, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }

    const particles = [];
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new SmokeParticle());
    }

    let lastPointerTime = 0;
    const spawnInteractiveSmoke = (x, y, count = 2) => {
      const now = performance.now();
      if (now - lastPointerTime < 24) return;
      lastPointerTime = now;

      let spawned = 0;
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].life / particles[i].maxLife > 0.65 || !particles[i].active) {
          particles[i].spawnAt(x, y, 1);
          spawned++;
          if (spawned >= count) break;
        }
      }
    };

    window.addEventListener('pointermove', (e) => {
      spawnInteractiveSmoke(e.clientX, e.clientY, 2);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        spawnInteractiveSmoke(e.touches[0].clientX, e.touches[0].clientY, 2);
      }
    }, { passive: true });

    let animationFrameId = null;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.active) {
          p.update();
          p.draw(ctx);
        }
      }

      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    prefersReducedMotion.addEventListener('change', (e) => {
      if (e.matches) {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        ctx.clearRect(0, 0, width, height);
        canvas.style.display = 'none';
      } else {
        canvas.style.display = 'block';
        resizeCanvas();
        animationFrameId = requestAnimationFrame(render);
      }
    });
  };

  initSmokeSimulation();

  // ----------------------------------------------------
  // 5. Stats Count-up Animations
  // ----------------------------------------------------
  const statElements = document.querySelectorAll('.stat-value');
  let hasAnimatedStats = false;

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const animateValue = (el, target, decimals, suffix, duration, delay) => {
    setTimeout(() => {
      let startTime = null;

      const step = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const currentVal = easedProgress * target;

        el.textContent = currentVal.toFixed(decimals) + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toFixed(decimals) + suffix;
        }
      };

      requestAnimationFrame(step);
    }, delay);
  };

  const startStatsAnimation = () => {
    if (hasAnimatedStats) return;
    hasAnimatedStats = true;

    statElements.forEach((el, index) => {
      const target = parseFloat(el.getAttribute('data-target') || '0');
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);

      const duration = 1200 + index * 100;
      const startOffset = 300 + index * 80;

      animateValue(el, target, decimals, suffix, duration, startOffset);
    });
  };

  const statsFooter = document.querySelector('.stats-footer');
  if (statsFooter && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startStatsAnimation();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(statsFooter);
  } else {
    startStatsAnimation();
  }
});
