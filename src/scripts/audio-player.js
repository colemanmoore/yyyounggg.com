var
  Howl = require('howler').Howl,
  util = require('./helpers');

module.exports = (function() {

  var
    currentTrack,
    trackArray = {};

  var playTrack = function(trackUrl, onEnd) {
    if (!!trackUrl) {

      if (!trackArray[trackUrl]) {

        util.trigger(document, 'yyyTrackLoad');

        currentTrack = new Howl({
          urls: [trackUrl],
          buffer: true,
          onend: onEnd,
          onplay: function() {
            util.trigger(document, 'yyyTrackPlay');
          }
        });

        trackArray[trackUrl] = currentTrack;

      } else {

        currentTrack = trackArray[trackUrl];
        currentTrack.fade(currentTrack.volume(), 1.0, 600);
      }

      currentTrack.play();
      return currentTrack;

    }
  };

  var pauseTrack = function(track, callback) {
    if (!!track) {

      track.fade(track.volume(), 0.0, 200, function() {
        track.pause();

        // Just to be safe
        var keys = Object.keys(trackArray);
        keys.forEach(function(k) {
          trackArray[k].pause();
        });

        if (callback) callback();
      });
    }
  };

  return {
    switchTracks: function(newUrl, onEnd) {
      var newTrack;

      // Nothing is playing, so just play the incoming track
      if (currentTrack == null) {
        newTrack = playTrack(newUrl, onEnd);
        return;
      }

      // Switching to a slide with no audio
      if (newUrl === undefined) {
        pauseTrack(currentTrack);
        currentTrack = null;
        return;
      }

      // Otherwise, pause all and then play new track
      pauseTrack(currentTrack, function () {
        newTrack = playTrack(newUrl, onEnd);
      });

      return newTrack;
    },

    getTrackArray: function() {
      return trackArray;
    }
  };

})();
