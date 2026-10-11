/* Highlights the nav link of the section currently being read. */
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var items = links.map(function (a) {
    var el = document.getElementById(a.getAttribute('href').slice(1));
    return el ? { a: a, el: el } : null;
  }).filter(Boolean);
  if (!items.length) return;

  var bar = document.querySelector('.topbar');
  var current = null, ticking = false;

  function update() {
    ticking = false;
    var line = (bar ? bar.offsetHeight : 0) + window.innerHeight * 0.25;
    var active = null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].el.getBoundingClientRect().top <= line) active = items[i];
    }
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) active = items[items.length - 1];
    if (active === current) return;
    current = active;
    items.forEach(function (it) {
      if (it === active) it.a.setAttribute('aria-current', 'true');
      else it.a.removeAttribute('aria-current');
    });
    if (active && active.a.offsetParent) {
      var nav = active.a.parentNode;
      if (nav.scrollWidth > nav.clientWidth) {
        nav.scrollLeft = active.a.offsetLeft - (nav.clientWidth - active.a.offsetWidth) / 2;
      }
    }
  }

  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
