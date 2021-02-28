export {
  Utils as
  default
};

let Utils = new Object();

/**
 * https://stackoverflow.com/questions/247483/http-get-request-in-javascript
 */
Utils.httpGet = function(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

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
