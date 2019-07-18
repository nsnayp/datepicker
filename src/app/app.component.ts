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
      weekends: [5, 6],
      weekStart: 1,
      lang: 'en',
      selection: {
        mode: 'period',
        ctrlShift: false
      },
      timeMode: true,
      submitMode: false,
      suggestions: {
        enabled: false
      },
      initDates: [new Date()]
    };
    this.options2 = {
      weekends: [5, 6],
      weekStart: 1,
      lang: 'ru',
      selection: {
        mode: 'multiple',
        ctrlShift: false
      },
      timeMode: true,
      submitMode: false,
      suggestions: {
        enabled: false
      },
      initDates: [new Date()]
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
    this.options1.initDates = date;
    this.label1 = this.options1.initDates.join(' - ');
    this.visible1 = false;
  }
  onChanged2(date) {
    this.dates2 = date;
    this.options2.initDates = date;
    this.label2 = this.options2.initDates.join(' - ');
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

    this.label1 = this.options1.initDates.join(' - ');
    this.label2 = this.options2.initDates.join(' - ');
    this.label3 = this.options3.initDates.join(' - ');
    this.label4 = this.options4.initDates.join(' - ');

  }




}

