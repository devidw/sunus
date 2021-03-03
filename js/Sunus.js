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

  /**
   * @param parent {node}
   */
  constructor(parent) {
    // console.log(super());
    super();
    this.times = this.get();

    this.config = {
      size: 300,
      colors: {
        // https://www.rapidtables.com/web/color/Gold_Color.html
        text: '#222',
        sun: '#222',
        day: '#ffba00',
        civil: '#ffa500',
        nautical: '#ff9000',
        astro: '#ff7b00',
        night: '#ff6500',
      },
    };

    // create canvas
    let canvas;
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', `${this.config.size}px`);
    canvas.setAttribute('height', `${this.config.size}px`);
    parent.appendChild(canvas);

    this.ctx = canvas.getContext('2d');

    this.radius = canvas.height / 2;
    this.ctx.translate(this.radius, this.radius);

    // this.radius = this.radius * 0.9;
  }

  /**
   *
   */
  drawClock() {
    // background
    this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.config.colors.night;
    this.ctx.fill();

    // astro twilight
    this.drawPie(
      this.config.colors.astro,
      this.times.astronomical_twilight_begin,
      this.times.astronomical_twilight_end
    );

    // nautical twilight
    this.drawPie(
      this.config.colors.nautical,
      this.times.nautical_twilight_begin,
      this.times.nautical_twilight_end
    );

    // civil twilight
    this.drawPie(
      this.config.colors.civil,
      this.times.civil_twilight_begin,
      this.times.civil_twilight_end
    );
    // sun day
    this.drawPie(
      this.config.colors.day,
      this.times.sunrise,
      this.times.sunset
    );

    // time hands
    // drawTime(this.ctx, this.radius);

    this.drawSun();
    this.drawDigits(this.ctx, this.radius);
  }

  /**
   *
   */
  drawPie(color, startangle, endangle) {
    // correct start point
    this.ctx.rotate(Utils.degToRad(-90));

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.arc(0, 0, this.radius, Utils.degToRad(startangle), Utils.degToRad(endangle));

    this.ctx.fillStyle = color;

    this.ctx.fill();

    // recorrect rotation
    this.ctx.rotate(Utils.degToRad(90));
  }

  /**
   *
   */
  drawTime() {
    let length = this.radius * 0.7;
    let width = this.radius * 0.05;

    this.ctx.rotate(Utils.degToRad(this.times.now));

    // path
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, -length);
    this.ctx.closePath();

    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = this.config.colors.text;

    this.ctx.stroke();

    this.ctx.rotate(-Utils.degToRad(this.times.now));
  }

  /**
   *
   */
  drawSun() {
    // let x = this.radius * 0.5 * Math.cos(Utils.degToRad(this.times.now - 90));
    let x = this.radius * 0.5 * Math.cos(Utils.degToRad(this.times.now - 90));
    let y = this.radius * 0.5 * Math.sin(Utils.degToRad(this.times.now - 90));

    // console.log(x);
    // console.log(y);

    this.ctx.beginPath();
    this.ctx.arc(x, y, this.radius / 10, 0, 2 * Math.PI);

    this.ctx.fillStyle = this.config.colors.sun;
    this.ctx.fill();
  }


  /**
   *
   */
  drawDigits() {
    let num;
    let ang;

    this.ctx.font = `${this.radius * 0.1}px Georgia`;
    this.ctx.fillStyle = this.config.colors.text;

    // centering
    this.ctx.textBaseline = 'middle';
    this.ctx.textAlign = 'center';

    // place digits
    for (let num = 0; num < 24; num++) {
      ang = num * Math.PI / 12;
      this.ctx.rotate(ang);
      this.ctx.translate(0, -this.radius * 0.9);
      this.ctx.rotate(-ang);
      this.ctx.fillText(num.toString(), 0, 0);
      this.ctx.rotate(ang);
      this.ctx.translate(0, this.radius * 0.9);
      this.ctx.rotate(-ang);
    }
  }

}
