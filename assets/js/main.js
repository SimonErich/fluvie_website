// ==================== MAIN JAVASCRIPT ====================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initMobileNav();
  initScrollAnimations();
  initPlatformTabs();
  initStickyHeader();
  initCopyButtons();
  initMouseParallax();
  initFloatingParticles();
  initSmoothScroll();
});

// ==================== MOBILE NAVIGATION ====================
function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // Close menu when clicking on nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu && navToggle && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        // Stagger children animations if present
        const children = entry.target.querySelectorAll('.stagger-child');
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * 0.1}s`;
          child.classList.add('active');
        });
      }
    });
  }, observerOptions);

  // Elements to animate
  const animatedElements = [
    '.scroll-animate',
    '.feature-card',
    '.use-case-card',
    '.step',
    '.template-card',
    '.community-card',
    '.section__title',
    '.section__subtitle'
  ];

  animatedElements.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (!el.classList.contains('scroll-animate')) {
        el.classList.add('scroll-animate');
      }
      observer.observe(el);
    });
  });
}

// ==================== STICKY HEADER ====================
function initStickyHeader() {
  const header = document.getElementById('header');
  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ==================== PLATFORM TABS ====================
function initPlatformTabs() {
  const tabs = document.querySelectorAll('.tab');
  const platformCodes = document.querySelectorAll('.platform-code');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const platform = tab.getAttribute('data-platform');

      // Remove active class from all tabs and code blocks
      tabs.forEach(t => t.classList.remove('active'));
      platformCodes.forEach(code => code.classList.remove('active'));

      // Add active class to clicked tab and corresponding code block
      tab.classList.add('active');
      const activeCode = document.querySelector(`.platform-code[data-platform="${platform}"]`);
      if (activeCode) {
        activeCode.classList.add('active');
      }
    });
  });
}

// ==================== COPY CODE BUTTON ====================
function initCopyButtons() {
  const copyButton = document.getElementById('copy-code');

  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      const editor = window.monacoEditor;
      if (editor) {
        const code = editor.getValue();
        try {
          await navigator.clipboard.writeText(code);

          // Show feedback
          const originalText = copyButton.textContent;
          copyButton.textContent = 'Copied!';
          copyButton.style.background = 'rgba(0, 217, 166, 0.2)';
          copyButton.style.borderColor = '#00D9A6';

          setTimeout(() => {
            copyButton.textContent = originalText;
            copyButton.style.background = '';
            copyButton.style.borderColor = '';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code:', err);
        }
      }
    });
  }
}

// ==================== MOUSE PARALLAX ====================
function initMouseParallax() {
  const hero = document.querySelector('.hero');
  const orbs = document.querySelectorAll('.hero__orb');
  const waves = document.querySelectorAll('.hero__wave');
  const content = document.querySelector('.hero__content');
  const visual = document.querySelector('.hero__visual');

  if (!hero) return;

  // Throttle for performance
  let ticking = false;

  hero.addEventListener('mousemove', (e) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate offset from center (-1 to 1)
        const offsetX = (e.clientX - rect.left - centerX) / centerX;
        const offsetY = (e.clientY - rect.top - centerY) / centerY;

        // Move orbs with different intensities
        orbs.forEach((orb, index) => {
          const intensity = (index + 1) * 15;
          const x = offsetX * intensity;
          const y = offsetY * intensity;
          orb.style.transform = `translate(${x}px, ${y}px)`;
        });

        // Subtle wave movement
        waves.forEach((wave, index) => {
          const intensity = (index + 1) * 3;
          const y = offsetY * intensity;
          wave.style.transform = `translateY(${y}px)`;
        });

        // Content parallax (subtle)
        if (content) {
          const contentIntensity = 8;
          content.style.transform = `translate(${offsetX * contentIntensity}px, ${offsetY * contentIntensity}px)`;
        }

        // Visual parallax (opposite direction)
        if (visual) {
          const visualIntensity = 12;
          visual.style.transform = `translate(${-offsetX * visualIntensity}px, ${-offsetY * visualIntensity}px)`;
        }

        ticking = false;
      });
      ticking = true;
    }
  });

  // Reset on mouse leave
  hero.addEventListener('mouseleave', () => {
    orbs.forEach(orb => {
      orb.style.transform = 'translate(0, 0)';
      orb.style.transition = 'transform 0.5s ease-out';
    });
    waves.forEach(wave => {
      wave.style.transform = 'translateY(0)';
      wave.style.transition = 'transform 0.5s ease-out';
    });
    if (content) {
      content.style.transform = 'translate(0, 0)';
      content.style.transition = 'transform 0.5s ease-out';
    }
    if (visual) {
      visual.style.transform = 'translate(0, 0)';
      visual.style.transition = 'transform 0.5s ease-out';
    }

    // Remove transition after animation
    setTimeout(() => {
      orbs.forEach(orb => orb.style.transition = '');
      waves.forEach(wave => wave.style.transition = '');
      if (content) content.style.transition = '';
      if (visual) visual.style.transition = '';
    }, 500);
  });
}

// ==================== FLOATING PARTICLES ====================
function initFloatingParticles() {
  const particlesContainer = document.getElementById('hero-particles');
  if (!particlesContainer) return;

  const particleCount = 20;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';

    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 8}s`;

    // Random size variation
    const size = 3 + Math.random() * 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random opacity
    particle.style.opacity = 0.2 + Math.random() * 0.4;

    particles.push(particle);
    particlesContainer.appendChild(particle);
  }
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 70;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// ==================== SCROLL PROGRESS INDICATOR ====================
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.innerHTML = '<div class="scroll-progress__bar"></div>';
  document.body.prepend(progressBar);

  const bar = progressBar.querySelector('.scroll-progress__bar');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    bar.style.width = `${scrollPercent}%`;
  });
}

// ==================== UTILITY FUNCTIONS ====================

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Lerp (Linear interpolation)
function lerp(start, end, factor) {
  return start + (end - start) * factor;
}
