/* ============================================
   Anderson Pozo — Portfolio Scripts
   ============================================ */

// --- LOADER ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 800);
});

// --- CURSOR GLOW ---
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// --- NAVBAR SCROLL ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// --- HAMBURGER MENU ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// --- ACTIVE NAV LINK ON SCROLL ---
const sections = document.querySelectorAll('section');
const navLinksList = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -70% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinksList.forEach(link => {
                link.classList.toggle('active', link.dataset.section === id);
            });
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// --- REVEAL ON SCROLL ---
const revealElements = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
});

revealElements.forEach(el => revealObserver.observe(el));

// --- FLOATING PARTICLES (Hero section) ---
const particlesContainer = document.getElementById('heroParticles');

// --- CONTACT FORM AJAX ---
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(contactForm);
        formStatus.textContent = "Enviando...";
        formStatus.className = "form-status";
        
        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                formStatus.textContent = "¡Gracias! Tu mensaje ha sido enviado correctamente.";
                formStatus.className = "form-status success";
                contactForm.reset();
            } else {
                const result = await response.json();
                if (Object.hasOwn(result, 'errors')) {
                    formStatus.textContent = result.errors.map(error => error.message).join(", ");
                } else {
                    formStatus.textContent = "Oops! Ocurrió un problema al enviar el formulario.";
                }
                formStatus.className = "form-status error";
            }
        } catch (error) {
            formStatus.textContent = "Oops! Hubo un problema de conexión al enviar el formulario.";
            formStatus.className = "form-status error";
        }
    });
}

if (particlesContainer) {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particle-float ${Math.random() * 6 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 4}s;
        `;
        particlesContainer.appendChild(particle);
    }

    // Inject particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-float {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
            25% { transform: translate(${Math.random() * 40 - 20}px, -${Math.random() * 30 + 10}px) scale(1.2); opacity: 1; }
            50% { transform: translate(${Math.random() * 60 - 30}px, -${Math.random() * 50 + 20}px) scale(0.8); opacity: 0.3; }
            75% { transform: translate(${Math.random() * 20 - 10}px, -${Math.random() * 20 + 10}px) scale(1.1); opacity: 0.8; }
        }
    `;
    document.head.appendChild(style);
}
