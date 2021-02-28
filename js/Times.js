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
   * @param lat {float}
   * @param lng {float}
   */
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  /**
   * @return {object}
   */
  api() {
    let request, response;
    request = `https://api.sunrise-sunset.org/json?lat=${this.lat}&lng=${this.lng}&formatted=0`;
    response = Utils.httpGet(request);
    response = JSON.parse(response);
    return response.results;
  }

  /**
   * @return {object}
   */
  get() {
    let raw, times;
    raw = this.api();
    times = new Object;
    times.now = Utils.timeToDeg(new Date());
    for (const [key, value] of Object.entries(raw)) {
      // console.log(`${key}: ${value}`);
      times[key] = Utils.timeToDeg(value);
    }
    // console.log(times);
    return times;
  }
}
