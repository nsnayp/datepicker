import { Component, OnInit, Input, Output,EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'ns-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {


  @Input() date;
  @Output() changed = new EventEmitter();

  hour;
  minute;
  inited = false;
  constructor() {

  }

  ngOnInit() {
    //console.log('ngOnInit')
    this.hour = this.date.date.getHours();
    this.minute = this.date.date.getMinutes();
    this.date.date.setHours(this.hour, this.minute);
    this.inited = true;
  }

  ngOnChanges(){
    if(this.inited){
      this.date.date.setHours(this.hour, this.minute);
    }
  }

  change() {
    const data = this.date.date;
    data.setHours(this.hour, this.minute);
    this.changed.emit(data);
  }

  hourChange(){
    this.change();
  }
  minuteChange(){
    this.change();
  }

  getTimeArays(){
    const arr = {min:[],hour:[]};
    for (let i = 0; i < 60; i++) {
      let k = i.toString();
      k = (k.length==1)? '0'+k: k;
      let item = {val:i, label:k}
      arr['min'].push(item);
      if(i<24){
        arr['hour'].push(item);
      }
    }
    return arr;
  }

}
