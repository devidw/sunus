export {
  Utils as
  default
};

let Utils = new Object();

/**
 * http://jsfiddle.net/3VB68/
 */
Utils.degToRad = function(deg) {
  return deg * Math.PI / 180;
}

/**
 * convert timestring into degree
 */
Utils.timeToDeg = function(str) {
  var d = new Date(str);
  var hour = d.getHours();
  var minute = d.getMinutes() / 60;
  // var second = d.getSeconds()/60;
  var float = hour + minute;
  return float / 24 * 360;
}

/**
 * https://stackoverflow.com/a/4033310/13765033
 */
Utils.httpGet = function(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}
