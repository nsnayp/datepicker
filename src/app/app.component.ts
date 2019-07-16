import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'calendar';
  calendarVisible = true;
  options1;
  options2;
  options3;
  options4;
  label;
  dates1;
  dates2;
  dates3;
  dates4;

  constructor() {
    this.options1 = {
      selectPeriodEnabled: true,
      suggestions: true,

      lang: 'ru',
      weekends: [],
      weekStart: 0,
      submitMode: true
    };
    this.options2 = {
      selectPeriodEnabled: true,
      suggestions: false,
      lang: 'en',
      weekends: [5, 6],
      weekStart: 1,
      time: {
        enabled: true
      },
      submitMode: true
    };
    this.options3 = {
      selectPeriodEnabled: false,
      suggestions: false,
      disabledBefore: true,
      lang: 'ru',
      weekends: [6],
      weekStart: 2,
      time: {
        enabled: true
      },
      submitMode: true
    };

    this.options4 = {
      selectPeriodEnabled: true,
      suggestions: false,
      disabledBefore: true,
      lang: 'en',
      weekends: [6],
      weekStart: 2,
      time: {
        enabled: false
      },
      submitMode: false
    };

  }

  ngOnInit() {
    this.dates1 = {
      dateStart: new Date(),
      dateEnd: new Date(),
    };

    this.dates2 = {
      dateStart: new Date(),
      dateEnd: new Date(),
    };
    this.dates3 = {
      dateStart: new Date(),
      dateEnd: new Date(),
    };
    this.dates4 = {
      dateStart: new Date(),
      dateEnd: new Date(),
    };
  }


}

