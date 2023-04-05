import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from './local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ATWMeals';
  savedUserId: any = null;

  constructor(public router: Router, private localStore: LocalService) {
  }

  ngOnInit(): void {
    this.savedUserId = this.localStore.getData("userId");
  }
}
