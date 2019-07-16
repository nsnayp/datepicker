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
var Outside = /** @class */ (function () {
    function Outside(elRef) {
        this.elRef = elRef;
        this.close = new EventEmitter();
        this.isOpen = false;
    }
    /**
     * @param {?} target
     * @return {?}
     */
    Outside.prototype.isChild = /**
     * @param {?} target
     * @return {?}
     */
    function (target) {
        /** @type {?} */
        var parent = target.parentNode;
        if (!parent || parent.tagName === 'undefined') {
            return false;
        }
        /** @type {?} */
        var tagName = parent.tagName;
        if (parent && tagName === 'APP-CALENDAR') {
            return true;
        }
        else if (parent && tagName !== 'HTML') {
            return this.isChild(parent);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Outside.prototype.handleClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (!this.isOpen) {
            this.isOpen = true;
        }
        else if (!this.elRef.nativeElement.contains(event.target)) {
            this.close.emit();
        }
    };
    Outside.decorators = [
        { type: Directive, args: [{
                    selector: '[outside]',
                },] }
    ];
    /** @nocollapse */
    Outside.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    Outside.propDecorators = {
        close: [{ type: Output, args: ['outside',] }],
        handleClick: [{ type: HostListener, args: ['document:click', ['$event'],] }]
    };
    return Outside;
}());
export { Outside };
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
var DatepickerComponent = /** @class */ (function () {
    function DatepickerComponent() {
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
    DatepickerComponent.prototype.clickout = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        console.log('CLICKOUT');
        this.onClickOut.emit();
    };
    /**
     * @param {?} data
     * @return {?}
     */
    DatepickerComponent.prototype.timeChange = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        //console.log(data)
    };
    /**
     * @return {?}
     */
    DatepickerComponent.prototype.submit = /**
     * @return {?}
     */
    function () {
        this.change();
    };
    /**
     * @return {?}
     */
    DatepickerComponent.prototype.change = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var data = {};
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
    };
    /**
     * @param {?} num
     * @return {?}
     */
    DatepickerComponent.prototype.getMonthByNUm = /**
     * @param {?} num
     * @return {?}
     */
    function (num) {
        /** @type {?} */
        var months = this.langs()['month'][this.lang];
        return months[num];
    };
    /**
     * @return {?}
     */
    DatepickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} date
     * @param {?} event
     * @return {?}
     */
    DatepickerComponent.prototype.showMonth = /**
     * @param {?} date
     * @param {?} event
     * @return {?}
     */
    function (date, event) {
        event.stopPropagation();
        this.showView(date);
        this.currentMonth = date;
    };
    /**
     * @param {?} trueNum
     * @return {?}
     */
    DatepickerComponent.prototype.getOffsetDaysStart = /**
     * @param {?} trueNum
     * @return {?}
     */
    function (trueNum) {
        return (trueNum < this.weekStart) ? 7 + trueNum - this.weekStart : trueNum - this.weekStart;
    };
    /**
     * @return {?}
     */
    DatepickerComponent.prototype.langs = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var lang = {
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
    };
    /**
     * @return {?}
     */
    DatepickerComponent.prototype.getWeekLabels = /**
     * @return {?}
     */
    function () {
        this.weekLabels = this.langs()['week'][this.lang];
        this.weekLabels = this.weekLabels.splice(this.weekStart).concat(this.weekLabels);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatepickerComponent.prototype.isNowDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var now = new Date();
        return (now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth()
            && now.getDate() === date.getDate()) ? true : false;
    };
    /**
     * @return {?}
     */
    DatepickerComponent.prototype.showPrev = /**
     * @return {?}
     */
    function () {
        if (this.monthMode) {
            this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
            this.showView(this.currentMonth);
        }
        else {
            this.currentMonth.setFullYear(this.currentMonth.getFullYear() - 1);
            this.showViewMonth(this.currentMonth);
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatepickerComponent.prototype.isSelected = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return (this.selectedDay && this.selectedDay.date.getFullYear() === date.getFullYear()
            && this.selectedDay.date.getMonth() === date.getMonth() && this.selectedDay.date.getDate() === date.getDate()) ? true : false;
    };
    /**
     * @return {?}
     */
    DatepickerComponent.prototype.markselectDay = /**
     * @return {?}
     */
    function () {
        for (var i = 0; i < this.calend.length; i++) {
            /** @type {?} */
            var item = this.calend[i];
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
    };
    /**
     * @param {?} day
     * @return {?}
     */
    DatepickerComponent.prototype.selectDay = /**
     * @param {?} day
     * @return {?}
     */
    function (day) {
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
    };
    /**
     * @return {?}
     */
    DatepickerComponent.prototype.showNext = /**
     * @return {?}
     */
    function () {
        if (this.monthMode) {
            this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
            this.showView(this.currentMonth);
        }
        else {
            this.currentMonth.setFullYear(this.currentMonth.getFullYear() + 1);
            this.showViewMonth(this.currentMonth);
        }
    };
    /**
     * @param {?} day
     * @param {?=} event
     * @return {?}
     */
    DatepickerComponent.prototype.clickDate = /**
     * @param {?} day
     * @param {?=} event
     * @return {?}
     */
    function (day, event) {
        if (event === void 0) { event = null; }
        (event) ? event.stopPropagation() : null;
        if (!day.disabled) {
            this.selectDay(day);
        }
    };
    /**
     * @param {?=} day
     * @return {?}
     */
    DatepickerComponent.prototype.markPeriodDates = /**
     * @param {?=} day
     * @return {?}
     */
    function (day) {
        if (day === void 0) { day = null; }
        for (var i = 0; i < this.calend.length; i++) {
            /** @type {?} */
            var item = this.calend[i];
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
    };
    /**
     * @param {?} day
     * @return {?}
     */
    DatepickerComponent.prototype.hoverDate = /**
     * @param {?} day
     * @return {?}
     */
    function (day) {
        if (this.selectedDay && this.selectPeriodEnabled) {
            this.markPeriodDates(day);
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatepickerComponent.prototype.getDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var d = Object.assign(date);
        return new Date(d.getTime());
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatepickerComponent.prototype.getNumOfYear = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var start = new Date(date.getFullYear(), 0, 0);
        /** @type {?} */
        var diff = date.valueOf() - start.valueOf();
        /** @type {?} */
        var oneDay = 1000 * 60 * 60 * 24;
        /** @type {?} */
        var day = Math.floor(diff / oneDay);
        return day;
    };
    /**
     * @param {?} date
     * @param {?=} event
     * @return {?}
     */
    DatepickerComponent.prototype.showViewMonth = /**
     * @param {?} date
     * @param {?=} event
     * @return {?}
     */
    function (date, event) {
        if (event === void 0) { event = null; }
        (event) ? event.stopPropagation() : null;
        /** @type {?} */
        var year = date.getFullYear();
        for (var k = 0; k < 4; k++) {
            this.monthCalend[k] = [];
            for (var i = k * 3; i < k * 3 + 3; i++) {
                this.monthCalend[k].push({
                    year: year,
                    month: i,
                    date: new Date(year, i, 1)
                });
            }
        }
        this.monthMode = false;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatepickerComponent.prototype.isDisabled = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var a = this.getDate(date);
        a.setHours(0, 0, 0, 0);
        /** @type {?} */
        var b = this.getDate(new Date());
        b.setHours(0, 0, 0, 0);
        if (this.disabledBefore) {
            return (this.disabledBefore && a.valueOf() < b.valueOf()) ? true : false;
        }
        else if (this.disabledAfter) {
            return (this.disabledAfter && a.valueOf() > b.valueOf()) ? true : false;
        }
        return false;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatepickerComponent.prototype.showView = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.daysInMonth = this.getDaysInMonth(date);
        this.daysInPrevMonth = this.getDaysInPrevMonth(date);
        /** @type {?} */
        var numFirstDay = this.getFirstDayNum(date);
        /** @type {?} */
        var numLastDay = this.getLastDayNum(date);
        /** @type {?} */
        var calend = [];
        /** @type {?} */
        var weekCalend = [];
        /** @type {?} */
        var nowMonth = this.getDate(date);
        /** @type {?} */
        var prevMonthDate = this.getDate(date);
        prevMonthDate.setMonth(this.getDate(date).getMonth() - 1);
        /** @type {?} */
        var nextMonthDate = this.getDate(date);
        nextMonthDate.setMonth(this.getDate(date).getMonth() + 1);
        if (numFirstDay !== 0) {
            for (var i = numFirstDay; i > 0; i--) {
                /** @type {?} */
                var num = this.daysInPrevMonth - i + 1;
                /** @type {?} */
                var date_1 = new Date(prevMonthDate.getFullYear(), prevMonthDate.getMonth(), num);
                calend.push({
                    num: num,
                    yearDayNum: this.getNumOfYear(date_1),
                    date: date_1,
                    currentMonth: false,
                    isNowDate: this.isNowDate(date_1),
                    isWeekEnd: this.isWeekEnd(date_1),
                    disabled: this.isDisabled(date_1)
                });
            }
        }
        for (var i = 1; i <= this.daysInMonth; i++) {
            nowMonth.setDate(i);
            /** @type {?} */
            var date_2 = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), i);
            calend.push({
                num: i,
                yearDayNum: this.getNumOfYear(date_2),
                date: date_2,
                currentMonth: true,
                isNowDate: this.isNowDate(date_2),
                isWeekEnd: this.isWeekEnd(date_2),
                disabled: this.isDisabled(date_2)
            });
        }
        if (numLastDay !== 6) {
            for (var i = 1; i < 7 - numLastDay; i++) {
                /** @type {?} */
                var date_3 = new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), i);
                calend.push({
                    num: i,
                    yearDayNum: this.getNumOfYear(date_3),
                    date: date_3,
                    currentMonth: false,
                    isNowDate: this.isNowDate(date_3),
                    isWeekEnd: this.isWeekEnd(date_3),
                    disabled: this.isDisabled(date_3)
                });
            }
        }
        for (var i = 0; i < calend.length / 7; i++) {
            /** @type {?} */
            var week = [];
            for (var k = i * 7; k < i * 7 + 7; k++) {
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
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatepickerComponent.prototype.isWeekEnd = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return (this.weekends.includes(this.getNumDay(date))) ? true : false;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatepickerComponent.prototype.getNumDay = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.getOffsetDaysStart(date.getDay());
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatepickerComponent.prototype.getFirstDayNum = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var trueNum = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return this.getOffsetDaysStart(trueNum);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatepickerComponent.prototype.getLastDayNum = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var trueNum = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
        return this.getOffsetDaysStart(trueNum);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatepickerComponent.prototype.getDaysInMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatepickerComponent.prototype.getDaysInPrevMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    };
    DatepickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ns-datepicker',
                    template: "<div class=\"calendar\" (outside)=\"clickout($event)\" >\n\n    <div style=\"border-bottom: 1px solid #f3f3f3; display:flex; flex-direction: row; justify-content: center; align-items:center; padding:10px;flex-direction: column;\">\n        <div *ngIf=\"suggestions\" style=\"display: block;\">\n            <button class=\"dateBtn\" (click)=\"selectDay(today)\">\u0441\u0435\u0433\u043E\u0434\u043D\u044F</button>\n        </div>\n      <div style=\"padding-top:10px; display:flex; flex-direction: row; justify-content: space-between; width: 100%;\">\n          <a href=\"javascript:void(0)\" (click)=\"showPrev()\" class=\"btnPrevNext\"><</a>\n          <div class=\"yearBtn\" (click)=\"showViewMonth(currentMonth, $event)\">\n              <span *ngIf=\"monthMode\" style=\"margin-right:3px\">{{getMonthByNUm(currentMonth.getMonth())}}</span> <span>{{currentMonth.getFullYear()}}</span>\n          </div>\n          <a href=\"javascript:void(0)\" (click)=\"showNext()\"  class=\"btnPrevNext\">></a>\n      </div>\n      \n      \n    \n  \n    </div>\n    <div style=\"padding: 8px 10px;\">\n      \n      <div *ngIf=\"weekLabels&&monthMode\" class=\"row\">\n        <div class=\"col h\" *ngFor=\"let label of weekLabels\">\n          {{label}}\n        </div>\n      </div>\n  \n  \n      <div *ngIf=\"weekCalend&&monthMode\">\n        <div class=\"row\" *ngFor=\"let week of weekCalend\">\n            <div \n              *ngFor=\"let day of week\" \n              class=\"col\" \n              [ngClass]=\"{currentMonth:day.currentMonth, isNowDate: day.isNowDate, isWeekEnd: day.isWeekEnd, isSelected: day.isSelected, markedPeriod: day.markedPeriod, disabled: day.disabled }\" \n              (click)=\"clickDate(day, $event)\"\n              (mouseover)=\"hoverDate(day)\"\n            >\n            {{day.num}}\n            <div></div>\n          </div>\n        </div>     \n      </div>\n  \n  \n      <div *ngIf=\"monthCalend&&!monthMode\">\n        <div class=\"row\" *ngFor=\"let months of monthCalend\">\n            <div \n              *ngFor=\"let month of months\"\n              class=\"col month\"\n              (click)=\"showMonth(month.date, $event)\"\n            >\n            {{getMonthByNUm(month.month)}} \n            </div>\n        </div>     \n      </div>\n  \n    </div>\n    <div *ngIf=\"time&&time.enabled\" style=\"border-bottom: 1px solid #f3f3f3; display:flex; flex-direction: column; justify-content: center; padding:10px; font-size: 11px\">\n        \n      <div *ngIf=\"selectedDay\" >\n        <ns-time [date]=\"selectedDay\" changed=\"timeChange(data)\"></ns-time>\n      </div>\n\n      <div *ngIf=\"this.selectedDay2\" >\n        <ns-time [date]=\"selectedDay2\" changed=\"timeChange(data)\"></ns-time>\n      </div>\n    </div>\n\n\n    <div *ngIf=\"time.enabled||(!time.enabled&&submitMode)\" style=\" display:flex; flex-direction: row; justify-content: space-between; align-items:center; padding:10px; font-size: 11px\">\n      <button class=\"btnCancel\">{{(lang=='en')?'cancel':'\u043E\u0442\u043C\u0435\u043D\u0430'}}</button>\n      <button class=\"btnOk\" (click)=\"submit()\">{{(lang=='en')?'ok':'\u043E\u043A'}}</button>\n    </div>\n  \n  </div>",
                    styles: [".row{display:flex;flex-direction:row}.col{display:flex;position:relative;flex-direction:column;flex:1;justify-content:center;align-items:center;font-size:.8em;padding:4px;border-radius:2px;cursor:pointer;color:#c7c7c7;-webkit-animation:.2s ease-in slide-up;animation:.2s ease-in slide-up;text-align:center}@-webkit-keyframes slide-up{0%{opacity:.5}100%{opacity:1}}@keyframes slide-up{0%{opacity:.5}100%{opacity:1}}.col.markedPeriod{background:#d5ebff!important;border-radius:0!important;transition:.2s}.col.isSelected.markedPeriod{border-radius:2px!important}.col.isSelected{background:#5eb3fc!important;color:#fff!important}.dateBtn{float:left;background:#f3f3f3;border:0;font-size:.74em;color:#2fafff;outline:0;border-radius:2px;cursor:pointer;margin:2px;padding:2px 4px}.dateBtn:hover{background:#6398e0;color:#fff}.col.currentMonth{color:#353540}.col.isNowDate{color:#3f92ff}.col.isWeekEnd.currentMonth{color:#c53c3c}.col.disabled{background:#f5f5f5;color:#afafaf}.col.month:hover,.col:hover{background:#eee}.col.month{font-size:11px;color:#545454;padding:16px 8px;box-shadow:0 0 0 1px #f4f3f3;background:#fff;border-radius:0;min-width:40px}.col.h{color:#ff9a19;text-transform:uppercase}.col.h:hover{background:#fff}.calendar{float:left;box-shadow:0 3px 12px -5px #000;max-width:200px;-webkit-animation:50ms slide-up;animation:50ms slide-up;background:#fff;border-radius:8px}.btnPrevNext{font-size:14px;padding:6px 8px;border-radius:2px;color:#5eb3fc;text-decoration:none}.btnPrevNext:hover{background:#f4f3f3}.yearBtn{font-size:14px;padding:6px 10px;border-radius:2px;color:#585858;cursor:pointer}.yearBtn:hover{background:#f4f3f3}.btnOk{border:0;background:#5eb3fc;padding:8px 16px;color:#fff;border-radius:2px;outline:0;cursor:pointer}.btnOk:hover{background:#3e99e6}.btnCancel{border:0;background:#fff;padding:8px 16px;color:#5eb3fc;border-radius:2px;outline:0;cursor:pointer}.btnCancel:hover{background:#e4f3ff}"]
                }] }
    ];
    /** @nocollapse */
    DatepickerComponent.ctorParameters = function () { return []; };
    DatepickerComponent.propDecorators = {
        options: [{ type: Input }],
        visible: [{ type: Input }],
        onChangeDate: [{ type: Input }],
        onChanged: [{ type: Output }],
        onClickOut: [{ type: Output }],
        dates: [{ type: Input }]
    };
    return DatepickerComponent;
}());
export { DatepickerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRlcGlja2VyLW5zLyIsInNvdXJjZXMiOlsibGliL2RhdGVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBYSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRS9ILHlCQUlDOzs7SUFIQyxtQkFBVzs7SUFDWCx5QkFBbUI7O0lBQ25CLGtCQUFhOztBQUtmO0lBUUUsaUJBQW9CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7UUFKbEIsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUMsV0FBTSxHQUFZLEtBQUssQ0FBQztJQUd4QixDQUFDOzs7OztJQUVELHlCQUFPOzs7O0lBQVAsVUFBUSxNQUFNOztZQUNOLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVTtRQUNoQyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssV0FBVyxFQUFFO1lBQUUsT0FBTyxLQUFLLENBQUM7U0FBRTs7WUFDMUQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPO1FBQzlCLElBQUksTUFBTSxJQUFJLE9BQU8sS0FBSyxjQUFjLEVBQUU7WUFDeEMsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNLElBQUksTUFBTSxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUU7WUFDdkMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzdCO0lBRUgsQ0FBQzs7Ozs7SUFHTSw2QkFBVzs7OztJQURsQixVQUNtQixLQUFLO1FBQ3RCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFN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QUFLLENBQUMsU0FBUyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ3ZHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzFCO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ3ZHLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1NBQ3JHO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzFGLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzNELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdkUsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDOUUsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFD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O0lBQ25ELG9DQUFlOztJQUNmLHVDQUFTOztJQUNULG9DQUF3RTs7SUFDeEUsd0NBQXVCOztJQUN2QixtQ0FBSzs7SUFDTCxxQ0FBTzs7SUFDUCwwQ0FBb0I7O0lBQ3BCLDhDQUF3Qjs7SUFDeEIscUNBQU87O0lBQ1AsMENBQWdCOztJQUNoQix3Q0FBYzs7SUFDZCwyQ0FBbUI7O0lBQ25CLHVDQUFrQjs7SUFDbEIscUNBQWM7O0lBQ2QseUNBQWtCOztJQUNsQiwwQ0FBWTs7SUFDWiwyQ0FBYTs7SUFDYix5Q0FBVzs7SUFDWCxxQ0FBTzs7SUFDUCxrREFBNkI7O0lBQzdCLHdDQUFtQjs7SUFDbkIsMENBQXFCOztJQUNyQiwwQ0FBaUI7O0lBQ2pCLDZDQUF3Qjs7SUFDeEIsNENBQXVCOztJQUN2QixtQ0FBYTs7SUFDYix5Q0FBb0I7O0lBQ3BCLG1DQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgSG9zdExpc3RlbmVyLCBPbkRlc3Ryb3ksIERpcmVjdGl2ZSwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIERheSB7XG4gIGRhdGU6IERhdGU7XG4gIHllYXJEYXlOdW06IG51bWJlcjtcbiAgdmFzPzogbnVtYmVyO1xufVxuXG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW291dHNpZGVdJyxcbn0pXG5leHBvcnQgY2xhc3MgT3V0c2lkZSB7XG4gIEBPdXRwdXQoJ291dHNpZGUnKSBjbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBpc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmKSB7XG4gIH1cblxuICBpc0NoaWxkKHRhcmdldCkge1xuICAgIGNvbnN0IHBhcmVudCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgIGlmICghcGFyZW50IHx8IHBhcmVudC50YWdOYW1lID09PSAndW5kZWZpbmVkJykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBjb25zdCB0YWdOYW1lID0gcGFyZW50LnRhZ05hbWU7XG4gICAgaWYgKHBhcmVudCAmJiB0YWdOYW1lID09PSAnQVBQLUNBTEVOREFSJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmIChwYXJlbnQgJiYgdGFnTmFtZSAhPT0gJ0hUTUwnKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc0NoaWxkKHBhcmVudCk7XG4gICAgfVxuXG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBoYW5kbGVDbGljayhldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKCF0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICB0aGlzLmNsb3NlLmVtaXQoKTtcbiAgICB9XG4gIH1cbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1kYXRlcGlja2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGVwaWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9kYXRlcGlja2VyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlcGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBvcHRpb25zO1xuICBASW5wdXQoKSB2aXNpYmxlO1xuICBASW5wdXQoKSBvbkNoYW5nZURhdGU6IEZ1bmN0aW9uO1xuICBAT3V0cHV0KCkgb25DaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25DbGlja091dCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQElucHV0KCkgZGF0ZXM7XG4gIGluaXREYXRlO1xuICB0b2RheSA9IHsgZGF0ZTogbmV3IERhdGUoKSwgeWVhckRheU51bTogdGhpcy5nZXROdW1PZlllYXIobmV3IERhdGUoKSkgfTtcbiAgeWVzdGVyZGF5ID0gbmV3IERhdGUoKTtcbiAgZGF0ZTtcbiAgbnVtRGF5O1xuICBkYXlzSW5Nb250aDogbnVtYmVyO1xuICBkYXlzSW5QcmV2TW9udGg6IG51bWJlcjtcbiAgbWF0cml4O1xuICBjb3VudE1vbnRocyA9IDE7XG4gIHdlZWtTdGFydCA9IDE7XG4gIGN1cnJlbnRNb250aDogRGF0ZTtcbiAgd2Vla2VuZHMgPSBbNSwgNl07XG4gIGNhbGVuZDogYW55W107XG4gIHdlZWtDYWxlbmQ6IGFueVtdO1xuICBzZWxlY3RlZERheTtcbiAgc2VsZWN0ZWREYXkyO1xuICB3ZWVrTGFiZWxzO1xuICBwZXJpb2Q7XG4gIHNlbGVjdFBlcmlvZEVuYWJsZWQ6IGJvb2xlYW47XG4gIG1vbnRoTW9kZTogYm9vbGVhbjtcbiAgc3VnZ2VzdGlvbnM6IGJvb2xlYW47XG4gIG1vbnRoQ2FsZW5kID0gW107XG4gIGRpc2FibGVkQmVmb3JlOiBib29sZWFuO1xuICBkaXNhYmxlZEFmdGVyOiBib29sZWFuO1xuICBsYW5nOiBzdHJpbmc7XG4gIHN1Ym1pdE1vZGU6IGJvb2xlYW47XG4gIHRpbWU7XG5cblxuICBjbGlja291dChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdDTElDS09VVCcpO1xuICAgIHRoaXMub25DbGlja091dC5lbWl0KCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cbiAgdGltZUNoYW5nZShkYXRhKSB7XG4gICAgLy9jb25zb2xlLmxvZyhkYXRhKVxuICB9XG5cbiAgc3VibWl0KCkge1xuICAgIHRoaXMuY2hhbmdlKCk7XG4gIH1cblxuICBjaGFuZ2UoKSB7XG4gICAgbGV0IGRhdGEgPSB7fTtcbiAgICBpZiAoIXRoaXMuc2VsZWN0UGVyaW9kRW5hYmxlZCkge1xuICAgICAgZGF0YSA9IHtcbiAgICAgICAgZGF0ZVN0YXJ0OiB0aGlzLnNlbGVjdGVkRGF5LmRhdGUsXG4gICAgICAgIGRhdGVFbmQ6IG51bGxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSB7XG4gICAgICAgIGRhdGVTdGFydDogdGhpcy5zZWxlY3RlZERheS5kYXRlLFxuICAgICAgICBkYXRlRW5kOiB0aGlzLnNlbGVjdGVkRGF5Mi5kYXRlXG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zb2xlLmxvZygnY2hhbmdlZCcsZGF0YSlcbiAgICB0aGlzLm9uQ2hhbmdlZC5lbWl0KGRhdGEpO1xuICB9XG4gIGdldE1vbnRoQnlOVW0obnVtOiBudW1iZXIpIHtcbiAgICBjb25zdCBtb250aHMgPSB0aGlzLmxhbmdzKClbJ21vbnRoJ11bdGhpcy5sYW5nXTtcbiAgICByZXR1cm4gbW9udGhzW251bV07XG4gIH1cbiAgbmdPbkluaXQoKSB7XG5cbiAgICB0aGlzLnNlbGVjdFBlcmlvZEVuYWJsZWQgPSAodGhpcy5vcHRpb25zLnNlbGVjdFBlcmlvZEVuYWJsZWQpID8gdGhpcy5vcHRpb25zLnNlbGVjdFBlcmlvZEVuYWJsZWQgOiBmYWxzZTtcblxuICAgIGlmICghdGhpcy5zZWxlY3RQZXJpb2RFbmFibGVkKSB7XG4gICAgICB0aGlzLmluaXREYXRlID0gdGhpcy5kYXRlcy5kYXRlU3RhcnQ7XG4gICAgICB0aGlzLnNlbGVjdGVkRGF5ID0geyBkYXRlOiB0aGlzLmRhdGVzLmRhdGVTdGFydCwgeWVhckRheU51bTogdGhpcy5nZXROdW1PZlllYXIodGhpcy5kYXRlcy5kYXRlU3RhcnQpIH07XG4gICAgICB0aGlzLnNlbGVjdGVkRGF5MiA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5pdERhdGUgPSB0aGlzLmRhdGVzLmRhdGVTdGFydDtcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXkgPSB7IGRhdGU6IHRoaXMuZGF0ZXMuZGF0ZVN0YXJ0LCB5ZWFyRGF5TnVtOiB0aGlzLmdldE51bU9mWWVhcih0aGlzLmRhdGVzLmRhdGVTdGFydCkgfTtcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXkyID0geyBkYXRlOiB0aGlzLmRhdGVzLmRhdGVFbmQsIHllYXJEYXlOdW06IHRoaXMuZ2V0TnVtT2ZZZWFyKHRoaXMuZGF0ZXMuZGF0ZUVuZCkgfTtcbiAgICB9XG5cbiAgICB0aGlzLm1vbnRoTW9kZSA9IHRydWU7XG4gICAgdGhpcy5kYXRlID0gbmV3IERhdGUodGhpcy5pbml0RGF0ZSk7XG4gICAgdGhpcy5jdXJyZW50TW9udGggPSBuZXcgRGF0ZSh0aGlzLmRhdGUuZ2V0RnVsbFllYXIoKSwgdGhpcy5kYXRlLmdldE1vbnRoKCksIDEpO1xuICAgIHRoaXMubnVtRGF5ID0gdGhpcy5kYXRlLmdldERheSgpO1xuICAgIHRoaXMuc3VnZ2VzdGlvbnMgPSAodGhpcy5vcHRpb25zLnN1Z2dlc3Rpb25zKSA/IHRoaXMub3B0aW9ucy5zdWdnZXN0aW9ucyA6IGZhbHNlO1xuICAgIHRoaXMuZGlzYWJsZWRCZWZvcmUgPSAodGhpcy5vcHRpb25zLmRpc2FibGVkQmVmb3JlKSA/IHRoaXMub3B0aW9ucy5kaXNhYmxlZEJlZm9yZSA6IGZhbHNlO1xuICAgIHRoaXMuZGlzYWJsZWRBZnRlciA9ICh0aGlzLm9wdGlvbnMuZGlzYWJsZWRBZnRlcikgPyB0aGlzLm9wdGlvbnMuZGlzYWJsZWRBZnRlciA6IGZhbHNlO1xuICAgIHRoaXMubGFuZyA9ICh0aGlzLm9wdGlvbnMubGFuZykgPyB0aGlzLm9wdGlvbnMubGFuZyA6ICdlbic7XG4gICAgdGhpcy53ZWVrZW5kcyA9ICh0aGlzLm9wdGlvbnMud2Vla2VuZHMpID8gdGhpcy5vcHRpb25zLndlZWtlbmRzIDogWzUsIDZdO1xuICAgIHRoaXMud2Vla1N0YXJ0ID0gKHRoaXMub3B0aW9ucy53ZWVrU3RhcnQpID8gdGhpcy5vcHRpb25zLndlZWtTdGFydCA6IDE7XG5cbiAgICB0aGlzLnN1Ym1pdE1vZGUgPSAodGhpcy5vcHRpb25zLnN1Ym1pdE1vZGUpID8gdGhpcy5vcHRpb25zLnN1Ym1pdE1vZGUgOiBmYWxzZTtcbiAgICB0aGlzLnRpbWUgPSAodGhpcy5vcHRpb25zLnRpbWUpID8gdGhpcy5vcHRpb25zLnRpbWUgOiB7XG4gICAgICBlbmFibGVkOiBmYWxzZVxuICAgIH07XG5cblxuXG4gICAgdGhpcy5nZXRXZWVrTGFiZWxzKCk7XG4gICAgdGhpcy5zaG93Vmlldyh0aGlzLmN1cnJlbnRNb250aCk7XG4gICAgdGhpcy5tYXJrc2VsZWN0RGF5KCk7XG4gICAgdGhpcy5tYXJrUGVyaW9kRGF0ZXMoKTtcbiAgICAvL3RoaXMuc2VsZWN0RGF5KClcbiAgfVxuXG4gIHNob3dNb250aChkYXRlOiBEYXRlLCBldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuc2hvd1ZpZXcoZGF0ZSk7XG4gICAgdGhpcy5jdXJyZW50TW9udGggPSBkYXRlO1xuICB9XG5cblxuICBnZXRPZmZzZXREYXlzU3RhcnQodHJ1ZU51bTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHRydWVOdW0gPCB0aGlzLndlZWtTdGFydCkgPyA3ICsgdHJ1ZU51bSAtIHRoaXMud2Vla1N0YXJ0IDogdHJ1ZU51bSAtIHRoaXMud2Vla1N0YXJ0O1xuICB9XG5cbiAgbGFuZ3MoKXtcbiAgICBjb25zdCBsYW5nID0ge1xuICAgICAgd2VlayA6IHtcbiAgICAgICAgZW4gOiBbJ1N1JywgJ01vJywgJ1R1JywgJ1dlJywgJ1RoJywgJ0ZyJywgJ1N0J10sXG4gICAgICAgIHJ1IDogWyfQktGBJywgJ9Cf0L0nLCAn0JLRgicsICfQodGAJywgJ9Cn0YInLCAn0J/RgicsICfQodCxJ10sXG4gICAgICB9LFxuICAgICAgbW9udGggOiB7XG4gICAgICAgIGVuIDogWydKYW51YXJ5JywgJ0ZlYnJhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywnT2N0b2JlcicsJ05vdmVtYmVyJywnRGVjZW1iZXInXSxcbiAgICAgICAgcnUgOiBbJ9Cv0L3QstCw0YDRjCcsICfQpNC10LLRgNCw0LvRjCcsICfQnNCw0YDRgicsICfQkNC/0YDQtdC70YwnLCAn0JzQsNC5JywgJ9CY0Y7QvdGMJywgJ9CY0Y7Qu9GMJywgJ9CQ0LLQs9GD0YHRgicsICfQodC10L3RgtGP0LHRgNGMJywn0J7QutGC0Y/QsdGA0YwnLCfQndC+0Y/QsdGA0YwnLCfQlNC10LrQsNCx0YDRjCddLFxuICAgICAgfVxuXG4gICAgfVxuICAgIHJldHVybiBsYW5nO1xuICB9XG5cbiAgXG5cbiAgZ2V0V2Vla0xhYmVscygpIHtcbiAgICB0aGlzLndlZWtMYWJlbHMgPSB0aGlzLmxhbmdzKClbJ3dlZWsnXVt0aGlzLmxhbmddO1xuICAgIHRoaXMud2Vla0xhYmVscyA9IHRoaXMud2Vla0xhYmVscy5zcGxpY2UodGhpcy53ZWVrU3RhcnQpLmNvbmNhdCh0aGlzLndlZWtMYWJlbHMpO1xuICB9XG5cbiAgaXNOb3dEYXRlKGRhdGU6IERhdGUpIHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIHJldHVybiAobm93LmdldEZ1bGxZZWFyKCkgPT09IGRhdGUuZ2V0RnVsbFllYXIoKSAmJiBub3cuZ2V0TW9udGgoKSA9PT0gZGF0ZS5nZXRNb250aCgpXG4gICAgICAmJiBub3cuZ2V0RGF0ZSgpID09PSBkYXRlLmdldERhdGUoKSkgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICBzaG93UHJldigpIHtcbiAgICBpZiAodGhpcy5tb250aE1vZGUpIHtcbiAgICAgIHRoaXMuY3VycmVudE1vbnRoLnNldE1vbnRoKHRoaXMuY3VycmVudE1vbnRoLmdldE1vbnRoKCkgLSAxKTtcbiAgICAgIHRoaXMuc2hvd1ZpZXcodGhpcy5jdXJyZW50TW9udGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRNb250aC5zZXRGdWxsWWVhcih0aGlzLmN1cnJlbnRNb250aC5nZXRGdWxsWWVhcigpIC0gMSk7XG4gICAgICB0aGlzLnNob3dWaWV3TW9udGgodGhpcy5jdXJyZW50TW9udGgpO1xuICAgIH1cbiAgfVxuXG4gIGlzU2VsZWN0ZWQoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5zZWxlY3RlZERheSAmJiB0aGlzLnNlbGVjdGVkRGF5LmRhdGUuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgICAmJiB0aGlzLnNlbGVjdGVkRGF5LmRhdGUuZ2V0TW9udGgoKSA9PT0gZGF0ZS5nZXRNb250aCgpICYmIHRoaXMuc2VsZWN0ZWREYXkuZGF0ZS5nZXREYXRlKCkgPT09IGRhdGUuZ2V0RGF0ZSgpKSA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIG1hcmtzZWxlY3REYXkoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNhbGVuZC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaXRlbTogYW55ID0gdGhpcy5jYWxlbmRbaV07XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZERheSAmJiB0aGlzLnNlbGVjdGVkRGF5LnllYXJEYXlOdW0gPT09IGl0ZW0ueWVhckRheU51bSAmJiB0aGlzLnNlbGVjdGVkRGF5LmRhdGUuZ2V0RnVsbFllYXIoKSA9PT0gaXRlbS5kYXRlLmdldEZ1bGxZZWFyKCkpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRbaV0uaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0ZWREYXkyICYmIHRoaXMuc2VsZWN0ZWREYXkyLnllYXJEYXlOdW0gPT09IGl0ZW0ueWVhckRheU51bSAmJiB0aGlzLnNlbGVjdGVkRGF5Mi5kYXRlLmdldEZ1bGxZZWFyKCkgPT09IGl0ZW0uZGF0ZS5nZXRGdWxsWWVhcigpKSB7XG4gICAgICAgIHRoaXMuY2FsZW5kW2ldLmlzU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuY2FsZW5kW2ldLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZWxlY3REYXkoZGF5OiBEYXkpIHtcbiAgICBpZiAodGhpcy5zZWxlY3RQZXJpb2RFbmFibGVkKSB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZERheSAmJiB0aGlzLnNlbGVjdGVkRGF5LnllYXJEYXlOdW0gPT09IGRheS55ZWFyRGF5TnVtICYmIHRoaXMuc2VsZWN0ZWREYXkuZGF0ZS5nZXRGdWxsWWVhcigpID09PSBkYXkuZGF0ZS5nZXRGdWxsWWVhcigpKSB7XG4gICAgICAgIC8vdGhpcy5zZWxlY3RlZERheSA9IG51bGw7XG4gICAgICAgIC8vdGhpcy5zZWxlY3RlZERheTIgPSBudWxsO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWREYXkpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF5ID0gZGF5O1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXkyID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGVkRGF5ICYmICF0aGlzLnNlbGVjdGVkRGF5Mikge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXkyID0gZGF5O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0ZWREYXkgJiYgdGhpcy5zZWxlY3RlZERheTIpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF5ID0gZGF5O1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXkyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkRGF5ICYmIHRoaXMuc2VsZWN0ZWREYXkueWVhckRheU51bSA9PT0gZGF5LnllYXJEYXlOdW0gJiYgdGhpcy5zZWxlY3RlZERheS5kYXRlLmdldEZ1bGxZZWFyKCkgPT09IGRheS5kYXRlLmdldEZ1bGxZZWFyKCkpIHtcbiAgICAgICAgLy90aGlzLnNlbGVjdGVkRGF5ID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXkgPSBkYXk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChkYXkgJiYgZGF5LmRhdGUuZ2V0TW9udGgoKSAhPT0gdGhpcy5jdXJyZW50TW9udGguZ2V0TW9udGgoKSkge1xuICAgICAgdGhpcy5jdXJyZW50TW9udGguc2V0TW9udGgoZGF5LmRhdGUuZ2V0TW9udGgoKSk7XG4gICAgICB0aGlzLnNob3dWaWV3KGRheS5kYXRlKTtcbiAgICB9XG4gICAgdGhpcy5tYXJrc2VsZWN0RGF5KCk7XG4gICAgaWYgKHRoaXMuc2VsZWN0UGVyaW9kRW5hYmxlZCkge1xuICAgICAgdGhpcy5tYXJrUGVyaW9kRGF0ZXMoKTtcbiAgICB9XG4gICAgaWYoIXRoaXMuc3VibWl0TW9kZSl7XG4gICAgICB0aGlzLmNoYW5nZSgpO1xuICAgIH1cbiAgICBcbiAgfVxuXG5cblxuICBzaG93TmV4dCgpIHtcbiAgICBpZiAodGhpcy5tb250aE1vZGUpIHtcbiAgICAgIHRoaXMuY3VycmVudE1vbnRoLnNldE1vbnRoKHRoaXMuY3VycmVudE1vbnRoLmdldE1vbnRoKCkgKyAxKTtcbiAgICAgIHRoaXMuc2hvd1ZpZXcodGhpcy5jdXJyZW50TW9udGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRNb250aC5zZXRGdWxsWWVhcih0aGlzLmN1cnJlbnRNb250aC5nZXRGdWxsWWVhcigpICsgMSk7XG4gICAgICB0aGlzLnNob3dWaWV3TW9udGgodGhpcy5jdXJyZW50TW9udGgpO1xuICAgIH1cblxuICB9XG5cbiAgY2xpY2tEYXRlKGRheSwgZXZlbnQgPSBudWxsKSB7XG4gICAgKGV2ZW50KSA/IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpIDogbnVsbDtcbiAgICBpZiAoIWRheS5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5zZWxlY3REYXkoZGF5KTtcbiAgICB9XG5cbiAgfVxuXG4gIG1hcmtQZXJpb2REYXRlcyhkYXkgPSBudWxsKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNhbGVuZC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaXRlbSA9IHRoaXMuY2FsZW5kW2ldO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGRheSAmJiB0aGlzLnNlbGVjdGVkRGF5ICYmICF0aGlzLnNlbGVjdGVkRGF5MiAmJiAoXG4gICAgICAgICAgKGl0ZW0ueWVhckRheU51bSA+PSBkYXkueWVhckRheU51bSAmJiBpdGVtLnllYXJEYXlOdW0gPD0gdGhpcy5zZWxlY3RlZERheS55ZWFyRGF5TnVtKVxuICAgICAgICAgIHx8XG4gICAgICAgICAgKGl0ZW0ueWVhckRheU51bSA8PSBkYXkueWVhckRheU51bSAmJiBpdGVtLnllYXJEYXlOdW0gPj0gdGhpcy5zZWxlY3RlZERheS55ZWFyRGF5TnVtKVxuICAgICAgICApXG4gICAgICAgIHx8XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXkgJiYgdGhpcy5zZWxlY3RlZERheTIgJiYgKFxuICAgICAgICAgIChpdGVtLnllYXJEYXlOdW0gPj0gdGhpcy5zZWxlY3RlZERheTIueWVhckRheU51bSAmJiBpdGVtLnllYXJEYXlOdW0gPD0gdGhpcy5zZWxlY3RlZERheS55ZWFyRGF5TnVtKVxuICAgICAgICAgIHx8XG4gICAgICAgICAgKGl0ZW0ueWVhckRheU51bSA8PSB0aGlzLnNlbGVjdGVkRGF5Mi55ZWFyRGF5TnVtICYmIGl0ZW0ueWVhckRheU51bSA+PSB0aGlzLnNlbGVjdGVkRGF5LnllYXJEYXlOdW0pXG4gICAgICAgIClcblxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuY2FsZW5kW2ldLm1hcmtlZFBlcmlvZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNhbGVuZFtpXS5tYXJrZWRQZXJpb2QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBob3ZlckRhdGUoZGF5KSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWREYXkgJiYgdGhpcy5zZWxlY3RQZXJpb2RFbmFibGVkKSB7XG4gICAgICB0aGlzLm1hcmtQZXJpb2REYXRlcyhkYXkpO1xuICAgIH1cbiAgfVxuXG4gIGdldERhdGUoZGF0ZTogRGF0ZSkge1xuICAgIGNvbnN0IGQgPSBPYmplY3QuYXNzaWduKGRhdGUpO1xuICAgIHJldHVybiBuZXcgRGF0ZShkLmdldFRpbWUoKSk7XG4gIH1cblxuICBnZXROdW1PZlllYXIoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIDAsIDApO1xuICAgIGNvbnN0IGRpZmYgPSBkYXRlLnZhbHVlT2YoKSAtIHN0YXJ0LnZhbHVlT2YoKTtcbiAgICBjb25zdCBvbmVEYXkgPSAxMDAwICogNjAgKiA2MCAqIDI0O1xuICAgIGNvbnN0IGRheSA9IE1hdGguZmxvb3IoZGlmZiAvIG9uZURheSk7XG4gICAgcmV0dXJuIGRheTtcbiAgfVxuXG4gIHNob3dWaWV3TW9udGgoZGF0ZTogRGF0ZSwgZXZlbnQgPSBudWxsKSB7XG4gICAgKGV2ZW50KSA/IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpIDogbnVsbDtcbiAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIGZvciAobGV0IGsgPSAwOyBrIDwgNDsgaysrKSB7XG4gICAgICB0aGlzLm1vbnRoQ2FsZW5kW2tdID0gW107XG4gICAgICBmb3IgKGxldCBpID0gayAqIDM7IGkgPCBrICogMyArIDM7IGkrKykge1xuICAgICAgICB0aGlzLm1vbnRoQ2FsZW5kW2tdLnB1c2goXG4gICAgICAgICAge1xuICAgICAgICAgICAgeWVhcixcbiAgICAgICAgICAgIG1vbnRoOiBpLFxuICAgICAgICAgICAgZGF0ZTogbmV3IERhdGUoeWVhciwgaSwgMSlcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMubW9udGhNb2RlID0gZmFsc2U7XG5cbiAgfVxuXG4gIGlzRGlzYWJsZWQoZGF0ZTogRGF0ZSkge1xuICAgIGxldCBhID0gdGhpcy5nZXREYXRlKGRhdGUpO1xuICAgIGEuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgbGV0IGIgPSB0aGlzLmdldERhdGUobmV3IERhdGUoKSk7XG4gICAgYi5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICBpZih0aGlzLmRpc2FibGVkQmVmb3JlKXtcbiAgICAgIHJldHVybiAodGhpcy5kaXNhYmxlZEJlZm9yZSAmJiBhLnZhbHVlT2YoKSA8IGIudmFsdWVPZigpKSA/IHRydWUgOiBmYWxzZTtcbiAgICB9ZWxzZSBpZih0aGlzLmRpc2FibGVkQWZ0ZXIpe1xuICAgICAgcmV0dXJuICh0aGlzLmRpc2FibGVkQWZ0ZXIgJiYgYS52YWx1ZU9mKCkgPiBiLnZhbHVlT2YoKSkgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgICBcbiAgfVxuXG5cbiAgc2hvd1ZpZXcoZGF0ZTogRGF0ZSkge1xuICAgIHRoaXMuZGF5c0luTW9udGggPSB0aGlzLmdldERheXNJbk1vbnRoKGRhdGUpO1xuICAgIHRoaXMuZGF5c0luUHJldk1vbnRoID0gdGhpcy5nZXREYXlzSW5QcmV2TW9udGgoZGF0ZSk7XG4gICAgY29uc3QgbnVtRmlyc3REYXkgPSB0aGlzLmdldEZpcnN0RGF5TnVtKGRhdGUpO1xuICAgIGNvbnN0IG51bUxhc3REYXkgPSB0aGlzLmdldExhc3REYXlOdW0oZGF0ZSk7XG4gICAgY29uc3QgY2FsZW5kID0gW107XG4gICAgY29uc3Qgd2Vla0NhbGVuZCA9IFtdO1xuXG4gICAgY29uc3Qgbm93TW9udGggPSB0aGlzLmdldERhdGUoZGF0ZSk7XG4gICAgY29uc3QgcHJldk1vbnRoRGF0ZSA9IHRoaXMuZ2V0RGF0ZShkYXRlKTtcbiAgICBwcmV2TW9udGhEYXRlLnNldE1vbnRoKHRoaXMuZ2V0RGF0ZShkYXRlKS5nZXRNb250aCgpIC0gMSk7XG4gICAgY29uc3QgbmV4dE1vbnRoRGF0ZSA9IHRoaXMuZ2V0RGF0ZShkYXRlKTtcbiAgICBuZXh0TW9udGhEYXRlLnNldE1vbnRoKHRoaXMuZ2V0RGF0ZShkYXRlKS5nZXRNb250aCgpICsgMSk7XG5cblxuICAgIGlmIChudW1GaXJzdERheSAhPT0gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IG51bUZpcnN0RGF5OyBpID4gMDsgaS0tKSB7XG4gICAgICAgIGNvbnN0IG51bSA9IHRoaXMuZGF5c0luUHJldk1vbnRoIC0gaSArIDE7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShwcmV2TW9udGhEYXRlLmdldEZ1bGxZZWFyKCksIHByZXZNb250aERhdGUuZ2V0TW9udGgoKSwgbnVtKTtcbiAgICAgICAgY2FsZW5kLnB1c2goe1xuICAgICAgICAgIG51bSxcbiAgICAgICAgICB5ZWFyRGF5TnVtOiB0aGlzLmdldE51bU9mWWVhcihkYXRlKSxcbiAgICAgICAgICBkYXRlLFxuICAgICAgICAgIGN1cnJlbnRNb250aDogZmFsc2UsXG4gICAgICAgICAgaXNOb3dEYXRlOiB0aGlzLmlzTm93RGF0ZShkYXRlKSxcbiAgICAgICAgICBpc1dlZWtFbmQ6IHRoaXMuaXNXZWVrRW5kKGRhdGUpLFxuICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmlzRGlzYWJsZWQoZGF0ZSlcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdGhpcy5kYXlzSW5Nb250aDsgaSsrKSB7XG4gICAgICBub3dNb250aC5zZXREYXRlKGkpO1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKG5vd01vbnRoLmdldEZ1bGxZZWFyKCksIG5vd01vbnRoLmdldE1vbnRoKCksIGkpO1xuICAgICAgY2FsZW5kLnB1c2goe1xuICAgICAgICBudW06IGksXG4gICAgICAgIHllYXJEYXlOdW06IHRoaXMuZ2V0TnVtT2ZZZWFyKGRhdGUpLFxuICAgICAgICBkYXRlLFxuICAgICAgICBjdXJyZW50TW9udGg6IHRydWUsXG4gICAgICAgIGlzTm93RGF0ZTogdGhpcy5pc05vd0RhdGUoZGF0ZSksXG4gICAgICAgIGlzV2Vla0VuZDogdGhpcy5pc1dlZWtFbmQoZGF0ZSksXG4gICAgICAgIGRpc2FibGVkOiB0aGlzLmlzRGlzYWJsZWQoZGF0ZSlcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgaWYgKG51bUxhc3REYXkgIT09IDYpIHtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNyAtIG51bUxhc3REYXk7IGkrKykge1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUobmV4dE1vbnRoRGF0ZS5nZXRGdWxsWWVhcigpLCBuZXh0TW9udGhEYXRlLmdldE1vbnRoKCksIGkpO1xuICAgICAgICBjYWxlbmQucHVzaCh7XG4gICAgICAgICAgbnVtOiBpLFxuICAgICAgICAgIHllYXJEYXlOdW06IHRoaXMuZ2V0TnVtT2ZZZWFyKGRhdGUpLFxuICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgY3VycmVudE1vbnRoOiBmYWxzZSxcbiAgICAgICAgICBpc05vd0RhdGU6IHRoaXMuaXNOb3dEYXRlKGRhdGUpLFxuICAgICAgICAgIGlzV2Vla0VuZDogdGhpcy5pc1dlZWtFbmQoZGF0ZSksXG4gICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuaXNEaXNhYmxlZChkYXRlKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbGVuZC5sZW5ndGggLyA3OyBpKyspIHtcbiAgICAgIGNvbnN0IHdlZWsgPSBbXTtcbiAgICAgIGZvciAobGV0IGsgPSBpICogNzsgayA8IGkgKiA3ICsgNzsgaysrKSB7XG4gICAgICAgIHdlZWsucHVzaChjYWxlbmRba10pO1xuICAgICAgfVxuICAgICAgd2Vla0NhbGVuZC5wdXNoKHdlZWspO1xuICAgIH1cblxuICAgIHRoaXMuY2FsZW5kID0gY2FsZW5kO1xuICAgIHRoaXMud2Vla0NhbGVuZCA9IHdlZWtDYWxlbmQ7XG4gICAgaWYgKHRoaXMuc2VsZWN0UGVyaW9kRW5hYmxlZCkge1xuICAgICAgdGhpcy5tYXJrUGVyaW9kRGF0ZXMoKTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcmtzZWxlY3REYXkoKTtcbiAgICB0aGlzLm1vbnRoTW9kZSA9IHRydWU7XG4gIH1cblxuICBpc1dlZWtFbmQoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy53ZWVrZW5kcy5pbmNsdWRlcyh0aGlzLmdldE51bURheShkYXRlKSkpID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgZ2V0TnVtRGF5KGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmdldE9mZnNldERheXNTdGFydChkYXRlLmdldERheSgpKTtcbiAgfVxuXG4gIGdldEZpcnN0RGF5TnVtKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgIGNvbnN0IHRydWVOdW06IG51bWJlciA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCAxKS5nZXREYXkoKTtcbiAgICByZXR1cm4gdGhpcy5nZXRPZmZzZXREYXlzU3RhcnQodHJ1ZU51bSk7XG4gIH1cblxuICBnZXRMYXN0RGF5TnVtKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgIGNvbnN0IHRydWVOdW06IG51bWJlciA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpICsgMSwgMCkuZ2V0RGF5KCk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T2Zmc2V0RGF5c1N0YXJ0KHRydWVOdW0pO1xuICB9XG5cbiAgZ2V0RGF5c0luTW9udGgoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpICsgMSwgMCkuZ2V0RGF0ZSgpO1xuICB9XG5cbiAgZ2V0RGF5c0luUHJldk1vbnRoKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgMCkuZ2V0RGF0ZSgpO1xuICB9XG5cblxufVxuIl19