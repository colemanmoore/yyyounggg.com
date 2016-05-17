var
  deck = require('./deck'),
  util = require('./helpers'),
  player = require('./audio-player');

deck({ parent: '#production-deck', slides: '#production-deck > section', player: player });

util.ready(function() {
  // TODO: make this target deck articles only
  var
    body = document.querySelectorAll('body')[0],
    className = 'loading';
  util.removeClass(body, className);

  var remixTiles = document.querySelectorAll('.remix-tile');

  for (var i=0; i<remixTiles.length; i++) {
    var tile = remixTiles[i];
    var nextTile = (i<remixTiles.length-1 ? remixTiles.length[i+1] : null);

    util.addEventListener(tile, 'click', function(e) {
      var elem = this;

      var mp3src = elem.getAttribute('data-href');

      if (nextTile) {
        
      }

      player.switchTracks(mp3src);
    })
  }
});
