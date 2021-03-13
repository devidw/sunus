import Utils from './Utils.js';
import Sunus from './Sunus.js';

export {
  SunusTable as
  default
};

class SunusTable extends Sunus {

  /**
   * @param container {node}
   */
  constructor(container) {
    super();
    super.init();

    this.createTable(container);
  }

  /**
   * create table
   * @param container {node}
   */
  createTable(container) {
    let table, thead, tbody;
    table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>event</th>
          <th>time</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    container.appendChild(table);
    this.tbody = table.querySelector('tbody');
    // console.log(this.table);
  }

  /**
   * render table data
   */
  fill() {
    let rows, times;
    rows = '';
    times = {
      astronomical_twilight_begin: this.times.astronomical_twilight_begin,
      nautical_twilight_begin: this.times.nautical_twilight_begin,
      civil_twilight_begin: this.times.civil_twilight_begin,
      sunrise: this.times.sunrise,
      sunset: this.times.sunset,
      civil_twilight_end: this.times.civil_twilight_end,
      nautical_twilight_end: this.times.nautical_twilight_end,
      astronomical_twilight_end: this.times.astronomical_twilight_end,
    };
    // console.log(this.times);
    for (let [label, time] of Object.entries(times)) {
      label = label.replaceAll('_', ' ');
      time = time.match(/\d{2}[:]\d{2}[:]\d{2}/g)[0]; // HH:MM:SS
      rows += `
        <tr>
          <td>${label}</td>
          <td>${time}</td>
        </tr>
      `;
    }
    this.tbody.innerHTML = rows;
  }
}
