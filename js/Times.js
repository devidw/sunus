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
  init() {
    this.datetime = new Date();
    navigator.geolocation.getCurrentPosition(this.setLocation.bind(this));
  }

  /**
   * @param datetime {object}
   */
  setDatetime(datetime) {
    this.datetime = datetime;
    this.times = this.api();
    this.degrees = this.toDeg(this.times);
  }

  /**
   * @param position {object}
   */
  setLocation(position) {
    this.coords = {};
    this.coords.latitude = position.coords.latitude;
    this.coords.longitude = position.coords.longitude;

    this.times = this.api();
    this.degrees = this.toDeg(this.times);
  }

  /**
   * @return {object}
   */
  api() {
    let date, request, response;
    date = this.datetime.toISOString().slice(0, 10); // 2021-12-31
    request = `https://api.sunrise-sunset.org/json?lat=${this.coords.latitude}&lng=${this.coords.longitude}&date=${date}&formatted=0`;
    response = Utils.httpGet(request);
    response = JSON.parse(response);
    response = response.results;
    response.now = this.datetime.toISOString();
    return response;
  }

  /**
   * @return {object}
   */
  toDeg(raw) {
    let degrees;
    degrees = new Object();
    for (const [key, value] of Object.entries(raw)) {
      // console.log(`${key}: ${value}`);
      degrees[key] = Utils.timeToDeg(value);
    }
    // console.log(degrees);
    return degrees;
  }
}
