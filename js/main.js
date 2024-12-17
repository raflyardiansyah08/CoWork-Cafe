// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// Form Submission
document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Ambil Data Formulir
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Kirim Pesan Ke WhatsApp
  const whatsappMessage = `Halo, Nama Saya ${name}.\nEmail: ${email}\nMessage: ${message}`;
  const whatsappURL = `https://wa.me/628819624363?text=${encodeURIComponent(whatsappMessage)}`;

  // Arahkan ke WhatsApp
  window.open(whatsappURL, '_blank');
  window.location.href = '/';
});

// Pricing Toggle Animation
const priceCards = document.querySelectorAll('.price-card');
priceCards.forEach((card) => {
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
