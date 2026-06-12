/* ============================================================
   P. David Gauvreau — The Gauvreau Gazette
   Interactions: nav, scrollspy, reveals, ticker, classifieds
   ============================================================ */
(() => {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Navigation ---------- */
    const nav = document.getElementById('nav');
    const navToggle = nav.querySelector('.nav-toggle');
    const navLinks = [...nav.querySelectorAll('.nav-links a[href^="#"]')];

    navToggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(open));
    });

    navLinks.forEach(a => a.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    }));

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });

    /* ---------- Scrollspy ---------- */
    const spyTargets = [...document.querySelectorAll('header[id], section[id]')];
    const spy = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(a =>
                a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
        });
    }, { rootMargin: '-40% 0px -55% 0px' });
    spyTargets.forEach(s => spy.observe(s));

    /* ---------- Scroll progress bar ---------- */
    const progress = document.getElementById('scroll-progress');
    const updateProgress = () => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();

    /* ---------- Reveal-on-scroll with stagger ---------- */
    const revealEls = [...document.querySelectorAll('.reveal')];
    revealEls.forEach(el => {
        const parent = el.parentElement;
        if (!parent) return;
        const siblings = [...parent.children].filter(c => c.classList.contains('reveal'));
        const idx = siblings.indexOf(el);
        if (idx > 0) el.style.transitionDelay = (idx * 90) + 'ms';
    });

    if (reduceMotion) {
        revealEls.forEach(el => el.classList.add('in'));
    } else {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('in');
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        revealEls.forEach(el => revealObserver.observe(el));
    }

    /* ---------- Parallax scrolling ---------- */
    const parallaxEls = [...document.querySelectorAll('[data-speed]')];
    const heroLayers = [...document.querySelectorAll('[data-speed-top]')];
    const panImgs = [...document.querySelectorAll('.img-clip img')];
    const heroSection = document.querySelector('.front-page');
    const heroContainer = heroSection ? heroSection.querySelector('.container') : null;

    if (!reduceMotion && (parallaxEls.length || heroLayers.length || panImgs.length)) {
        /* offsetTop chain ignores transforms, so re-measuring stays stable */
        const docTop = el => {
            let y = 0;
            while (el) { y += el.offsetTop; el = el.offsetParent; }
            return y;
        };

        let metrics = [];
        const measure = () => {
            metrics = parallaxEls.map(el => ({
                el,
                speed: parseFloat(el.dataset.speed) || 0.15,
                mid: docTop(el) + el.offsetHeight / 2
            }));
        };

        const applyParallax = () => {
            const y = window.scrollY;
            const vh = window.innerHeight;
            const viewMid = y + vh / 2;

            /* ghost letters drift relative to viewport center */
            metrics.forEach(m => {
                const off = (viewMid - m.mid) * m.speed;
                m.el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
            });

            /* front-page layers recede at their own speeds and fade out */
            heroLayers.forEach(el => {
                const speed = parseFloat(el.dataset.speedTop) || 0.15;
                el.style.transform = `translate3d(0, ${(y * speed).toFixed(1)}px, 0)`;
            });
            if (heroContainer && heroSection) {
                const fade = 1 - y / (heroSection.offsetHeight * 0.9);
                heroContainer.style.opacity = Math.max(0, Math.min(1, fade)).toFixed(3);
            }

            /* photos pan inside their print frames */
            panImgs.forEach(img => {
                const r = img.parentElement.getBoundingClientRect();
                const raw = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
                const p = Math.max(-1, Math.min(1, raw));
                img.style.transform = `translate3d(0, ${((p - 1) * 7.5).toFixed(2)}%, 0)`;
            });
        };

        let queued = false;
        window.addEventListener('scroll', () => {
            if (!queued) {
                queued = true;
                requestAnimationFrame(() => { applyParallax(); queued = false; });
            }
        }, { passive: true });
        window.addEventListener('resize', () => { measure(); applyParallax(); });
        window.addEventListener('load', () => { measure(); applyParallax(); });
        measure();
        applyParallax();
    }

    /* ---------- Ticker: duplicate content for a seamless loop ---------- */
    const tickerTrack = document.querySelector('.ticker-track');
    if (tickerTrack) tickerTrack.innerHTML += tickerTrack.innerHTML;

    /* ---------- Classifieds easter eggs ---------- */
    const serveVolleyball = () => {
        const ball = document.createElement('div');
        ball.className = 'vb-flight';
        ball.textContent = '🏐';
        document.body.appendChild(ball);
        ball.addEventListener('animationend', () => ball.remove());
    };

    document.querySelectorAll('.classified').forEach(item => {
        item.addEventListener('click', () => {
            if (item.dataset.egg === 'volleyball') {
                serveVolleyball();
                return;
            }
            item.classList.remove('pop');
            void item.offsetWidth; /* restart animation */
            item.classList.add('pop');
        });
    });
})();
