import { OnInit, EventEmitter, ElementRef } from '@angular/core';
export interface Day {
    date: Date;
    yearDayNum: number;
    vas?: number;
}
export declare class Outside {
    private elRef;
    close: EventEmitter<{}>;
    isOpen: boolean;
    constructor(elRef: ElementRef);
    isChild(target: any): any;
    handleClick(event: any): void;
}
export declare class DatepickerComponent implements OnInit {
    options: any;
    visible: any;
    onChangeDate: Function;
    onChanged: EventEmitter<{}>;
    onClickOut: EventEmitter<boolean>;
    dates: any;
    initDate: any;
    today: {
        date: Date;
        yearDayNum: number;
    };
    yesterday: Date;
    date: any;
    numDay: any;
    daysInMonth: number;
    daysInPrevMonth: number;
    matrix: any;
    countMonths: number;
    weekStart: number;
    currentMonth: Date;
    weekends: number[];
    calend: any[];
    weekCalend: any[];
    selectedDay: any;
    selectedDay2: any;
    weekLabels: any;
    period: any;
    selectPeriodEnabled: boolean;
    monthMode: boolean;
    suggestions: boolean;
    monthCalend: any[];
    disabledBefore: boolean;
    disabledAfter: boolean;
    lang: string;
    submitMode: boolean;
    time: any;
    clickout(event: any): void;
    constructor();
    timeChange(data: any): void;
    submit(): void;
    change(): void;
    getMonthByNUm(num: number): any;
    ngOnInit(): void;
    showMonth(date: Date, event: any): void;
    getOffsetDaysStart(trueNum: number): number;
    langs(): {
        week: {
            en: string[];
            ru: string[];
        };
        month: {
            en: string[];
            ru: string[];
        };
    };
    getWeekLabels(): void;
    isNowDate(date: Date): boolean;
    showPrev(): void;
    isSelected(date: Date): boolean;
    markselectDay(): void;
    selectDay(day: Day): void;
    showNext(): void;
    clickDate(day: any, event?: any): void;
    markPeriodDates(day?: any): void;
    hoverDate(day: any): void;
    getDate(date: Date): Date;
    getNumOfYear(date: Date): number;
    showViewMonth(date: Date, event?: any): void;
    isDisabled(date: Date): boolean;
    showView(date: Date): void;
    isWeekEnd(date: Date): boolean;
    getNumDay(date: Date): number;
    getFirstDayNum(date: Date): number;
    getLastDayNum(date: Date): number;
    getDaysInMonth(date: Date): number;
    getDaysInPrevMonth(date: Date): number;
}
