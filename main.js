/* ============================================================
   main.js — shared behavior for every page
   Link this from any page and dark mode + scroll animations
   work automatically. The user's theme choice is saved in
   localStorage, which is shared across all pages of the site,
   so the setting carries over everywhere.
   ============================================================ */
(function () {
  var root = document.documentElement;

  /* ---------- Dark mode toggle ----------
     The theme was already applied before paint by the small
     inline script in each page's <head>. Here we just handle
     clicks on the toggle button and remember the choice. */
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode, ignore */ }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  items.forEach(function (el) { io.observe(el); });
})();
