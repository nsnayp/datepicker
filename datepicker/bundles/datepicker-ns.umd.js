(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/platform-browser'), require('@angular/core'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('datepicker-ns', ['exports', '@angular/platform-browser', '@angular/core', '@angular/forms'], factory) :
    (factory((global['datepicker-ns'] = {}),global.ng.platformBrowser,global.ng.core,global.ng.forms));
}(this, (function (exports,platformBrowser,i0,forms) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DatepickerService = /** @class */ (function () {
        function DatepickerService() {
        }
        DatepickerService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        DatepickerService.ctorParameters = function () { return []; };
        /** @nocollapse */ DatepickerService.ngInjectableDef = i0.defineInjectable({ factory: function DatepickerService_Factory() { return new DatepickerService(); }, token: DatepickerService, providedIn: "root" });
        return DatepickerService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Outside = /** @class */ (function () {
        function Outside(elRef) {
            this.elRef = elRef;
            this.close = new i0.EventEmitter();
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
            { type: i0.Directive, args: [{
                        selector: '[outside]',
                    },] }
        ];
        /** @nocollapse */
        Outside.ctorParameters = function () {
            return [
                { type: i0.ElementRef }
            ];
        };
        Outside.propDecorators = {
            close: [{ type: i0.Output, args: ['outside',] }],
            handleClick: [{ type: i0.HostListener, args: ['document:click', ['$event'],] }]
        };
        return Outside;
    }());
    var DatepickerComponent = /** @class */ (function () {
        function DatepickerComponent() {
            this.onChanged = new i0.EventEmitter();
            this.onClickOut = new i0.EventEmitter();
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
                if (event === void 0) {
                    event = null;
                }
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
                if (day === void 0) {
                    day = null;
                }
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
                if (event === void 0) {
                    event = null;
                }
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
            { type: i0.Component, args: [{
                        selector: 'ns-datepicker',
                        template: "<div class=\"calendar\" (outside)=\"clickout($event)\" >\n\n    <div style=\"border-bottom: 1px solid #f3f3f3; display:flex; flex-direction: row; justify-content: center; align-items:center; padding:10px;flex-direction: column;\">\n        <div *ngIf=\"suggestions\" style=\"display: block;\">\n            <button class=\"dateBtn\" (click)=\"selectDay(today)\">\u0441\u0435\u0433\u043E\u0434\u043D\u044F</button>\n        </div>\n      <div style=\"padding-top:10px; display:flex; flex-direction: row; justify-content: space-between; width: 100%;\">\n          <a href=\"javascript:void(0)\" (click)=\"showPrev()\" class=\"btnPrevNext\"><</a>\n          <div class=\"yearBtn\" (click)=\"showViewMonth(currentMonth, $event)\">\n              <span *ngIf=\"monthMode\" style=\"margin-right:3px\">{{getMonthByNUm(currentMonth.getMonth())}}</span> <span>{{currentMonth.getFullYear()}}</span>\n          </div>\n          <a href=\"javascript:void(0)\" (click)=\"showNext()\"  class=\"btnPrevNext\">></a>\n      </div>\n      \n      \n    \n  \n    </div>\n    <div style=\"padding: 8px 10px;\">\n      \n      <div *ngIf=\"weekLabels&&monthMode\" class=\"row\">\n        <div class=\"col h\" *ngFor=\"let label of weekLabels\">\n          {{label}}\n        </div>\n      </div>\n  \n  \n      <div *ngIf=\"weekCalend&&monthMode\">\n        <div class=\"row\" *ngFor=\"let week of weekCalend\">\n            <div \n              *ngFor=\"let day of week\" \n              class=\"col\" \n              [ngClass]=\"{currentMonth:day.currentMonth, isNowDate: day.isNowDate, isWeekEnd: day.isWeekEnd, isSelected: day.isSelected, markedPeriod: day.markedPeriod, disabled: day.disabled }\" \n              (click)=\"clickDate(day, $event)\"\n              (mouseover)=\"hoverDate(day)\"\n            >\n            {{day.num}}\n            <div></div>\n          </div>\n        </div>     \n      </div>\n  \n  \n      <div *ngIf=\"monthCalend&&!monthMode\">\n        <div class=\"row\" *ngFor=\"let months of monthCalend\">\n            <div \n              *ngFor=\"let month of months\"\n              class=\"col month\"\n              (click)=\"showMonth(month.date, $event)\"\n            >\n            {{getMonthByNUm(month.month)}} \n            </div>\n        </div>     \n      </div>\n  \n    </div>\n    <div *ngIf=\"time&&time.enabled\" style=\"border-bottom: 1px solid #f3f3f3; display:flex; flex-direction: column; justify-content: center; padding:10px; font-size: 11px\">\n        \n      <div *ngIf=\"selectedDay\" >\n        <ns-time [date]=\"selectedDay\" changed=\"timeChange(data)\"></ns-time>\n      </div>\n\n      <div *ngIf=\"this.selectedDay2\" >\n        <ns-time [date]=\"selectedDay2\" changed=\"timeChange(data)\"></ns-time>\n      </div>\n    </div>\n\n\n    <div *ngIf=\"time.enabled||(!time.enabled&&submitMode)\" style=\" display:flex; flex-direction: row; justify-content: space-between; align-items:center; padding:10px; font-size: 11px\">\n      <button class=\"btnCancel\">{{(lang=='en')?'cancel':'\u043E\u0442\u043C\u0435\u043D\u0430'}}</button>\n      <button class=\"btnOk\" (click)=\"submit()\">{{(lang=='en')?'ok':'\u043E\u043A'}}</button>\n    </div>\n  \n  </div>",
                        styles: [".row{display:flex;flex-direction:row}.col{display:flex;position:relative;flex-direction:column;flex:1;justify-content:center;align-items:center;font-size:.8em;padding:4px;border-radius:2px;cursor:pointer;color:#c7c7c7;-webkit-animation:.2s ease-in slide-up;animation:.2s ease-in slide-up;text-align:center}@-webkit-keyframes slide-up{0%{opacity:.5}100%{opacity:1}}@keyframes slide-up{0%{opacity:.5}100%{opacity:1}}.col.markedPeriod{background:#d5ebff!important;border-radius:0!important;transition:.2s}.col.isSelected.markedPeriod{border-radius:2px!important}.col.isSelected{background:#5eb3fc!important;color:#fff!important}.dateBtn{float:left;background:#f3f3f3;border:0;font-size:.74em;color:#2fafff;outline:0;border-radius:2px;cursor:pointer;margin:2px;padding:2px 4px}.dateBtn:hover{background:#6398e0;color:#fff}.col.currentMonth{color:#353540}.col.isNowDate{color:#3f92ff}.col.isWeekEnd.currentMonth{color:#c53c3c}.col.disabled{background:#f5f5f5;color:#afafaf}.col.month:hover,.col:hover{background:#eee}.col.month{font-size:11px;color:#545454;padding:16px 8px;box-shadow:0 0 0 1px #f4f3f3;background:#fff;border-radius:0;min-width:40px}.col.h{color:#ff9a19;text-transform:uppercase}.col.h:hover{background:#fff}.calendar{float:left;box-shadow:0 3px 12px -5px #000;max-width:200px;-webkit-animation:50ms slide-up;animation:50ms slide-up;background:#fff;border-radius:8px}.btnPrevNext{font-size:14px;padding:6px 8px;border-radius:2px;color:#5eb3fc;text-decoration:none}.btnPrevNext:hover{background:#f4f3f3}.yearBtn{font-size:14px;padding:6px 10px;border-radius:2px;color:#585858;cursor:pointer}.yearBtn:hover{background:#f4f3f3}.btnOk{border:0;background:#5eb3fc;padding:8px 16px;color:#fff;border-radius:2px;outline:0;cursor:pointer}.btnOk:hover{background:#3e99e6}.btnCancel{border:0;background:#fff;padding:8px 16px;color:#5eb3fc;border-radius:2px;outline:0;cursor:pointer}.btnCancel:hover{background:#e4f3ff}"]
                    }] }
        ];
        /** @nocollapse */
        DatepickerComponent.ctorParameters = function () { return []; };
        DatepickerComponent.propDecorators = {
            options: [{ type: i0.Input }],
            visible: [{ type: i0.Input }],
            onChangeDate: [{ type: i0.Input }],
            onChanged: [{ type: i0.Output }],
            onClickOut: [{ type: i0.Output }],
            dates: [{ type: i0.Input }]
        };
        return DatepickerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TimeComponent = /** @class */ (function () {
        function TimeComponent() {
            this.changed = new i0.EventEmitter();
            this.inited = false;
        }
        /**
         * @return {?}
         */
        TimeComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                //console.log('ngOnInit')
                this.hour = this.date.date.getHours();
                this.minute = this.date.date.getMinutes();
                this.date.date.setHours(this.hour, this.minute);
                this.inited = true;
            };
        /**
         * @return {?}
         */
        TimeComponent.prototype.ngOnChanges = /**
         * @return {?}
         */
            function () {
                if (this.inited) {
                    this.date.date.setHours(this.hour, this.minute);
                }
            };
        /**
         * @return {?}
         */
        TimeComponent.prototype.change = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var data = this.date.date;
                data.setHours(this.hour, this.minute);
                this.changed.emit(data);
            };
        /**
         * @return {?}
         */
        TimeComponent.prototype.hourChange = /**
         * @return {?}
         */
            function () {
                this.change();
            };
        /**
         * @return {?}
         */
        TimeComponent.prototype.minuteChange = /**
         * @return {?}
         */
            function () {
                this.change();
            };
        /**
         * @return {?}
         */
        TimeComponent.prototype.getTimeArays = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var arr = { min: [], hour: [] };
                for (var i = 0; i < 60; i++) {
                    /** @type {?} */
                    var k = i.toString();
                    k = (k.length == 1) ? '0' + k : k;
                    /** @type {?} */
                    var item = { val: i, label: k };
                    arr['min'].push(item);
                    if (i < 24) {
                        arr['hour'].push(item);
                    }
                }
                return arr;
            };
        TimeComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ns-time',
                        template: "<div style=\"display: flex;flex-direction: row;justify-content: space-between;align-items: center; padding: 4px;color: #6f6f6f;background: linear-gradient(90deg,#fff, #e7f4ff); \">\n  <div >{{date.date.getDate()}}.{{date.date.getMonth()+1}}.{{date.date.getFullYear()}} </div>\n    <div>\n      <select [(ngModel)]=\"hour\"  (change)=\"hourChange()\"  style=\"border: 0; background: transparent; padding: 2px;font-size: 11px; outline: none;\">\n        <option *ngFor=\"let hour of getTimeArays()['hour']\" [ngValue]=\"hour.val\">{{hour.label}}</option>\n      </select>\n      <select [(ngModel)]=\"minute\" (change)=\"minuteChange()\" style=\"border: 0; background: transparent; padding: 2px;font-size: 11px; outline: none;\">\n        <option *ngFor=\"let min of getTimeArays()['min']\" [ngValue]=\"min.val\">{{min.label}}</option>\n      </select>\n    </div>\n\n</div>",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        TimeComponent.ctorParameters = function () { return []; };
        TimeComponent.propDecorators = {
            date: [{ type: i0.Input }],
            changed: [{ type: i0.Output }]
        };
        return TimeComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ColComponent = /** @class */ (function () {
        function ColComponent() {
        }
        /**
         * @return {?}
         */
        ColComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        ColComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ns-col',
                        template: "<p>\n  col works!\n</p>\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        ColComponent.ctorParameters = function () { return []; };
        return ColComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DatepickerModule = /** @class */ (function () {
        function DatepickerModule() {
        }
        DatepickerModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [DatepickerComponent, Outside, TimeComponent, ColComponent],
                        imports: [
                            platformBrowser.BrowserModule,
                            forms.FormsModule
                        ],
                        exports: [DatepickerComponent]
                    },] }
        ];
        return DatepickerModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.DatepickerService = DatepickerService;
    exports.Outside = Outside;
    exports.DatepickerComponent = DatepickerComponent;
    exports.DatepickerModule = DatepickerModule;
    exports.ɵb = ColComponent;
    exports.ɵa = TimeComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=datepicker-ns.umd.js.map