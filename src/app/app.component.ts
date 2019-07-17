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
  label1;
  label2;
  label3;
  label4;
  visible1 = false;
  visible2 = false;
  visible3 = false;
  visible4 = false;

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

  onChanged1(date) {
    this.dates1 = date;
    this.label1 = date.dateStart.toString() + ' - ' + date.dateEnd.toString();
    this.visible1 = false;
  }
  onChanged2(date) {
    this.dates2 = date;
    this.label2 = date.dateStart.toString() + ' - ' + date.dateEnd.toString();
    this.visible2 = false;
  }
  onChanged3(date) {
    this.dates3 = date;
    this.label3 = date.dateStart.toString();
    this.visible3 = false;
  }
  onChanged4(date) {
    this.dates4 = date;
    this.label4 = date.dateStart.toString() + ' - ' + date.dateEnd.toString();
    this.visible4 = false;
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

    this.label1 = this.dates1.dateStart.toString() + ' - ' + this.dates1.dateEnd.toString();
    this.label2 = this.dates2.dateStart.toString() + ' - ' + this.dates2.dateEnd.toString();
    this.label3 = this.dates3.dateStart.toString();
    this.label4 = this.dates4.dateStart.toString() + ' - ' + this.dates4.dateEnd.toString();

  }




}

