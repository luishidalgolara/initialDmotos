// ===================================
// MOTORESCATE - INTERACTIVE FEATURES
// Premium motorcycle rescue service
// VERSIÓN SIMPLIFICADA: CONEXIÓN DIRECTA A WHATSAPP
// ===================================

// Global variables
let currentTestimonial = 0;
let fabOpen = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===================================
// INITIALIZATION
// ===================================

function initializeApp() {
    showLoadingScreen();
    setupEventListeners();
    initializeAnimations();
    
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        hideLoadingScreen();
        startCounterAnimations();
    }, 3000);
}

function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        
        // Animate loading bar
        const progress = loadingScreen.querySelector('.loading-progress');
        if (progress) {
            progress.style.width = '100%';
        }
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// ===================================
// EVENT LISTENERS
// ===================================

function setupEventListeners() {
    // Navigation scroll effect
    window.addEventListener('scroll', handleNavScroll);
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
    
    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Resize handler
    window.addEventListener('resize', handleResize);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function handleNavScroll() {
    const nav = document.getElementById('mainNav');
    if (nav) {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
            nav.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
            nav.style.boxShadow = 'none';
        }
    }
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function handleResize() {
    updateTestimonialDisplay();
}

function handleKeyboardNavigation(e) {
    // Testimonial navigation with arrow keys
    if (e.key === 'ArrowLeft') {
        previousTestimonial();
    } else if (e.key === 'ArrowRight') {
        nextTestimonial();
    }
}

// ===================================
// FUNCIÓN PRINCIPAL DE RESCATE INMEDIATO
// Muestra modal de confirmación primero
// ===================================

function openEmergencyRescue() {
    console.log('🚨 Mostrando modal de rescate urgente...');
    showWhatsAppModal();
}

function showWhatsAppModal() {
    const modal = document.getElementById('whatsappModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeWhatsAppModal() {
    const modal = document.getElementById('whatsappModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function confirmWhatsAppMessage() {
    console.log('📱 Abriendo WhatsApp con mensaje urgente...');
    const message = encodeURIComponent('¡HOLA! NECESITO RESCATE URGENTE, ME HE QUEDADO EN PANA CON MI MOTO. ¿PUEDEN AYUDARME INMEDIATAMENTE?');
    window.open(`https://wa.me/56931970961?text=${message}`, '_blank');
    closeWhatsAppModal();
}

// ===================================
// RESCUE CALCULATOR - SIMPLIFICADO
// ===================================

function openRescueCalculator() {
    console.log('📱 Redirigiendo a WhatsApp para cotización...');
    const message = encodeURIComponent('Hola, me gustaría obtener una cotización para el servicio de rescate de mi motocicleta.');
    window.open(`https://wa.me/56931970961?text=${message}`, '_blank');
}

// ===================================
// LOCATION - SIMPLIFICADO
// ===================================

function getCurrentLocation() {
    if ('geolocation' in navigator) {
        showNotification('Obteniendo tu ubicación...', 'info');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const message = encodeURIComponent(`¡Hola! Necesito servicio de rescate. Mi ubicación actual es: https://www.google.com/maps?q=${lat},${lng}`);
                window.open(`https://wa.me/56931970961?text=${message}`, '_blank');
            },
            () => {
                showNotification('No se pudo obtener tu ubicación. Contáctanos por WhatsApp.', 'warning');
                openWhatsApp();
            }
        );
    } else {
        showNotification('Tu navegador no soporta geolocalización', 'error');
        openWhatsApp();
    }
}

// ===================================
// TESTIMONIALS
// ===================================

function nextTestimonial() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0) return;
    
    testimonials[currentTestimonial].style.display = 'none';
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].style.display = 'block';
}

function previousTestimonial() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0) return;
    
    testimonials[currentTestimonial].style.display = 'none';
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    testimonials[currentTestimonial].style.display = 'block';
}

function currentTestimonialSelect(index) {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0 || index < 0 || index >= testimonials.length) return;
    
    testimonials[currentTestimonial].style.display = 'none';
    currentTestimonial = index;
    testimonials[currentTestimonial].style.display = 'block';
}

function updateTestimonialDisplay() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    testimonials.forEach((testimonial, index) => {
        testimonial.style.display = index === currentTestimonial ? 'block' : 'none';
    });
}

// ===================================
// MODAL FUNCTIONS - SIMPLIFICADAS
// ===================================

function requestRescue() {
    console.log('📱 Redirigiendo a WhatsApp para solicitar rescate...');
    const message = encodeURIComponent('¡Hola! Quiero confirmar mi solicitud de rescate para mi motocicleta.');
    window.open(`https://wa.me/56931970961?text=${message}`, '_blank');
}

