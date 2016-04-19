var util = require('./helpers');

module.exports = function(player) {
  return function(deck) {
    var
      HAS_AUDIO_CLASS = '.has-audio',
      HIDDEN_CLASS = 'hidden',
      LOADING_MSG_ID = 'loading-message',

      findAudio = function(slide) {
        var element = slide.querySelectorAll(HAS_AUDIO_CLASS)[0];
        if (element) {
          return element.innerHTML;
        }
      },

      nextTrack = function() {
        deck.next();
      },

      activate = function(e) {

        if (!e.preview) {

          // Get the URL from the markup. May be undefined
          var trackUrl = findAudio(e.slide);

          player.switchTracks(trackUrl, nextTrack);

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
      }
    ;
    deck.on('activate', activate);
  }
};
