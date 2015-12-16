var $ = require('jquery');
//var art = require('./art');

module.exports = function() {
  return function(deck) {

    var
      HIDDEN_CLASS = 'hidden',
      businessCard = el = document.getElementById('business-card');


    deck.on('activate', function(e) {

      /*
      if (deck.slide()==0) {
        hideBusinessCard();
      } else {
        showBusinessCard();
      }
      */

      //art.visualizeMusic();
    });


    // Click events move forward except if they target a link
    document.addEventListener('click', function() {
      deck.next();
    });

    $('a').click(function(e) {
      e.stopPropagation();
    });
  }
};
