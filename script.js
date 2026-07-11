(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const slider = document.querySelector('[data-slider]');
  if (slider) {
    const slides = [...slider.querySelectorAll('.hero-slide')];
    const dotsWrap = slider.querySelector('[data-dots]');
    const prev = slider.querySelector('[data-prev]');
    const next = slider.querySelector('[data-next]');
    let current = 0;
    let timer;

    const dots = slides.map((_, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', `Go to slide ${index + 1}`);
      button.addEventListener('click', () => show(index, true));
      dotsWrap.appendChild(button);
      return button;
    });

    function show(index, restart = false) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
      if (restart) startAuto();
    }

    function startAuto() {
      window.clearInterval(timer);
      timer = window.setInterval(() => show(current + 1), 6500);
    }

    prev?.addEventListener('click', () => show(current - 1, true));
    next?.addEventListener('click', () => show(current + 1, true));
    slider.addEventListener('mouseenter', () => window.clearInterval(timer));
    slider.addEventListener('mouseleave', startAuto);

    show(0);
    startAuto();
  }

  const dialog = document.querySelector('[data-lightbox-dialog]');
  const lightboxImage = document.querySelector('[data-lightbox-image]');
  const closeButton = document.querySelector('[data-lightbox-close]');

  document.querySelectorAll('[data-lightbox]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!dialog || !lightboxImage) return;
      lightboxImage.src = button.dataset.lightbox;
      if (typeof dialog.showModal === 'function') dialog.showModal();
    });
  });

  closeButton?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const registrationForm = document.querySelector('[data-registration-form]');
  const formStatus = document.querySelector('[data-form-status]');

  registrationForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!registrationForm.checkValidity()) {
      registrationForm.reportValidity();
      return;
    }

    if (formStatus) {
      formStatus.textContent = 'Thank you. Your registration form has been submitted.';
    }
    registrationForm.reset();
  });
})();
