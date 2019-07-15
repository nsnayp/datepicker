# Datepicker

`npm i datepicker-ns`
![angular datepicker](http://kb.etsgroup.ru/uploads/ed4fce3df256ba7bffdd254f6017e4788320668b.png)

## Getting started

Set to imports app.module.ts `import { DatepickerModule } from 'datepicker-ns'`. Then you can use it by tag  `<ns-datepicker [dates]="dates" [options]=options (onClickOut) (onChanged)></ns-datepicker>`.


## Options
Structure of `option` object:
`lang` - "en" or "ru", 
`selectPeriodEnabled` - mode selection, single date or period (boolean)
`suggestions` - today, yesterday, week, etc buttons for quick selection (boolean)
`disabledBefore` - disable selection date before now (boolean)
`disabledAfter` - disable selection date after now (boolean)
`weekends` - array of days in week, default = [5, 6]
`weekStart` - num of week day started week


Structure of `dates` object:
`[
    dateStart : ?<Date>,
    dateEnd: ?<Date>
]`

## Events
`onClickOut()` - click out of calendar for hide (close) datepicker () 
`onChanged()` - return `dates` object when date changeed


## Example

```javascript
dates = {
    dateStart: new Date(),
    dateEnd: null, 
};
options = {
    selectPeriodEnabled: false,
    suggestions : false,
    disabledBefore: true
};
calendarVisible = false;
<a href="javascript:void(0)" type="text" (click)="calendarVisible=true" >{{dates.dateStart.toString()}}</a>
<ns-datepicker [dates]="" [options]=options (onClickOut)="calendarVisible = false" (onChanged)="dates"></ns-datepicker>
```