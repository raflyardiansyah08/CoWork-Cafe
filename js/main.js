// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Pricing Toggle Animation
const priceCards = document.querySelectorAll('.price-card');
priceCards.forEach(card => {
    card.addEventListener('mouseover', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(-10px)';
        }
    });

    card.addEventListener('mouseout', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(0)';
        }
    });
});

