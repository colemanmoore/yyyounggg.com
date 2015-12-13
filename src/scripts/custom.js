$ = require('jquery');

module.exports = function() {
  return function(deck) {
    var
      HIDDEN_CLASS = 'hidden',
      businessCard = el = document.getElementById('business-card'),

      hideBusinessCard = function() {
        if (businessCard.classList) {
          businessCard.classList.add(HIDDEN_CLASS);
        } else {
          businessCard.className += ' ' + HIDDEN_CLASS;
        }
      },

      showBusinessCard = function() {
        if (businessCard.classList)
          businessCard.classList.remove(HIDDEN_CLASS);
        else
          businessCard.className = businessCard.className.replace(
            new RegExp('(^|\\b)' + HIDDEN_CLASS.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      };

    deck.on('activate', function(e) {
      if (deck.slide()==0) {
        hideBusinessCard();
      } else {
        showBusinessCard();
      }
    });

    document.addEventListener('click', function() {
      deck.next();
    });

    $('a').click(function(e) {
      e.stopPropagation();
    });
  }
};
