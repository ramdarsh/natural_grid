document.addEventListener('DOMContentLoaded', () => {
    /* ── PRELOADER ──────────────────────────────── */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 1000);
        });
    }

    /* ── CUSTOM CURSOR ───────────────────────────── */
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    if (dot && ring) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
            requestAnimationFrame(animateRing);
        };
        animateRing();

        document.querySelectorAll('a, button, select, input, textarea').forEach(el => {
            el.addEventListener('mouseenter', () => {
                ring.style.width = '60px';
                ring.style.height = '60px';
                ring.style.borderWidth = '2px';
                ring.style.background = 'rgba(196, 149, 106, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                ring.style.width = '40px';
                ring.style.height = '40px';
                ring.style.borderWidth = '1px';
                ring.style.background = 'transparent';
            });
        });
    }

    /* ── NAVBAR AUTO-HIDE ─────────────────────────── */
    let lastScroll = 0;
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            if (currentScroll > lastScroll && currentScroll > 200) {
                header.classList.add('nav-hidden');
            } else {
                header.classList.remove('nav-hidden');
            }
            lastScroll = currentScroll;
        });
    }

    /* ── MOBILE MENU ────────────────────────────── */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    /* ── PARTICLES & PARALLAX ────────────────────── */
    const particleContainer = document.getElementById('particles-js');
    if (particleContainer) {
        const createParticle = () => {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 3 + 1;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.position = 'absolute';
            p.style.background = 'var(--copper)';
            p.style.borderRadius = '50%';
            p.style.opacity = Math.random() * 0.5;
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = '100%';
            p.style.pointerEvents = 'none';
            particleContainer.appendChild(p);

            const duration = Math.random() * 3000 + 4000;
            const animation = p.animate([
                { top: '100%', opacity: p.style.opacity },
                { top: '-10%', opacity: 0 }
            ], { duration: duration, easing: 'linear' });

            animation.onfinish = () => p.remove();
        };
        setInterval(createParticle, 150);
    }

    const heroParallax = document.querySelector('.hero-parallax');
    if (heroParallax) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                heroParallax.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
        });
    }

    /* ── COUNTER ANIMATION ────────────────────────── */
    const animateCounter = (el) => {
        const targetText = el.innerText.trim();
        const targetValue = parseFloat(targetText.replace(/[^-0-9.]/g, ''));
        if (isNaN(targetValue)) return;

        const prefix = targetText.match(/^[^-0-9.]+/)?.[0] || '';
        const suffix = targetText.match(/[^-0-9.]+$/)?.[0] || '';
        let current = 0;
        const duration = 2000;
        const start = performance.now();

        const update = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            current = progress * targetValue;
            el.innerHTML = `${prefix}${Math.floor(current).toLocaleString()}${suffix}`;
            if (progress < 1) requestAnimationFrame(update);
            else el.innerHTML = targetText;
        };
        requestAnimationFrame(update);
    };

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
                entry.target.querySelectorAll('.energy-fill').forEach(fill => {
                    const row = fill.parentElement.previousElementSibling;
                    if (row) {
                        const valEl = row.querySelector('.val');
                        if (valEl) {
                            fill.style.width = valEl.innerText;
                        }
                    }
                });
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.stat-card').forEach(card => statObserver.observe(card));

    /* ── SCROLL REVEAL ─────────────────────────────── */
    const revealEls = document.querySelectorAll('.fade-up');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), i * 80);
                revealObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => revealObserver.observe(el));
});
