/* Static build shim — asset paths.

   The screens and the compiled bundle name their plates as ordinary strings relative to the
   design-system project ('../../assets/plates/x.mp4'). This build flattens those into two
   folders, images/ and videos/, addressed relative to the page (__VV_BASE). Rather than
   rewriting every source string, the mapping happens once, here, in the two places a path can
   be read: __vvResolveAsset (the boot preloader calls it for a URL) and React.createElement
   (every rendered <img>, <video> and plate prop). */
(function () {
  var B = window.__VV_BASE || '';
  var VIDEO = /\.(mp4|webm|mov|m4v)$/i;
  var PICK = /(?:^|\/)assets\/(?:plates\/|marks\/|icons\/)?([^\/]+)$/;
  function resolve(p) {
    if (typeof p !== 'string' || p.indexOf('assets/') === -1) return p;
    var m = PICK.exec(p);
    if (!m) return p;
    return B + (VIDEO.test(m[1]) ? 'videos/' : 'images/') + m[1];
  }
  window.__vvResolveAsset = resolve;

  var KEYS = ['src', 'plateSrc', 'poster', 'platePoster', 'logoSrc', 'markSrc', 'image'];
  var create = React.createElement;
  React.createElement = function (type, props) {
    if (props) {
      var swapped = null;
      for (var i = 0; i < KEYS.length; i++) {
        var k = KEYS[i], v = props[k];
        if (typeof v !== 'string') continue;
        var url = resolve(v);
        if (url === v) continue;
        if (!swapped) swapped = Object.assign({}, props);
        swapped[k] = url;
      }
      if (swapped) {
        var args = Array.prototype.slice.call(arguments);
        args[1] = swapped;
        return create.apply(React, args);
      }
    }
    return create.apply(React, arguments);
  };
})();
