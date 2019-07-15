import { NgModule } from '@angular/core';
import { DatepickerComponent, Outside } from './datepicker.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [DatepickerComponent, Outside],
  imports: [
    BrowserModule
  ],
  exports: [DatepickerComponent]
})
export class DatepickerModule { }
