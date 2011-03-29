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
};
