/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, EventEmitter, Output, HostListener, Directive, ElementRef } from '@angular/core';
/**
 * @record
 */
export function Day() { }
if (false) {
    /** @type {?} */
    Day.prototype.date;
    /** @type {?} */
    Day.prototype.yearDayNum;
    /** @type {?|undefined} */
    Day.prototype.vas;
}
export class Outside {
    /**
     * @param {?} elRef
     */
    constructor(elRef) {
        this.elRef = elRef;
        this.close = new EventEmitter();
        this.isOpen = false;
    }
    /**
     * @param {?} target
     * @return {?}
     */
    isChild(target) {
        /** @type {?} */
        const parent = target.parentNode;
        if (!parent || parent.tagName === 'undefined') {
            return false;
        }
        /** @type {?} */
        const tagName = parent.tagName;
        if (parent && tagName === 'APP-CALENDAR') {
            return true;
        }
        else if (parent && tagName !== 'HTML') {
            return this.isChild(parent);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleClick(event) {
        event.stopPropagation();
        event.preventDefault();
        if (!this.isOpen) {
            this.isOpen = true;
        }
        else if (!this.elRef.nativeElement.contains(event.target)) {
            this.close.emit();
        }
    }
}
Outside.decorators = [
    { type: Directive, args: [{
                selector: '[outside]',
            },] }
];
/** @nocollapse */
Outside.ctorParameters = () => [
    { type: ElementRef }
];
Outside.propDecorators = {
    close: [{ type: Output, args: ['outside',] }],
    handleClick: [{ type: HostListener, args: ['document:click', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    Outside.prototype.close;
    /** @type {?} */
    Outside.prototype.isOpen;
    /**
     * @type {?}
     * @private
     */
    Outside.prototype.elRef;
}
export class DatepickerComponent {
    constructor() {
        this.onChanged = new EventEmitter();
        this.onClickOut = new EventEmitter();
        this.today = { date: new Date(), yearDayNum: this.getNumOfYear(new Date()) };
        this.yesterday = new Date();
        this.countMonths = 1;
        this.weekStart = 1;
        this.weekends = [5, 6];
        this.monthCalend = [];
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickout(event) {
        console.log('CLICKOUT');
        this.onClickOut.emit();
    }
    /**
     * @param {?} data
     * @return {?}
     */
    timeChange(data) {
        //console.log(data)
    }
    /**
     * @return {?}
     */
    submit() {
        this.change();
    }
    /**
     * @return {?}
     */
    change() {
        /** @type {?} */
        let data = {};
        if (!this.selectPeriodEnabled) {
            data = {
                dateStart: this.selectedDay.date,
                dateEnd: null
            };
        }
        else {
            data = {
                dateStart: this.selectedDay.date,
                dateEnd: this.selectedDay2.date
            };
        }
        console.log('changed', data);
        this.onChanged.emit(data);
    }
    /**
     * @param {?} num
     * @return {?}
     */
    getMonthByNUm(num) {
        /** @type {?} */
        const months = this.langs()['month'][this.lang];
        return months[num];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.selectPeriodEnabled = (this.options.selectPeriodEnabled) ? this.options.selectPeriodEnabled : false;
        if (!this.selectPeriodEnabled) {
            this.initDate = this.dates.dateStart;
            this.selectedDay = { date: this.dates.dateStart, yearDayNum: this.getNumOfYear(this.dates.dateStart) };
            this.selectedDay2 = null;
        }
        else {
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
    /**
     * @param {?} date
     * @param {?} event
     * @return {?}
     */
    showMonth(date, event) {
        event.stopPropagation();
        this.showView(date);
        this.currentMonth = date;
    }
    /**
     * @param {?} trueNum
     * @return {?}
     */
    getOffsetDaysStart(trueNum) {
        return (trueNum < this.weekStart) ? 7 + trueNum - this.weekStart : trueNum - this.weekStart;
    }
    /**
     * @return {?}
     */
    langs() {
        /** @type {?} */
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
    /**
     * @return {?}
     */
    getWeekLabels() {
        this.weekLabels = this.langs()['week'][this.lang];
        this.weekLabels = this.weekLabels.splice(this.weekStart).concat(this.weekLabels);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isNowDate(date) {
        /** @type {?} */
        const now = new Date();
        return (now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth()
            && now.getDate() === date.getDate()) ? true : false;
    }
    /**
     * @return {?}
     */
    showPrev() {
        if (this.monthMode) {
            this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
            this.showView(this.currentMonth);
        }
        else {
            this.currentMonth.setFullYear(this.currentMonth.getFullYear() - 1);
            this.showViewMonth(this.currentMonth);
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isSelected(date) {
        return (this.selectedDay && this.selectedDay.date.getFullYear() === date.getFullYear()
            && this.selectedDay.date.getMonth() === date.getMonth() && this.selectedDay.date.getDate() === date.getDate()) ? true : false;
    }
    /**
     * @return {?}
     */
    markselectDay() {
        for (let i = 0; i < this.calend.length; i++) {
            /** @type {?} */
            const item = this.calend[i];
            if (this.selectedDay && this.selectedDay.yearDayNum === item.yearDayNum && this.selectedDay.date.getFullYear() === item.date.getFullYear()) {
                this.calend[i].isSelected = true;
            }
            else if (this.selectedDay2 && this.selectedDay2.yearDayNum === item.yearDayNum && this.selectedDay2.date.getFullYear() === item.date.getFullYear()) {
                this.calend[i].isSelected = true;
            }
            else {
                this.calend[i].isSelected = false;
            }
        }
    }
    /**
     * @param {?} day
     * @return {?}
     */
    selectDay(day) {
        if (this.selectPeriodEnabled) {
            if (this.selectedDay && this.selectedDay.yearDayNum === day.yearDayNum && this.selectedDay.date.getFullYear() === day.date.getFullYear()) {
                //this.selectedDay = null;
                //this.selectedDay2 = null;
            }
            else {
                if (!this.selectedDay) {
                    this.selectedDay = day;
                    this.selectedDay2 = null;
                }
                else if (this.selectedDay && !this.selectedDay2) {
                    this.selectedDay2 = day;
                }
                else if (this.selectedDay && this.selectedDay2) {
                    this.selectedDay = day;
                    this.selectedDay2 = null;
                }
            }
        }
        else {
            if (this.selectedDay && this.selectedDay.yearDayNum === day.yearDayNum && this.selectedDay.date.getFullYear() === day.date.getFullYear()) {
                //this.selectedDay = null;
            }
            else {
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
        if (!this.submitMode) {
            this.change();
        }
    }
    /**
     * @return {?}
     */
    showNext() {
        if (this.monthMode) {
            this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
            this.showView(this.currentMonth);
        }
        else {
            this.currentMonth.setFullYear(this.currentMonth.getFullYear() + 1);
            this.showViewMonth(this.currentMonth);
        }
    }
    /**
     * @param {?} day
     * @param {?=} event
     * @return {?}
     */
    clickDate(day, event = null) {
        (event) ? event.stopPropagation() : null;
        if (!day.disabled) {
            this.selectDay(day);
        }
    }
    /**
     * @param {?=} day
     * @return {?}
     */
    markPeriodDates(day = null) {
        for (let i = 0; i < this.calend.length; i++) {
            /** @type {?} */
            const item = this.calend[i];
            if (day && this.selectedDay && !this.selectedDay2 && ((item.yearDayNum >= day.yearDayNum && item.yearDayNum <= this.selectedDay.yearDayNum)
                ||
                    (item.yearDayNum <= day.yearDayNum && item.yearDayNum >= this.selectedDay.yearDayNum))
                ||
                    this.selectedDay && this.selectedDay2 && ((item.yearDayNum >= this.selectedDay2.yearDayNum && item.yearDayNum <= this.selectedDay.yearDayNum)
                        ||
                            (item.yearDayNum <= this.selectedDay2.yearDayNum && item.yearDayNum >= this.selectedDay.yearDayNum))) {
                this.calend[i].markedPeriod = true;
            }
            else {
                this.calend[i].markedPeriod = false;
            }
        }
    }
    /**
     * @param {?} day
     * @return {?}
     */
    hoverDate(day) {
        if (this.selectedDay && this.selectPeriodEnabled) {
            this.markPeriodDates(day);
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDate(date) {
        /** @type {?} */
        const d = Object.assign(date);
        return new Date(d.getTime());
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getNumOfYear(date) {
        /** @type {?} */
        const start = new Date(date.getFullYear(), 0, 0);
        /** @type {?} */
        const diff = date.valueOf() - start.valueOf();
        /** @type {?} */
        const oneDay = 1000 * 60 * 60 * 24;
        /** @type {?} */
        const day = Math.floor(diff / oneDay);
        return day;
    }
    /**
     * @param {?} date
     * @param {?=} event
     * @return {?}
     */
    showViewMonth(date, event = null) {
        (event) ? event.stopPropagation() : null;
        /** @type {?} */
        const year = date.getFullYear();
        for (let k = 0; k < 4; k++) {
            this.monthCalend[k] = [];
            for (let i = k * 3; i < k * 3 + 3; i++) {
                this.monthCalend[k].push({
                    year,
                    month: i,
                    date: new Date(year, i, 1)
                });
            }
        }
        this.monthMode = false;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isDisabled(date) {
        /** @type {?} */
        let a = this.getDate(date);
        a.setHours(0, 0, 0, 0);
        /** @type {?} */
        let b = this.getDate(new Date());
        b.setHours(0, 0, 0, 0);
        if (this.disabledBefore) {
            return (this.disabledBefore && a.valueOf() < b.valueOf()) ? true : false;
        }
        else if (this.disabledAfter) {
            return (this.disabledAfter && a.valueOf() > b.valueOf()) ? true : false;
        }
        return false;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    showView(date) {
        this.daysInMonth = this.getDaysInMonth(date);
        this.daysInPrevMonth = this.getDaysInPrevMonth(date);
        /** @type {?} */
        const numFirstDay = this.getFirstDayNum(date);
        /** @type {?} */
        const numLastDay = this.getLastDayNum(date);
        /** @type {?} */
        const calend = [];
        /** @type {?} */
        const weekCalend = [];
        /** @type {?} */
        const nowMonth = this.getDate(date);
        /** @type {?} */
        const prevMonthDate = this.getDate(date);
        prevMonthDate.setMonth(this.getDate(date).getMonth() - 1);
        /** @type {?} */
        const nextMonthDate = this.getDate(date);
        nextMonthDate.setMonth(this.getDate(date).getMonth() + 1);
        if (numFirstDay !== 0) {
            for (let i = numFirstDay; i > 0; i--) {
                /** @type {?} */
                const num = this.daysInPrevMonth - i + 1;
                /** @type {?} */
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
            /** @type {?} */
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
                /** @type {?} */
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
            /** @type {?} */
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
    /**
     * @param {?} date
     * @return {?}
     */
    isWeekEnd(date) {
        return (this.weekends.includes(this.getNumDay(date))) ? true : false;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getNumDay(date) {
        return this.getOffsetDaysStart(date.getDay());
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getFirstDayNum(date) {
        /** @type {?} */
        const trueNum = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return this.getOffsetDaysStart(trueNum);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getLastDayNum(date) {
        /** @type {?} */
        const trueNum = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
        return this.getOffsetDaysStart(trueNum);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDaysInMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDaysInPrevMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    }
}
DatepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ns-datepicker',
                template: "<div class=\"calendar\" (outside)=\"clickout($event)\" >\n\n    <div style=\"border-bottom: 1px solid #f3f3f3; display:flex; flex-direction: row; justify-content: center; align-items:center; padding:10px;flex-direction: column;\">\n        <div *ngIf=\"suggestions\" style=\"display: block;\">\n            <button class=\"dateBtn\" (click)=\"selectDay(today)\">\u0441\u0435\u0433\u043E\u0434\u043D\u044F</button>\n        </div>\n      <div style=\"padding-top:10px; display:flex; flex-direction: row; justify-content: space-between; width: 100%;\">\n          <a href=\"javascript:void(0)\" (click)=\"showPrev()\" class=\"btnPrevNext\"><</a>\n          <div class=\"yearBtn\" (click)=\"showViewMonth(currentMonth, $event)\">\n              <span *ngIf=\"monthMode\" style=\"margin-right:3px\">{{getMonthByNUm(currentMonth.getMonth())}}</span> <span>{{currentMonth.getFullYear()}}</span>\n          </div>\n          <a href=\"javascript:void(0)\" (click)=\"showNext()\"  class=\"btnPrevNext\">></a>\n      </div>\n      \n      \n    \n  \n    </div>\n    <div style=\"padding: 8px 10px;\">\n      \n      <div *ngIf=\"weekLabels&&monthMode\" class=\"row\">\n        <div class=\"col h\" *ngFor=\"let label of weekLabels\">\n          {{label}}\n        </div>\n      </div>\n  \n  \n      <div *ngIf=\"weekCalend&&monthMode\">\n        <div class=\"row\" *ngFor=\"let week of weekCalend\">\n            <div \n              *ngFor=\"let day of week\" \n              class=\"col\" \n              [ngClass]=\"{currentMonth:day.currentMonth, isNowDate: day.isNowDate, isWeekEnd: day.isWeekEnd, isSelected: day.isSelected, markedPeriod: day.markedPeriod, disabled: day.disabled }\" \n              (click)=\"clickDate(day, $event)\"\n              (mouseover)=\"hoverDate(day)\"\n            >\n            {{day.num}}\n            <div></div>\n          </div>\n        </div>     \n      </div>\n  \n  \n      <div *ngIf=\"monthCalend&&!monthMode\">\n        <div class=\"row\" *ngFor=\"let months of monthCalend\">\n            <div \n              *ngFor=\"let month of months\"\n              class=\"col month\"\n              (click)=\"showMonth(month.date, $event)\"\n            >\n            {{getMonthByNUm(month.month)}} \n            </div>\n        </div>     \n      </div>\n  \n    </div>\n    <div *ngIf=\"time&&time.enabled\" style=\"border-bottom: 1px solid #f3f3f3; display:flex; flex-direction: column; justify-content: center; padding:10px; font-size: 11px\">\n        \n      <div *ngIf=\"selectedDay\" >\n        <ns-time [date]=\"selectedDay\" changed=\"timeChange(data)\"></ns-time>\n      </div>\n\n      <div *ngIf=\"this.selectedDay2\" >\n        <ns-time [date]=\"selectedDay2\" changed=\"timeChange(data)\"></ns-time>\n      </div>\n    </div>\n\n\n    <div *ngIf=\"time.enabled||(!time.enabled&&submitMode)\" style=\" display:flex; flex-direction: row; justify-content: space-between; align-items:center; padding:10px; font-size: 11px\">\n      <button class=\"btnCancel\">{{(lang=='en')?'cancel':'\u043E\u0442\u043C\u0435\u043D\u0430'}}</button>\n      <button class=\"btnOk\" (click)=\"submit()\">{{(lang=='en')?'ok':'\u043E\u043A'}}</button>\n    </div>\n  \n  </div>",
                styles: [".row{display:flex;flex-direction:row}.col{display:flex;position:relative;flex-direction:column;flex:1;justify-content:center;align-items:center;font-size:.8em;padding:4px;border-radius:2px;cursor:pointer;color:#c7c7c7;-webkit-animation:.2s ease-in slide-up;animation:.2s ease-in slide-up;text-align:center}@-webkit-keyframes slide-up{0%{opacity:.5}100%{opacity:1}}@keyframes slide-up{0%{opacity:.5}100%{opacity:1}}.col.markedPeriod{background:#d5ebff!important;border-radius:0!important;transition:.2s}.col.isSelected.markedPeriod{border-radius:2px!important}.col.isSelected{background:#5eb3fc!important;color:#fff!important}.dateBtn{float:left;background:#f3f3f3;border:0;font-size:.74em;color:#2fafff;outline:0;border-radius:2px;cursor:pointer;margin:2px;padding:2px 4px}.dateBtn:hover{background:#6398e0;color:#fff}.col.currentMonth{color:#353540}.col.isNowDate{color:#3f92ff}.col.isWeekEnd.currentMonth{color:#c53c3c}.col.disabled{background:#f5f5f5;color:#afafaf}.col.month:hover,.col:hover{background:#eee}.col.month{font-size:11px;color:#545454;padding:16px 8px;box-shadow:0 0 0 1px #f4f3f3;background:#fff;border-radius:0;min-width:40px}.col.h{color:#ff9a19;text-transform:uppercase}.col.h:hover{background:#fff}.calendar{float:left;box-shadow:0 3px 12px -5px #000;max-width:200px;-webkit-animation:50ms slide-up;animation:50ms slide-up;background:#fff;border-radius:8px}.btnPrevNext{font-size:14px;padding:6px 8px;border-radius:2px;color:#5eb3fc;text-decoration:none}.btnPrevNext:hover{background:#f4f3f3}.yearBtn{font-size:14px;padding:6px 10px;border-radius:2px;color:#585858;cursor:pointer}.yearBtn:hover{background:#f4f3f3}.btnOk{border:0;background:#5eb3fc;padding:8px 16px;color:#fff;border-radius:2px;outline:0;cursor:pointer}.btnOk:hover{background:#3e99e6}.btnCancel{border:0;background:#fff;padding:8px 16px;color:#5eb3fc;border-radius:2px;outline:0;cursor:pointer}.btnCancel:hover{background:#e4f3ff}"]
            }] }
];
/** @nocollapse */
DatepickerComponent.ctorParameters = () => [];
DatepickerComponent.propDecorators = {
    options: [{ type: Input }],
    visible: [{ type: Input }],
    onChangeDate: [{ type: Input }],
    onChanged: [{ type: Output }],
    onClickOut: [{ type: Output }],
    dates: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DatepickerComponent.prototype.options;
    /** @type {?} */
    DatepickerComponent.prototype.visible;
    /** @type {?} */
    DatepickerComponent.prototype.onChangeDate;
    /** @type {?} */
    DatepickerComponent.prototype.onChanged;
    /** @type {?} */
    DatepickerComponent.prototype.onClickOut;
    /** @type {?} */
    DatepickerComponent.prototype.dates;
    /** @type {?} */
    DatepickerComponent.prototype.initDate;
    /** @type {?} */
    DatepickerComponent.prototype.today;
    /** @type {?} */
    DatepickerComponent.prototype.yesterday;
    /** @type {?} */
    DatepickerComponent.prototype.date;
    /** @type {?} */
    DatepickerComponent.prototype.numDay;
    /** @type {?} */
    DatepickerComponent.prototype.daysInMonth;
    /** @type {?} */
    DatepickerComponent.prototype.daysInPrevMonth;
    /** @type {?} */
    DatepickerComponent.prototype.matrix;
    /** @type {?} */
    DatepickerComponent.prototype.countMonths;
    /** @type {?} */
    DatepickerComponent.prototype.weekStart;
    /** @type {?} */
    DatepickerComponent.prototype.currentMonth;
    /** @type {?} */
    DatepickerComponent.prototype.weekends;
    /** @type {?} */
    DatepickerComponent.prototype.calend;
    /** @type {?} */
    DatepickerComponent.prototype.weekCalend;
    /** @type {?} */
    DatepickerComponent.prototype.selectedDay;
    /** @type {?} */
    DatepickerComponent.prototype.selectedDay2;
    /** @type {?} */
    DatepickerComponent.prototype.weekLabels;
    /** @type {?} */
    DatepickerComponent.prototype.period;
    /** @type {?} */
    DatepickerComponent.prototype.selectPeriodEnabled;
    /** @type {?} */
    DatepickerComponent.prototype.monthMode;
    /** @type {?} */
    DatepickerComponent.prototype.suggestions;
    /** @type {?} */
    DatepickerComponent.prototype.monthCalend;
    /** @type {?} */
    DatepickerComponent.prototype.disabledBefore;
    /** @type {?} */
    DatepickerComponent.prototype.disabledAfter;
    /** @type {?} */
    DatepickerComponent.prototype.lang;
    /** @type {?} */
    DatepickerComponent.prototype.submitMode;
    /** @type {?} */
    DatepickerComponent.prototype.time;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRlcGlja2VyLW5zLyIsInNvdXJjZXMiOlsibGliL2RhdGVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBYSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRS9ILHlCQUlDOzs7SUFIQyxtQkFBVzs7SUFDWCx5QkFBbUI7O0lBQ25CLGtCQUFhOztBQVFmLE1BQU0sT0FBTyxPQUFPOzs7O0lBS2xCLFlBQW9CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7UUFKbEIsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUMsV0FBTSxHQUFZLEtBQUssQ0FBQztJQUd4QixDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxNQUFNOztjQUNOLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVTtRQUNoQyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssV0FBVyxFQUFFO1lBQUUsT0FBTyxLQUFLLENBQUM7U0FBRTs7Y0FDMUQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPO1FBQzlCLElBQUksTUFBTSxJQUFJLE9BQU8sS0FBSyxjQUFjLEVBQUU7WUFDeEMsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNLElBQUksTUFBTSxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUU7WUFDdkMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzdCO0lBRUgsQ0FBQzs7Ozs7SUFHTSxXQUFXLENBQUMsS0FBSztRQUN0QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxF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Q0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ3ZHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzFCO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ3ZHLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1NBQ3JHO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzFGLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzNELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdkUsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDOUUsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwRCxPQUFPLEVBQUUsS0FBSztTQUNmLENBQUM7UUFJRixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixrQkFBa0I7SUFDcEIsQ0FBQzs7Ozs7O0lBRUQsU0FBUyxDQUFDLElBQVUsRUFBRSxLQUFLO1FBQ3pCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBR0Qsa0JBQWtCLENBQUMsT0FBZTtRQUNoQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUM5RixDQUFDOzs7O0lBRUQsS0FBSzs7Y0FDRyxJQUFJLEdBQUc7WUFDWCxJQUFJLEVBQUc7Z0JBQ0wsRUFBRSxFQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2dCQUMvQyxFQUFFLEVBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDaEQ7WUFDRCxLQUFLLEVBQUc7Z0JBQ04sRUFBRSxFQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxVQUFVLENBQUM7Z0JBQzNILEVBQUUsRUFBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsU0FBUyxDQUFDO2FBQ3ZIO1NBRUY7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7SUFJRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbkYsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsSUFBVTs7Y0FDWixHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUU7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7ZUFDakYsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUN4RCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2xDO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsSUFBVTtRQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFO2VBQ2pGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbEksQ0FBQzs7OztJQUVELGFBQWE7UUFDWCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2tCQUNyQyxJQUFJLEdBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxLQUFLLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDMUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2FBQ2xDO2lCQUFNLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ3BKLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzthQUNsQztpQkFDSTtnQkFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7YUFDbkM7U0FDRjtJQUNILENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLEdBQVE7UUFDaEIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDNUIsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxLQUFLLEdBQUcsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDeEksMEJBQTBCO2dCQUMxQiwyQkFBMkI7YUFFNUI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO29CQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztpQkFDMUI7cUJBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDakQsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7aUJBQ3pCO3FCQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7aUJBQzFCO2FBQ0Y7U0FFRjthQUFNO1lBQ0wsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxLQUFLLEdBQUcsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDeEksMEJBQTBCO2FBQzNCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO2FBQ3hCO1NBQ0Y7UUFDRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDL0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzVCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN4QjtRQUNELElBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDO1lBQ2xCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO0lBRUgsQ0FBQzs7OztJQUlELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNsQzthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNuRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN2QztJQUVILENBQUM7Ozs7OztJQUVELFNBQVMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxHQUFHLElBQUk7UUFDekIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQjtJQUVILENBQUM7Ozs7O0lBRUQsZUFBZSxDQUFDLEdBQUcsR0FBRyxJQUFJO1FBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7a0JBQ3JDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUUzQixJQUNFLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUMvQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDOztvQkFFckYsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUN0Rjs7b0JBRUQsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQ3ZDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDOzs0QkFFbkcsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FDcEcsRUFFRDtnQkFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDcEM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2FBQ3JDO1NBQ0Y7SUFDSCxDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxHQUFHO1FBQ1gsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUNoRCxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsSUFBVTs7Y0FDVixDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDN0IsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxJQUFVOztjQUNmLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7Y0FDMUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFOztjQUN2QyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTs7Y0FDNUIsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUNyQyxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Ozs7OztJQUVELGFBQWEsQ0FBQyxJQUFVLEVBQUUsS0FBSyxHQUFHLElBQUk7UUFDcEMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7O2NBQ25DLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDekIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3RCO29CQUNFLElBQUk7b0JBQ0osS0FBSyxFQUFFLENBQUM7b0JBQ1IsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUMzQixDQUNGLENBQUM7YUFDSDtTQUNGO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFFekIsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsSUFBVTs7WUFDZixDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDMUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7WUFDbkIsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNoQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUcsSUFBSSxDQUFDLGNBQWMsRUFBQztZQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQzFFO2FBQUssSUFBRyxJQUFJLENBQUMsYUFBYSxFQUFDO1lBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDekU7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUVmLENBQUM7Ozs7O0lBR0QsUUFBUSxDQUFDLElBQVU7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDOztjQUMvQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7O2NBQ3ZDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzs7Y0FDckMsTUFBTSxHQUFHLEVBQUU7O2NBQ1gsVUFBVSxHQUFHLEVBQUU7O2NBRWYsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDOztjQUM3QixhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDeEMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDOztjQUNwRCxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDeEMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRzFELElBQUksV0FBVyxLQUFLLENBQUMsRUFBRTtZQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOztzQkFDOUIsR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxHQUFHLENBQUM7O3NCQUNsQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLENBQUM7Z0JBQ2pGLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ1YsR0FBRztvQkFDSCxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7b0JBQ25DLElBQUk7b0JBQ0osWUFBWSxFQUFFLEtBQUs7b0JBQ25CLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztvQkFDL0IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO29CQUMvQixRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7aUJBQ2hDLENBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOztrQkFDZCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckUsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDVixHQUFHLEVBQUUsQ0FBQztnQkFDTixVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQ25DLElBQUk7Z0JBQ0osWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDL0IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2dCQUMvQixRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7YUFDaEMsQ0FBQyxDQUFDO1NBRUo7UUFFRCxJQUFJLFVBQVUsS0FBSyxDQUFDLEVBQUU7WUFDcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O3NCQUNqQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQy9FLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ1YsR0FBRyxFQUFFLENBQUM7b0JBQ04sVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO29CQUNuQyxJQUFJO29CQUNKLFlBQVksRUFBRSxLQUFLO29CQUNuQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7b0JBQy9CLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztvQkFDL0IsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2lCQUNoQyxDQUFDLENBQUM7YUFDSjtTQUNGO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOztrQkFDcEMsSUFBSSxHQUFHLEVBQUU7WUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RCO1lBQ0QsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QjtRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzVCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN4QjtRQUVELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxJQUFVO1FBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDdkUsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsSUFBVTtRQUNsQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs7OztJQUVELGNBQWMsQ0FBQyxJQUFVOztjQUNqQixPQUFPLEdBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7UUFDakYsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsSUFBVTs7Y0FDaEIsT0FBTyxHQUFXLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtRQUNyRixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7OztJQUVELGNBQWMsQ0FBQyxJQUFVO1FBQ3ZCLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDeEUsQ0FBQzs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxJQUFVO1FBQzNCLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwRSxDQUFDOzs7WUEzYUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixncEdBQTBDOzthQUUzQzs7Ozs7c0JBR0UsS0FBSztzQkFDTCxLQUFLOzJCQUNMLEtBQUs7d0JBQ0wsTUFBTTt5QkFDTixNQUFNO29CQUNOLEtBQUs7Ozs7SUFMTixzQ0FBaUI7O0lBQ2pCLHNDQUFpQjs7SUFDakIsMkNBQWdDOztJQUNoQyx3Q0FBeUM7O0lBQ3pDLHlDQUFtRDs7SUFDbkQsb0NBQWU7O0lBQ2YsdUNBQVM7O0lBQ1Qsb0NBQXdFOztJQUN4RSx3Q0FBdUI7O0lBQ3ZCLG1DQUFLOztJQUNMLHFDQUFPOztJQUNQLDBDQUFvQjs7SUFDcEIsOENBQXdCOztJQUN4QixxQ0FBTzs7SUFDUCwwQ0FBZ0I7O0lBQ2hCLHdDQUFjOztJQUNkLDJDQUFtQjs7SUFDbkIsdUNBQWtCOztJQUNsQixxQ0FBYzs7SUFDZCx5Q0FBa0I7O0lBQ2xCLDBDQUFZOztJQUNaLDJDQUFhOztJQUNiLHlDQUFXOztJQUNYLHFDQUFPOztJQUNQLGtEQUE2Qjs7SUFDN0Isd0NBQW1COztJQUNuQiwwQ0FBcUI7O0lBQ3JCLDBDQUFpQjs7SUFDakIsNkNBQXdCOztJQUN4Qiw0Q0FBdUI7O0lBQ3ZCLG1DQUFhOztJQUNiLHlDQUFvQjs7SUFDcEIsbUNBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBIb3N0TGlzdGVuZXIsIE9uRGVzdHJveSwgRGlyZWN0aXZlLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF5IHtcbiAgZGF0ZTogRGF0ZTtcbiAgeWVhckRheU51bTogbnVtYmVyO1xuICB2YXM/OiBudW1iZXI7XG59XG5cblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbb3V0c2lkZV0nLFxufSlcbmV4cG9ydCBjbGFzcyBPdXRzaWRlIHtcbiAgQE91dHB1dCgnb3V0c2lkZScpIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIGlzQ2hpbGQodGFyZ2V0KSB7XG4gICAgY29uc3QgcGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgaWYgKCFwYXJlbnQgfHwgcGFyZW50LnRhZ05hbWUgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGNvbnN0IHRhZ05hbWUgPSBwYXJlbnQudGFnTmFtZTtcbiAgICBpZiAocGFyZW50ICYmIHRhZ05hbWUgPT09ICdBUFAtQ0FMRU5EQVInKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHBhcmVudCAmJiB0YWdOYW1lICE9PSAnSFRNTCcpIHtcbiAgICAgIHJldHVybiB0aGlzLmlzQ2hpbGQocGFyZW50KTtcbiAgICB9XG5cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgcHVibGljIGhhbmRsZUNsaWNrKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgfSBlbHNlIGlmICghdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMuY2xvc2UuZW1pdCgpO1xuICAgIH1cbiAgfVxufVxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLWRhdGVwaWNrZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vZGF0ZXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2RhdGVwaWNrZXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIERhdGVwaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIG9wdGlvbnM7XG4gIEBJbnB1dCgpIHZpc2libGU7XG4gIEBJbnB1dCgpIG9uQ2hhbmdlRGF0ZTogRnVuY3Rpb247XG4gIEBPdXRwdXQoKSBvbkNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkNsaWNrT3V0ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBASW5wdXQoKSBkYXRlcztcbiAgaW5pdERhdGU7XG4gIHRvZGF5ID0geyBkYXRlOiBuZXcgRGF0ZSgpLCB5ZWFyRGF5TnVtOiB0aGlzLmdldE51bU9mWWVhcihuZXcgRGF0ZSgpKSB9O1xuICB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSgpO1xuICBkYXRlO1xuICBudW1EYXk7XG4gIGRheXNJbk1vbnRoOiBudW1iZXI7XG4gIGRheXNJblByZXZNb250aDogbnVtYmVyO1xuICBtYXRyaXg7XG4gIGNvdW50TW9udGhzID0gMTtcbiAgd2Vla1N0YXJ0ID0gMTtcbiAgY3VycmVudE1vbnRoOiBEYXRlO1xuICB3ZWVrZW5kcyA9IFs1LCA2XTtcbiAgY2FsZW5kOiBhbnlbXTtcbiAgd2Vla0NhbGVuZDogYW55W107XG4gIHNlbGVjdGVkRGF5O1xuICBzZWxlY3RlZERheTI7XG4gIHdlZWtMYWJlbHM7XG4gIHBlcmlvZDtcbiAgc2VsZWN0UGVyaW9kRW5hYmxlZDogYm9vbGVhbjtcbiAgbW9udGhNb2RlOiBib29sZWFuO1xuICBzdWdnZXN0aW9uczogYm9vbGVhbjtcbiAgbW9udGhDYWxlbmQgPSBbXTtcbiAgZGlzYWJsZWRCZWZvcmU6IGJvb2xlYW47XG4gIGRpc2FibGVkQWZ0ZXI6IGJvb2xlYW47XG4gIGxhbmc6IHN0cmluZztcbiAgc3VibWl0TW9kZTogYm9vbGVhbjtcbiAgdGltZTtcblxuXG4gIGNsaWNrb3V0KGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ0NMSUNLT1VUJyk7XG4gICAgdGhpcy5vbkNsaWNrT3V0LmVtaXQoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuICB0aW1lQ2hhbmdlKGRhdGEpIHtcbiAgICAvL2NvbnNvbGUubG9nKGRhdGEpXG4gIH1cblxuICBzdWJtaXQoKSB7XG4gICAgdGhpcy5jaGFuZ2UoKTtcbiAgfVxuXG4gIGNoYW5nZSgpIHtcbiAgICBsZXQgZGF0YSA9IHt9O1xuICAgIGlmICghdGhpcy5zZWxlY3RQZXJpb2RFbmFibGVkKSB7XG4gICAgICBkYXRhID0ge1xuICAgICAgICBkYXRlU3RhcnQ6IHRoaXMuc2VsZWN0ZWREYXkuZGF0ZSxcbiAgICAgICAgZGF0ZUVuZDogbnVsbFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IHtcbiAgICAgICAgZGF0ZVN0YXJ0OiB0aGlzLnNlbGVjdGVkRGF5LmRhdGUsXG4gICAgICAgIGRhdGVFbmQ6IHRoaXMuc2VsZWN0ZWREYXkyLmRhdGVcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdjaGFuZ2VkJyxkYXRhKVxuICAgIHRoaXMub25DaGFuZ2VkLmVtaXQoZGF0YSk7XG4gIH1cbiAgZ2V0TW9udGhCeU5VbShudW06IG51bWJlcikge1xuICAgIGNvbnN0IG1vbnRocyA9IHRoaXMubGFuZ3MoKVsnbW9udGgnXVt0aGlzLmxhbmddO1xuICAgIHJldHVybiBtb250aHNbbnVtXTtcbiAgfVxuICBuZ09uSW5pdCgpIHtcblxuICAgIHRoaXMuc2VsZWN0UGVyaW9kRW5hYmxlZCA9ICh0aGlzLm9wdGlvbnMuc2VsZWN0UGVyaW9kRW5hYmxlZCkgPyB0aGlzLm9wdGlvbnMuc2VsZWN0UGVyaW9kRW5hYmxlZCA6IGZhbHNlO1xuXG4gICAgaWYgKCF0aGlzLnNlbGVjdFBlcmlvZEVuYWJsZWQpIHtcbiAgICAgIHRoaXMuaW5pdERhdGUgPSB0aGlzLmRhdGVzLmRhdGVTdGFydDtcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXkgPSB7IGRhdGU6IHRoaXMuZGF0ZXMuZGF0ZVN0YXJ0LCB5ZWFyRGF5TnVtOiB0aGlzLmdldE51bU9mWWVhcih0aGlzLmRhdGVzLmRhdGVTdGFydCkgfTtcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXkyID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbml0RGF0ZSA9IHRoaXMuZGF0ZXMuZGF0ZVN0YXJ0O1xuICAgICAgdGhpcy5zZWxlY3RlZERheSA9IHsgZGF0ZTogdGhpcy5kYXRlcy5kYXRlU3RhcnQsIHllYXJEYXlOdW06IHRoaXMuZ2V0TnVtT2ZZZWFyKHRoaXMuZGF0ZXMuZGF0ZVN0YXJ0KSB9O1xuICAgICAgdGhpcy5zZWxlY3RlZERheTIgPSB7IGRhdGU6IHRoaXMuZGF0ZXMuZGF0ZUVuZCwgeWVhckRheU51bTogdGhpcy5nZXROdW1PZlllYXIodGhpcy5kYXRlcy5kYXRlRW5kKSB9O1xuICAgIH1cblxuICAgIHRoaXMubW9udGhNb2RlID0gdHJ1ZTtcbiAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSh0aGlzLmluaXREYXRlKTtcbiAgICB0aGlzLmN1cnJlbnRNb250aCA9IG5ldyBEYXRlKHRoaXMuZGF0ZS5nZXRGdWxsWWVhcigpLCB0aGlzLmRhdGUuZ2V0TW9udGgoKSwgMSk7XG4gICAgdGhpcy5udW1EYXkgPSB0aGlzLmRhdGUuZ2V0RGF5KCk7XG4gICAgdGhpcy5zdWdnZXN0aW9ucyA9ICh0aGlzLm9wdGlvbnMuc3VnZ2VzdGlvbnMpID8gdGhpcy5vcHRpb25zLnN1Z2dlc3Rpb25zIDogZmFsc2U7XG4gICAgdGhpcy5kaXNhYmxlZEJlZm9yZSA9ICh0aGlzLm9wdGlvbnMuZGlzYWJsZWRCZWZvcmUpID8gdGhpcy5vcHRpb25zLmRpc2FibGVkQmVmb3JlIDogZmFsc2U7XG4gICAgdGhpcy5kaXNhYmxlZEFmdGVyID0gKHRoaXMub3B0aW9ucy5kaXNhYmxlZEFmdGVyKSA/IHRoaXMub3B0aW9ucy5kaXNhYmxlZEFmdGVyIDogZmFsc2U7XG4gICAgdGhpcy5sYW5nID0gKHRoaXMub3B0aW9ucy5sYW5nKSA/IHRoaXMub3B0aW9ucy5sYW5nIDogJ2VuJztcbiAgICB0aGlzLndlZWtlbmRzID0gKHRoaXMub3B0aW9ucy53ZWVrZW5kcykgPyB0aGlzLm9wdGlvbnMud2Vla2VuZHMgOiBbNSwgNl07XG4gICAgdGhpcy53ZWVrU3RhcnQgPSAodGhpcy5vcHRpb25zLndlZWtTdGFydCkgPyB0aGlzLm9wdGlvbnMud2Vla1N0YXJ0IDogMTtcblxuICAgIHRoaXMuc3VibWl0TW9kZSA9ICh0aGlzLm9wdGlvbnMuc3VibWl0TW9kZSkgPyB0aGlzLm9wdGlvbnMuc3VibWl0TW9kZSA6IGZhbHNlO1xuICAgIHRoaXMudGltZSA9ICh0aGlzLm9wdGlvbnMudGltZSkgPyB0aGlzLm9wdGlvbnMudGltZSA6IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICAgfTtcblxuXG5cbiAgICB0aGlzLmdldFdlZWtMYWJlbHMoKTtcbiAgICB0aGlzLnNob3dWaWV3KHRoaXMuY3VycmVudE1vbnRoKTtcbiAgICB0aGlzLm1hcmtzZWxlY3REYXkoKTtcbiAgICB0aGlzLm1hcmtQZXJpb2REYXRlcygpO1xuICAgIC8vdGhpcy5zZWxlY3REYXkoKVxuICB9XG5cbiAgc2hvd01vbnRoKGRhdGU6IERhdGUsIGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5zaG93VmlldyhkYXRlKTtcbiAgICB0aGlzLmN1cnJlbnRNb250aCA9IGRhdGU7XG4gIH1cblxuXG4gIGdldE9mZnNldERheXNTdGFydCh0cnVlTnVtOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiAodHJ1ZU51bSA8IHRoaXMud2Vla1N0YXJ0KSA/IDcgKyB0cnVlTnVtIC0gdGhpcy53ZWVrU3RhcnQgOiB0cnVlTnVtIC0gdGhpcy53ZWVrU3RhcnQ7XG4gIH1cblxuICBsYW5ncygpe1xuICAgIGNvbnN0IGxhbmcgPSB7XG4gICAgICB3ZWVrIDoge1xuICAgICAgICBlbiA6IFsnU3UnLCAnTW8nLCAnVHUnLCAnV2UnLCAnVGgnLCAnRnInLCAnU3QnXSxcbiAgICAgICAgcnUgOiBbJ9CS0YEnLCAn0J/QvScsICfQktGCJywgJ9Ch0YAnLCAn0KfRgicsICfQn9GCJywgJ9Ch0LEnXSxcbiAgICAgIH0sXG4gICAgICBtb250aCA6IHtcbiAgICAgICAgZW4gOiBbJ0phbnVhcnknLCAnRmVicmFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCdPY3RvYmVyJywnTm92ZW1iZXInLCdEZWNlbWJlciddLFxuICAgICAgICBydSA6IFsn0K/QvdCy0LDRgNGMJywgJ9Ck0LXQstGA0LDQu9GMJywgJ9Cc0LDRgNGCJywgJ9CQ0L/RgNC10LvRjCcsICfQnNCw0LknLCAn0JjRjtC90YwnLCAn0JjRjtC70YwnLCAn0JDQstCz0YPRgdGCJywgJ9Ch0LXQvdGC0Y/QsdGA0YwnLCfQntC60YLRj9Cx0YDRjCcsJ9Cd0L7Rj9Cx0YDRjCcsJ9CU0LXQutCw0LHRgNGMJ10sXG4gICAgICB9XG5cbiAgICB9XG4gICAgcmV0dXJuIGxhbmc7XG4gIH1cblxuICBcblxuICBnZXRXZWVrTGFiZWxzKCkge1xuICAgIHRoaXMud2Vla0xhYmVscyA9IHRoaXMubGFuZ3MoKVsnd2VlayddW3RoaXMubGFuZ107XG4gICAgdGhpcy53ZWVrTGFiZWxzID0gdGhpcy53ZWVrTGFiZWxzLnNwbGljZSh0aGlzLndlZWtTdGFydCkuY29uY2F0KHRoaXMud2Vla0xhYmVscyk7XG4gIH1cblxuICBpc05vd0RhdGUoZGF0ZTogRGF0ZSkge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgcmV0dXJuIChub3cuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZS5nZXRGdWxsWWVhcigpICYmIG5vdy5nZXRNb250aCgpID09PSBkYXRlLmdldE1vbnRoKClcbiAgICAgICYmIG5vdy5nZXREYXRlKCkgPT09IGRhdGUuZ2V0RGF0ZSgpKSA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIHNob3dQcmV2KCkge1xuICAgIGlmICh0aGlzLm1vbnRoTW9kZSkge1xuICAgICAgdGhpcy5jdXJyZW50TW9udGguc2V0TW9udGgodGhpcy5jdXJyZW50TW9udGguZ2V0TW9udGgoKSAtIDEpO1xuICAgICAgdGhpcy5zaG93Vmlldyh0aGlzLmN1cnJlbnRNb250aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudE1vbnRoLnNldEZ1bGxZZWFyKHRoaXMuY3VycmVudE1vbnRoLmdldEZ1bGxZZWFyKCkgLSAxKTtcbiAgICAgIHRoaXMuc2hvd1ZpZXdNb250aCh0aGlzLmN1cnJlbnRNb250aCk7XG4gICAgfVxuICB9XG5cbiAgaXNTZWxlY3RlZChkYXRlOiBEYXRlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLnNlbGVjdGVkRGF5ICYmIHRoaXMuc2VsZWN0ZWREYXkuZGF0ZS5nZXRGdWxsWWVhcigpID09PSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICAgICYmIHRoaXMuc2VsZWN0ZWREYXkuZGF0ZS5nZXRNb250aCgpID09PSBkYXRlLmdldE1vbnRoKCkgJiYgdGhpcy5zZWxlY3RlZERheS5kYXRlLmdldERhdGUoKSA9PT0gZGF0ZS5nZXREYXRlKCkpID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgbWFya3NlbGVjdERheSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2FsZW5kLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpdGVtOiBhbnkgPSB0aGlzLmNhbGVuZFtpXTtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkRGF5ICYmIHRoaXMuc2VsZWN0ZWREYXkueWVhckRheU51bSA9PT0gaXRlbS55ZWFyRGF5TnVtICYmIHRoaXMuc2VsZWN0ZWREYXkuZGF0ZS5nZXRGdWxsWWVhcigpID09PSBpdGVtLmRhdGUuZ2V0RnVsbFllYXIoKSkge1xuICAgICAgICB0aGlzLmNhbGVuZFtpXS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3RlZERheTIgJiYgdGhpcy5zZWxlY3RlZERheTIueWVhckRheU51bSA9PT0gaXRlbS55ZWFyRGF5TnVtICYmIHRoaXMuc2VsZWN0ZWREYXkyLmRhdGUuZ2V0RnVsbFllYXIoKSA9PT0gaXRlbS5kYXRlLmdldEZ1bGxZZWFyKCkpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRbaV0uaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5jYWxlbmRbaV0uaXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNlbGVjdERheShkYXk6IERheSkge1xuICAgIGlmICh0aGlzLnNlbGVjdFBlcmlvZEVuYWJsZWQpIHtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkRGF5ICYmIHRoaXMuc2VsZWN0ZWREYXkueWVhckRheU51bSA9PT0gZGF5LnllYXJEYXlOdW0gJiYgdGhpcy5zZWxlY3RlZERheS5kYXRlLmdldEZ1bGxZZWFyKCkgPT09IGRheS5kYXRlLmdldEZ1bGxZZWFyKCkpIHtcbiAgICAgICAgLy90aGlzLnNlbGVjdGVkRGF5ID0gbnVsbDtcbiAgICAgICAgLy90aGlzLnNlbGVjdGVkRGF5MiA9IG51bGw7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RlZERheSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXkgPSBkYXk7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZERheTIgPSBudWxsO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0ZWREYXkgJiYgIXRoaXMuc2VsZWN0ZWREYXkyKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZERheTIgPSBkYXk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3RlZERheSAmJiB0aGlzLnNlbGVjdGVkRGF5Mikge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXkgPSBkYXk7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZERheTIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWREYXkgJiYgdGhpcy5zZWxlY3RlZERheS55ZWFyRGF5TnVtID09PSBkYXkueWVhckRheU51bSAmJiB0aGlzLnNlbGVjdGVkRGF5LmRhdGUuZ2V0RnVsbFllYXIoKSA9PT0gZGF5LmRhdGUuZ2V0RnVsbFllYXIoKSkge1xuICAgICAgICAvL3RoaXMuc2VsZWN0ZWREYXkgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERheSA9IGRheTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRheSAmJiBkYXkuZGF0ZS5nZXRNb250aCgpICE9PSB0aGlzLmN1cnJlbnRNb250aC5nZXRNb250aCgpKSB7XG4gICAgICB0aGlzLmN1cnJlbnRNb250aC5zZXRNb250aChkYXkuZGF0ZS5nZXRNb250aCgpKTtcbiAgICAgIHRoaXMuc2hvd1ZpZXcoZGF5LmRhdGUpO1xuICAgIH1cbiAgICB0aGlzLm1hcmtzZWxlY3REYXkoKTtcbiAgICBpZiAodGhpcy5zZWxlY3RQZXJpb2RFbmFibGVkKSB7XG4gICAgICB0aGlzLm1hcmtQZXJpb2REYXRlcygpO1xuICAgIH1cbiAgICBpZighdGhpcy5zdWJtaXRNb2RlKXtcbiAgICAgIHRoaXMuY2hhbmdlKCk7XG4gICAgfVxuICAgIFxuICB9XG5cblxuXG4gIHNob3dOZXh0KCkge1xuICAgIGlmICh0aGlzLm1vbnRoTW9kZSkge1xuICAgICAgdGhpcy5jdXJyZW50TW9udGguc2V0TW9udGgodGhpcy5jdXJyZW50TW9udGguZ2V0TW9udGgoKSArIDEpO1xuICAgICAgdGhpcy5zaG93Vmlldyh0aGlzLmN1cnJlbnRNb250aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudE1vbnRoLnNldEZ1bGxZZWFyKHRoaXMuY3VycmVudE1vbnRoLmdldEZ1bGxZZWFyKCkgKyAxKTtcbiAgICAgIHRoaXMuc2hvd1ZpZXdNb250aCh0aGlzLmN1cnJlbnRNb250aCk7XG4gICAgfVxuXG4gIH1cblxuICBjbGlja0RhdGUoZGF5LCBldmVudCA9IG51bGwpIHtcbiAgICAoZXZlbnQpID8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCkgOiBudWxsO1xuICAgIGlmICghZGF5LmRpc2FibGVkKSB7XG4gICAgICB0aGlzLnNlbGVjdERheShkYXkpO1xuICAgIH1cblxuICB9XG5cbiAgbWFya1BlcmlvZERhdGVzKGRheSA9IG51bGwpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2FsZW5kLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpdGVtID0gdGhpcy5jYWxlbmRbaV07XG5cbiAgICAgIGlmIChcbiAgICAgICAgZGF5ICYmIHRoaXMuc2VsZWN0ZWREYXkgJiYgIXRoaXMuc2VsZWN0ZWREYXkyICYmIChcbiAgICAgICAgICAoaXRlbS55ZWFyRGF5TnVtID49IGRheS55ZWFyRGF5TnVtICYmIGl0ZW0ueWVhckRheU51bSA8PSB0aGlzLnNlbGVjdGVkRGF5LnllYXJEYXlOdW0pXG4gICAgICAgICAgfHxcbiAgICAgICAgICAoaXRlbS55ZWFyRGF5TnVtIDw9IGRheS55ZWFyRGF5TnVtICYmIGl0ZW0ueWVhckRheU51bSA+PSB0aGlzLnNlbGVjdGVkRGF5LnllYXJEYXlOdW0pXG4gICAgICAgIClcbiAgICAgICAgfHxcbiAgICAgICAgdGhpcy5zZWxlY3RlZERheSAmJiB0aGlzLnNlbGVjdGVkRGF5MiAmJiAoXG4gICAgICAgICAgKGl0ZW0ueWVhckRheU51bSA+PSB0aGlzLnNlbGVjdGVkRGF5Mi55ZWFyRGF5TnVtICYmIGl0ZW0ueWVhckRheU51bSA8PSB0aGlzLnNlbGVjdGVkRGF5LnllYXJEYXlOdW0pXG4gICAgICAgICAgfHxcbiAgICAgICAgICAoaXRlbS55ZWFyRGF5TnVtIDw9IHRoaXMuc2VsZWN0ZWREYXkyLnllYXJEYXlOdW0gJiYgaXRlbS55ZWFyRGF5TnVtID49IHRoaXMuc2VsZWN0ZWREYXkueWVhckRheU51bSlcbiAgICAgICAgKVxuXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5jYWxlbmRbaV0ubWFya2VkUGVyaW9kID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2FsZW5kW2ldLm1hcmtlZFBlcmlvZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhvdmVyRGF0ZShkYXkpIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZERheSAmJiB0aGlzLnNlbGVjdFBlcmlvZEVuYWJsZWQpIHtcbiAgICAgIHRoaXMubWFya1BlcmlvZERhdGVzKGRheSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgY29uc3QgZCA9IE9iamVjdC5hc3NpZ24oZGF0ZSk7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGQuZ2V0VGltZSgpKTtcbiAgfVxuXG4gIGdldE51bU9mWWVhcihkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgMCwgMCk7XG4gICAgY29uc3QgZGlmZiA9IGRhdGUudmFsdWVPZigpIC0gc3RhcnQudmFsdWVPZigpO1xuICAgIGNvbnN0IG9uZURheSA9IDEwMDAgKiA2MCAqIDYwICogMjQ7XG4gICAgY29uc3QgZGF5ID0gTWF0aC5mbG9vcihkaWZmIC8gb25lRGF5KTtcbiAgICByZXR1cm4gZGF5O1xuICB9XG5cbiAgc2hvd1ZpZXdNb250aChkYXRlOiBEYXRlLCBldmVudCA9IG51bGwpIHtcbiAgICAoZXZlbnQpID8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCkgOiBudWxsO1xuICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCA0OyBrKyspIHtcbiAgICAgIHRoaXMubW9udGhDYWxlbmRba10gPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSBrICogMzsgaSA8IGsgKiAzICsgMzsgaSsrKSB7XG4gICAgICAgIHRoaXMubW9udGhDYWxlbmRba10ucHVzaChcbiAgICAgICAgICB7XG4gICAgICAgICAgICB5ZWFyLFxuICAgICAgICAgICAgbW9udGg6IGksXG4gICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZSh5ZWFyLCBpLCAxKVxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5tb250aE1vZGUgPSBmYWxzZTtcblxuICB9XG5cbiAgaXNEaXNhYmxlZChkYXRlOiBEYXRlKSB7XG4gICAgbGV0IGEgPSB0aGlzLmdldERhdGUoZGF0ZSk7XG4gICAgYS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICBsZXQgYiA9IHRoaXMuZ2V0RGF0ZShuZXcgRGF0ZSgpKTtcbiAgICBiLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIGlmKHRoaXMuZGlzYWJsZWRCZWZvcmUpe1xuICAgICAgcmV0dXJuICh0aGlzLmRpc2FibGVkQmVmb3JlICYmIGEudmFsdWVPZigpIDwgYi52YWx1ZU9mKCkpID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1lbHNlIGlmKHRoaXMuZGlzYWJsZWRBZnRlcil7XG4gICAgICByZXR1cm4gKHRoaXMuZGlzYWJsZWRBZnRlciAmJiBhLnZhbHVlT2YoKSA+IGIudmFsdWVPZigpKSA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgIFxuICB9XG5cblxuICBzaG93VmlldyhkYXRlOiBEYXRlKSB7XG4gICAgdGhpcy5kYXlzSW5Nb250aCA9IHRoaXMuZ2V0RGF5c0luTW9udGgoZGF0ZSk7XG4gICAgdGhpcy5kYXlzSW5QcmV2TW9udGggPSB0aGlzLmdldERheXNJblByZXZNb250aChkYXRlKTtcbiAgICBjb25zdCBudW1GaXJzdERheSA9IHRoaXMuZ2V0Rmlyc3REYXlOdW0oZGF0ZSk7XG4gICAgY29uc3QgbnVtTGFzdERheSA9IHRoaXMuZ2V0TGFzdERheU51bShkYXRlKTtcbiAgICBjb25zdCBjYWxlbmQgPSBbXTtcbiAgICBjb25zdCB3ZWVrQ2FsZW5kID0gW107XG5cbiAgICBjb25zdCBub3dNb250aCA9IHRoaXMuZ2V0RGF0ZShkYXRlKTtcbiAgICBjb25zdCBwcmV2TW9udGhEYXRlID0gdGhpcy5nZXREYXRlKGRhdGUpO1xuICAgIHByZXZNb250aERhdGUuc2V0TW9udGgodGhpcy5nZXREYXRlKGRhdGUpLmdldE1vbnRoKCkgLSAxKTtcbiAgICBjb25zdCBuZXh0TW9udGhEYXRlID0gdGhpcy5nZXREYXRlKGRhdGUpO1xuICAgIG5leHRNb250aERhdGUuc2V0TW9udGgodGhpcy5nZXREYXRlKGRhdGUpLmdldE1vbnRoKCkgKyAxKTtcblxuXG4gICAgaWYgKG51bUZpcnN0RGF5ICE9PSAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gbnVtRmlyc3REYXk7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgY29uc3QgbnVtID0gdGhpcy5kYXlzSW5QcmV2TW9udGggLSBpICsgMTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHByZXZNb250aERhdGUuZ2V0RnVsbFllYXIoKSwgcHJldk1vbnRoRGF0ZS5nZXRNb250aCgpLCBudW0pO1xuICAgICAgICBjYWxlbmQucHVzaCh7XG4gICAgICAgICAgbnVtLFxuICAgICAgICAgIHllYXJEYXlOdW06IHRoaXMuZ2V0TnVtT2ZZZWFyKGRhdGUpLFxuICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgY3VycmVudE1vbnRoOiBmYWxzZSxcbiAgICAgICAgICBpc05vd0RhdGU6IHRoaXMuaXNOb3dEYXRlKGRhdGUpLFxuICAgICAgICAgIGlzV2Vla0VuZDogdGhpcy5pc1dlZWtFbmQoZGF0ZSksXG4gICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuaXNEaXNhYmxlZChkYXRlKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0aGlzLmRheXNJbk1vbnRoOyBpKyspIHtcbiAgICAgIG5vd01vbnRoLnNldERhdGUoaSk7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUobm93TW9udGguZ2V0RnVsbFllYXIoKSwgbm93TW9udGguZ2V0TW9udGgoKSwgaSk7XG4gICAgICBjYWxlbmQucHVzaCh7XG4gICAgICAgIG51bTogaSxcbiAgICAgICAgeWVhckRheU51bTogdGhpcy5nZXROdW1PZlllYXIoZGF0ZSksXG4gICAgICAgIGRhdGUsXG4gICAgICAgIGN1cnJlbnRNb250aDogdHJ1ZSxcbiAgICAgICAgaXNOb3dEYXRlOiB0aGlzLmlzTm93RGF0ZShkYXRlKSxcbiAgICAgICAgaXNXZWVrRW5kOiB0aGlzLmlzV2Vla0VuZChkYXRlKSxcbiAgICAgICAgZGlzYWJsZWQ6IHRoaXMuaXNEaXNhYmxlZChkYXRlKVxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBpZiAobnVtTGFzdERheSAhPT0gNikge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA3IC0gbnVtTGFzdERheTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShuZXh0TW9udGhEYXRlLmdldEZ1bGxZZWFyKCksIG5leHRNb250aERhdGUuZ2V0TW9udGgoKSwgaSk7XG4gICAgICAgIGNhbGVuZC5wdXNoKHtcbiAgICAgICAgICBudW06IGksXG4gICAgICAgICAgeWVhckRheU51bTogdGhpcy5nZXROdW1PZlllYXIoZGF0ZSksXG4gICAgICAgICAgZGF0ZSxcbiAgICAgICAgICBjdXJyZW50TW9udGg6IGZhbHNlLFxuICAgICAgICAgIGlzTm93RGF0ZTogdGhpcy5pc05vd0RhdGUoZGF0ZSksXG4gICAgICAgICAgaXNXZWVrRW5kOiB0aGlzLmlzV2Vla0VuZChkYXRlKSxcbiAgICAgICAgICBkaXNhYmxlZDogdGhpcy5pc0Rpc2FibGVkKGRhdGUpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FsZW5kLmxlbmd0aCAvIDc7IGkrKykge1xuICAgICAgY29uc3Qgd2VlayA9IFtdO1xuICAgICAgZm9yIChsZXQgayA9IGkgKiA3OyBrIDwgaSAqIDcgKyA3OyBrKyspIHtcbiAgICAgICAgd2Vlay5wdXNoKGNhbGVuZFtrXSk7XG4gICAgICB9XG4gICAgICB3ZWVrQ2FsZW5kLnB1c2god2Vlayk7XG4gICAgfVxuXG4gICAgdGhpcy5jYWxlbmQgPSBjYWxlbmQ7XG4gICAgdGhpcy53ZWVrQ2FsZW5kID0gd2Vla0NhbGVuZDtcbiAgICBpZiAodGhpcy5zZWxlY3RQZXJpb2RFbmFibGVkKSB7XG4gICAgICB0aGlzLm1hcmtQZXJpb2REYXRlcygpO1xuICAgIH1cblxuICAgIHRoaXMubWFya3NlbGVjdERheSgpO1xuICAgIHRoaXMubW9udGhNb2RlID0gdHJ1ZTtcbiAgfVxuXG4gIGlzV2Vla0VuZChkYXRlOiBEYXRlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLndlZWtlbmRzLmluY2x1ZGVzKHRoaXMuZ2V0TnVtRGF5KGRhdGUpKSkgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICBnZXROdW1EYXkoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T2Zmc2V0RGF5c1N0YXJ0KGRhdGUuZ2V0RGF5KCkpO1xuICB9XG5cbiAgZ2V0Rmlyc3REYXlOdW0oZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgY29uc3QgdHJ1ZU51bTogbnVtYmVyID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIDEpLmdldERheSgpO1xuICAgIHJldHVybiB0aGlzLmdldE9mZnNldERheXNTdGFydCh0cnVlTnVtKTtcbiAgfVxuXG4gIGdldExhc3REYXlOdW0oZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgY29uc3QgdHJ1ZU51bTogbnVtYmVyID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCkgKyAxLCAwKS5nZXREYXkoKTtcbiAgICByZXR1cm4gdGhpcy5nZXRPZmZzZXREYXlzU3RhcnQodHJ1ZU51bSk7XG4gIH1cblxuICBnZXREYXlzSW5Nb250aChkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCkgKyAxLCAwKS5nZXREYXRlKCk7XG4gIH1cblxuICBnZXREYXlzSW5QcmV2TW9udGgoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCAwKS5nZXREYXRlKCk7XG4gIH1cblxuXG59XG4iXX0=