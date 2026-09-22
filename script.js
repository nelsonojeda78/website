/**
 * MI CASA SOLUCIONES - Funcionalidad del sitio web
 * Menú móvil · Sliders antes/después · Carrusel de beneficios · Video
 */

document.addEventListener('DOMContentLoaded', function () {

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ============================================
       Menú móvil
       ============================================ */
    var mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    var navMenu = document.querySelector('.nav-menu');

    function closeMenu() {
        if (!navMenu) return;
        navMenu.classList.remove('active');
        var spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');

        mobileMenuBtn.addEventListener('click', function () {
            var open = navMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', open ? 'true' : 'false');
            var spans = this.querySelectorAll('span');
            spans[0].style.transform = open ? 'rotate(45deg) translateY(10px)' : 'none';
            spans[1].style.opacity = open ? '0' : '1';
            spans[2].style.transform = open ? 'rotate(-45deg) translateY(-10px)' : 'none';
        });

        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });
    }

    /* ============================================
       Sliders "Antes / Después"
       Convención: ANTES a la izquierda, DESPUÉS a la derecha.
       La imagen "después" se recorta desde la izquierda (inset left = p%),
       de modo que a la izquierda queda visible el ANTES y a la derecha
       el DESPUÉS. El tirador marca la frontera entre ambos.
       ============================================ */
    document.querySelectorAll('.ba-slider').forEach(function (slider) {
        var images = slider.querySelector('.ba-images');
        var after = slider.querySelector('.ba-after');
        var range = slider.querySelector('.ba-slider-range');
        var handle = slider.querySelector('.ba-handle');
        if (!images || !after || !range) return;

        function paint(pct) {
            var p = Math.max(0, Math.min(100, pct));
            after.style.clipPath = 'inset(0 0 0 ' + p + '%)';
            if (handle) handle.style.left = p + '%';
        }

        function fromEvent(clientX) {
            var rect = images.getBoundingClientRect();
            if (!rect.width) return null;
            return ((clientX - rect.left) / rect.width) * 100;
        }

        // Estado inicial
        paint(parseFloat(range.value) || 0);

        range.addEventListener('input', function () {
            paint(parseFloat(this.value));
        });

        // Arrastrar directamente sobre la imagen (ratón)
        var dragging = false;
        images.addEventListener('mousedown', function (e) {
            dragging = true;
            var p = fromEvent(e.clientX);
            if (p !== null) { paint(p); range.value = p; }
            e.preventDefault();
        });
        window.addEventListener('mousemove', function (e) {
            if (!dragging) return;
            var p = fromEvent(e.clientX);
            if (p !== null) { paint(p); range.value = p; }
        });
        window.addEventListener('mouseup', function () { dragging = false; });

        // Táctil
        images.addEventListener('touchstart', function (e) {
            var p = fromEvent(e.touches[0].clientX);
            if (p !== null) { paint(p); range.value = p; }
        }, { passive: true });
        images.addEventListener('touchmove', function (e) {
            var p = fromEvent(e.touches[0].clientX);
            if (p !== null) { paint(p); range.value = p; }
        }, { passive: true });
    });

    /* ============================================
       Carrusel de beneficios
       ============================================ */
    (function initCarousel() {
        var root = document.getElementById('benefitsCarousel');
        if (!root) return;

        var track = root.querySelector('.carousel-track');
        var slides = Array.prototype.slice.call(root.querySelectorAll('.carousel-slide'));
        var dots = Array.prototype.slice.call(root.querySelectorAll('.carousel-dot'));
        var prev = root.querySelector('.carousel-prev');
        var next = root.querySelector('.carousel-next');
        if (!track || slides.length === 0) return;

        var index = 0;
        var timer = null;
        var DELAY = 7000;

        // Barra de progreso
        var progress = document.createElement('div');
        progress.className = 'carousel-progress';
        progress.innerHTML = '<span></span>';
        root.appendChild(progress);
        var progressBar = progress.querySelector('span');

        function go(i) {
            index = (i + slides.length) % slides.length;
            track.style.transform = 'translateX(' + (-index * 100) + '%)';
            slides.forEach(function (s, k) {
                s.classList.toggle('is-active', k === index);
                s.setAttribute('aria-hidden', k === index ? 'false' : 'true');
            });
            dots.forEach(function (d, k) {
                d.classList.toggle('is-active', k === index);
                d.setAttribute('aria-selected', k === index ? 'true' : 'false');
            });
            restartProgress();
        }

        function restartProgress() {
            if (reduceMotion || !progressBar) return;
            progressBar.classList.remove('is-running');
            void progressBar.offsetWidth; // fuerza reinicio de la animación
            progressBar.style.animationDuration = (DELAY / 1000) + 's';
            progressBar.classList.add('is-running');
        }

        function start() {
            stop();
            if (reduceMotion) return;
            timer = setInterval(function () { go(index + 1); }, DELAY);
            restartProgress();
        }

        function stop() {
            if (timer) { clearInterval(timer); timer = null; }
            if (progressBar) progressBar.classList.remove('is-running');
        }

        if (prev) prev.addEventListener('click', function () { go(index - 1); start(); });
        if (next) next.addEventListener('click', function () { go(index + 1); start(); });

        dots.forEach(function (d) {
            d.addEventListener('click', function () {
                go(parseInt(this.getAttribute('data-slide'), 10) || 0);
                start();
            });
        });

        // Pausa al pasar el ratón o al enfocar
        root.addEventListener('mouseenter', stop);
        root.addEventListener('mouseleave', start);
        root.addEventListener('focusin', stop);

        // Gesto táctil
        var startX = null;
        root.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
            stop();
        }, { passive: true });
        root.addEventListener('touchend', function (e) {
            if (startX === null) return;
            var dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 40) go(dx < 0 ? index + 1 : index - 1);
            startX = null;
            start();
        }, { passive: true });

        // Navegación con teclado
        root.setAttribute('tabindex', '0');
        root.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') { go(index - 1); start(); }
            if (e.key === 'ArrowRight') { go(index + 1); start(); }
        });

        // Pausa cuando la pestaña no está visible
        document.addEventListener('visibilitychange', function () {
            document.hidden ? stop() : start();
        });

        go(0);
        start();
    })();

    /* ============================================
       Video: el marcador de posición es visible desde el inicio.
       Al hacer clic se carga el reproductor real si existe.
       ============================================ */
    (function initVideo() {
        var ph = document.getElementById('videoPlaceholder');
        if (!ph) return;

        var frame = ph.parentElement; // .video-frame

        function activate() {
            var iframe = frame.querySelector('iframe.video-embed');
            var video = frame.querySelector('video.video-embed');

            if (iframe) {
                iframe.src = iframe.getAttribute('data-src') || iframe.src;
                iframe.style.display = 'block';
                ph.style.display = 'none';
                return;
            }
            if (video) {
                video.style.display = 'block';
                ph.style.display = 'none';
                var p = video.play();
                if (p && p.catch) p.catch(function () { /* autoplay bloqueado */ });
                return;
            }
            // Todavía no hay video publicado: llevar al visitante a WhatsApp
            window.open(
                'https://wa.me/593963303081?text=' +
                encodeURIComponent('Hola, quiero saber cómo trabajan y ver el video'),
                '_blank', 'noopener'
            );
        }

        ph.addEventListener('click', activate);
        ph.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
        });
    })();

    /* ============================================
       Scroll suave para enlaces internos
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            var target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            var top = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    });

    /* ============================================
       Revelado al hacer scroll (a prueba de fallos)
       La clase .reveal solo se oculta si JS está activo,
       así el contenido nunca queda invisible.
       ============================================ */
    (function initReveal() {
        document.documentElement.classList.add('js-ready');

        var els = document.querySelectorAll(
            '.problem-card, .service-card, .ba-project, .diff-item, .trust-item'
        );
        els.forEach(function (el) { el.classList.add('reveal'); });

        if (reduceMotion || !('IntersectionObserver' in window)) {
            els.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

        els.forEach(function (el) { observer.observe(el); });

        // Red de seguridad: si algo no se observó, se muestra igualmente.
        setTimeout(function () {
            els.forEach(function (el) {
                if (!el.classList.contains('is-visible')) {
                    var r = el.getBoundingClientRect();
                    if (r.top < window.innerHeight) el.classList.add('is-visible');
                }
            });
        }, 1200);
    })();

    /* ============================================
       Sombra del header y botón "volver arriba"
       ============================================ */
    var header = document.querySelector('.header');

    var backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '&uarr;';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(backToTopBtn);

    function onScroll() {
        var y = window.pageYOffset;

        if (header) {
            header.style.boxShadow = y > 100
                ? '0 4px 20px rgba(0, 0, 0, 0.15)'
                : '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        if (y > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'all';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    }

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });

    var ticking = false;
    window.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () { onScroll(); ticking = false; });
    });
    onScroll();

    /* Estilos del botón "volver arriba" */
    var style = document.createElement('style');
    style.textContent =
        '.back-to-top{position:fixed;bottom:30px;right:30px;width:50px;height:50px;' +
        'background-color:var(--color-ambar);color:var(--color-negro);border:none;' +
        'border-radius:50%;font-size:1.5rem;cursor:pointer;opacity:0;pointer-events:none;' +
        'transition:opacity .3s ease,transform .3s ease,background-color .3s ease;' +
        'box-shadow:0 4px 15px rgba(0,0,0,.2);z-index:999;}' +
        '.back-to-top:hover{transform:translateY(-5px);background-color:var(--color-carbon);' +
        'color:var(--color-blanco);}' +
        '@media(max-width:768px){.back-to-top{bottom:20px;right:20px;width:45px;height:45px;' +
        'font-size:1.25rem;}}';
    document.head.appendChild(style);

    console.log('Mi Casa Soluciones - Sitio web cargado correctamente');
});
