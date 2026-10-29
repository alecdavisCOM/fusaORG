(function () {
  // Nav: solid background once the page scrolls
  var nav = document.getElementById('nav');
  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Reveal elements as they enter the viewport, staggering siblings
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (!el.closest('.hero') && !el.style.getPropertyValue('--d')) {
          var siblings = Array.prototype.filter.call(el.parentNode.children, function (c) {
            return c.classList.contains('reveal');
          });
          el.style.setProperty('--d', (siblings.indexOf(el) * 0.12) + 's');
        }
        el.classList.add('is-visible');
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Copy-to-clipboard for email addresses
  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-on'); }, 2200);
  }
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { showToast('Copied ' + text); },
          function () { showToast(text); }
        );
      } else {
        showToast(text);
      }
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
