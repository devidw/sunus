import Utils from './Utils.js';
import Sunus from './Sunus.js';

export {
  SunusClock as
  default
};

class SunusClock extends Sunus {

  /**
   * @param container {node}
   */
  constructor(container) {
    super();
    super.init();

    // console.log(this);
    this.config.diameter = 300;
    this.config.radius = this.config.diameter / 2;

    this.createCanvas(container);
  }

  /**
   * render canvas as favicon
   */
  renderFavicon() {
    let link;
    link = document.head.querySelector('link[rel="icon"]');
    link.href = this.canvas.toDataURL('image/x-icon');
  }

  /**
   * @param container {node}
   */
  createCanvas(container) {
    let canvas;
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', `${this.config.diameter}px`);
    canvas.setAttribute('height', `${this.config.diameter}px`);
    container.appendChild(canvas);

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.translate(this.config.radius, this.config.radius);
  }

  /**
   *
   */
  drawClock() {
    // background
    this.ctx.arc(0, 0, this.config.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.config.colors.night;
    this.ctx.fill();

    // astro twilight
    this.drawPie(
      this.config.colors.astro,
      this.degrees.astronomical_twilight_begin,
      this.degrees.astronomical_twilight_end
    );

    // nautical twilight
    this.drawPie(
      this.config.colors.nautical,
      this.degrees.nautical_twilight_begin,
      this.degrees.nautical_twilight_end
    );

    // civil twilight
    this.drawPie(
      this.config.colors.civil,
      this.degrees.civil_twilight_begin,
      this.degrees.civil_twilight_end
    );
    // sun day
    this.drawPie(
      this.config.colors.day,
      this.degrees.sunrise,
      this.degrees.sunset
    );

    // time hands
    // drawTime(this.ctx, this.config.radius);

    this.drawSun();
    this.drawDigits(this.ctx, this.config.radius);

    this.renderFavicon();
  }

  /**
   *
   */
  drawPie(color, startangle, endangle) {
    // correct start point
    this.ctx.rotate(Utils.degToRad(-90));

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.arc(0, 0, this.config.radius, Utils.degToRad(startangle), Utils.degToRad(endangle));

    this.ctx.fillStyle = color;

    this.ctx.fill();

    // recorrect rotation
    this.ctx.rotate(Utils.degToRad(90));
  }

  /**
   *
   */
  drawTime() {
    let length = this.config.radius * 0.7;
    let width = this.config.radius * 0.05;

    this.ctx.rotate(Utils.degToRad(this.degrees.now));

    // path
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, -length);
    this.ctx.closePath();

    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = this.config.colors.text;

    this.ctx.stroke();

    this.ctx.rotate(-Utils.degToRad(this.degrees.now));
  }

  /**
   *
   */
  drawSun() {
    // let x = this.config.radius * 0.5 * Math.cos(Utils.degToRad(this.degrees.now - 90));
    let x = this.config.radius * 0.5 * Math.cos(Utils.degToRad(this.degrees.now - 90));
    let y = this.config.radius * 0.5 * Math.sin(Utils.degToRad(this.degrees.now - 90));

    // console.log(x);
    // console.log(y);

    this.ctx.beginPath();
    this.ctx.arc(x, y, this.config.radius / 10, 0, 2 * Math.PI);

    this.ctx.fillStyle = this.config.colors.sun;
    this.ctx.fill();
  }


  /**
   *
   */
  drawDigits() {
    let num;
    let ang;

    this.ctx.font = `${this.config.radius * 0.1}px Georgia`;
    this.ctx.fillStyle = this.config.colors.text;

    // centering
    this.ctx.textBaseline = 'middle';
    this.ctx.textAlign = 'center';

    // place digits
    for (let num = 0; num < 24; num++) {
      ang = num * Math.PI / 12;
      this.ctx.rotate(ang);
      this.ctx.translate(0, -this.config.radius * 0.9);
      this.ctx.rotate(-ang);
      this.ctx.fillText(num.toString(), 0, 0);
      this.ctx.rotate(ang);
      this.ctx.translate(0, this.config.radius * 0.9);
      this.ctx.rotate(-ang);
    }
  }

}
