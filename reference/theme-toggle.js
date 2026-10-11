/* Floating light/dark toggle for design-system preview cards.
   Toggles data-theme on <html>; persists per-browser. Include with:
   <script src="<relative>/theme-toggle.js"></script> */
(function () {
  var KEY = 'deltalk-theme';
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

  function mount() {
    if (document.getElementById('dt-theme-toggle')) return;
    // Reserve a clear strip at the top of every preview so the fixed toggle
    // never sits on top of component content.
    if (document.body) {
      var pad = parseFloat(getComputedStyle(document.body).paddingTop) || 0;
      if (pad < 64) document.body.style.paddingTop = '64px';
    }
    var b = document.createElement('button');
    b.id = 'dt-theme-toggle';
    b.type = 'button';
    b.setAttribute('aria-label', 'Toggle light/dark theme');
    b.style.cssText = 'position:fixed;inset-block-start:14px;inset-inline-start:14px;z-index:99999;' +
      'width:40px;height:40px;border-radius:999px;border:1.5px solid var(--border-strong);' +
      'background:var(--surface-card);color:var(--text-primary);cursor:pointer;box-shadow:var(--shadow-md);' +
      'font-size:18px;line-height:1;display:inline-flex;align-items:center;justify-content:center;';
    function paint() {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      b.textContent = dark ? '☀' : '☾';
    }
    b.addEventListener('click', function () {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (dark) { document.documentElement.removeAttribute('data-theme'); try { localStorage.setItem(KEY, 'light'); } catch (e) {} }
      else { document.documentElement.setAttribute('data-theme', 'dark'); try { localStorage.setItem(KEY, 'dark'); } catch (e) {} }
      paint();
    });
    document.body.appendChild(b);
    paint();
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
