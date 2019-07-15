import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'calendar';
  calendarVisible = false;
  options;
  label;
  dates;

  constructor() {
    this.options = {
      selectPeriodEnabled: false,
      suggestions : false,
      disabledBefore: true
    };
  }

  ngOnInit() {
    this.dates = {
      dateStart: new Date(),
      //dateEnd: new Date(),
    };
    this.label = this.dates.dateStart.toString();
  }
  onClickOut() {
    this.calendarVisible = false;
  }

  onChanged(data) {
    this.dates = data;
    this.label = this.dates.dateStart.toString();
    this.calendarVisible = false;
  }

}

