import { Component, OnInit } from '@angular/core';
import { LocalStoreService } from 'src/services/local-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'capaVisual';

    constructor(
      private localStorage: LocalStoreService,
      ){
    }

    ngOnInit() {
      this.localStorage.EliminarSessionStorange();
      
    }

}
