import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.page.html',
  styleUrls: ['./date-time.page.scss'],
})
export class DateTimePage implements OnInit {

  fechaNaci: Date = new Date();

  customYearValues = [2020, 1996];
  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  

  constructor() { }

  ngOnInit() {
  }
   cambioFecha(e){
     console.log(e);
     console.log(new Date(e.detail.value));
   }

   customPickerOptions = {
    buttons: [{
      text: 'SaymonGuarda',
      handler: (event) => console.log('Clicked Save!',event)
    }, {
      text: 'CancelaSaymon',
      handler: () => {
        console.log('Clicked Log. Do not Dismiss.');
        return false;
      }
    }]
   }
}
