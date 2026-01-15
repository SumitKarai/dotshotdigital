document.addEventListener('DOMContentLoaded', () => {
    // Active Link Highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.endsWith(href) || (currentPath.endsWith('/') && href === 'index.html')) {
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
});
