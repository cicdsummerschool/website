// Dark mode toggle functionality (simplified since we're always dark)
function initDarkMode() {
    // Keep the theme always dark
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
    
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');

    // Function to toggle theme (optional - can switch between dark themes)
    function toggleTheme() {
        // For now, just keep it dark - could add different dark theme variants
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }

    // Add event listeners if toggle buttons exist
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });

        // Close mobile menu when window is resized to desktop size
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add fade-in animation to elements when they come into view
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    document.querySelectorAll('article, .feature-card, section').forEach(el => {
        observer.observe(el);
    });
}

// Back to top button functionality
function initBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
    `;
    backToTopButton.className = 'fixed bottom-8 right-8 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg opacity-0 transition-all duration-300 z-50';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    
    document.body.appendChild(backToTopButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.transform = 'translateY(0)';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.transform = 'translateY(10px)';
        }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initBackToTop();
});

// Handle external links
document.addEventListener('DOMContentLoaded', () => {
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
});

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    // Skip to main content with Tab
    if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
        const main = document.querySelector('main');
        if (main) {
            main.focus();
        }
    }
});

// Performance optimization: Lazy load images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Add some visual enhancements for dark theme
document.addEventListener('DOMContentLoaded', () => {
    // Add glow effect to buttons on hover
    const buttons = document.querySelectorAll('button, .btn, a[class*="bg-blue"]');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.boxShadow = '';
        });
    });
});