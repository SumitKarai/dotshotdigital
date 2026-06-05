document.addEventListener('DOMContentLoaded', () => {
    // Active Link Highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const normalizedPath = currentPath.replace(/\/$/, '') || '/';
        const normalizedHref = href.replace('.html', '').replace(/\/?index$/, '/').replace(/\/$/, '') || '/';
        
        if (normalizedPath === normalizedHref || (normalizedPath === '/' && normalizedHref === '/')) {
            link.classList.add('active');
        } else if (normalizedHref !== '/' && normalizedPath.endsWith(normalizedHref)) {
            link.classList.add('active');
        }
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'var(--header-bg)';
            header.style.boxShadow = 'var(--shadow)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    // Mobile Menu Toggle
 
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuBtn.innerHTML = navMenu.classList.contains("active") ? "✕" : "☰";
    });

    // Close menu on link click (mobile)
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuBtn.innerHTML = "☰";
        });
    });



    // Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    const speed = 500; // Increased from 200 to slow down the animation

    const startCounter = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const updateCount = () => {
                    const targetNum = +target.getAttribute('data-target');
                    const count = +target.innerText;
                    const inc = targetNum / speed;

                    if (count < targetNum) {
                        target.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 1);
                    } else {
                        target.innerText = targetNum + '+';
                    }
                };
                updateCount();
                observer.unobserve(target);
            }
        });
    };

    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver(startCounter, observerOptions);
    stats.forEach(stat => counterObserver.observe(stat));


    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterBtns.length > 0 && projectItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        // Small delay to allow display:block to apply before opacity transition
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.display = 'none';
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                    }
                });
            });
        });
    }


    // ══════════════════════════════════════════
    //   ANIMATION ENGINE
    // ══════════════════════════════════════════

    // 1. Page Loader — dismiss after page loads
    const loader = document.getElementById('page-loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => loader.classList.add('loaded'), 300);
        });
        // Fallback: dismiss after 2s even if load event is slow
        setTimeout(() => loader && loader.classList.add('loaded'), 2000);
    }

    // 2. Scroll Progress Bar
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const pct = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
            progressBar.style.width = pct + '%';
        }, { passive: true });
    }

    // 3. Cursor Glow (desktop only)
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top  = e.clientY + 'px';
            cursorGlow.style.opacity = '1';
        }, { passive: true });
        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
    }

    // 4. Scroll Reveal — Intersection Observer
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => revealObserver.observe(el));
    }

    // 5. Section header underline reveal
    const sectionHeaders = document.querySelectorAll('.section-header');
    if (sectionHeaders.length) {
        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    headerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        sectionHeaders.forEach(h => headerObserver.observe(h));
    }

    // 6. Button Ripple Effect
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width  = ripple.style.height = size + 'px';
            ripple.style.left   = (e.clientX - rect.left  - size / 2) + 'px';
            ripple.style.top    = (e.clientY - rect.top   - size / 2) + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        });
    });
});
