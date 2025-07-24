// Enhanced Portfolio JavaScript
    class PortfolioApp {
      constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.toggleBtn = document.getElementById('toggle-btn');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.section');
        
        this.initializeApp();
      }

      initializeApp() {
        this.setupSidebarToggle();
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
        this.setupTypingAnimation();
        this.setupIntersectionObserver();
      }

      // Sidebar toggle functionality with improved UX
      setupSidebarToggle() {
        this.toggleBtn.addEventListener('click', () => {
          this.sidebar.classList.toggle('collapsed');
          
          // Update aria-expanded for accessibility
          const isCollapsed = this.sidebar.classList.contains('collapsed');
          this.toggleBtn.setAttribute('aria-expanded', !isCollapsed);
          
          // Store preference in sessionStorage
          sessionStorage.setItem('sidebarCollapsed', isCollapsed);
        });

        // Restore sidebar state from sessionStorage
        const savedState = sessionStorage.getItem('sidebarCollapsed');
        if (savedState === 'false') {
          this.sidebar.classList.remove('collapsed');
        }

        // Handle mobile responsive behavior
        this.handleResponsiveSidebar();
      }

      // Responsive sidebar handling
      handleResponsiveSidebar() {
        const handleResize = () => {
          if (window.innerWidth <= 768) {
            this.sidebar.classList.add('collapsed');
          }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call once on init
      }

      // Enhanced smooth scrolling with offset
      setupSmoothScrolling() {
        this.navLinks.forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
              const offsetTop = targetSection.offsetTop - 100; // Account for any fixed headers
              
              window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
              });

              // Close sidebar on mobile after navigation
              if (window.innerWidth <= 768) {
                this.sidebar.classList.add('collapsed');
              }
            }
          });
        });
      }

      // Active navigation highlighting
      setupActiveNavigation() {
        const observerOptions = {
          root: null,
          rootMargin: '-20% 0px -80% 0px',
          threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              this.updateActiveNavLink(id);
            }
          });
        }, observerOptions);

        this.sections.forEach(section => {
          observer.observe(section);
        });
      }

      updateActiveNavLink(activeId) {
        this.navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          }
        });
      }

      // Enhanced typing animation
      setupTypingAnimation() {
        const textArray = [
          "Data Analyst",
          "Business Intelligence Expert",
          "Data Visualization Specialist",
          "Python Developer",
          "Dashboard Creator"
        ];

        const animatedTextElement = document.getElementById('animated-text');
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const typeAnimation = () => {
          const currentText = textArray[textIndex];
          
          if (isDeleting) {
            animatedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
          } else {
            animatedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
          }

          if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
          } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typingSpeed = 500; // Pause before typing next
          }

          setTimeout(typeAnimation, typingSpeed);
        };

        // Start animation after a brief delay
        setTimeout(typeAnimation, 1000);
      }

      // Intersection Observer for animations
      setupIntersectionObserver() {
        const observerOptions = {
          root: null,
          rootMargin: '0px',
          threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.animationPlayState = 'running';
            }
          });
        }, observerOptions);

        // Observe all sections for animation
        this.sections.forEach(section => {
          observer.observe(section);
        });

        // Observe skill tags for staggered animation
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
          tag.style.animationDelay = `${index * 0.1}s`;
          observer.observe(tag);
        });
      }
    }

    // Performance optimizations
    const setupPerformanceOptimizations = () => {
      // Lazy load images if any are added
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }

      // Debounce scroll events
      let scrollTimeout;
      window.addEventListener('scroll', () => {
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
          // Handle scroll-based animations here if needed
        }, 10);
      }, { passive: true });
    };

    // Initialize the application when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      new PortfolioApp();
      setupPerformanceOptimizations();
      
      // Add focus management for accessibility
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const sidebar = document.getElementById('sidebar');
          if (!sidebar.classList.contains('collapsed')) {
            sidebar.classList.add('collapsed');
          }
        }
      });
    });

    // Handle print styles
    window.addEventListener('beforeprint', () => {
      document.body.classList.add('printing');
    });

    window.addEventListener('afterprint', () => {
      document.body.classList.remove('printing');
    });