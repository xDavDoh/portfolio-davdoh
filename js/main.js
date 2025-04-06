/* Scroller */

function toggleMenu() {
  const mobileNav = document.querySelector('.mobile-nav');
  const menuIcon = document.querySelector('.menu-icon');
  mobileNav.classList.toggle('active');
  menuIcon.textContent = menuIcon.textContent === '☰' ? '✖' : '☰';
}

window.addEventListener('resize', () => {
  const mobileNav = document.querySelector('.mobile-nav');
  const menuIcon = document.querySelector('.menu-icon');
  if (window.innerWidth > 768) {
      mobileNav.classList.remove('active');
      menuIcon.textContent = '☰';
  }
});

window.onscroll = function() {
  updateProgressBar();
};

function updateProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = scrollPercentage + '%';
}

/* Copy email button */

function copyEmail() {
  const email = 'your-email@example.com';
  navigator.clipboard.writeText(email).then(() => {
    alert('Email address copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy email: ', err);
  });
}

// Add keyboard event listeners for accessibility
document.querySelectorAll('.filter-tag, .project-tile').forEach(element => {
  element.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      element.click();
    }
  });
});

document.querySelectorAll('.filter-link').forEach(link => {
  link.addEventListener('click', function(event) {
      event.preventDefault();
      const filter = this.dataset.filter;

      document.querySelectorAll('.filter-link').forEach(link => {
          link.classList.remove('active');
      });
      this.classList.add('active');

      document.querySelectorAll('.tile').forEach(tile => {
          if (filter === 'all' || tile.dataset.category === filter) {
              tile.style.display = 'block';
          } else {
              tile.style.display = 'none';
          }
      });
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      const offset = document.querySelector('nav').offsetHeight + 20; // Add extra spacing

      window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: 'smooth'
      });
  });
});

document.querySelector('.logo').addEventListener('click', function() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
});

document.querySelector('.footer-logo').addEventListener('click', function() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
});

// JavaScript to dynamically set the current year
document.addEventListener('DOMContentLoaded', function() {
  var currentYear = new Date().getFullYear();
  document.getElementById('current-year').textContent = currentYear;
});

document.addEventListener('DOMContentLoaded', function() {
  function updateImages() {
      const tiles = document.querySelectorAll('.tile');
      tiles.forEach(tile => {
          const category = tile.getAttribute('data-category');
          const img = tile.querySelector('.project-image');
          if (window.innerWidth <= 768) {
              img.src = `images/${category}-3.png`;
          } else if (window.innerWidth <= 1024) {
              img.src = `images/${category}-2.png`;
          } else {
              img.src = `images/${category}-1.png`;
          }
      });
  }

  // Update images on initial load
  updateImages();

  // Update images on window resize
  window.addEventListener('resize', updateImages);
});


document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const target = this.getAttribute('href');
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    document.body.style.opacity = '0';
    setTimeout(() => {
      window.location.href = target;
    }, 500);
  });
});

window.addEventListener('load', () => {
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetElement = document.getElementById(targetId);
    const offset = document.querySelector('nav').offsetHeight + 20; // Add extra spacing

    window.scrollTo({
      top: targetElement.offsetTop - offset,
      behavior: 'smooth'
    });
  }
});

// document.addEventListener("DOMContentLoaded", function() {
//   const bannerContents = document.querySelectorAll('.banner-content');
//   bannerContents.forEach(function(bannerContent) {
//       bannerContent.classList.add('fade-in');
//   });
// });

// window.addEventListener("pageshow", function(event) {
//   if (event.persisted || performance.navigation.type === 2) {
//       const bannerContents = document.querySelectorAll('.banner-content');
//       bannerContents.forEach(function(bannerContent) {
//           bannerContent.classList.remove('fade-in');
//           requestAnimationFrame(() => {
//               bannerContent.classList.add('fade-in');
//           });
//       });
//   }
// });



document.querySelectorAll('.project-tiles a').forEach(link => {
  link.addEventListener('click', function(event) {
      event.preventDefault();
      const target = this.getAttribute('href');
      document.body.style.transition = 'opacity 0.5s ease-in-out';
      document.body.style.opacity = '0';
      setTimeout(() => {
          window.location.href = target;
      }, 500);
  });
});

// Function to handle the fade-out effect
function fadeOutAndRedirect(target) {
  document.body.style.transition = 'opacity 0.5s ease-in-out';
  document.body.style.opacity = '0';
  setTimeout(() => {
      window.location.href = target;
  }, 500);
}

