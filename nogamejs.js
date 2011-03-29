/**
 * Preload resources.
 * @param {Array} resources list of resources paths
 * @name preload
 */

var RESOURCES = {};

exports.preload = function(imgIdents) {
  for (var index in imgIdents) {
    var key = imgIdents[index];
    var ky = imgIdents[index].replace(/.+\//g, "").replace(/\..+/g, "");
    CACHE[key] = $("#" + ky)[0];
  }
  return;

  /*
   var countLoaded = 0;

   var incrementLoaded = function() {
      countLoaded++;
      if (countLoaded == TOTAL_IMGS) {
         _PRELOADING = false;
      }
      if (countLoaded % 10 == 0) {
         gamejs.log('loaded  ' + countLoaded + ' of ' + TOTAL_IMGS);
      }
   };
*/
   for (var key in imgIdents) {
      if (key.indexOf('png') == -1 && key.indexOf('jpg') == -1 && key.indexOf('gif') == -1) {
         continue;
      }
  //    TOTAL_IMGS++;
      var img = new Image();
      img.addEventListener('load',function() {
         addToCache(this);
  //       incrementLoaded();
         return;
      }, true);
      img.addEventListener('error', function() {
         incrementLoaded();
      	throw new Error('Error loading ' + this.src);
         return;
      }, true);
      img.src = imgIdents[key];
      img.gamejsKey = key;
   }
//   if (TOTAL_IMGS > 0) {
//      _PRELOADING = true;
//   }
   return;
};


exports.display = {};
exports.display.setMode = function(rect) {
  var canvas = exports.canvas = exports.display.canvas = $("canvas")[0];
  canvas.width = rect[0];
  canvas.height = rect[1];
  return exports;
};

exports.blit = function(image, xy) {
  var ctx = exports.canvas.getContext("2d");
  ctx.drawImage(image, xy[0], xy[1]);
}

var CACHE = {};

exports.load = function(key) {
   var img;
   if (typeof key === 'string') {
      img = CACHE[key];
      if (!img) {
         // TODO sync image loading
	throw new Error('Missing "' + key + '", gamejs.preload() all images before trying to load them.');
      }
   } else {
      img = key;
   }
  return img;


   var canvas = document.createElement('canvas');
   // IEFIX missing html5 feature naturalWidth/Height
   canvas.width = img.naturalWidth || img.width;
   canvas.height = img.naturalHeight || img.height;
   var context = canvas.getContext('2d');
   //context.fillStyle = "#00ff00";
   //context.fillRect(0, 0, canvas.width, canvas.height);
   context.drawImage(img, 0, 0)
   img.getSize = function() { return [img.naturalWidth, img.naturalHeight]; };
  return canvas;
  //var surface = new gamejs.Surface(img.getSize());
   // NOTE hack setting _canvas directly, don't do this yourself
   //surface._canvas = canvas;
   //return surface;
};
