// Modern Tech Effects
class TechEffects {
    constructor() {
        this.init();
    }

    init() {
        this.createParticleBackground();
        this.addTypingEffect();
        this.addGlitchEffect();
        this.addMatrixRain();
        this.addHoverEffects();
    }

    // Graph-themed particle system
    createGraphParticleSystem() {
        const canvas = document.createElement('canvas');
        canvas.id = 'graph-particle-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        canvas.style.opacity = '0.3';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const maxParticles = 50;
        const connectionDistance = 150;

        class GraphParticle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 3 + 1;
                this.opacity = Math.random() * 0.5 + 0.3;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Keep particles in bounds
                this.x = Math.max(0, Math.min(canvas.width, this.x));
                this.y = Math.max(0, Math.min(canvas.height, this.y));
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = '#00d4ff';
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#00d4ff';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        for (let i = 0; i < maxParticles; i++) {
            particles.push(new GraphParticle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = (1 - distance / connectionDistance) * 0.3;
                        ctx.save();
                        ctx.globalAlpha = opacity;
                        ctx.strokeStyle = '#00d4ff';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }

            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    createParticleBackground() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.3';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = '#00d4ff';
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#00d4ff';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.save();
                        ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                        ctx.strokeStyle = '#00d4ff';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                        ctx.restore();
                    }
                });
            });

            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    addTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            heroTitle.style.borderRight = '2px solid #00d4ff';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    setTimeout(() => {
                        heroTitle.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }

    addGlitchEffect() {
        const glitchElements = document.querySelectorAll('.nav-brand h1, .section-title');
        
        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animation = 'glitch 0.3s ease-in-out';
                setTimeout(() => {
                    element.style.animation = '';
                }, 300);
            });
        });

        // Add glitch keyframes to CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes glitch {
                0% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                100% { transform: translate(0); }
            }
        `;
        document.head.appendChild(style);
    }

    addMatrixRain() {
        const matrixContainer = document.createElement('div');
        matrixContainer.className = 'matrix-rain';
        matrixContainer.style.position = 'fixed';
        matrixContainer.style.top = '0';
        matrixContainer.style.left = '0';
        matrixContainer.style.width = '100%';
        matrixContainer.style.height = '100%';
        matrixContainer.style.pointerEvents = 'none';
        matrixContainer.style.zIndex = '-2';
        matrixContainer.style.overflow = 'hidden';
        document.body.appendChild(matrixContainer);

        for (let i = 0; i < 20; i++) {
            const drop = document.createElement('div');
            drop.textContent = Math.random() > 0.5 ? '1' : '0';
            drop.style.position = 'absolute';
            drop.style.color = '#00ff88';
            drop.style.fontSize = '14px';
            drop.style.fontFamily = 'monospace';
            drop.style.opacity = '0.3';
            drop.style.left = Math.random() * 100 + '%';
            drop.style.animationDuration = (Math.random() * 3 + 2) + 's';
            drop.style.animationName = 'matrix-fall';
            drop.style.animationIterationCount = 'infinite';
            drop.style.animationTimingFunction = 'linear';
            matrixContainer.appendChild(drop);
        }

        const matrixStyle = document.createElement('style');
        matrixStyle.textContent = `
            @keyframes matrix-fall {
                0% { transform: translateY(-100vh); opacity: 0; }
                10% { opacity: 0.3; }
                90% { opacity: 0.3; }
                100% { transform: translateY(100vh); opacity: 0; }
            }
        `;
        document.head.appendChild(matrixStyle);
    }

    addHoverEffects() {
        const cards = document.querySelectorAll('.project-card, .playlist-card, .contact-link');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.boxShadow = 'var(--neon-glow)';
                card.style.border = '1px solid var(--primary-color)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.boxShadow = 'var(--shadow-medium)';
                card.style.border = '1px solid var(--border-color)';
            });
        });
    }
}
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const navLinks = document.querySelectorAll('.nav-link');

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.updateThemeIcon();
        
        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Mobile Navigation
class MobileNav {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        hamburger.addEventListener('click', () => {
            this.toggle();
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isOpen) {
                    this.close();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                this.close();
            }
        });
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        navMenu.classList.add('active');
        hamburger.classList.add('active');
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
    }

    close() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        this.isOpen = false;
        document.body.style.overflow = '';
    }
}

// Project Filter System
class ProjectFilter {
    constructor() {
        this.activeFilter = 'all';
        this.init();
    }

    init() {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                this.setActiveFilter(category);
                this.filterProjects(category);
            });
        });

        // Initialize with fade-in animation
        this.animateProjectsOnLoad();
    }

    setActiveFilter(category) {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        const activeButton = document.querySelector(`[data-category="${category}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        this.activeFilter = category;
    }

    filterProjects(category) {
        projectCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = category === 'all' || cardCategory === category;
            
            if (shouldShow) {
                card.classList.remove('hidden');
                // Add staggered animation
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, index * 100);
            } else {
                card.classList.add('hidden');
                card.classList.remove('fade-in');
            }
        });
    }

    animateProjectsOnLoad() {
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 100);
        });
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Handle navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Scroll Effects
class ScrollEffects {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.handleHeaderScroll();
            this.handleScrollAnimations();
        });
    }

    handleHeaderScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            this.header.style.background = this.getCurrentTheme() === 'dark' 
                ? 'rgba(17, 24, 39, 0.98)' 
                : 'rgba(255, 255, 255, 0.98)';
            this.header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            this.header.style.background = this.getCurrentTheme() === 'dark' 
                ? 'rgba(17, 24, 39, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
            this.header.style.boxShadow = 'none';
        }
    }

    handleScrollAnimations() {
        const elements = document.querySelectorAll('.project-card, .playlist-card, .contact-link');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in');
            }
        });
    }

    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images when they come into view
        this.setupLazyLoading();
        
        // Debounce scroll events
        this.setupScrollDebounce();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    setupScrollDebounce() {
        let ticking = false;
        
        const scrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll handling code here
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', scrollHandler, { passive: true });
    }
}