// Apply the fade-out effect to navigation links and project tiles
document.querySelectorAll('.nav-link, .project-tiles a').forEach(link => {
  link.addEventListener('click', function(event) {
      event.preventDefault();
      const target = this.getAttribute('href');
      fadeOutAndRedirect(target);
  });
});


// Apply the fade-out effect to the logo
document.querySelector('.logo').addEventListener('click', function(event) {
  event.preventDefault();
  fadeOutAndRedirect('index.html');
});


// Function to handle the fade-out effect
function fadeOutAndRedirect(target) {
  document.body.style.transition = 'opacity 0.5s ease-in-out';
  document.body.style.opacity = '0';
  setTimeout(() => {
      window.location.href = target;
  }, 500);
}

// Apply the fade-out effect to navigation links and project tiles
document.querySelectorAll('.nav-link, .project-tiles a').forEach(link => {
  link.addEventListener('click', function(event) {
      event.preventDefault();
      const target = this.getAttribute('href');
      fadeOutAndRedirect(target);
  });
});

// Apply the fade-out effect to the header logo
const headerLogo = document.querySelector('.logo');
headerLogo.addEventListener('click', function(event) {
  event.preventDefault();
  fadeOutAndRedirect('index.html');
});
headerLogo.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      fadeOutAndRedirect('index.html');
  }
});

// Apply the fade-out effect to the footer logo
const footerLogo = document.querySelector('.footer-logo');
footerLogo.addEventListener('click', function(event) {
  event.preventDefault();
  fadeOutAndRedirect('index.html');
});
footerLogo.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      fadeOutAndRedirect('index.html');
  }
});


// document.addEventListener('DOMContentLoaded', function() {
//   function updateImage() {
//       const tile = document.querySelector('.single-tile-project-1');
//       const img = tile.querySelector('.project-image');
//       if (window.innerWidth <= 768) {
//           img.src = 'images/third-sector-1.png';
//       } else if (window.innerWidth <= 1024) {
//           img.src = 'images/third-sector-2.png';
//       } else {
//           img.src = 'images/third-sector-3.png';
//       }
//   }

//   updateImage(); // Initial call to set the image based on screen size

//   window.addEventListener('resize', updateImage); // Update image on window resize

//   document.querySelector('.single-tile-project-1 a').addEventListener('click', function(event) {
//       event.preventDefault();
//       const target = this.getAttribute('href');
//       document.body.style.transition = 'opacity 0.5s ease-in-out';
//       document.body.style.opacity = '0';
//       setTimeout(() => {
//           window.location.href = target;
//       }, 500);
//   });
// });

// document.addEventListener('DOMContentLoaded', function() {
//   function updateImage() {
//       const tile = document.querySelector('.single-tile-project-2');
//       const img = tile.querySelector('.project-image');
//       if (window.innerWidth <= 768) {
//           img.src = 'images/private-1-single.png';
//       } else if (window.innerWidth <= 1024) {
//           img.src = 'images/private-2-single.png';
//       } else {
//           img.src = 'images/private-3-single.png';
//       }
//   }

//   updateImage(); // Initial call to set the image based on screen size

//   window.addEventListener('resize', updateImage); // Update image on window resize

//   document.querySelector('.single-tile-project-2 a').addEventListener('click', function(event) {
//       event.preventDefault();
//       const target = this.getAttribute('href');
//       document.body.style.transition = 'opacity 0.5s ease-in-out';
//       document.body.style.opacity = '0';
//       setTimeout(() => {
//           window.location.href = target;
//       }, 500);
//   });
// });

// document.addEventListener('DOMContentLoaded', function() {
//   function updateImage() {
//       const tile = document.querySelector('.single-tile-project-3');
//       const img = tile.querySelector('.project-image');
//       if (window.innerWidth <= 768) {
//           img.src = 'images/public-1.png';
//       } else if (window.innerWidth <= 1024) {
//           img.src = 'images/public-2.png';
//       } else {
//           img.src = 'images/public-3.png';
//       }
//   }

//   updateImage(); // Initial call to set the image based on screen size

//   window.addEventListener('resize', updateImage); // Update image on window resize

//   document.querySelector('.single-tile-project-3 a').addEventListener('click', function(event) {
//       event.preventDefault();
//       const target = this.getAttribute('href');
//       document.body.style.transition = 'opacity 0.5s ease-in-out';
//       document.body.style.opacity = '0';
//       setTimeout(() => {
//           window.location.href = target;
//       }, 500);
//   });
// });


