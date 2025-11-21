
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
  
    // Función para abrir el menú y ocultar el botón
    function openMenu() {
      navMenu.classList.add('active');
      hamburger.style.display = 'none';
    }
  
    // Función para cerrar el menú y mostrar el botón
    function closeMenu() {
      navMenu.classList.remove('active');
      hamburger.style.display = 'flex';
    }
  
    // Al hacer clic en el botón hamburguesa, abre el menú
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation(); // Evita que el clic se propague al documento
      openMenu();
    });
  
    // Cierra el menú si se hace clic fuera de éste o del botón hamburguesa
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });
  
    // Opcional: Cierra el menú cuando se hace clic en un enlace de navegación
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

(function () {
  const container = document.querySelector('.carousel-container');
  if (!container) return;

  // Selecciona los elementos .carousel (cada uno contiene una .perfil)
  const slideEls = Array.from(container.querySelectorAll('.carousel'));
  if (slideEls.length === 0) return;

  // Crear track si no existe y mover las .carousel dentro
  let track = container.querySelector('.carousel-track');
  if (!track) {
    track = document.createElement('div');
    track.className = 'carousel-track';
    slideEls.forEach(el => track.appendChild(el));
    // Inserta el track antes del botón "next" para mantener botones afuera
    const nextBtn = container.querySelector('#nextBtn');
    container.insertBefore(track, nextBtn || null);
  }

  // Estilos en línea mínimos necesarios para el track y slides
  Object.assign(track.style, {
    display: 'flex',
    transition: 'transform 0.6s ease',
    width: `${slideEls.length * 100}%`,
    boxSizing: 'border-box',
  });
  slideEls.forEach(slide => {
    Object.assign(slide.style, {
      minWidth: `${100 / slideEls.length}%`,
      boxSizing: 'border-box',
    });
  });

  const prevBtn = container.querySelector('#prevBtn');
  const nextBtn = container.querySelector('#nextBtn');
  let index = 0;
  const total = slideEls.length;
  const AUTOPLAY_DELAY = 5000;
  let autoplayTimer = null;

  function updateTransform() {
    // Usamos porcentaje relativo al número de slides
    const percent = (index * 100) / total;
    track.style.transform = `translateX(-${percent}%)`;
  }

  function goTo(i) {
    index = (i + total) % total;
    updateTransform();
  }
  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  // Botones
  prevBtn && prevBtn.addEventListener('click', () => { prev(); restartAutoplay(); });
  nextBtn && nextBtn.addEventListener('click', () => { next(); restartAutoplay(); });

  // Teclas
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { prev(); restartAutoplay(); }
    if (e.key === 'ArrowRight') { next(); restartAutoplay(); }
  });

  // Autoplay
  function startAutoplay() { stopAutoplay(); autoplayTimer = setInterval(next, AUTOPLAY_DELAY); }
  function stopAutoplay() { if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; } }
  function restartAutoplay() { stopAutoplay(); startAutoplay(); }

  // Pausar al hover / focus
  container.addEventListener('mouseenter', stopAutoplay);
  container.addEventListener('mouseleave', startAutoplay);
  container.addEventListener('focusin', stopAutoplay);
  container.addEventListener('focusout', startAutoplay);

  // Soporte táctil (swipe)
  let startX = 0;
  let isDragging = false;
  track.addEventListener('touchstart', (e) => {
    stopAutoplay();
    startX = e.touches[0].clientX;
    isDragging = true;
    track.style.transition = 'none';
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - startX;
    const percentDelta = (dx / container.clientWidth) * (100 / total);
    const currentPercent = (index * 100) / total;
    track.style.transform = `translateX(-${currentPercent - percentDelta}%)`;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const endX = (e.changedTouches && e.changedTouches[0].clientX) || startX;
    const dx = endX - startX;
    track.style.transition = 'transform 0.6s ease';
    if (Math.abs(dx) > 50) {
      if (dx < 0) next(); else prev();
    } else {
      updateTransform();
    }
    isDragging = false;
    restartAutoplay();
  });

  // Ajustar en resize
  window.addEventListener('resize', updateTransform);

  // Inicializa
  updateTransform();
  startAutoplay();
})();