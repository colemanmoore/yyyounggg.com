var Howl = require('howler').Howl;

module.exports = function() {
  return function(deck) {
    var
      HIDDEN_AUDIO_CLASS = '.has-audio',
      currentTrack,
      trackArray = {},

      findAudio = function(scope) {
        var element = scope.querySelectorAll(HIDDEN_AUDIO_CLASS)[0];
        if (!!element) {
          return element.innerHTML;
        }
      },

      playTrack = function(trackUrl) {
        if (!!trackUrl) {

          if (!trackArray[trackUrl]) {

            currentTrack = new Howl({
              urls: [trackUrl],
              buffer: true
              //,onend: deck.next TODO
            });

            trackArray[trackUrl] = currentTrack;

          } else {

            currentTrack = trackArray[trackUrl];
            currentTrack.fade(currentTrack.volume(), 1.0, 600);
          }

          currentTrack.play();

        }
      },

      pauseTrack = function(track, callback) {
        if (!!track) {
          track.fade(track.volume(), 0.0, 200, function() {
            track.pause();
            if (callback) callback();
          });
        }
      },

      switchTracks = function(newUrl) {

        // Nothing is playing, so just play the incoming track
        if (currentTrack == null) {
          playTrack(newUrl);
          return;
        }

        // Switching to a slide with no audio
        if (newUrl === undefined) {
          pauseTrack(currentTrack);
          currentTrack = null;
          return;
        }

        // Otherwise, fade out the playing track and then play the next
        pauseTrack(currentTrack, function() {
          playTrack(newUrl);
        });

      },

      activate = function(e) {

        if (!e.preview) {

          // Get the URL from the markup. May be undefined
          var trackUrl = findAudio(e.slide);

          switchTracks(trackUrl);
        }
      }
    ;
    deck.on('activate', activate);
  }
}
