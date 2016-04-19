var
  deck = require('./deck'),
  util = require('./helpers'),
  player = require('./audio-player');

deck({ parent: '#production-deck', slides: '#production-deck > section', player: player });

util.ready(function() {
  var 
    body = document.querySelectorAll('body')[0],
    className = 'loading';
  util.removeClass(body, className);
});
