module.exports = (function() {

  var
    currentTrack,
    trackArray = {};

  function playTrack(trackUrl, beforePlay, onPlay, onEnd) {
    if (!!trackUrl) {

      if (!trackArray[trackUrl]) {

        if (beforePlay) {
          beforePlay();
        }

        currentTrack = new Howl({
          urls: [trackUrl],
          buffer: true,
          onplay: onPlay,
          onend: onEnd,
          onloaderror: function(e) {
            console.log('load error ' + e)
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
  }

  function pauseTrack(track, callback) {
    if (!!track) {

      track.fade(track.volume(), 0.0, 200, function() {
        track.pause();

        // Just to be safe
        Object.keys(trackArray).forEach(function(k) {
          trackArray[k].pause();
        });

        if (callback) callback();
      });
    }
  }

  function setPositionsToZero() {
    Object.keys(trackArray).forEach(function(k) {
      trackArray[k].stop();
    });
  }

  return {
    switchTracks: function(newUrl, beforePlay, onPlay, onEnd) {
      var newTrack;

      // Nothing is playing, so just play the incoming track
      if (currentTrack == null) {
        newTrack = playTrack(newUrl, beforePlay, onPlay, onEnd);
        return;
      }

      // Switching to a slide with no audio
      if (!newUrl) {
        pauseTrack(currentTrack);
        currentTrack = null;
        return;
      }

      // Otherwise, pause all and then play new track
      pauseTrack(currentTrack, function () {
        newTrack = playTrack(newUrl, beforePlay, onPlay, onEnd);
      });
    },

    getTrackArray: function() {
      return trackArray;
    },

    reset: setPositionsToZero
  };

})();
