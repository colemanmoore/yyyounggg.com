//var art = require('./art');

module.exports = function() {
  return function(deck) {


    // Click events move forward except if they target a link
    document.addEventListener('click', function(e) {
      //deck.next();
      //console.log('click ' + e.xPos);
    });
  }
};
