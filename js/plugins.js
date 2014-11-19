// Avoid `console` errors in browsers that lack a console.
(function() {
  "use strict";
  var method;
  var noop = function () {};
  var methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
      method = methods[length];

      // Only stub undefined methods.
      if (!console[method]) {
          console[method] = noop;
      }
  }
  
  // stats.js https://github.com/mrdoob/stats.js
  var stats = new Stats();
  stats.setMode(1); // 0: fps, 1: ms

  // align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.body.appendChild( stats.domElement );

  var update = function () {
      stats.begin();

      // monitored code goes here
      stats.end();
      requestAnimationFrame( update );
  };
  requestAnimationFrame( update );

  
}());

// Place any jQuery/helper plugins in here.
