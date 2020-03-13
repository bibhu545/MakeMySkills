import { Component } from '@angular/core';
import { CommonService } from './Services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NgMakeMySkills';

  currentRoute: String;
  onlineTestMode: boolean = false;
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getRoute();
  }

  getRoute() {
    this.commonService.routePath$.subscribe(data => {
      this.currentRoute = data;
      if (this.currentRoute == '/online-test') {
        this.onlineTestMode = true;
      }
    })
  }

}
