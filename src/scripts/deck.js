var
  controls = require('./deck-control'),
  audio = require('./deck-audio');

module.exports = function(opts) {

  /**
   * Deck parent
   */

  var parent = (opts.parent || opts).nodeType === 1 ? (opts.parent || opts) : document.querySelector(opts.parent || opts),
    slides = [].filter.call(typeof opts.slides === 'string' ? parent.querySelectorAll(opts.slides) : (opts.slides || parent.children), function(el) { return el.nodeName !== 'SCRIPT'; }),
    activeSlide = slides[0],
    listeners = {},

    activate = function(index, customData) {
      if (!slides[index]) {
        return;
      }

      fire('deactivate', createEventData(activeSlide, customData));
      activeSlide = slides[index];
      fire('activate', createEventData(activeSlide, customData));
    },

    slide = function(index, customData) {
      if (arguments.length) {
        fire('slide', createEventData(slides[index], customData)) && activate(index, customData);
      } else {
        return slides.indexOf(activeSlide);
      }
    },

    step = function(offset, customData) {
      var slideIndex = slides.indexOf(activeSlide) + offset;

      fire(offset > 0 ? 'next' : 'prev', createEventData(activeSlide, customData)) && activate(slideIndex, customData);
    },

    on = function(eventName, callback) {
      (listeners[eventName] || (listeners[eventName] = [])).push(callback);
      return off.bind(null, eventName, callback);
    },

    off = function(eventName, callback) {
      listeners[eventName] = (listeners[eventName] || []).filter(function(listener) { return listener !== callback; });
    },

    fire = function(eventName, eventData) {
      return (listeners[eventName] || [])
        .reduce(function(notCancelled, callback) {
          return notCancelled && callback(eventData) !== false;
        }, true);
    },

    createEventData = function(el, eventData) {
      eventData = eventData || {};
      eventData.index = slides.indexOf(el);
      eventData.slide = el;
      return eventData;
    },

    deck = {
      on: on,
      off: off,
      fire: fire,
      slide: slide,
      next: step.bind(null, 1),
      prev: step.bind(null, -1),
      parent: parent,
      slides: slides
    };

  /**
   * Deck classes
   */

  var addClass = function(el, cls) {
      el.classList.add('bespoke-' + cls);
    },

    removeClass = function(el, cls) {
      el.className = el.className
        .replace(new RegExp('bespoke-' + cls +'(\\s|$)', 'g'), ' ')
        .trim();
    },

    deactivate = function(el, index) {
      var activeSlide = deck.slides[deck.slide()],
        offset = index - deck.slide(),
        offsetClass = offset > 0 ? 'after' : 'before';

      ['before(-\\d+)?', 'after(-\\d+)?', 'active', 'inactive'].map(removeClass.bind(null, el));

      if (el !== activeSlide) {
        ['inactive', offsetClass, offsetClass + '-' + Math.abs(offset)].map(addClass.bind(null, el));
      }
    };

  addClass(deck.parent, 'parent');
  deck.slides.map(function(el) { addClass(el, 'slide'); });

  deck.on('activate', function(e) {
    deck.slides.map(deactivate);
    addClass(e.slide, 'active');
    removeClass(e.slide, 'inactive');
  });

  /**
   * Deck scale
   */

  var firstSlide = deck.slides[0],
    slideHeight = firstSlide.offsetHeight,
    slideWidth = firstSlide.offsetWidth,
    useZoom = 'zoom' in parent.style,

    wrap = function(element) {
      var wrapper = document.createElement('div');
      wrapper.className = 'bespoke-scale-parent';
      element.parentNode.insertBefore(wrapper, element);
      wrapper.appendChild(element);
      return wrapper;
    },

    elements = useZoom ? deck.slides : deck.slides.map(wrap),

    transformProperty = (function(property) {
      var prefixes = 'Moz Webkit O ms'.split(' ');
      return prefixes.reduce(function(currentProperty, prefix) {
        return prefix + property in parent.style ? prefix + property : currentProperty;
      }, property.toLowerCase());
    }('Transform')),

    scale = useZoom ?
      function(ratio, element) {
        element.style.zoom = ratio;
      } :
      function(ratio, element) {
        element.style[transformProperty] = 'scale(' + ratio + ')';
      },

    scaleAll = function() {
      var xScale = parent.offsetWidth / slideWidth,
        yScale = parent.offsetHeight / slideHeight;

      elements.forEach(scale.bind(null, Math.min(xScale, yScale)));
    };

  window.addEventListener('resize', scaleAll);
  scaleAll();

  /**
   * Deck loop
   */
  deck.on('prev', function(e) {
    if (e.index === 0) {
      deck.slide(deck.slides.length - 1);
    }
  });

  deck.on('next', function(e) {
    if (e.index === deck.slides.length - 1) {
      deck.slide(0);
    }
  });

  /**
   * Deck state
   */
  var modifyState = function(method, event) {
    var attr = event.slide.getAttribute('data-bespoke-state');

    if (attr) {
      attr.split(' ').forEach(function(state) {
        deck.parent.classList[method](state);
      });
    }
  };

  deck.on('activate', modifyState.bind(null, 'add'));
  deck.on('deactivate', modifyState.bind(null, 'remove'));


  /**
   * Deck controls and audio
   */

  controls()(deck);

  if (opts.player) {
    audio(opts.player)(deck);
  }

  activate(0);

  return deck;
};