// Analytics and Tracking
class Analytics {
    constructor() {
        this.init();
    }

    init() {
        this.trackProjectClicks();
        this.trackFilterUsage();
        this.trackThemeChanges();
    }

    trackProjectClicks() {
        const projectLinks = document.querySelectorAll('.project-link');
        
        projectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const projectTitle = e.target.closest('.project-card').querySelector('.project-title').textContent;
                console.log(`Project clicked: ${projectTitle}`);
                // Here you could send data to analytics service
            });
        });
    }

    trackFilterUsage() {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                console.log(`Filter used: ${category}`);
                // Here you could send data to analytics service
            });
        });
    }

    trackThemeChanges() {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            console.log(`Theme changed to: ${currentTheme}`);
            // Here you could send data to analytics service
        });
    }
}

// Accessibility Enhancements
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupAriaLabels();
    }

    setupKeyboardNavigation() {
        // Handle Escape key to close mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const mobileNav = new MobileNav();
                if (mobileNav.isOpen) {
                    mobileNav.close();
                }
            }
        });

        // Handle Enter and Space for filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
    }

    setupFocusManagement() {
        // Ensure focus is visible
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    setupAriaLabels() {
        // Add aria-labels where needed
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        
        filterButtons.forEach(button => {
            const category = button.getAttribute('data-category');
            button.setAttribute('aria-label', `Filter projects by ${category}`);
        });
    }
}

// Error Handling
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
            // Here you could send error data to monitoring service
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            // Here you could send error data to monitoring service
        });
    }
}

// Collapsible functionality
function initCollapsibles() {
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    
    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other collapsibles
            document.querySelectorAll('.collapsible-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current collapsible
            item.classList.toggle('active', !isActive);
        });
    });
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Core functionality
        new ThemeManager();
        new MobileNav();
        new ProjectFilter();
        new SmoothScroll();
        new ScrollEffects();
        
        // Enhancements
        new PerformanceOptimizer();
        new Analytics();
        new AccessibilityEnhancer();
        new ErrorHandler();
        
        // Initialize tech effects
        const techEffects = new TechEffects();
        techEffects.createGraphParticleSystem();
        
        // Initialize collapsibles
        initCollapsibles();
        
        console.log('Portfolio website initialized successfully!');
    } catch (error) {
        console.error('Error initializing portfolio website:', error);
    }
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}