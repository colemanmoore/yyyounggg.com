var
  deck = require('./deck'),
  util = require('./helpers'),
  player = require('./audio-player'),
  Howl = require('howler').Howl;

deck({ parent: '#production-deck', slides: '#production-deck > section', player: player });

util.ready(function() {
  // TODO: make this target deck articles only
  var
    body = document.querySelectorAll('body')[0],
    className = 'loading';

  util.removeClass(body, className);

  remixPlayer();

});

function remixPlayer() {
  var
    audio = new Howl({
      urls: [],
      buffer: true,
      onend: onEnd,
      onloaderror: onLoadError
    }),
    remixTiles = document.querySelectorAll('.remix-tile'),
    currentIdx = 0,
    len = remixTiles.length;

  // Add event listeners for clicks
  for (var i=0; i<len; i++) {
    (function (idx) {

      var tile = remixTiles[idx];
      currentIdx = idx;

      if (tile) {
        util.addEventListener(tile, 'click', function () {

          if (util.hasClass(tile, 'playing')) {
            stop(tile);
          } else {
            play(tile);
          }
        })
      }
    }(i));
  }

  audio.on('end', function() {

  });

  function play(tile) {
    var src = tile.getAttribute('data-href');
    if (src) {
      removePlayingClassAll();
      audio.unload();
      audio.urls([src]);
      util.addClass(tile, 'playing');
      audio.play();
      audio.pos(100);
    }
  }

  function stop(tile) {
    audio.stop();
    audio.urls([]);
    util.removeClass(tile, 'playing');
  }

  function onEnd() {
    removePlayingClassAll();
    /*
    if (currentIdx==remixTiles.length-1) {
      currentIdx = 0;
    } else {
      currentIdx++;
    }
    play(remixTiles[currentIdx]);
    */
  }

  function onLoadError() {
    if (audio && audio.urls.length) {
      console.log('load error!')
    }
  }

  function removePlayingClassAll() {
    var tiles = document.querySelectorAll('.remix-tile.playing');
    for (var i=0; i<tiles.length; i++) {
      util.removeClass(tiles[i], 'playing');
    }
  }

}
