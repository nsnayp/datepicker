import { Component, OnInit, Input, EventEmitter, Output, HostListener, OnDestroy, Directive, ElementRef } from '@angular/core';

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


export interface Suggestions {
  enabled: boolean; // single, perion, multiple
  items?: any[];
}
export interface Selection {
  mode: string; // single, perion, multiple
  ctrlShift?: boolean;
}
export interface DayInterface {
  key: number;
  num: number;
  date: Date;
  isNowDate: boolean;
  isWeekEnd: boolean;
  disabled: boolean;
  custom?: any;
  currentMonth: boolean;
  markedPeriod?: boolean;
  isSelected?: boolean;
}
export interface Options {
  weekends: number[];
  lang: string;
  weekStart: number;
  selection: Selection;
  timeMode: boolean;
  submitMode: boolean;
  initDates: Date[];
  suggestions: Suggestions;
  disabled?: any;
  days?: Day[];
}


export class Day implements DayInterface {
  key: number;
  num: number;
  date: Date;
  isNowDate: boolean;
  isWeekEnd: boolean;
  disabled: boolean;
  custom?: any;
  currentMonth: boolean;
  markedPeriod?: boolean;
  isSelected?: boolean;
}



@Component({
  selector: 'ns-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

   defaultOptions: Options = {
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
      enabled: false,
      mode: 'after'
    }
  };


  @Input() options;
  @Output() onChanged = new EventEmitter();
  @Output() onCanceled = new EventEmitter();
  @Output() onClickOut = new EventEmitter<boolean>();

   _options: Options;
   _currentMonth: Date;
   _monthCalend: any[] = [];
   _monthMode: boolean = true;
   calend: Day[];
   weekCalend: any[];
   hoveredDate: Date;
   weekLabels;

  clickout(event) {
    this.onClickOut.emit();
  }

  constructor() {

  }


  ngOnInit() {

    this._options = Object.assign(this.defaultOptions, this.options);
    this._options.initDates = (this._options.initDates.length === 0) ? [new Date] : this._options.initDates;

    const lastDate = this._options.initDates[this._options.initDates.length - 1];
    this._currentMonth = new Date(lastDate.getFullYear(), lastDate.getMonth(), 1);
    const weekLabels = this.langs()['week'][this._options.lang];
    this.weekLabels = weekLabels.splice(this._options.weekStart).concat(weekLabels);

    this._getMonthsMatrix(this._currentMonth);

  }

  // half
  showNext() {
    if (this._monthMode) {
      this._currentMonth.setMonth(this._currentMonth.getMonth() + 1);
      this._getMonthsMatrix(this._currentMonth);
    } else {
      this._currentMonth.setFullYear(this._currentMonth.getFullYear() + 1);
      this.showViewMonth(this._currentMonth);
    }

  }
  // half
  showPrev() {
    if (this._monthMode) {
      this._currentMonth.setMonth(this._currentMonth.getMonth() - 1);
      this._getMonthsMatrix(this._currentMonth);
    } else {
      this._currentMonth.setFullYear(this._currentMonth.getFullYear() - 1);
      this.showViewMonth(this._currentMonth);
    }

  }

   withZero(str: any) {
    str = str.toString();
    return (str.length === 1) ? '0' + str : str;
  }

   getDateKey(date: Date) {
    // tslint:disable-next-line: radix
    return parseInt(date.getFullYear() + '' + this.withZero(date.getMonth()) + '' + this.withZero(date.getDate()));
  }


   showViewMonth(date: Date, event = null) {
    (event) ? event.stopPropagation() : null;
    const year = date.getFullYear();
    for (let k = 0; k < 4; k++) {
      this._monthCalend[k] = [];
      for (let i = k * 3; i < k * 3 + 3; i++) {
        this._monthCalend[k].push(
          {
            year,
            month: i,
            date: new Date(year, i, 1)
          }
        );
      }
    }
    this._monthMode = false;

  }

   langs() {
    const lang = {
      week: {
        en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'St'],
        ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      },
      month: {
        en: ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      }

    };
    return lang;
  }

   isDisabled(date: Date) {
    const a = new Date(date);
    a.setHours(0, 0, 0, 0);
    const b = new Date(new Date());
    b.setHours(0, 0, 0, 0);
    if (this._options.disabled.enabled) {
      const mode = this._options.disabled.mode;
      if (mode === 'before') {
        return (mode === 'before' && a.valueOf() < b.valueOf()) ? true : false;
      } else if (mode === 'after') {
        return (mode === 'after' && a.valueOf() > b.valueOf()) ? true : false;
      }
    }
    return false;
  }

   isWeekEnd(date: Date): boolean {
    return (this._options.weekends.includes(this.getNumDay(date))) ? true : false;
  }

   getMonthByNUm(num: number) {
    const months = this.langs()['month'][this._options.lang];
    return months[num];
  }

   getFirstDayNum(date: Date): number {
    const trueNum: number = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return this.getOffsetDaysStart(trueNum);
  }

   getLastDayNum(date: Date): number {
    const trueNum: number = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    return this.getOffsetDaysStart(trueNum);
  }

   clickDate(day, event = null) {
    (event) ? event.stopPropagation() : null;
    if (!day.disabled) {
      this.selectDay(day);
    }

  }

   getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  getDaysInPrevMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  }

   getDay(date: Date): Day {
    const day = new Day();
    day.key = this.getDateKey(date);
    day.num = date.getDate();
    day.date = new Date(date);
    day.isNowDate = this.isNowDate(date);
    day.isWeekEnd = this.isWeekEnd(date);
    day.disabled = this.isDisabled(date);
    day.currentMonth = (date.getFullYear() === this._currentMonth.getFullYear() && date.getMonth() === this._currentMonth.getMonth());
    return day;
  }

  // half
   _getMonthsMatrix(date: Date) {
    const daysInMonth = this.getDaysInMonth(date);
    const daysInPrevMonth = this.getDaysInPrevMonth(date);
    const numFirstDay = this.getFirstDayNum(date);
    const numLastDay = this.getLastDayNum(date);
    const calend = [];
    const weekCalend = [];

    const nowMonth = new Date(date);
    const prevMonthDate = new Date(date);
    prevMonthDate.setMonth(new Date(date).getMonth() - 1);
    const nextMonthDate = new Date(date);
    nextMonthDate.setMonth(new Date(date).getMonth() + 1);

    if (numFirstDay !== 0) {
      for (let i = numFirstDay; i > 0; i--) {
        const num = daysInPrevMonth - i + 1;
        date = new Date(prevMonthDate.getFullYear(), prevMonthDate.getMonth(), num);
        calend.push(this.getDay(date));
      }
    }

    for (let i = 1; i <= daysInMonth; i++) {
      nowMonth.setDate(i);
      date = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), i);
      calend.push(this.getDay(date));
    }

    if (numLastDay !== 6) {
      for (let i = 1; i < 7 - numLastDay; i++) {
        date = new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), i);
        calend.push(this.getDay(date));
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
    this.markselectDay();
    this.markPeriodDates();
  }

  // half
   isNowDate(date: Date) {
    const now = new Date();
    return (now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth()
      && now.getDate() === date.getDate()) ? true : false;
  }

   timeChange(data) {
    this._options.initDates[data.index] = new Date(data.date);
  }

   getNumDay(date: Date): number {
    return this.getOffsetDaysStart(date.getDay());
  }

   getOffsetDaysStart(trueNum: number): number {
    return (trueNum < this._options.weekStart) ? 7 + trueNum - this._options.weekStart : trueNum - this._options.weekStart;
  }

   selectDay(day: Day) {
    if (this._options.selection.mode !== 'single') {
      if (!this._options.initDates.includes(day.date) && !day.isSelected) {
        if (this._options.selection.mode === 'period') {
          if (this._options.initDates.length === 1) {
            this._options.initDates.push(day.date);
          } else if (this._options.initDates.length === 2) {
            this._options.initDates = [];
            this._options.initDates.push(day.date);
          }
        } else if (this._options.selection.mode === 'multiple') {
          this._options.initDates.push(day.date);
        }
      } else {
        if (this._options.selection.mode === 'multiple') {
          /*if (this._options.initDates.includes(day.date)) {
            const index = this._options.initDates.findIndex(el => this.getDateKey(el) === day.key);
            this._options.initDates.splice(index, 1);
          }*/
          // May be need unselect
          // this._options.initDates.push(day.date);
          // tslint:disable-next-line: forin
          for (const i in this._options.initDates) {
            const item = this._options.initDates[i];
            if (this.getDateKey(item) === day.key) {
              this._options.initDates.splice(parseInt(i), 1);
            }
          }
        }
      }
    } else {
      this._options.initDates = [day.date];
    }

    this.markselectDay();
    this.markPeriodDates();
    (!this._options.submitMode && !this._options.timeMode) ? this.change() : null ;
  }

   hoverDate(day: Day) {
    this.markPeriodDates(day);
  }

  // full
   markselectDay() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.calend.length; i++) {
      const item: any = this.calend[i];
      let selected = false;
      for (let date of this._options.initDates) {
        if (this.getDateKey(date) === item.key) {
          selected = true;
        }
      }
      this.calend[i].isSelected = selected;
    }
  }

   markPeriodDates(hoveredDate: Day = null) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.calend.length; i++) {
      const item = this.calend[i];

      if (this._options.selection.mode === 'period') {
        if (this._options.initDates.length === 1 && hoveredDate) {

          if ((item.key >= hoveredDate.key && item.key <= this.getDateKey(this._options.initDates[0]))
            || (item.key <= hoveredDate.key && item.key >= this.getDateKey(this._options.initDates[0]))
          ) {
            this.calend[i].markedPeriod = true;
          } else {
            this.calend[i].markedPeriod = false;
          }

        } else if (this._options.initDates.length === 2) {
          if ((item.key >= this.getDateKey(this._options.initDates[1]) && item.key <= this.getDateKey(this._options.initDates[0]))
            || (item.key <= this.getDateKey(this._options.initDates[1]) && item.key >= this.getDateKey(this._options.initDates[0]))
          ) {
            this.calend[i].markedPeriod = true;
          } else {
            this.calend[i].markedPeriod = false;
          }
        } else {
          this.calend[i].markedPeriod = false;
        }
      } else {
        //this.calend[i].markedPeriod = false;
      }
    }
  }

  showMonth(date: Date, event) {
    event.stopPropagation();
    this._currentMonth = date;
    this._getMonthsMatrix(date);
    this.markselectDay();
    this.markPeriodDates();

  }

  cancel() {
    this.onCanceled.emit();
  }

  submit() {
    this.change();
  }

  change() {
    let data = [];
    data = this._options.initDates;
    this.onChanged.emit(data);
  }



}
