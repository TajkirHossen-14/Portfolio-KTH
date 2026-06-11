/* ===================================================
   Kazi Tajkir Hossen — Single-Page Portfolio
   Advanced JavaScript: Particles, Scroll Reveal,
   Typing Effect, Parallax Backgrounds, Smooth Nav,
   Cursor Glow, Back-to-Top, Progress Bar
   =================================================== */

(function () {
    'use strict';

    // ─────────────────────────────────────────────
    // 1. SMOOTH SCROLL FOR ANCHOR LINKS
    // ─────────────────────────────────────────────
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.getElementById('nav-toggle');
    const sections = document.querySelectorAll('section[id]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (!target) return;

            const navHeight = document.querySelector('.glass-nav').offsetHeight;
            const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;

            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });

            // Close mobile nav on click
            if (navToggle) navToggle.checked = false;
        });
    });

    // ─────────────────────────────────────────────
    // 2. ACTIVE NAV LINK ON SCROLL (Intersection Observer)
    // ─────────────────────────────────────────────
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -70% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === id);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // ─────────────────────────────────────────────
    // 3. SCROLL PROGRESS BAR
    // ─────────────────────────────────────────────
    const scrollProgress = document.getElementById('scrollProgress');

    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }
    }

    // ─────────────────────────────────────────────
    // 4. NAV BACKGROUND CHANGE + HIDE/SHOW ON SCROLL
    // ─────────────────────────────────────────────
    const mainNav = document.getElementById('mainNav');
    let lastScrollY = 0;
    let ticking = false;

    function handleNavScroll() {
        const currentScroll = window.scrollY;

        // Add darker bg after scrolling down
        if (mainNav) {
            mainNav.classList.toggle('nav-scrolled', currentScroll > 100);

            // Hide nav when scrolling down, show when scrolling up
            if (currentScroll > lastScrollY && currentScroll > 200) {
                mainNav.classList.add('nav-hidden');
            } else {
                mainNav.classList.remove('nav-hidden');
            }
        }

        lastScrollY = currentScroll;
        ticking = false;
    }

    // ─────────────────────────────────────────────
    // 5. SCROLL DOWN INDICATOR
    // ─────────────────────────────────────────────
    const scrollIndicator = document.getElementById('scrollIndicator');

    function updateScrollIndicator() {
        if (scrollIndicator) {
            scrollIndicator.classList.toggle('hidden', window.scrollY > 150);
        }
    }

    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const navHeight = document.querySelector('.glass-nav').offsetHeight;
                window.scrollTo({
                    top: aboutSection.getBoundingClientRect().top + window.scrollY - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ─────────────────────────────────────────────
    // 6. BACK TO TOP BUTTON
    // ─────────────────────────────────────────────
    const backToTop = document.getElementById('backToTop');

    function updateBackToTop() {
        if (backToTop) {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        }
    }

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ─────────────────────────────────────────────
    // 7. PARALLAX SECTION BACKGROUNDS
    // ─────────────────────────────────────────────
    const sectionBgs = document.querySelectorAll('.section-bg');

    const bgObserverOptions = {
        root: null,
        rootMargin: '10% 0px',
        threshold: 0.01
    };

    const bgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('active-bg', entry.isIntersecting);
        });
    }, bgObserverOptions);

    sectionBgs.forEach(bg => bgObserver.observe(bg));

    // ─────────────────────────────────────────────
    // 8. SCROLL REVEAL ANIMATION
    // ─────────────────────────────────────────────
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay || 0, 10);
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ─────────────────────────────────────────────
    // 9. TYPING EFFECT
    // ─────────────────────────────────────────────
    const typingTarget = document.getElementById('typingTarget');
    const typingTexts = [
        'Student  |  Learner  |  Tech Enthusiast',
        'CSE Undergrad  |  AI Passionate',
        'Problem Solver  |  Creative Thinker'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 65;

    function typeText() {
        if (!typingTarget) return;

        const currentText = typingTexts[textIndex];

        if (!isDeleting) {
            typingTarget.innerHTML = currentText.substring(0, charIndex + 1) + '<span class="typing-cursor"></span>';
            charIndex++;

            if (charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else {
                typingSpeed = 55 + Math.random() * 40; // Natural typing speed variation
            }
        } else {
            typingTarget.innerHTML = currentText.substring(0, charIndex - 1) + '<span class="typing-cursor"></span>';
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % typingTexts.length;
                typingSpeed = 400; // Pause before typing next
            } else {
                typingSpeed = 30;
            }
        }

        setTimeout(typeText, typingSpeed);
    }

    // Start typing after initial animations
    setTimeout(typeText, 1500);

    // ─────────────────────────────────────────────
    // 10. INTERACTIVE PARTICLE SYSTEM (Canvas)
    // ─────────────────────────────────────────────
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    let particles = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let animationId;

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * (canvas ? canvas.width : window.innerWidth);
            this.y = Math.random() * (canvas ? canvas.height : window.innerHeight);
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.hue = 220 + Math.random() * 60; // Blue to purple range
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Mouse interaction — gentle push away
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                const force = (120 - dist) / 120;
                this.x -= dx * force * 0.02;
                this.y -= dy * force * 0.02;
            }

            // Wrap around edges
            if (this.x < -10) this.x = canvas.width + 10;
            if (this.x > canvas.width + 10) this.x = -10;
            if (this.y < -10) this.y = canvas.height + 10;
            if (this.y > canvas.height + 10) this.y = -10;
        }

        draw() {
            if (!ctx) return;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 70%, 70%, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        if (!canvas) return;
        resizeCanvas();

        // Responsive particle count
        const area = canvas.width * canvas.height;
        const count = Math.min(Math.floor(area / 12000), 100);
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function drawLines() {
        if (!ctx) return;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 140) {
                    const opacity = (1 - dist / 140) * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(165, 180, 252, ${opacity})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        drawLines();
        animationId = requestAnimationFrame(animateParticles);
    }

    // Track mouse for particle interaction
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
        mouseX = -1000;
        mouseY = -1000;
    });

    // ─────────────────────────────────────────────
    // 11. CURSOR GLOW TRAIL (Desktop only)
    // ─────────────────────────────────────────────
    const cursorGlow = document.getElementById('cursorGlow');

    if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
        let glowX = 0, glowY = 0;
        let currentGlowX = 0, currentGlowY = 0;

        document.addEventListener('mousemove', (e) => {
            glowX = e.clientX;
            glowY = e.clientY;
            cursorGlow.classList.add('active');
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.classList.remove('active');
        });

        function animateGlow() {
            // Smooth easing
            currentGlowX += (glowX - currentGlowX) * 0.08;
            currentGlowY += (glowY - currentGlowY) * 0.08;
            cursorGlow.style.left = currentGlowX + 'px';
            cursorGlow.style.top = currentGlowY + 'px';
            requestAnimationFrame(animateGlow);
        }

        animateGlow();
    }

    // ─────────────────────────────────────────────
    // 12. 3D TILT EFFECT ON GLASS CARDS (Desktop)
    // ─────────────────────────────────────────────
    if (window.matchMedia('(pointer: fine)').matches) {
        const tiltCards = document.querySelectorAll('.glass-card');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -4;
                const rotateY = ((x - centerX) / centerX) * 4;

                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
                card.classList.add('tilt-active');
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.classList.remove('tilt-active');
            });
        });
    }

    // ─────────────────────────────────────────────
    // 13. UNIFIED SCROLL HANDLER (Throttled with rAF)
    // ─────────────────────────────────────────────
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollProgress();
                handleNavScroll();
                updateScrollIndicator();
                updateBackToTop();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // ─────────────────────────────────────────────
    // 14. WINDOW RESIZE HANDLER
    // ─────────────────────────────────────────────
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            resizeCanvas();
            // Re-init particles on significant resize
            if (canvas) {
                const area = canvas.width * canvas.height;
                const idealCount = Math.min(Math.floor(area / 12000), 100);
                if (Math.abs(particles.length - idealCount) > 15) {
                    initParticles();
                }
            }
        }, 250);
    });

    // ─────────────────────────────────────────────
    // 15. INITIALIZE EVERYTHING
    // ─────────────────────────────────────────────
    function init() {
        // Initial state updates
        updateScrollProgress();
        updateScrollIndicator();
        updateBackToTop();

        // Start particle system
        initParticles();
        animateParticles();

        // Activate first section bg
        const firstBg = document.querySelector('.section-bg');
        if (firstBg) firstBg.classList.add('active-bg');
    }

    // Run after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ─────────────────────────────────────────────
    // 16. KEYBOARD ACCESSIBILITY
    // ─────────────────────────────────────────────
    document.addEventListener('keydown', (e) => {
        // Escape closes mobile menu
        if (e.key === 'Escape' && navToggle && navToggle.checked) {
            navToggle.checked = false;
        }
    });

})();
