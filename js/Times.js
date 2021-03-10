import Utils from './Utils.js';

export {
  Times as
  default
};

/**
 * Times
 * @author David Wolf
 */
class Times {

  /**
   *
   */
  // constructor() {
  //   navigator.geolocation.getCurrentPosition(this.api.bind(this))
  // }

  /**
   * @return {object}
   */
  api(position) {
    let latitude, longitude, request, response;
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    request = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`;
    response = Utils.httpGet(request);
    response = JSON.parse(response);
    this.degrees = this.toDeg(response.results);
    console.log(this.degrees);
  }

  /**
   * @return {object}
   */
  toDeg(raw) {
    let times;
    times = new Object();
    times.now = Utils.timeToDeg(new Date());
    for (const [key, value] of Object.entries(raw)) {
      // console.log(`${key}: ${value}`);
      times[key] = Utils.timeToDeg(value);
    }
    // console.log(times);
    return times;
  }
}
