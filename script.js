// NÚMERO DE TELÉFONO
const TELEFONO = '56931970961';

let currentTestimonial = 0;
let fabOpen = false;

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Script cargado - Número: +' + TELEFONO);
    initializeApp();
});

function initializeApp() {
    showLoadingScreen();
    setupEventListeners();
    initializeAnimations();
    setTimeout(() => {
        hideLoadingScreen();
        startCounterAnimations();
    }, 3000);
}

function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        const progress = loadingScreen.querySelector('.loading-progress');
        if (progress) progress.style.width = '100%';
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => loadingScreen.style.display = 'none', 500);
    }
}

function setupEventListeners() {
    window.addEventListener('scroll', handleNavScroll);
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    window.addEventListener('resize', handleResize);
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
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
}

function handleResize() {
    updateTestimonialDisplay();
}

function handleKeyboardNavigation(e) {
    if (e.key === 'ArrowLeft') previousTestimonial();
    else if (e.key === 'ArrowRight') nextTestimonial();
}

function openEmergencyRescue() {
    console.log('🚨 Abriendo modal de emergencia...');
    showWhatsAppModal();
}

function showWhatsAppModal() {
    const modal = document.getElementById('whatsappModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('✅ Modal abierto');
    }
}

function closeWhatsAppModal() {
    const modal = document.getElementById('whatsappModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        console.log('❌ Modal cerrado');
    }
}

function confirmWhatsAppMessage() {
    console.log('📱 EJECUTANDO confirmWhatsAppMessage()');
    console.log('📱 Número:', TELEFONO);
    const mensaje = '¡HOLA! NECESITO RESCATE URGENTE, ME HE QUEDADO EN PANA CON MI MOTO. ¿PUEDEN AYUDARME INMEDIATAMENTE?';
    const url = 'https://wa.me/' + TELEFONO + '?text=' + encodeURIComponent(mensaje);
    console.log('📱 URL:', url);
    const ventana = window.open(url, '_blank');
    if (!ventana) {
        console.log('⚠️ Popup bloqueado, usando location.href');
        window.location.href = url;
    }
    closeWhatsAppModal();
}

function openRescueCalculator() {
    const msg = encodeURIComponent('Hola, me gustaría obtener una cotización para el servicio de rescate de mi motocicleta.');
    window.open('https://wa.me/' + TELEFONO + '?text=' + msg, '_blank');
}

function getCurrentLocation() {
    if ('geolocation' in navigator) {
        showNotification('Obteniendo ubicación...', 'info');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const msg = encodeURIComponent('¡Hola! Necesito rescate. Ubicación: https://www.google.com/maps?q=' + position.coords.latitude + ',' + position.coords.longitude);
                window.open('https://wa.me/' + TELEFONO + '?text=' + msg, '_blank');
            },
            () => {
                showNotification('No se pudo obtener ubicación', 'warning');
                openWhatsApp();
            }
        );
    } else {
        openWhatsApp();
    }
}

function requestRescue() {
    const msg = encodeURIComponent('¡Hola! Quiero confirmar mi solicitud de rescate.');
    window.open('https://wa.me/' + TELEFONO + '?text=' + msg, '_blank');
}

function closeRescueModal() {
    const modal = document.getElementById('rescueModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function trackRescue() {
    showNotification('Conectando...', 'info');
    setTimeout(() => openWhatsApp(), 1500);
}

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
    testimonials.forEach((t, i) => t.style.display = i === currentTestimonial ? 'block' : 'none');
}

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

function makeCall() {
    window.location.href = 'tel:+' + TELEFONO;
}

function openWhatsApp() {
    const msg = encodeURIComponent('¡Hola! Necesito servicio de rescate. ¿Pueden ayudarme?');
    window.open('https://wa.me/' + TELEFONO + '?text=' + msg, '_blank');
}

function sendEmail() {
    window.location.href = 'mailto:concepcion@InitialDmotos.com?subject=' + encodeURIComponent('Consulta Servicio Rescate');
}

function showCoverage() {
    showNotification('Contáctanos por WhatsApp', 'info');
    setTimeout(() => openWhatsApp(), 2000);
}

function scrollToServices() {
    const section = document.getElementById('servicios');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

function showNotification(message, type = 'info') {
    const n = document.createElement('div');
    n.innerHTML = '<i class="fas fa-' + getNotificationIcon(type) + '"></i><span>' + message + '</span>';
    n.style.cssText = 'position:fixed;top:100px;right:30px;background:rgba(0,0,0,0.9);border:1px solid rgba(255,255,255,0.2);border-radius:15px;padding:15px 20px;color:white;z-index:10001;transform:translateX(400px);transition:transform 0.4s;';
    if (type === 'success') n.style.borderColor = '#00c851';
    else if (type === 'error') n.style.borderColor = '#ff4444';
    else if (type === 'warning') n.style.borderColor = '#ffbb33';
    document.body.appendChild(n);
    setTimeout(() => n.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        n.style.transform = 'translateX(400px)';
        setTimeout(() => { if (n.parentNode) n.parentNode.removeChild(n); }, 400);
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

function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.service-card, .info-card, .contact-card').forEach(el => observer.observe(el));
}

function startCounterAnimations() {
    const counters = document.querySelectorAll('.stat-item');
    counters.forEach((counter, index) => {
        const target = parseInt(counter.dataset.count);
        const numberEl = counter.querySelector('.stat-number');
        if (numberEl && target) {
            setTimeout(() => animateCounter(numberEl, 0, target, 2000), index * 200);
        }
    });
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * (1 - Math.pow(1 - progress, 4)));
        element.textContent = current;
        if (progress < 1) requestAnimationFrame(update);
        else element.textContent = end;
    }
    requestAnimationFrame(update);
}

window.addEventListener('error', () => showNotification('Error inesperado', 'error'));
window.addEventListener('unhandledrejection', () => showNotification('Error de conexión', 'error'));

document.addEventListener('keydown', (e) => { if (e.key === 'Tab') document.body.classList.add('keyboard-navigation'); });
document.addEventListener('mousedown', () => document.body.classList.remove('keyboard-navigation'));

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

console.log('✅ InitialDmotos - Número: +' + TELEFONO);
