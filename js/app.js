/**
 * Jaume Tur Portfolio — Core Interactive Application
 * - i18n Multi-language system (ES / EN)
 * - Light / Dark Theme system with localStorage and prefers-color-scheme
 * - Responsive navigation and mobile drawer
 * - Project filtering
 * - Animated data metrics and telemetry
 * - Form validation and contact actions
 */

(function () {
  'use strict';

  // State Management
  const STORAGE_KEYS = {
    THEME: 'jt_portfolio_theme',
    LANG: 'jt_portfolio_lang'
  };

  let currentLang = 'es';
  let currentTheme = 'light';

  // DOM Elements
  const html = document.documentElement;
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const langToggleEs = document.getElementById('lang-es');
  const langToggleVa = document.getElementById('lang-va');
  const langToggleEn = document.getElementById('lang-en');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const backToTopBtn = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contact-form');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // =========================================================================
  // Theme Management (Light / Dark)
  // =========================================================================
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme === 'dark' || savedTheme === 'light') {
      currentTheme = savedTheme;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      currentTheme = prefersDark ? 'dark' : 'light';
    }
    applyTheme(currentTheme, false);

    // Listen for OS theme changes if user has no saved preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEYS.THEME)) {
        applyTheme(e.matches ? 'dark' : 'light', true);
      }
    });
  }

  function applyTheme(theme, save = true) {
    currentTheme = theme;
    if (save) {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    }

    if (theme === 'dark') {
      body.classList.add('theme-night');
      body.classList.remove('theme-day');
      if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', 'true');
        themeToggle.setAttribute('title', translations[currentLang]?.nav?.themeLight || 'Cambiar a modo día');
      }
    } else {
      body.classList.add('theme-day');
      body.classList.remove('theme-night');
      if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', 'false');
        themeToggle.setAttribute('title', translations[currentLang]?.nav?.themeDark || 'Cambiar a modo noche');
      }
    }

    // Notify 3D canvas if available
    if (window.portfolio3D && typeof window.portfolio3D.setTheme === 'function') {
      window.portfolio3D.setTheme(theme);
    }
  }

  function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme, true);
  }

  // =========================================================================
  // Internationalization (i18n)
  // =========================================================================
  function initLanguage() {
    const savedLang = localStorage.getItem(STORAGE_KEYS.LANG);
    if (savedLang === 'en' || savedLang === 'es' || savedLang === 'va') {
      currentLang = savedLang;
    } else {
      const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
      if (browserLang.startsWith('ca') || browserLang.startsWith('va')) {
        currentLang = 'va';
      } else if (browserLang.startsWith('en')) {
        currentLang = 'en';
      } else {
        currentLang = 'es';
      }
    }
    applyLanguage(currentLang, false);
  }

  function getNestedTranslation(obj, path) {
    return path.split('.').reduce((prev, curr) => (prev ? prev[curr] : null), obj);
  }

  function applyLanguage(lang, save = true) {
    if (!translations[lang]) return;
    currentLang = lang;
    if (save) {
      localStorage.setItem(STORAGE_KEYS.LANG, lang);
    }

    html.setAttribute('lang', lang);

    // Update active state on language segmented controls
    const langBtns = [
      { el: langToggleEs, code: 'es' },
      { el: langToggleVa, code: 'va' },
      { el: langToggleEn, code: 'en' }
    ];
    langBtns.forEach(({ el, code }) => {
      if (el) {
        const isActive = lang === code;
        el.classList.toggle('active', isActive);
        el.setAttribute('aria-pressed', String(isActive));
      }
    });

    // Update SEO meta title and description
    const metaTrans = translations[lang].meta;
    if (metaTrans) {
      document.title = metaTrans.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', metaTrans.description);
    }

    // Update all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const text = getNestedTranslation(translations[lang], key);
      if (text !== null && text !== undefined) {
        if (el.hasAttribute('data-i18n-html')) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });

    // Update placeholder attributes
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = getNestedTranslation(translations[lang], key);
      if (text) el.setAttribute('placeholder', text);
    });

    // Update aria-label attributes
    const ariaElements = document.querySelectorAll('[data-i18n-aria]');
    ariaElements.forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      const text = getNestedTranslation(translations[lang], key);
      if (text) el.setAttribute('aria-label', text);
    });

    // Update theme toggle tooltip/title
    if (themeToggle) {
      themeToggle.setAttribute('title', currentTheme === 'dark' ? translations[lang].nav.themeLight : translations[lang].nav.themeDark);
    }
  }

  // =========================================================================
  // Mobile Navigation Drawer
  // =========================================================================
  function toggleMobileMenu(forceClose = false) {
    if (!mobileMenuBtn || !mobileDrawer) return;
    const isExpanded = forceClose ? false : mobileMenuBtn.getAttribute('aria-expanded') !== 'true';

    mobileMenuBtn.setAttribute('aria-expanded', String(isExpanded));
    mobileDrawer.classList.toggle('open', isExpanded);
    body.classList.toggle('nav-open', isExpanded);

    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    if (menuIcon) {
      menuIcon.classList.toggle('active', isExpanded);
    }
  }

  // =========================================================================
  // Project Filtering
  // =========================================================================
  function initProjectFilters() {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // =========================================================================
  // Counter & Telemetry Animations
  // =========================================================================
  function initMetrics() {
    const animateCounter = (el, target, prefix = '', suffix = '', duration = 1200) => {
      let startTime = null;
      const strong = el.querySelector('strong');
      if (!strong) return;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);
        strong.textContent = `${prefix}${current}${suffix}`;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          strong.textContent = `${prefix}${target}${suffix}`;
        }
      };
      requestAnimationFrame(step);
    };

    const metricObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (!el.classList.contains('animated')) {
            el.classList.add('animated');
            const target = parseInt(el.getAttribute('data-counter'), 10);
            const prefix = el.getAttribute('data-prefix') || '';
            const suffix = el.getAttribute('data-suffix') || '';
            const barPercent = el.getAttribute('data-bar') || '100';
            const bar = el.querySelector('.metric-meter-bar');
            if (bar) {
              bar.style.width = `${barPercent}%`;
            }
            if (!isNaN(target)) {
              animateCounter(el, target, prefix, suffix);
            }
          }
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.tech-metric').forEach((el) => {
      metricObserver.observe(el);
    });
  }

  // =========================================================================
  // Scroll Reveal Animations
  // =========================================================================
  function initScrollReveal() {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => {
      revealObserver.observe(el);
    });
  }

  // =========================================================================
  // Back to Top & Active Nav Indicators
  // =========================================================================
  function initScrollListeners() {
    let scrollTimeout;
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;

      // Back to top button
      if (backToTopBtn) {
        if (scrollY > 350) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }

      // Active nav link highlight
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
              navLinks.forEach((link) => {
                const href = link.getAttribute('href');
                if (href === `#${id}`) {
                  link.classList.add('active');
                  link.setAttribute('aria-current', 'page');
                } else {
                  link.classList.remove('active');
                  link.removeAttribute('aria-current');
                }
              });
            }
          });
          scrollTimeout = null;
        }, 50);
      }
    }, { passive: true });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // =========================================================================
  // Interactive Contact Actions & Form
  // =========================================================================
  function initContact() {
    // Copy email to clipboard
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', () => {
        const email = copyEmailBtn.getAttribute('data-email') || 'jautursis@alu.edu.gva.es';
        navigator.clipboard.writeText(email).then(() => {
          const tooltip = copyEmailBtn.querySelector('.copy-tooltip');
          const originalText = tooltip ? tooltip.textContent : '';
          if (tooltip) {
            tooltip.textContent = translations[currentLang]?.contact?.emailCopied || '¡Copiado!';
            tooltip.classList.add('active');
            setTimeout(() => {
              tooltip.textContent = translations[currentLang]?.contact?.emailCopy || originalText;
              tooltip.classList.remove('active');
            }, 2500);
          }
        }).catch(() => {
          window.location.href = `mailto:${email}`;
        });
      });
    }

    // Contact form validation & email submission
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const msgInput = document.getElementById('form-message');
        const feedbackEl = document.getElementById('form-feedback');

        if (!nameInput.value.trim() || !emailInput.value.trim() || !msgInput.value.trim() || !emailInput.checkValidity()) {
          if (feedbackEl) {
            feedbackEl.className = 'form-feedback error';
            feedbackEl.textContent = translations[currentLang]?.contact?.validationError || 'Por favor completa los campos correctamente.';
          }
          return;
        }

        // Prefill email
        const recipient = 'jautursis@alu.edu.gva.es';
        const subject = encodeURIComponent(`Contacto Portfolio de ${nameInput.value.trim()}`);
        const bodyText = encodeURIComponent(`Hola Jaume,\n\n${msgInput.value.trim()}\n\n--\nDe: ${nameInput.value.trim()} (${emailInput.value.trim()})`);

        if (feedbackEl) {
          feedbackEl.className = 'form-feedback success';
          feedbackEl.textContent = translations[currentLang]?.contact?.successMsg || 'Abriendo cliente de correo...';
        }

        setTimeout(() => {
          window.location.href = `mailto:${recipient}?subject=${subject}&body=${bodyText}`;
        }, 300);
      });
    }
  }

  // =========================================================================
  // Initialization
  // =========================================================================
  function init() {
    initTheme();
    initLanguage();
    initProjectFilters();
    initMetrics();
    initScrollReveal();
    initScrollListeners();
    initContact();

    // Theme Toggle Click
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }

    // Language Segmented Control Clicks
    if (langToggleEs) {
      langToggleEs.addEventListener('click', () => applyLanguage('es', true));
    }
    if (langToggleVa) {
      langToggleVa.addEventListener('click', () => applyLanguage('va', true));
    }
    if (langToggleEn) {
      langToggleEn.addEventListener('click', () => applyLanguage('en', true));
    }

    // Mobile Menu Clicks
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());
    }

    // Close mobile drawer when clicking any link
    if (mobileDrawer) {
      mobileDrawer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => toggleMobileMenu(true));
      });
    }

    // Close mobile drawer on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
        toggleMobileMenu(true);
      }
    });

    // Close mobile drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        if (!mobileDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          toggleMobileMenu(true);
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

