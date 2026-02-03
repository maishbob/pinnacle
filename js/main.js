/**
 * Pinnacle Tech - Main JavaScript
 * Handles interactive functionality for the tech company website
 * Updated: May 7, 2025 - Enhanced with animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', 
                menuToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
            );
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
                
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        const categories = card.getAttribute('data-category').split(' ');
                        if (categories.includes(filter)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Testimonial slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.testimonial-indicators .indicator');
    let currentSlide = 0;
    let slideInterval;
    
    if (slides.length > 0) {
        function goToSlide(index) {
            // Hide all slides
            slides.forEach(slide => {
                slide.style.display = 'none';
            });
            
            // Update indicators
            indicators.forEach(ind => {
                ind.classList.remove('active');
                ind.setAttribute('aria-selected', 'false');
            });
            
            // Show selected slide
            slides[index].style.display = 'block';
            indicators[index].classList.add('active');
            indicators[index].setAttribute('aria-selected', 'true');
            currentSlide = index;
        }
        
        // Initialize testimonial slider
        goToSlide(0);
        
        // Auto-advance slides
        function startSlideTimer() {
            slideInterval = setInterval(() => {
                let next = currentSlide + 1;
                if (next >= slides.length) next = 0;
                goToSlide(next);
            }, 5000);
        }
        
        startSlideTimer();
        
        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                clearInterval(slideInterval);
                goToSlide(index);
                startSlideTimer();
            });
        });
    }
    
    // Contact form validation and handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.classList.add('submitting');
                
                // Simulate form submission (replace with actual form submission)
                setTimeout(() => {
                    submitBtn.classList.remove('submitting');
                    
                    // Create success message element
                    const formContent = contactForm.innerHTML;
                    contactForm.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle" aria-hidden="true"></i>
                            <h3>Message Sent Successfully!</h3>
                            <p>Thank you for reaching out to us. A member of our team will be in touch with you shortly.</p>
                        </div>
                    `;
                    
                    // Reset form after delay
                    setTimeout(() => {
                        contactForm.innerHTML = formContent;
                        contactForm.reset();
                    }, 5000);
                }, 1500);
            }
        });
        
        function validateForm() {
            let isValid = true;
            
            // Clear previous error messages
            const errorMessages = contactForm.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.remove());
            
            // Clear previous error classes
            const errorInputs = contactForm.querySelectorAll('.error');
            errorInputs.forEach(input => input.classList.remove('error'));
            
            // Required fields
            const requiredFields = contactForm.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showError(field, 'This field is required');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    showError(emailField, 'Please enter a valid email address');
                }
            }
            
            // Phone validation (if provided)
            const phoneField = contactForm.querySelector('input[type="tel"]');
            if (phoneField && phoneField.value.trim()) {
                const phonePattern = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
                if (!phonePattern.test(phoneField.value)) {
                    isValid = false;
                    showError(phoneField, 'Please enter a valid phone number');
                }
            }
            
            return isValid;
        }
        
        function showError(field, message) {
            // Add error class
            field.classList.add('error');
            
            // Create error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            
            // Insert error message after field
            field.parentNode.appendChild(errorDiv);
        }
    }
    
    // Add scroll animation for elements
    const animatedElements = document.querySelectorAll('.animated');
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }
    
    function handleScrollAnimation() {
        animatedElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('appear');
            }
        });
    }
    
    // Run once on page load
    handleScrollAnimation();
    
    // Run on scroll
    window.addEventListener('scroll', handleScrollAnimation);
});