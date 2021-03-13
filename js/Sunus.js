import Utils from './Utils.js';
import Times from './Times.js';

export {
  Sunus as
  default
};

/**
 * Sunus
 * @author David Wolf
 */
class Sunus extends Times {

  config = {
    colors: {
      text: '#222',
      sun: '#222',
      day: '#ffba00',
      civil: '#ffa500',
      nautical: '#ff9000',
      astro: '#ff7b00',
      night: '#ff6500',
    }
  };

}
