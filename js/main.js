document.addEventListener('DOMContentLoaded', function() {
  // ===== UTILITY FUNCTIONS =====
  
  // Mobile detection
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  }
  
  // ===== MOBILE NAVIGATION =====
  
  // Toggle menu function
  function toggleMenu() {
    const mobileNav = document.querySelector('.mobile-nav');
    const menuIcon = document.querySelector('.menu-icon');
    
    if (mobileNav && menuIcon) {
      mobileNav.classList.toggle('active');
      menuIcon.textContent = menuIcon.textContent === '☰' ? '✖' : '☰';
      console.log("Mobile menu toggled");
    }
  }
  
  // Setup mobile navigation
  function setupMobileNav() {
    const menuIcon = document.querySelector('.menu-icon');
    
    if (menuIcon) {
      console.log("Setting up mobile nav");
      menuIcon.addEventListener('click', toggleMenu);
    }
  }
  
  // Initialize mobile nav
  setupMobileNav();
  
  // ===== PROJECT IMAGES =====
  
  // Update project images based on device and screen size
  function updateProjectImages() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024 && !isMobile;
  
    document.querySelectorAll('.tile').forEach(tile => {
      const category = tile.getAttribute('data-category');
      const img = tile.querySelector('.project-image');
  
      if (!img || !category) return;
  
      let newSrc = `images/${category}-1.png`; // default
  
      if (isMobile) {
        newSrc = `images/${category}-1-single.png`;
      } else if (isTablet) {
        newSrc = `images/${category}-2.png`;
      }
  
      // Force reload the image
      if (img.src !== newSrc) {
        console.log(`Switching image for ${category} to ${newSrc}`);
        img.src = '';
        img.src = newSrc;


        setTimeout(() => {
        console.log(`🔍 Final src for ${category}: ${img.src}`);
        }, 1000);
  
  
        img.onerror = function () {
          console.error(`Failed to load image: ${newSrc}`);
          this.src = `images/${category}-1.png`;
          this.onerror = null;
        };
      }
    });
  }
  
  
  // Initialize project images
  if (document.querySelector('.tile') || document.querySelector('.single-tile')) 
    {
        setTimeout(updateProjectImages, 500);
      }
    
  
  // ===== SCROLL FUNCTIONALITY =====
  
  // Update progress bar on scroll
  function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = scrollPercentage + '%';
    }
  }
  
  // Initialize progress bar
  if (document.getElementById('progress-bar')) {
    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar(); // Initial call
  }
  
  // ===== EMAIL FUNCTIONALITY =====
  
  // // Copy email function
  // function copyEmail() {
  //   const email = 'dav.doh.design@gmail.com';
  //   navigator.clipboard.writeText(email).then(() => {
  //     alert('Email address copied to clipboard!');
  //   }).catch(err => {
  //     console.error('Failed to copy email: ', err);
  //   });
  // }
  
  // // Setup email copy button
  // const emailButton = document.querySelector('.copy-email-btn');
  // if (emailButton) {
  //   emailButton.addEventListener('click', copyEmail);
  // }
  
  // ===== FILTER FUNCTIONALITY =====
  
  // Setup project filters
  function setupFilters() {
    document.querySelectorAll('.filter-link').forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        const filter = this.dataset.filter;
        
        // Update active class
        document.querySelectorAll('.filter-link').forEach(l => {
          l.classList.remove('active');
        });
        this.classList.add('active');
        
        // Filter tiles
        document.querySelectorAll('.tile').forEach(tile => {
          if (filter === 'all' || tile.dataset.category === filter) {
            tile.style.display = 'block';
          } else {
            tile.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Initialize filters
  if (document.querySelector('.filter-link')) {
    setupFilters();
  }
  
  // ===== PAGE TRANSITIONS =====
  
  // Function to handle the fade-out effect
  function fadeOutAndRedirect(target) {
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    document.body.style.opacity = '0';
    setTimeout(() => {
      window.location.href = target;
    }, 500);
  }
  
  // Apply fade-out to navigation links
  document.querySelectorAll('.nav-link, .project-tiles a, .single-tile a').forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const target = this.getAttribute('href');
      fadeOutAndRedirect(target);
    });
  });
  
  // Apply fade-out to logos
  const headerLogo = document.querySelector('.logo');
  const footerLogo = document.querySelector('.footer-logo');
  
  if (headerLogo) {
    headerLogo.addEventListener('click', function(event) {
      event.preventDefault();
      fadeOutAndRedirect('index.html');
    });
  }
  
  if (footerLogo) {
    footerLogo.addEventListener('click', function(event) {
      event.preventDefault();
      fadeOutAndRedirect('index.html');
    });
  }
  
  // ===== BANNER CONTENT =====
  
  // Handle banner content fade-in
  const bannerContents = document.querySelectorAll('.banner-content');
  bannerContents.forEach(function(bannerContent) {
    bannerContent.classList.add('fade-in');
  });
  
  // ===== WINDOW EVENTS =====
  
  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    // Handle mobile nav on resize
    const mobileNav = document.querySelector('.mobile-nav');
    const menuIcon = document.querySelector('.menu-icon');
    
    if (mobileNav && menuIcon && window.innerWidth > 768) {
      mobileNav.classList.remove('active');
      menuIcon.textContent = '☰';
    }
    
    // Update project images with debounce
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (document.querySelector('.tile') || document.querySelector('.single-tile')) {
        updateProjectImages();
      }
    }, 250);
  });
  
  // Set current year in footer
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  
  // Handle hash navigation
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetElement = document.getElementById(targetId);
    const navHeight = document.querySelector('nav')?.offsetHeight || 0;
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - navHeight - 20,
        behavior: 'smooth'
      });
    }
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      const navHeight = document.querySelector('nav')?.offsetHeight || 0;
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - navHeight - 20,
          behavior: 'smooth'
        });
      }
    });
  });
  
  console.log("DOM fully loaded and parsed");
});


document.addEventListener('DOMContentLoaded', function () {
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetElement = document.getElementById(targetId);
    const navHeight = document.querySelector('nav')?.offsetHeight || 100;

    if (targetElement) {
      // Delay scroll to ensure layout is ready
      setTimeout(() => {
        const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementTop - navHeight - 20, // 20px extra spacing
          behavior: 'smooth'
        });
      }, 100); // slight delay to allow layout to settle
    }
  }
});

  