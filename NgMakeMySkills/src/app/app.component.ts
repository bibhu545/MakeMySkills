import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonService } from './Services/common.service';
import { HttpService } from './Services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'NgMakeMySkills';
  currentRoute: String;
  onlineTestMode: boolean = false;
  isLoading: boolean = false;

  constructor(
    private commonService: CommonService,
    private http: HttpService,
    private cd: ChangeDetectorRef
  ) {
    this.commonService.loading$.subscribe(data => {
      this.isLoading = data;
    });
  }

  ngOnInit() {
    this.getRoute();
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
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
