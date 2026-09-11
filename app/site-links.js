/* Static build shim — links.

   The nav, footer and in-page CTAs address pages by logical route ('/about'), which the app
   intercepts and turns into a page load. On a static host those hrefs should ALSO be true
   URLs, so a link opens in a new tab, survives a middle click, and can be crawled. This
   rewrites each internal href to its built relative URL; Site.jsx maps the rewritten form
   back to its route when a plain click comes through. */
(function () {
  var B = window.__VV_BASE || '';
  var MAP = { '/': B || './', '/autonomy': B + 'autonomy/', '/about': B + 'about/', '/contact': B + 'contact/' };
  /* Some CTAs write their route hash-prefixed ('#/contact'); the app strips the '#' before
     resolving, so those are the same four destinations and get the same real URL. */
  Object.keys(MAP).forEach(function (k) { MAP['#' + k] = MAP[k]; });
  var queued = false;
  function fix() {
    queued = false;
    var as = document.querySelectorAll('a[href]');
    for (var i = 0; i < as.length; i++) {
      var h = as[i].getAttribute('href');
      if (MAP[h]) as[i].setAttribute('href', MAP[h]);
    }
  }
  function queue() { if (!queued) { queued = true; requestAnimationFrame(fix); } }
  /* The app mounts after the boot gate and re-renders on interaction (mobile menu, tabs), so
     one pass at load is not enough — watch for added nodes instead. Only childList is
     observed, so setting href above cannot retrigger this. */
  new MutationObserver(queue).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', queue);
  queue();
})();
