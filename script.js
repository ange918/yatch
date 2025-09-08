// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initHeader();
    initHero();
    initSearchForm();
    initFleetModals();
    initTestimonials();
    initGalleryLightbox();
    initContactForm();
    initFooter();
    initScrollAnimations();
});

// Header functionality
function initHeader() {
    const header = document.querySelector('.header');
    const burger = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-menu');

    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(21, 58, 80, 0.98)';
        } else {
            header.style.background = 'rgba(21, 58, 80, 0.95)';
        }
    });

    // Mobile menu toggle
    burger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        burger.classList.toggle('active');
        
        // Animate burger lines
        const spans = burger.querySelectorAll('span');
        if (burger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navMenu.classList.remove('active');
                burger.classList.remove('active');
            }
        });
    });
}

// Hero section animations
function initHero() {
    const heroContent = document.querySelector('.hero-content');
    
    // Animate hero content on load
    setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 500);

    // Hero buttons functionality
    const btnPrimary = document.querySelector('.hero .btn-primary');
    const btnSecondary = document.querySelector('.hero .btn-secondary');

    btnPrimary.addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });

    btnSecondary.addEventListener('click', () => {
        document.querySelector('#flotte').scrollIntoView({ behavior: 'smooth' });
    });
}

// Search form validation
function initSearchForm() {
    const searchForm = document.querySelector('.search-form');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const dateDepart = document.getElementById('date-depart').value;
        const dateRetour = document.getElementById('date-retour').value;
        const lieu = document.getElementById('lieu').value;
        const passagers = document.getElementById('passagers').value;

        // Basic validation
        if (!dateDepart || !dateRetour || !lieu || !passagers) {
            alert('Veuillez remplir tous les champs de recherche.');
            return;
        }

        // Date validation
        const today = new Date();
        const departDate = new Date(dateDepart);
        const retourDate = new Date(dateRetour);

        if (departDate < today) {
            alert('La date de départ ne peut pas être dans le passé.');
            return;
        }

        if (retourDate <= departDate) {
            alert('La date de retour doit être après la date de départ.');
            return;
        }

        // Success message
        alert(`Recherche effectuée !\nDépart: ${dateDepart}\nRetour: ${dateRetour}\nPort: ${lieu}\nPassagers: ${passagers}`);
        
        // Redirect to fleet section
        document.querySelector('#flotte').scrollIntoView({ behavior: 'smooth' });
    });
}

// Fleet modals
function initFleetModals() {
    const modal = document.getElementById('yacht-modal');
    const modalClose = document.querySelector('.modal-close');
    const detailButtons = document.querySelectorAll('.btn-details');

    // Yacht data
    const yachtData = {
        azimut: {
            title: 'Azimut S7',
            description: 'Yacht sportif de 21 mètres alliant performance et élégance. Parfait pour des sorties dynamiques en famille ou entre amis.',
            length: '21 m',
            capacity: '10 personnes',
            cabins: '3 cabines'
        },
        pershing: {
            title: 'Pershing 74',
            description: 'Yacht de prestige de 23 mètres, symbole de luxe italien. Design avant-gardiste et performances exceptionnelles.',
            length: '23 m',
            capacity: '12 personnes',
            cabins: '4 cabines'
        },
        sunseeker: {
            title: 'Sunseeker Manhattan 68',
            description: 'Yacht britannique de 21 mètres conjuguant tradition et modernité. Espaces de vie généreux et finitions raffinées.',
            length: '21 m',
            capacity: '10 personnes',
            cabins: '3 cabines'
        },
        ferretti: {
            title: 'Ferretti 920',
            description: 'Superyacht italien de 28 mètres incarnant le summum du raffinement. Volumes exceptionnels et équipements haut de gamme.',
            length: '28 m',
            capacity: '12 personnes',
            cabins: '4 cabines'
        },
        princess: {
            title: 'Princess Y85',
            description: 'Yacht de luxe de 26 mètres alliant innovation technologique et art de vivre. Confort absolu et performances remarquables.',
            length: '26 m',
            capacity: '12 personnes',
            cabins: '4 cabines'
        },
        riva: {
            title: 'Riva 88\' Florida',
            description: 'Icône du yachting italien de 27 mètres. Élégance intemporelle et savoir-faire d\'exception de la maison Riva.',
            length: '27 m',
            capacity: '12 personnes',
            cabins: '4 cabines'
        }
    };

    // Open modal
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const yachtId = this.getAttribute('data-yacht');
            const yacht = yachtData[yachtId];
            
            if (yacht) {
                document.getElementById('modal-title').textContent = yacht.title;
                document.getElementById('modal-description').textContent = yacht.description;
                document.getElementById('yacht-length').textContent = yacht.length;
                document.getElementById('yacht-capacity').textContent = yacht.capacity;
                document.getElementById('yacht-cabins').textContent = yacht.cabins;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal on outside click
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Reserve button in modal
    document.querySelector('.btn-reserve-modal').addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });
}

// Testimonials carousel
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active dot
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current testimonial
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Navigation buttons
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });

    // Auto-play carousel
    setInterval(nextTestimonial, 5000);
}

// Gallery lightbox
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close lightbox on outside click
    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close lightbox on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && lightbox.style.display === 'block') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Contact form validation
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nom = document.getElementById('nom').value.trim();
        const email = document.getElementById('email').value.trim();
        const telephone = document.getElementById('telephone').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!nom || !email || !telephone || !message) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Veuillez saisir une adresse email valide.');
            return;
        }

        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(telephone)) {
            alert('Veuillez saisir un numéro de téléphone valide.');
            return;
        }

        // Success
        alert('Merci pour votre message ! Nous vous recontacterons dans les plus brefs délais.');
        contactForm.reset();
    });

    // Quote buttons
    const quoteButtons = document.querySelectorAll('.btn-quote');
    quoteButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
            
            // Pre-fill message
            setTimeout(() => {
                const messageField = document.getElementById('message');
                const packageType = this.closest('.pricing-card').querySelector('h3').textContent;
                messageField.value = `Bonjour, je suis intéressé(e) par votre pack "${packageType}". Pourriez-vous me faire parvenir un devis détaillé ? Merci.`;
            }, 1000);
        });
    });
}

// Footer dynamic year
function initFooter() {
    const currentYearSpan = document.getElementById('current-year');
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;
}

// Scroll animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll behavior for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize CSS animations on load
document.addEventListener('DOMContentLoaded', function() {
    // Add initial styles for animations
    const style = document.createElement('style');
    style.textContent = `
        .hero-content {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }
        
        section {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease-out;
        }
        
        section.fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .yacht-card, .pricing-card, .service-item {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});