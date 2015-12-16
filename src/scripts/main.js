var bespoke = require('bespoke'),
  classes = require('bespoke-classes'),
  keys = require('bespoke-keys'),
  scale = require('bespoke-scale'),
  loop = require('bespoke-loop'),
  state = require('bespoke-state'),
  audio = require('./bespoke-audio'),
  touch = require('./bespoke-touch-custom'),
  custom = require('./custom');

var audioplayer = require('./audio-player');
var art = require('./art');

var deck = bespoke.from({ parent: '#presentation', slides: '#presentation > section' }, [
  classes(),
  keys(),
  touch(),
  scale(),
  loop(),
  state(),
  audio(audioplayer, art),
  custom()
]);

var $ = require('jquery');
$(document).ready(function() {
  $('body').removeClass('loading');
});
