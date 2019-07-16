import { BrowserModule } from '@angular/platform-browser';
import { Injectable, Component, Input, Output, EventEmitter, HostListener, Directive, ElementRef, NgModule, defineInjectable } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DatepickerService {
    constructor() { }
}
DatepickerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DatepickerService.ctorParameters = () => [];
/** @nocollapse */ DatepickerService.ngInjectableDef = defineInjectable({ factory: function DatepickerService_Factory() { return new DatepickerService(); }, token: DatepickerService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Outside {
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
class DatepickerComponent {
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
            if (this.selectedDay && this.selectedDay.yearDayNum === day.yearDayNum && this.selectedDay.date.getFullYear() === day.date.getFullYear()) ;
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
            if (this.selectedDay && this.selectedDay.yearDayNum === day.yearDayNum && this.selectedDay.date.getFullYear() === day.date.getFullYear()) ;
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TimeComponent {
    constructor() {
        this.changed = new EventEmitter();
        this.inited = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        //console.log('ngOnInit')
        this.hour = this.date.date.getHours();
        this.minute = this.date.date.getMinutes();
        this.date.date.setHours(this.hour, this.minute);
        this.inited = true;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (this.inited) {
            this.date.date.setHours(this.hour, this.minute);
        }
    }
    /**
     * @return {?}
     */
    change() {
        /** @type {?} */
        const data = this.date.date;
        data.setHours(this.hour, this.minute);
        this.changed.emit(data);
    }
    /**
     * @return {?}
     */
    hourChange() {
        this.change();
    }
    /**
     * @return {?}
     */
    minuteChange() {
        this.change();
    }
    /**
     * @return {?}
     */
    getTimeArays() {
        /** @type {?} */
        const arr = { min: [], hour: [] };
        for (let i = 0; i < 60; i++) {
            /** @type {?} */
            let k = i.toString();
            k = (k.length == 1) ? '0' + k : k;
            /** @type {?} */
            let item = { val: i, label: k };
            arr['min'].push(item);
            if (i < 24) {
                arr['hour'].push(item);
            }
        }
        return arr;
    }
}
TimeComponent.decorators = [
    { type: Component, args: [{
                selector: 'ns-time',
                template: "<div style=\"display: flex;flex-direction: row;justify-content: space-between;align-items: center; padding: 4px;color: #6f6f6f;background: linear-gradient(90deg,#fff, #e7f4ff); \">\n  <div >{{date.date.getDate()}}.{{date.date.getMonth()+1}}.{{date.date.getFullYear()}} </div>\n    <div>\n      <select [(ngModel)]=\"hour\"  (change)=\"hourChange()\"  style=\"border: 0; background: transparent; padding: 2px;font-size: 11px; outline: none;\">\n        <option *ngFor=\"let hour of getTimeArays()['hour']\" [ngValue]=\"hour.val\">{{hour.label}}</option>\n      </select>\n      <select [(ngModel)]=\"minute\" (change)=\"minuteChange()\" style=\"border: 0; background: transparent; padding: 2px;font-size: 11px; outline: none;\">\n        <option *ngFor=\"let min of getTimeArays()['min']\" [ngValue]=\"min.val\">{{min.label}}</option>\n      </select>\n    </div>\n\n</div>",
                styles: [""]
            }] }
];
/** @nocollapse */
TimeComponent.ctorParameters = () => [];
TimeComponent.propDecorators = {
    date: [{ type: Input }],
    changed: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ColComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
ColComponent.decorators = [
    { type: Component, args: [{
                selector: 'ns-col',
                template: "<p>\n  col works!\n</p>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
ColComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DatepickerModule {
}
DatepickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DatepickerComponent, Outside, TimeComponent, ColComponent],
                imports: [
                    BrowserModule,
                    FormsModule
                ],
                exports: [DatepickerComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { DatepickerService, Outside, DatepickerComponent, DatepickerModule, ColComponent as ɵb, TimeComponent as ɵa };

//# sourceMappingURL=datepicker-ns.js.map