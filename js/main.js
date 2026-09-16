/**
 * TravelExplorer - Main JavaScript
 * Vanilla JavaScript (ES6+) with Zero External Dependencies
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. Mobile Menu Toggle
     ========================================================================== */
  const burgerBtn = document.getElementById('burger-btn');
  const navMenu = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (burgerBtn && navMenu) {
    // Toggle mobile menu on hamburger button click
    burgerBtn.addEventListener('click', () => {
      const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
      burgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
      burgerBtn.setAttribute('aria-expanded', String(!isExpanded));
    });

    // Close mobile menu when any navigation link is clicked
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        burgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
        burgerBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside of the header
    document.addEventListener('click', (event) => {
      const header = document.getElementById('header');
      if (header && !header.contains(event.target)) {
        burgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
        burgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ==========================================================================
     2. Destination Card Filtering
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const destinationCards = document.querySelectorAll('.destination-card');

  if (filterButtons.length > 0 && destinationCards.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        // Update active class on filter buttons
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        // Get filter category from data attribute
        const filterValue = button.getAttribute('data-filter');

        // Filter destination cards
        destinationCards.forEach((card) => {
          const cardCategory = card.getAttribute('data-category');

          if (filterValue === 'all' || filterValue === cardCategory) {
            card.style.display = 'block';
            // Trigger quick fade/scale-in effect
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96)';
            setTimeout(() => {
              card.style.transition = 'all 0.3s ease';
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ==========================================================================
     3. Smooth Scroll Navigation
     ========================================================================== */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const header = document.getElementById('header');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href');
      
      // Ignore bare '#' links
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();

        // Calculate offset accounting for fixed header height
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update URL hash without jumping
        if (history.pushState) {
          history.pushState(null, '', targetId);
        }
      }
    });
  });

  /* ==========================================================================
     4. Scroll Spy & Active Nav Link Highlight
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  const handleScrollSpy = () => {
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScrollSpy, { passive: true });

  /* ==========================================================================
     5. Header Elevation on Scroll
     ========================================================================== */
  const handleHeaderShadow = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
      header.style.boxShadow = 'var(--shadow-sm)';
      header.style.backgroundColor = 'var(--header-bg)';
    }
  };

  window.addEventListener('scroll', handleHeaderShadow, { passive: true });
});
