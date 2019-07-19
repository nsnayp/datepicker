import { Component, OnInit } from '@angular/core';
import { Options } from 'projects/datepicker/src/lib/datepicker.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'calendar';
  calendarVisible = true;
  options1: Options;
  options2: Options;
  options3: Options;
  options4: Options;
  label;
  dates1;
  dates2;

  label1;
  label2;

  visible1 = true;
  visible2 = true;


  constructor() {


    this.options1 = {
      weekends: [5, 6],
      weekStart: 1,
      lang: 'en',
      selection: {
        mode: 'single',
        ctrlShift: false
      },
      timeMode: false,
      submitMode: false,
      suggestions: {
        enabled: false
      },
      initDates: [new Date()],
      disabled: {
        enabled: true,
        mode: 'before'
      }
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


  }

  onChanged1(date) {
    this.dates1 = date;
    this.options1.initDates = date;
    this.label1 = (this.options1.initDates.length>0)?this.options1.initDates.join(' - ') : 'Not selected';
    this.visible1 = false;
  }
  onChanged2(date) {
    this.dates2 = date;
    this.options2.initDates = date;
    this.label2 = (this.options2.initDates.length>0)?this.options2.initDates.join(' - ') : 'Not selected';
    this.visible2 = false;
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


    this.label1 = this.options1.initDates.join(' - ');
    this.label2 = this.options2.initDates.join(' - ');


  }




}

