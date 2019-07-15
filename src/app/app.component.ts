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
  label;
  dates1;
  dates2;
  dates3;

  constructor() {
    this.options1 = {
      selectPeriodEnabled: true,
      suggestions: false,

      lang: 'en',
      weekends: [],
      weekStart: 0
    };
    this.options2 = {
      selectPeriodEnabled: true,
      suggestions: true,
      lang: 'ru',
      weekends: [5, 6],
      weekStart: 1
    };
    this.options3 = {
      selectPeriodEnabled: false,
      suggestions: false,
      disabledBefore: true,
      lang: 'ru',
      weekends: [6],
      weekStart: 2
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
  }


}

