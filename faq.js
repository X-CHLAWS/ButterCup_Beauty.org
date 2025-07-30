// faq.js - FAQ Accordion Functionality with Animations
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    // Initialize FAQ items
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        // Set initial state
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease-out, padding 0.3s ease';
        
        // Add click event
        question.addEventListener('click', function() {
            // Toggle active class
            const isActive = item.classList.contains('active');
            
            // Close all other items
            if (!isActive) {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.faq-question i');
                        otherAnswer.style.maxHeight = '0';
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                });
            }
            
            // Toggle current item
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                // Open this item
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
                
                // Smooth scroll to ensure question stays visible
                setTimeout(() => {
                    question.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            } else {
                // Close this item
                answer.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Keyboard accessibility
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
    
    // Add animation to FAQ items for staggered entrance
    const faqContainer = document.querySelector('.faq-container');
    if (faqContainer) {
        // Create observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        // Observe each FAQ item
        faqItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            observer.observe(item);
        });
    }
    
    // Search functionality for FAQs
    const faqSearch = document.getElementById('faq-search');
    if (faqSearch) {
        faqSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    
                    // Highlight matching text
                    highlightText(item, searchTerm);
                    
                    // Auto-expand if search term is in answer
                    if (answer.includes(searchTerm) && !item.classList.contains('active')) {
                        item.classList.add('active');
                        const answerEl = item.querySelector('.faq-answer');
                        answerEl.style.maxHeight = answerEl.scrollHeight + 'px';
                        item.querySelector('.faq-question i').style.transform = 'rotate(180deg)';
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});

// Helper function to highlight search terms
function highlightText(element, searchTerm) {
    if (!searchTerm) return;
    
    const question = element.querySelector('.faq-question h3');
    const answer = element.querySelector('.faq-answer');
    
    const questionText = question.textContent;
    const answerText = answer.textContent;
    
    // Reset previous highlights
    question.innerHTML = questionText;
    answer.innerHTML = answerText;
    
    // Highlight in question
    if (searchTerm.length > 2) {
        const regex = new RegExp(searchTerm, 'gi');
        question.innerHTML = questionText.replace(regex, match => 
            `<span class="highlight">${match}</span>`);
        
        // Highlight in answer (only if answer is visible)
        if (element.classList.contains('active')) {
            answer.innerHTML = answerText.replace(regex, match => 
                `<span class="highlight">${match}</span>`);
        }
    }
}