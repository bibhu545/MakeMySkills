import { Component, OnInit, APP_ID } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/Services/cookie.service';
import { ModalService } from 'src/app/Services/modal.service';
import { API_ENDPOINTS, Utils } from 'src/app/Utils/Utils';
import { TestModel, UserModel } from 'src/app/Utils/Models';

@Component({
  selector: 'app-examiner-home',
  templateUrl: './examiner-home.component.html',
  styleUrls: ['./examiner-home.component.css']
})
export class ExaminerHomeComponent implements OnInit {

  utils: Utils = new Utils();
  userId: number = 0;
  tests: TestModel[] = [];
  userDetails: UserModel = new UserModel();
  batchDetails: any[] = [];

  constructor(
    private http: HttpService,
    private router: Router,
    private cookieService: CookieService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.userId = this.cookieService.getUserdataFromCookies().userId;
    this.http.getData(API_ENDPOINTS.GetUserHomeData + "?id=" + this.userId).subscribe(response => {
      if (response.results != null) {
        if (response.results.length > 0) {
          this.tests = response.results[0];

          this.tests.forEach(element => {
            element.dateAdded = this.utils.getDateFromServer(element.dateAdded.toString()).toLocaleDateString();
          });

          this.batchDetails = response.results[1];
          this.userDetails = response.results[2];
        }
        else {
          this.utils.showErrorMessage("Some error occured. Please try again.");
        }
      }
    }, error => {
      this.utils.showServerError(error);
    });
  }

}
