import { Component, OnInit, Input, EventEmitter, Output, HostListener, OnDestroy, Directive, ElementRef } from '@angular/core';

export interface Day {
  date: Date;
  yearDayNum: number;
  vas?: number;
}



@Directive({
  selector: '[outside]',
})
export class Outside {
  @Output('outside') close = new EventEmitter();

  isOpen: boolean = false;

  constructor(private elRef: ElementRef) {
  }

  isChild(target) {
    const parent = target.parentNode;
    if (!parent || parent.tagName === 'undefined') { return false; }
    const tagName = parent.tagName;
    if (parent && tagName === 'APP-CALENDAR') {
      return true;
    } else if (parent && tagName !== 'HTML') {
      return this.isChild(parent);
    }

  }

  @HostListener('document:click', ['$event'])
  public handleClick(event) {
    event.stopPropagation();
    event.preventDefault();
    if (!this.isOpen) {
      this.isOpen = true;
    } else if (!this.elRef.nativeElement.contains(event.target)) {
      this.close.emit();
    }
  }
}


@Component({
  selector: 'ns-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  @Input() options;
  @Input() visible;
  @Input() onChangeDate: Function;
  @Output() onChanged = new EventEmitter();
  @Output() onCanceled = new EventEmitter();
  @Output() onClickOut = new EventEmitter<boolean>();
  @Input() datesInit;
  dates;
  initDate;
  today = { date: new Date(), yearDayNum: this.getNumOfYear(new Date()) };
  yesterday = new Date();
  date;
  numDay;
  daysInMonth: number;
  daysInPrevMonth: number;
  matrix;
  countMonths = 1;
  weekStart = 1;
  currentMonth: Date;
  weekends = [5, 6];
  calend: any[];
  weekCalend: any[];
  selectedDay;
  selectedDay2;
  weekLabels;
  period;
  selectPeriodEnabled: boolean;
  monthMode: boolean;
  suggestions: boolean;
  monthCalend = [];
  disabledBefore: boolean;
  disabledAfter: boolean;
  lang: string;
  submitMode: boolean;
  time;


  clickout(event) {
    console.log('CLICKOUT');
    this.onClickOut.emit();
  }

  constructor() {

  }

  cancel() {
    this.onCanceled.emit();
  }


  timeChange(data) {
    //console.log(data)
  }

  submit() {
    this.change();
  }

  change() {
    let data = {};
    if (!this.selectPeriodEnabled) {
      data = {
        dateStart: this.selectedDay.date,
        dateEnd: null
      };
    } else {
      data = {
        dateStart: this.selectedDay.date,
        dateEnd: this.selectedDay2.date
      };
    }
    // console.log('changed',data)
    this.onChanged.emit(data);
  }
  getMonthByNUm(num: number) {
    const months = this.langs()['month'][this.lang];
    return months[num];
  }
  ngOnInit() {
    if (!this.datesInit.dateStart) {
      this.dates = {
        dateStart : new Date(),
        dateEnd: null
      };
    } else {
      this.dates = Object.assign(this.datesInit)
    }

    this.selectPeriodEnabled = (this.options.selectPeriodEnabled) ? this.options.selectPeriodEnabled : false;

    if (!this.selectPeriodEnabled) {
      this.initDate = this.dates.dateStart;
      this.selectedDay = { date: this.dates.dateStart, yearDayNum: this.getNumOfYear(this.dates.dateStart) };
      this.selectedDay2 = null;
    } else {
      this.initDate = this.dates.dateStart;
      this.selectedDay = { date: this.dates.dateStart, yearDayNum: this.getNumOfYear(this.dates.dateStart) };
      this.selectedDay2 = { date: this.dates.dateEnd, yearDayNum: this.getNumOfYear(this.dates.dateEnd) };
    }

    this.monthMode = true;
    this.date = new Date(this.initDate);
    this.currentMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    this.numDay = this.date.getDay();
    this.suggestions = (this.options.suggestions) ? this.options.suggestions : false;
    this.disabledBefore = (this.options.disabledBefore) ? this.options.disabledBefore : false;
    this.disabledAfter = (this.options.disabledAfter) ? this.options.disabledAfter : false;
    this.lang = (this.options.lang) ? this.options.lang : 'en';
    this.weekends = (this.options.weekends) ? this.options.weekends : [5, 6];
    this.weekStart = (this.options.weekStart) ? this.options.weekStart : 1;

    this.submitMode = (this.options.submitMode) ? this.options.submitMode : false;
    this.time = (this.options.time) ? this.options.time : {
      enabled: false
    };



    this.getWeekLabels();
    this.showView(this.currentMonth);
    this.markselectDay();
    this.markPeriodDates();
    //this.selectDay()
  }

  showMonth(date: Date, event) {
    event.stopPropagation();
    this.showView(date);
    this.currentMonth = date;
  }


  getOffsetDaysStart(trueNum: number): number {
    return (trueNum < this.weekStart) ? 7 + trueNum - this.weekStart : trueNum - this.weekStart;
  }

  langs(){
    const lang = {
      week : {
        en : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'St'],
        ru : ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      },
      month : {
        en : ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October','November','December'],
        ru : ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь','Октябрь','Ноябрь','Декабрь'],
      }

    }
    return lang;
  }

  

  getWeekLabels() {
    this.weekLabels = this.langs()['week'][this.lang];
    this.weekLabels = this.weekLabels.splice(this.weekStart).concat(this.weekLabels);
  }

  isNowDate(date: Date) {
    const now = new Date();
    return (now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth()
      && now.getDate() === date.getDate()) ? true : false;
  }

  showPrev() {
    if (this.monthMode) {
      this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
      this.showView(this.currentMonth);
    } else {
      this.currentMonth.setFullYear(this.currentMonth.getFullYear() - 1);
      this.showViewMonth(this.currentMonth);
    }
  }

  isSelected(date: Date): boolean {
    return (this.selectedDay && this.selectedDay.date.getFullYear() === date.getFullYear()
      && this.selectedDay.date.getMonth() === date.getMonth() && this.selectedDay.date.getDate() === date.getDate()) ? true : false;
  }

  markselectDay() {
    for (let i = 0; i < this.calend.length; i++) {
      const item: any = this.calend[i];
      if (this.selectedDay && this.selectedDay.yearDayNum === item.yearDayNum && this.selectedDay.date.getFullYear() === item.date.getFullYear()) {
        this.calend[i].isSelected = true;
      } else if (this.selectedDay2 && this.selectedDay2.yearDayNum === item.yearDayNum && this.selectedDay2.date.getFullYear() === item.date.getFullYear()) {
        this.calend[i].isSelected = true;
      }
      else {
        this.calend[i].isSelected = false;
      }
    }
  }

  selectDay(day: Day) {
    if (this.selectPeriodEnabled) {
      if (this.selectedDay && this.selectedDay.yearDayNum === day.yearDayNum && this.selectedDay.date.getFullYear() === day.date.getFullYear()) {
        //this.selectedDay = null;
        //this.selectedDay2 = null;

      } else {
        if (!this.selectedDay) {
          this.selectedDay = day;
          this.selectedDay2 = null;
        } else if (this.selectedDay && !this.selectedDay2) {
          this.selectedDay2 = day;
        } else if (this.selectedDay && this.selectedDay2) {
          this.selectedDay = day;
          this.selectedDay2 = null;
        }
      }

    } else {
      if (this.selectedDay && this.selectedDay.yearDayNum === day.yearDayNum && this.selectedDay.date.getFullYear() === day.date.getFullYear()) {
        //this.selectedDay = null;
      } else {
        this.selectedDay = day;
      }
    }
    if (day && day.date.getMonth() !== this.currentMonth.getMonth()) {
      this.currentMonth.setMonth(day.date.getMonth());
      this.showView(day.date);
    }
    this.markselectDay();
    if (this.selectPeriodEnabled) {
      this.markPeriodDates();
    }
    if(!this.submitMode){
      this.change();
    }
    
  }



  showNext() {
    if (this.monthMode) {
      this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
      this.showView(this.currentMonth);
    } else {
      this.currentMonth.setFullYear(this.currentMonth.getFullYear() + 1);
      this.showViewMonth(this.currentMonth);
    }

  }

  clickDate(day, event = null) {
    (event) ? event.stopPropagation() : null;
    if (!day.disabled) {
      this.selectDay(day);
    }

  }

  markPeriodDates(day = null) {
    for (let i = 0; i < this.calend.length; i++) {
      const item = this.calend[i];

      if (
        day && this.selectedDay && !this.selectedDay2 && (
          (item.yearDayNum >= day.yearDayNum && item.yearDayNum <= this.selectedDay.yearDayNum)
          ||
          (item.yearDayNum <= day.yearDayNum && item.yearDayNum >= this.selectedDay.yearDayNum)
        )
        ||
        this.selectedDay && this.selectedDay2 && (
          (item.yearDayNum >= this.selectedDay2.yearDayNum && item.yearDayNum <= this.selectedDay.yearDayNum)
          ||
          (item.yearDayNum <= this.selectedDay2.yearDayNum && item.yearDayNum >= this.selectedDay.yearDayNum)
        )

      ) {
        this.calend[i].markedPeriod = true;
      } else {
        this.calend[i].markedPeriod = false;
      }
    }
  }

  hoverDate(day) {
    if (this.selectedDay && this.selectPeriodEnabled) {
      this.markPeriodDates(day);
    }
  }

  getDate(date: Date) {
    const d = Object.assign(date);
    return new Date(d.getTime());
  }

  getNumOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.valueOf() - start.valueOf();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return day;
  }

  showViewMonth(date: Date, event = null) {
    (event) ? event.stopPropagation() : null;
    const year = date.getFullYear();
    for (let k = 0; k < 4; k++) {
      this.monthCalend[k] = [];
      for (let i = k * 3; i < k * 3 + 3; i++) {
        this.monthCalend[k].push(
          {
            year,
            month: i,
            date: new Date(year, i, 1)
          }
        );
      }
    }
    this.monthMode = false;

  }

  isDisabled(date: Date) {
    let a = this.getDate(date);
    a.setHours(0, 0, 0, 0);
    let b = this.getDate(new Date());
    b.setHours(0, 0, 0, 0);
    if(this.disabledBefore){
      return (this.disabledBefore && a.valueOf() < b.valueOf()) ? true : false;
    }else if(this.disabledAfter){
      return (this.disabledAfter && a.valueOf() > b.valueOf()) ? true : false;
    }
    return false;
    
  }


  showView(date: Date) {
    this.daysInMonth = this.getDaysInMonth(date);
    this.daysInPrevMonth = this.getDaysInPrevMonth(date);
    const numFirstDay = this.getFirstDayNum(date);
    const numLastDay = this.getLastDayNum(date);
    const calend = [];
    const weekCalend = [];

    const nowMonth = this.getDate(date);
    const prevMonthDate = this.getDate(date);
    prevMonthDate.setMonth(this.getDate(date).getMonth() - 1);
    const nextMonthDate = this.getDate(date);
    nextMonthDate.setMonth(this.getDate(date).getMonth() + 1);


    if (numFirstDay !== 0) {
      for (let i = numFirstDay; i > 0; i--) {
        const num = this.daysInPrevMonth - i + 1;
        const date = new Date(prevMonthDate.getFullYear(), prevMonthDate.getMonth(), num);
        calend.push({
          num,
          yearDayNum: this.getNumOfYear(date),
          date,
          currentMonth: false,
          isNowDate: this.isNowDate(date),
          isWeekEnd: this.isWeekEnd(date),
          disabled: this.isDisabled(date)
        });
      }
    }

    for (let i = 1; i <= this.daysInMonth; i++) {
      nowMonth.setDate(i);
      const date = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), i);
      calend.push({
        num: i,
        yearDayNum: this.getNumOfYear(date),
        date,
        currentMonth: true,
        isNowDate: this.isNowDate(date),
        isWeekEnd: this.isWeekEnd(date),
        disabled: this.isDisabled(date)
      });

    }

    if (numLastDay !== 6) {
      for (let i = 1; i < 7 - numLastDay; i++) {
        const date = new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), i);
        calend.push({
          num: i,
          yearDayNum: this.getNumOfYear(date),
          date,
          currentMonth: false,
          isNowDate: this.isNowDate(date),
          isWeekEnd: this.isWeekEnd(date),
          disabled: this.isDisabled(date)
        });
      }
    }

    for (let i = 0; i < calend.length / 7; i++) {
      const week = [];
      for (let k = i * 7; k < i * 7 + 7; k++) {
        week.push(calend[k]);
      }
      weekCalend.push(week);
    }

    this.calend = calend;
    this.weekCalend = weekCalend;
    if (this.selectPeriodEnabled) {
      this.markPeriodDates();
    }

    this.markselectDay();
    this.monthMode = true;
  }

  isWeekEnd(date: Date): boolean {
    return (this.weekends.includes(this.getNumDay(date))) ? true : false;
  }

  getNumDay(date: Date): number {
    return this.getOffsetDaysStart(date.getDay());
  }

  getFirstDayNum(date: Date): number {
    const trueNum: number = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return this.getOffsetDaysStart(trueNum);
  }

  getLastDayNum(date: Date): number {
    const trueNum: number = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    return this.getOffsetDaysStart(trueNum);
  }

  getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  getDaysInPrevMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  }


}
