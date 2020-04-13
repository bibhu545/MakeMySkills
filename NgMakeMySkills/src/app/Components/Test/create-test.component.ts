import { Component, OnInit } from '@angular/core';
import { TestModel, TopicModel } from 'src/app/Utils/Models';
import { Utils, API_ENDPOINTS, USER_TYPES } from 'src/app/Utils/Utils';
import { HttpService } from 'src/app/Services/http.service';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/Services/cookie.service';
import { AccountService } from 'src/app/Services/account.service';
import { ModalService } from 'src/app/Services/modal.service';
import { AccountComponent } from '../Account/account.component';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  newTest: TestModel = new TestModel();
  addedTest: TestModel = new TestModel();
  utils: Utils = new Utils();
  topics: TopicModel[] = [];
  userId: number = 0;

  constructor(
    private http: HttpService,
    private router: Router,
    private cookieService: CookieService,
    private modalService: ModalService,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    if (this.cookieService.isLoggedIn()) {
      var userType = this.cookieService.getUserType();
      if (userType == USER_TYPES.admin || userType == USER_TYPES.examiner) {
        this.userId = this.cookieService.getUserdataFromCookies().userId;
        this.getCommonDataForTest();
      }
      else{
        this.router.navigateByUrl('/error-page');
      }
    }
    else{
      this.router.navigateByUrl('/');
      this.accountService.setLoginMode(true);
      this.modalService.showModal(AccountComponent);
    }
  }

  getCommonDataForTest() {
    this.http.getData(API_ENDPOINTS.GetCommonDataForTest).subscribe(response => {
      if (response.results != null) {
        if (response.results.length > 0) {
          this.topics = response.results[0];
        }
        else {
          this.utils.showErrorMessage("Some error occured. Please try again.");
        }
      }
      else {
        this.utils.showErrorMessage("Some internal error occured. " + response.errorMessage);
      }
    }, error => {
      this.utils.showServerError(error);
    });
  }

  createTest() {
    this.newTest.userId = this.userId;
    this.http.postData(API_ENDPOINTS.CreateTest, this.newTest).subscribe(response => {
      if (response.results != null) {
        if (response.results[0] != null) {
          this.addedTest = response.results[0];
          let id = this.addedTest.testGuid;
          this.router.navigate(['/update-test', id]);
        }
        else {
          this.utils.showErrorMessage("Some error occured. Please try again.");
        }
      }
      else {
        this.utils.showErrorMessage("Some internal error occured. " + response.errorMessage);
      }
    }, error => {
      this.utils.showServerError(error);
    });
  }

}
