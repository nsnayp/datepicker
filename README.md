# Datepicker


![angular datepicker](http://kb.etsgroup.ru/uploads/de3f5adde25fffdf5ab3f5fc0e92d6d6beec9ed4.png)
`npm i datepicker-ns`
## DEMO
[https://nsnayp.github.io/datepicker/index.html](https://nsnayp.github.io/datepicker/index.html)


## Getting started

Set to imports app.module.ts `import { DatepickerModule } from 'datepicker-ns'`. Then you can use it by tag  `<ns-datepicker [options]=options  (onCanceled) (onClickOut) (onChanged) ></ns-datepicker>`.


## Options

Structure of `option` object:

```javascript

weekends: number[]; // [5,6] day in week is weekend
lang: string; // 'ru'|'en'
weekStart: number; // 1
selection: {
    mode: 'single' // 'single'|'period'|'multiple'
};
timeMode: boolean; // available change time for selected dates
submitMode: boolean; // change date on submit buttons
initDates: Date[]; // array of dates 1 for single, 2 for period, anymore fore multiple selection mode
disabled?: { // disable date to select
    enabled: true,
    mode:'after' // 'after'|'before'
}; // 

```


## Events
```javascript
onClickOut() // - click out of calendar for hide (close) datepicker () 
onChanged() // - return `initDates` array when date changed / selected
onCanceled() // - call when btn 'cancel' clicked
```
## Example

```javascript
 options = {
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

onChanged(date) {
    options.initDates = date;
    label = (options.initDates.length>0)?options.initDates.join(' - ') : 'Not selected';
    visible = false;
}


calendarVisible = false;
<a href="javascript:void(0)" type="text" (click)="calendarVisible=true" >{{label}}</a>
<ns-datepicker [options]=options  (onCanceled)="calendarVisible = false"  (onClickOut)="calendarVisible = false" (onChanged)="onChanged($event)"></ns-datepicker>
```