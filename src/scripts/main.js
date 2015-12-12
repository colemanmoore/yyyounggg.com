// Require Node modules in the browser thanks to Browserify: http://browserify.org
var bespoke = require('bespoke'),
  classes = require('bespoke-classes'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  backdrop = require('bespoke-backdrop'),
  scale = require('bespoke-scale'),
  loop = require('bespoke-loop'),
  state = require('bespoke-state'),
  audio = require('./bespoke-audio');

// Bespoke.js
var deck = bespoke.from('article', [
  classes(),
  keys(),
  touch(),
  backdrop(),
  scale(),
  loop(),
  state(),
  audio()
]);

