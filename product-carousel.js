// Product Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.product-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const products = document.querySelectorAll('.product-item');
    
    if (!carousel) return;
    
    let currentIndex = 0;
    const productWidth = products[0].offsetWidth + 20; // Including gap
    
    // Set up event listeners for buttons
    prevBtn.addEventListener('click', scrollPrev);
    nextBtn.addEventListener('click', scrollNext);
    
    // Set up keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            scrollPrev();
        } else if (e.key === 'ArrowRight') {
            scrollNext();
        }
    });
    
    // Set up touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            scrollNext();
        } else if (touchEndX > touchStartX + 50) {
            scrollPrev();
        }
    }
    
    function scrollPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    function scrollNext() {
        if (currentIndex < products.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    function updateCarousel() {
        const scrollAmount = currentIndex * productWidth;
        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === products.length - 1;
    }
    
    // Initialize button states
    prevBtn.disabled = true;
});

// 3D rotation effect for product items
document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});