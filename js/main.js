(function() {
  'use strict';

  // setup view for pixi.js
  var viewWidth = 1280;
  var viewHeight = 720;
  var stage = new PIXI.Stage(0x222222, true);

  var renderer = PIXI.autoDetectRenderer(viewWidth, viewHeight);
  renderer.view.style.display = 'block';
  renderer.view.style.width = '100%';
  //renderer.view.style.height = "100%";
  document.body.appendChild(renderer.view);

  // resources
  // Two.js code from http://uihacker.blogspot.com/2014/10/javascript-use-twojs-to-prepare-svg.html
  // init two.js for svg import
  Two.Resolution = 24;
  var _twoCanvas = new Two({
    width: 400,
    height: 400,
    type: Two.Types.canvas
  });

  // create method to read an svg element from the DOM, scale it, and return a PIXI.Sprite
  var getScaledSpriteFromSVG = function(elemId, scale) {
    _twoCanvas.clear();

    // import svg from DOM, scale up, fit canvas to svg and render!
    var shape = _twoCanvas.interpret(document.getElementById(elemId));
    shape.scale = scale;
    var charH = Math.ceil(shape.getBoundingClientRect().height);
    var charW = Math.ceil(shape.getBoundingClientRect().width);
    _twoCanvas.width = charW;
    _twoCanvas.height = charH;
    _twoCanvas.update();

    // grab two.js canvas contents by exporting its base64 png content
    var newSvgSprite = new PIXI.Sprite(PIXI.Texture.fromImage(_twoCanvas.renderer.domElement.toDataURL()));
    newSvgSprite.anchor.x = 0.5;
    newSvgSprite.anchor.y = 0.5;

    return newSvgSprite;
  };

  // getScaledSpriteFromSVG(cssID, resolution)
  var renderedSVGSprite = getScaledSpriteFromSVG('renderSVG', 2);
  renderedSVGSprite.position.x = viewWidth/2;
  renderedSVGSprite.position.y = viewHeight/2;
  stage.addChild(renderedSVGSprite);

  // draw to pixi.js renderer
  requestAnimFrame(animate);
  function animate() {
    requestAnimFrame(animate);
    renderer.render(stage);
  };
}());
