import { Component, OnInit, ViewChild } from '@angular/core';
import 'fullcalendar';
import { formatDate } from 'fullcalendar'
import { Calendar } from 'fullcalendar';
import * as $ from "jquery";
//import { OptionsInput } from 'fullcalendar/src/types/input-types';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  events: [
    {
      title  : 'event1',
      start  : '2019-01-01'
    },
    {
      title  : 'event2',
      start  : '2019-01-05',
      end    : '2019-01-07'
    },
    {
      title  : 'event3',
      start  : '2019-01-09T12:30:00',
      allDay : true // will make the time show
    }
  ]
   options: any = {
     events: this.events,
     plugins: []
   };


  transformDate(str: String) {
    return str.substr(0, 10);
  }

  
  constructor() { }

  ngOnInit() {

    console.log(this.options)
  
    var calendarEl = document.getElementById('calendar');
    var calendar = new Calendar(calendarEl,this.options);
    calendar.render();
  }

}
