// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavOverlay = document.createElement('div');
    mobileNavOverlay.classList.add('mobile-nav-overlay');
    document.body.appendChild(mobileNavOverlay);
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    mobileNavOverlay.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
    
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }
    
    themeToggle.addEventListener('click', function() {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize animations
    initAnimations();
    
    // Initialize cart
    initCart();
});

function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-slide-up').forEach(el => {
        observer.observe(el);
    });
}

// Add this to your main.js file if you want interactive logo effects
document.addEventListener('DOMContentLoaded', function() {
  const logoContainer = document.querySelector('.logo-container');
  
  if (logoContainer) {
    // Click event to go home
    logoContainer.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
    
    
    
    // Add cursor pointer
    logoContainer.style.cursor = 'pointer';
    
    // Parallax effect on mouse move
    logoContainer.addEventListener('mousemove', function(e) {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      this.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    // Reset on mouse leave
    logoContainer.addEventListener('mouseleave', function() {
      this.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }
});

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Utility function to format currency
function formatCurrency(amount) {
    return `¢${amount.toFixed(2)}`;
}