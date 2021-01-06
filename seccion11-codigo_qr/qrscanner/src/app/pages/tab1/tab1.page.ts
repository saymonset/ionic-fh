import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  ionViewDidEnter(){
      console.log('ViewDidEnter')
  }
  ionViewDidLeave(){
    console.log('viewDidLeave')
}

  ionViewDidLoad(){
    console.log('ViewDidLoad')
  }

  ionViewWillEnter(){
    console.log(' viewWillEnter')
  }

  onViewWillLeave(){
    console.log(' viewWillLeave')
  }
}
