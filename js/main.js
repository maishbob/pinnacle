    // Scroll animations
    const animObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.hasAttribute('data-anim-stagger')) {
          el.querySelectorAll(':scope > *').forEach(child => child.classList.add('is-visible'));
        } else {
          el.classList.add('is-visible');
        }
        animObserver.unobserve(el);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('[data-anim], [data-anim-stagger]').forEach(el => animObserver.observe(el));

    // Mobile nav toggle
    const toggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (toggle && navMenu) {
      toggle.addEventListener('click', () => {
        const open = navMenu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
      navMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          navMenu.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        const answerId = btn.getAttribute('aria-controls');
        const answer = document.getElementById(answerId);

        // Close all others
        document.querySelectorAll('.faq-question').forEach(other => {
          other.setAttribute('aria-expanded', 'false');
          const otherId = other.getAttribute('aria-controls');
          document.getElementById(otherId).classList.remove('open');
        });

        if (!expanded) {
          btn.setAttribute('aria-expanded', 'true');
          answer.classList.add('open');
        }
      });
    });

    // Contact form — AJAX submission to Formspree
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.form-submit');
        const feedback = contactForm.querySelector('.form-feedback');

        const setFormError = (message) => {
          if (!feedback) return;
          const errorEl = document.createElement('p');
          errorEl.className = 'form-error';
          errorEl.setAttribute('role', 'alert');
          errorEl.textContent = message;
          feedback.replaceChildren(errorEl);
        };

        if (feedback) feedback.innerHTML = '';
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';

        try {
          const res = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { Accept: 'application/json' }
          });

          if (res.ok) {
            contactForm.innerHTML = `
              <div class="form-success" role="status" aria-live="polite">
                <h3>Message sent!</h3>
                <p>Thank you for reaching out. We will be in touch within one business day.</p>
              </div>`;
          } else {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message →';
            setFormError('Something went wrong. Please email us directly at info@pinnaclekenya.com.');
          }
        } catch {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message →';
          setFormError('Could not send message. Please email us at info@pinnaclekenya.com.');
        }
      });
    }
