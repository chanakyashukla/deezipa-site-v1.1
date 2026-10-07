/* Deezipa Official Website v1.0 — production handoff interactions.
   No external requests. No data leaves this page.
   The enquiry form is intentionally INACTIVE at v1.0: submission is
   blocked until Web3Forms activation (see documentation/
   CONTACT_FORM_ACTIVATION_NOTE.md). */
(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---------- Active section highlighting ---------- */
  var sectionIds = ['who-we-are', 'what-we-build', 'how-we-work', 'evidence', 'collaborations', 'leadership', 'contact'];
  var navLinks = {};

  sectionIds.forEach(function (id) {
    var link = document.querySelector('.site-nav ul a[href="#' + id + '"]');
    if (link) navLinks[id] = link;
  });

  var observed = sectionIds
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && observed.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = navLinks[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.keys(navLinks).forEach(function (k) {
            navLinks[k].removeAttribute('aria-current');
          });
          link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    observed.forEach(function (s) { io.observe(s); });
  }

  /* ---------- Enquiry form: inactive launch state ---------- */
  var form = document.getElementById('enquiryForm');
  var status = document.getElementById('formStatus');

  if (form && status) {
    var checks = [
      { id: 'f-name', test: function (v) { return v.trim().length > 0; } },
      { id: 'f-email', test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); } },
      { id: 'f-type', test: function (v) { return v !== ''; } },
      { id: 'f-brief', test: function (v) { return v.trim().length > 0; } }
    ];

    function setError(fieldId, show) {
      var input = document.getElementById(fieldId);
      if (!input) return;
      var wrap = input.closest('.field');
      var err = document.getElementById(fieldId + '-err');
      if (wrap) wrap.classList.toggle('is-invalid', show);
      if (err) err.hidden = !show;
      input.setAttribute('aria-invalid', show ? 'true' : 'false');
    }

    checks.forEach(function (c) {
      var el = document.getElementById(c.id);
      if (!el) return;
      el.addEventListener('input', function () {
        if (el.closest('.field') && el.closest('.field').classList.contains('is-invalid')) {
          setError(c.id, !c.test(el.value));
        }
      });
      el.addEventListener('change', function () {
        if (el.closest('.field') && el.closest('.field').classList.contains('is-invalid')) {
          setError(c.id, !c.test(el.value));
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstBad = null;
      checks.forEach(function (c) {
        var el = document.getElementById(c.id);
        var ok = c.test(el.value);
        setError(c.id, !ok);
        if (!ok && !firstBad) firstBad = el;
      });

      if (firstBad) {
        status.hidden = true;
        status.innerHTML = '';
        firstBad.focus();
        return;
      }

      status.hidden = false;
      status.innerHTML =
        '<strong>Online enquiry submission is being activated shortly.</strong>' +
        'Your enquiry has not been sent. The online form will begin ' +
        'delivering enquiries once activation is complete.';
      status.focus && status.focus();
    });
  }
})();
