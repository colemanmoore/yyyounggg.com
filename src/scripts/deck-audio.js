var util = require('./helpers');

module.exports = function(player) {
  return function(deck) {
    var
      HREF_ATTRIBUTE = 'data-href',
      HIDDEN_CLASS = 'hidden',
      LOADING_MSG_ID = 'loading-message';

    function nextSlide() {
      deck.next();
    }

    function triggerTrackLoad() {
      util.trigger(document, 'yyyTrackLoad');
    }

    function triggerTrackPlay() {
      util.trigger(document, 'yyyTrackPlay');
    }

    function activate(e) {
      // Get the URL from the markup. May be undefined
      var trackUrl = e.slide.getAttribute(HREF_ATTRIBUTE);

      player.switchTracks(trackUrl, triggerTrackLoad, triggerTrackPlay, nextSlide);

      var loadingMsg = document.getElementById(LOADING_MSG_ID);

      document.addEventListener('yyyTrackLoad', function() {
        if (loadingMsg) {
          util.removeClass(loadingMsg, HIDDEN_CLASS);
        }
      });

      document.addEventListener('yyyTrackPlay', function() {
        if (loadingMsg) {
          util.addClass(loadingMsg, HIDDEN_CLASS)
        }
      });
    }

    deck.on('activate', activate);
  }
};
