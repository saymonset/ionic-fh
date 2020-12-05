import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.page.html',
  styleUrls: ['./segment.page.scss'],
})
export class SegmentPage implements OnInit {

  superHeroes: Observable<any>;
  publisher: string = 'todos';

  constructor(private dataService: DataService) { }

  ngOnInit() {
     this.superHeroes = this.dataService.getHeroes();
  }


  segmentChanged(event){
    //console.log(event);

    
    if (event.detail.value === 'todos'){
      this.publisher = '';
     return ;
    }
    this.publisher = event.detail.value;
    
  }

}
