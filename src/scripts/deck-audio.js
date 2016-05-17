var util = require('./helpers');

module.exports = function(player) {
  return function(deck) {
    var
      HREF_ATTRIBUTE = 'data-href',
      HIDDEN_CLASS = 'hidden',
      LOADING_MSG_ID = 'loading-message',
      TRACK_LOAD_EVENT = 'yyyTrackLoad',
      TRACK_PLAY_EVENT = 'yyyTrackPlay';

    function nextSlide() {
      deck.next();
    }

    function triggerTrackLoad() {
      util.trigger(document, TRACK_LOAD_EVENT);
    }

    function triggerTrackPlay() {
      util.trigger(document, TRACK_PLAY_EVENT);
    }

    function activate(e) {
      // Get the URL from the markup. May be undefined
      var trackUrl = e.slide.getAttribute(HREF_ATTRIBUTE);

      player.switchTracks(trackUrl, triggerTrackLoad, triggerTrackPlay, nextSlide);

      var loadingMsg = document.getElementById(LOADING_MSG_ID);

      document.addEventListener(TRACK_LOAD_EVENT, function() {
        if (loadingMsg) {
          util.removeClass(loadingMsg, HIDDEN_CLASS);
        }
      });

      document.addEventListener(TRACK_PLAY_EVENT, function() {
        if (loadingMsg) {
          util.addClass(loadingMsg, HIDDEN_CLASS)
        }
      });
    }

    deck.on('activate', activate);
  }
};