// document.addEventListener('DOMContentLoaded', function() {
//   function updateImage(tileClass, imgSrcSmall, imgSrcMedium, imgSrcLarge) {
//       const tile = document.querySelector(tileClass);
//       const img = tile.querySelector('.project-image');
//       if (window.innerWidth <= 768) {
//           img.src = imgSrcSmall;
//       } else if (window.innerWidth <= 1024) {
//           img.src = imgSrcMedium;
//       } else {
//           img.src = imgSrcLarge;
//       }
//   }

//   function initializeTile(tileClass, imgSrcSmall, imgSrcMedium, imgSrcLarge, link) {
//       updateImage(tileClass, imgSrcSmall, imgSrcMedium, imgSrcLarge); // Initial call to set the image based on screen size

//       window.addEventListener('resize', function() {
//           updateImage(tileClass, imgSrcSmall, imgSrcMedium, imgSrcLarge); // Update image on window resize
//       });

//       document.querySelector(tileClass + ' a').addEventListener('click', function(event) {
//           event.preventDefault();
//           const target = this.getAttribute('href');
//           document.body.style.transition = 'opacity 0.5s ease-in-out';
//           document.body.style.opacity = '0';
//           setTimeout(() => {
//               window.location.href = target;
//           }, 500);
//       });
//   }

//   // Initialize tiles with different images and links
//   initializeTile('.single-tile-project-1', 'images/third-sector-1-single.png', 'images/third-sector-2-single.png', 'images/third-sector-3-single.png', 'highlight-project.html');
//   initializeTile('.single-tile-project-2', 'images/private-1-single.png', 'images/private-2-single.png', 'images/private-3-single.png', 'private-project.html');
//   initializeTile('.single-tile-project-3', 'images/public-1-single.png', 'images/public-2-single.png', 'images/public-3-single.png', 'public-project.html');
// });

// h4 {
//   display: flex;
//   align-items: center;
// }

// h4 .material-icons {
//   margin-left: 8px; /* Adjust spacing as needed */
//   font-size: 1em; /* Ensures the icon resizes with the text */
// }


document.addEventListener('DOMContentLoaded', function() {
  function updateImage(tileClass, imgSrcSmall, imgSrcMedium, imgSrcLarge) {
      const tile = document.querySelector(tileClass);
      if (tile) {
          const img = tile.querySelector('.project-image');
          if (window.innerWidth <= 768) {
              img.src = imgSrcSmall;
          } else if (window.innerWidth <= 1024) {
              img.src = imgSrcMedium;
          } else {
              img.src = imgSrcLarge;
          }
      }
  }

  function initializeTile(tileClass, imgSrcSmall, imgSrcMedium, imgSrcLarge, link) {
      updateImage(tileClass, imgSrcSmall, imgSrcMedium, imgSrcLarge); // Initial call to set the image based on screen size

      window.addEventListener('resize', function() {
          updateImage(tileClass, imgSrcSmall, imgSrcMedium, imgSrcLarge); // Update image on window resize
      });

      const tileLink = document.querySelector(tileClass + ' a');
      if (tileLink) {
          tileLink.addEventListener('click', function(event) {
              event.preventDefault();
              const target = this.getAttribute('href');
              document.body.style.transition = 'opacity 0.5s ease-in-out';
              document.body.style.opacity = '0';
              setTimeout(() => {
                  window.location.href = target;
              }, 500);
          });
      }
  }

  // Initialize tiles with different images and links
  initializeTile('.single-tile-project-1', 'images/third-sector-1-single.png', 'images/third-sector-2-single.png', 'images/third-sector-3-single.png', 'highlight-project.html');
  initializeTile('.single-tile-project-2', 'images/private-1-single.png', 'images/private-2-single.png', 'images/private-3-single.png', 'private-project.html');
  initializeTile('.single-tile-project-3', 'images/public-1-single.png', 'images/public-2-single.png', 'images/public-3-single.png', 'public-project.html');
});

document.addEventListener("DOMContentLoaded", function() {
  const bannerContents = document.querySelectorAll('.banner-content');
  bannerContents.forEach(function(bannerContent) {
      bannerContent.classList.add('fade-in');
  });

  window.addEventListener("pageshow", function(event) {
      if (event.persisted || performance.navigation.type === 2) {
          bannerContents.forEach(function(bannerContent) {
              bannerContent.classList.remove('fade-in');
              requestAnimationFrame(() => {
                  bannerContent.classList.add('fade-in');
              });
          });
      }
  });
});