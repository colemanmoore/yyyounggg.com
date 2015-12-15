module.exports = function(audioplayer, art) {
  return function(deck) {
    var
      HIDDEN_AUDIO_CLASS = '.has-audio',

      findAudio = function(scope) {
        var element = scope.querySelectorAll(HIDDEN_AUDIO_CLASS)[0];
        if (!!element) {
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

          audioplayer.switchTracks(trackUrl, nextTrack);
        }
      }
    ;
    deck.on('activate', activate);
  }
};
