import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs/Observable';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @ViewChild(IonList) ionList: IonList;

  usuarios:  Observable<any>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    //this.dataService.getUsuarios().subscribe(console.log);
    this.usuarios = this.dataService.getUsuarios();
  }

  favorite(user: any){
     console.log(user);
     this.ionList.closeSlidingItems();
  }
  share(user: any){
    console.log(user);
    this.ionList.closeSlidingItems();
 }
 delete(user: any){
  console.log(user.name);
  this.ionList.closeSlidingItems();
}

}
