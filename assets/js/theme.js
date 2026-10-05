/* Theme: load in <head> (no defer) so the right theme paints first. */
(function () {
  var KEY = "lb-theme";
  var root = document.documentElement;

  function stored() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function preferred() {
    var s = stored();
    if (s === "light" || s === "dark") return s;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  root.setAttribute("data-theme", preferred());

  window.toggleTheme = function () {
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(KEY, next);
    } catch (e) {
      /* storage unavailable — theme still switches for this page */
    }
  };
})();
