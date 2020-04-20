import { Component, OnInit } from '@angular/core';
import { TestModel, TopicModel } from 'src/app/Utils/Models';
import { Utils, API_ENDPOINTS, USER_TYPES } from 'src/app/Utils/Utils';
import { HttpService } from 'src/app/Services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'src/app/Services/cookie.service';

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
    private route: ActivatedRoute,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    var userType = this.cookieService.getUserType();
    if (userType == USER_TYPES.admin || userType == USER_TYPES.examiner) {
      this.userId = this.cookieService.getUserdataFromCookies().userId;
      this.getCommonDataForTest();
      var testGuid = this.route.snapshot.params.testGuid;
      if (testGuid != undefined) {
        this.getTestBasicDetails(testGuid);
      }
    }
    else {
      this.router.navigateByUrl('/error-page');
    }
  }

  getTestBasicDetails(testGuid: String) {
    this.http.getData(API_ENDPOINTS.GetTestBasicDetails + "?id=" + testGuid).subscribe(response => {
      if (response.results != null) {
        if (response.results[0] != null) {
          this.newTest = response.results[0];
          this.getCommonDataForTest();
        }
        else {
          this.router.navigateByUrl('/error-page');
          this.utils.showErrorMessage("You are trying to edit a test which does not exists.");
        }
      }
      else {
        this.utils.showErrorMessage("Some internal error occured. " + response.errorMessage);
      }
    }, error => {
      this.utils.showServerError(error);
    });
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
    this.http.postData(API_ENDPOINTS.UpdateTestDetails, this.newTest).subscribe(response => {
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