function closeRescueModal() {
    const modal = document.getElementById('rescueModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function trackRescue() {
    showNotification('Contáctanos por WhatsApp para seguimiento en tiempo real', 'info');
    openWhatsApp();
}

// ===================================
// FLOATING ACTION BUTTON
// ===================================

function toggleFAB() {
    const fabOptions = document.getElementById('fabOptions');
    const fabMain = document.getElementById('fabMain');
    
    if (!fabOptions || !fabMain) return;
    
    fabOpen = !fabOpen;
    
    if (fabOpen) {
        fabOptions.classList.add('active');
        fabMain.innerHTML = '<i class="fas fa-times"></i>';
        fabMain.style.transform = 'rotate(45deg)';
    } else {
        fabOptions.classList.remove('active');
        fabMain.innerHTML = '<i class="fas fa-plus"></i>';
        fabMain.style.transform = 'rotate(0deg)';
    }
}

// ===================================
// CONTACT FUNCTIONS
// ===================================

function makeCall() {
    window.location.href = 'tel:+56931970961';
}

function openWhatsApp() {
    const message = encodeURIComponent('¡Hola! Necesito servicio de rescate para mi motocicleta. ¿Pueden ayudarme?');
    window.open(`https://wa.me/56931970961?text=${message}`, '_blank');
}

function sendEmail() {
    const subject = encodeURIComponent('Consulta sobre Servicio de Rescate');
    const body = encodeURIComponent('Hola,\n\nMe gustaría obtener más información sobre sus servicios de rescate para motocicletas.\n\nGracias.');
    window.location.href = `mailto:concepcion@InitialDmotos.com?subject=${subject}&body=${body}`;
}

function showCoverage() {
    showNotification('Contáctanos por WhatsApp para información sobre nuestra área de cobertura', 'info');
    setTimeout(() => {
        openWhatsApp();
    }, 2000);
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

function scrollToServices() {
    const servicesSection = document.getElementById('servicios');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        padding: 15px 20px;
        color: white;
        z-index: 10001;
        transform: translateX(400px);
        transition: transform 0.4s ease;
        max-width: 350px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    // Add type-specific styles
    if (type === 'success') {
        notification.style.borderColor = '#00c851';
    } else if (type === 'error') {
        notification.style.borderColor = '#ff4444';
    } else if (type === 'warning') {
        notification.style.borderColor = '#ffbb33';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 4000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// ===================================
// ANIMATIONS
// ===================================

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    document.querySelectorAll('.service-card, .info-card, .contact-card').forEach(el => {
        observer.observe(el);
    });
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}

function startCounterAnimations() {
    const counters = document.querySelectorAll('.stat-item');
    counters.forEach((counter, index) => {
        const target = parseInt(counter.dataset.count);
        const numberEl = counter.querySelector('.stat-number');
        
        if (numberEl && target) {
            setTimeout(() => {
                animateCounter(numberEl, 0, target, 2000);
            }, index * 200);
        }
    });
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        const current = Math.floor(start + (end - start) * easeOutQuart);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ===================================
// ERROR HANDLING
// ===================================

window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showNotification('Se produjo un error inesperado. Por favor, recarga la página.', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    showNotification('Error de conexión. Verifica tu conexión a internet.', 'error');
});

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

function enhanceAccessibility() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }
    
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
}

enhanceAccessibility();

// ===================================
// EXPORT FUNCTIONS FOR GLOBAL ACCESS
// ===================================

window.openEmergencyRescue = openEmergencyRescue;
window.showWhatsAppModal = showWhatsAppModal;
window.closeWhatsAppModal = closeWhatsAppModal;
window.confirmWhatsAppMessage = confirmWhatsAppMessage;
window.openRescueCalculator = openRescueCalculator;
window.getCurrentLocation = getCurrentLocation;
window.requestRescue = requestRescue;
window.closeRescueModal = closeRescueModal;
window.trackRescue = trackRescue;
window.nextTestimonial = nextTestimonial;
window.previousTestimonial = previousTestimonial;
window.currentTestimonial = currentTestimonialSelect;
window.toggleFAB = toggleFAB;
window.makeCall = makeCall;
window.openWhatsApp = openWhatsApp;
window.sendEmail = sendEmail;
window.showCoverage = showCoverage;
window.scrollToServices = scrollToServices;

console.log('✅ InitialDmotos Script cargado completamente - VERSIÓN SIMPLIFICADA: Conexión directa a WhatsApp +56931970961');