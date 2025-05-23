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
    console.log("Updating project images. Mobile: " + isMobileDevice() + ", Width: " + window.innerWidth);
    
    // Update main project tiles
    const projectTiles = document.querySelectorAll('.tile');
    projectTiles.forEach(tile => {
      const category = tile.getAttribute('data-category');
      const img = tile.querySelector('.project-image');
      
      if (img && category) {
        let newSrc;
        
        // For mobile devices, use the -1-single.png images that we know work
        if (isMobileDevice()) {
          newSrc = `images/${category}-1-single.png`;
        } else if (window.innerWidth <= 1024) {
          newSrc = `images/${category}-2.png`;
        } else {
          newSrc = `images/${category}-1.png`;
        }
        
        console.log(`Setting image for ${category} to ${newSrc}`);
        img.src = newSrc;
        
        // Add error handling
        img.onerror = function() {
          console.error(`Failed to load image: ${newSrc}, falling back to default`);
          this.src = `images/${category}-1.png`; // Fallback to the desktop version
          this.onerror = null; // Prevent infinite error loop
        };
      }
    });
    
    // Also update single tiles if they exist
    const singleTiles = document.querySelectorAll('.single-tile');
    singleTiles.forEach(tile => {
      const category = tile.getAttribute('data-category');
      const img = tile.querySelector('.project-image');
      
      if (img && category) {
        if (isMobileDevice()) {
          img.src = `images/${category}-1-single.png`;
        }
      }
    });
  }
  
  // Initialize project images
  if (document.querySelector('.tile') || document.querySelector('.single-tile')) {
    updateProjectImages();
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
  
  // Copy email function
  function copyEmail() {
    const email = 'your-email@example.com';
    navigator.clipboard.writeText(email).then(() => {
      alert('Email address copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy email: ', err);
    });
  }
  
  // Setup email copy button
  const emailButton = document.querySelector('.copy-email-btn');
  if (emailButton) {
    emailButton.addEventListener('click', copyEmail);
  }
  
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