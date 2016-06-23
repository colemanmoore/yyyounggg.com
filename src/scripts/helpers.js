module.exports = (function() {

  function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  function addClass(el, className) {
    if (el.classList)
      el.classList.add(className);
    else
      el.className += ' ' + className;
  }

  function removeClass(el, className) {
    if (el.classList)
      el.classList.remove(className);
    else
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }

  function hasClass(el, className) {
    if (el.classList)
      el.classList.contains(className);
    else
      new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }

  function trigger(el, string) {
    var event = document.createEvent('Event');
    event.initEvent(string, true, true);
    el.dispatchEvent(event);
  }

  function addEventListener(el, eventName, handler) {
    if (el.addEventListener) {
      el.addEventListener(eventName, handler);
    } else {
      el.attachEvent('on' + eventName, function() {
        handler.call(el);
      });
    }
  }

  return {
    ready: ready,
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    trigger: trigger,
    addEventListener: addEventListener
  }

})();
