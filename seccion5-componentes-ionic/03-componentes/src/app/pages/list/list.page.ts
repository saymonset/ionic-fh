import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  usuarios:  Observable<any>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    //this.dataService.getUsuarios().subscribe(console.log);
    this.usuarios = this.dataService.getUsuarios();
  }

}
