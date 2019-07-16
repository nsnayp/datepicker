import { NgModule } from '@angular/core';
import { DatepickerComponent, Outside } from './datepicker.component';
import { BrowserModule } from '@angular/platform-browser';
import { TimeComponent } from './time/time.component';
import { ColComponent } from './col/col.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [DatepickerComponent, Outside, TimeComponent, ColComponent],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [DatepickerComponent]
})
export class DatepickerModule { }
