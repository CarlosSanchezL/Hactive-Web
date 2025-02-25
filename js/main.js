// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const dropdowns = document.querySelectorAll('.dropdown');
const backToTopButton = document.querySelector('.back-to-top');
const colorOptions = document.querySelectorAll('.color-option');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCountElement = document.querySelector('.cart-count');

// Initialize cart count from localStorage or set to 0
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
cartCountElement.textContent = cartCount;

// Mobile Menu Toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Handle dropdowns on mobile
dropdowns.forEach(dropdown => {
    // Add click event for mobile devices
    dropdown.addEventListener('click', (e) => {
        // Only execute this on smaller screens
        if (window.innerWidth <= 768) {
            // If the clicked element is the direct link (not a child link)
            if (e.target === dropdown.querySelector('a')) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        }
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

if (backToTopButton) {
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Color Options Selector
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Find the parent collection item
        const collectionItem = option.closest('.collection-item');
        
        // Remove active class from all options in this item
        collectionItem.querySelectorAll('.color-option').forEach(opt => {
            opt.classList.remove('active');
        });
        
        // Add active class to clicked option
        option.classList.add('active');
        
        // Get the color from the class
        const color = option.classList[1]; // black, gray, white
        
        // Update the product image (assuming naming convention like product-black.jpg)
        const productImage = collectionItem.querySelector('.collection-image img');
        const currentSrc = productImage.src;
        
        // Replace the color in the src
        const newSrc = currentSrc.replace(/(bra|leggings)-(black|gray|white)/, `$1-${color}`);
        productImage.src = newSrc;
    });
});

// Add to Cart Functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Increment cart count
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Save to localStorage
        localStorage.setItem('cartCount', cartCount);
        
        // Animation for button
        button.textContent = 'Added!';
        button.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = '';
        }, 1000);
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Skip for dropdown toggles on mobile
        if (window.innerWidth <= 768 && this.parentNode.classList.contains('dropdown')) {
            return;
        }
        
        const targetId = this.getAttribute('href');
        
        // Skip for # links
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            // In a real application, you would send this to your server
            console.log('Newsletter subscription for:', email);
            
            // Show success message
            const formContainer = newsletterForm.parentNode;
            formContainer.innerHTML = '<div class="success-message">Thank you for subscribing! You\'ll receive our updates soon.</div>';
        }
    });
}

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('#name').value;
        const email = contactForm.querySelector('#email').value;
        const subject = contactForm.querySelector('#subject').value;
        const message = contactForm.querySelector('#message').value;
        
        // In a real application, you would send this to your server
        console.log('Contact form submission:', { name, email, subject, message });
        
        // Show success message
        contactForm.innerHTML = '<div class="success-message">Message sent successfully! We\'ll get back to you soon.</div>';
    });
}

// Highlight active navigation item based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
});
