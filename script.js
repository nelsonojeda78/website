/**
 * MI CASA SOLUCIONES - JAVASCRIPT FUNCIONALIDAD
 * Sitio web responsivo con interactividad
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Menú móvil
    // ============================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animación del botón hamburguesa
            const spans = this.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(45deg) translateY(10px)' 
                : 'none';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(-45deg) translateY(-10px)' 
                : 'none';
        });
        
        // Cerrar menú al hacer clic en un enlace
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // ============================================
    // Slider Antes/Después
    // ============================================
    const sliders = document.querySelectorAll('.ba-slider-range');
    
    sliders.forEach(slider => {
        const imagesContainer = slider.closest('.ba-images');
        const afterImage = imagesContainer.querySelector('.ba-after');
        
        if (!afterImage) return;
        
        function updateSlider(e) {
            const rect = imagesContainer.getBoundingClientRect();
            let x;
            
            if (e.type === 'touchmove' || e.type === 'touchstart') {
                x = e.touches[0].clientX - rect.left;
            } else {
                x = e.offsetX || e.clientX - rect.left;
            }
            
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        }
        
        // Mouse events
        slider.addEventListener('input', updateSlider);
        imagesContainer.addEventListener('mousemove', updateSlider);
        
        // Touch events
        slider.addEventListener('touchmove', updateSlider, { passive: true });
        imagesContainer.addEventListener('touchmove', updateSlider, { passive: true });
    });
    
    // ============================================
    // Smooth scroll para enlaces internos
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // Animación al hacer scroll (Intersection Observer)
    // ============================================
    const animateElements = document.querySelectorAll(
        '.problem-card, .service-card, .ba-project, .diff-item, .trust-item'
    );
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animateElements.forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    } else {
        // Fallback para navegadores antiguos
        animateElements.forEach(el => {
            el.style.opacity = '1';
        });
    }
    
    // ============================================
    // Header sticky con efecto de sombra
    // ============================================
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ============================================
    // Video placeholder click to play
    // ============================================
    const videoPlaceholder = document.querySelector('.video-placeholder');
    const videoElement = document.querySelector('.hero video');
    
    if (videoPlaceholder && videoElement) {
        videoPlaceholder.addEventListener('click', function() {
            if (videoElement.paused) {
                videoElement.play();
                this.style.display = 'none';
            } else {
                videoElement.pause();
                this.style.display = 'flex';
            }
        });
    }
    
    // ============================================
    // Prevenir envío de formularios vacíos (si se agregan)
    // ============================================
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--color-rojo)';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Por favor, completa todos los campos requeridos.');
            }
        });
    });
    
    // ============================================
    // Efecto parallax suave para el hero
    // ============================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
    
    // ============================================
    // Mostrar/ocultar botón "volver arriba"
    // ============================================
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(backToTopBtn);
    
    const updateBackToTop = () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'all';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    };
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', updateBackToTop);
    
    // ============================================
    // Agregar estilos dinámicos para botón volver arriba
    // ============================================
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: var(--color-ambar);
            color: var(--color-negro);
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 999;
        }
        
        .back-to-top:hover {
            transform: translateY(-5px);
            background-color: var(--color-carbon);
            color: var(--color-blanco);
        }
        
        @media (max-width: 768px) {
            .back-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
                font-size: 1.25rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ============================================
    // Inicializar animaciones
    // ============================================
    setTimeout(() => {
        animateElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
        });
    }, 100);
    
    console.log('Mi Casa Soluciones - Sitio web cargado correctamente');
});
