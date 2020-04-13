import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/Services/modal.service';
import { OptionModel, TestModel } from 'src/app/Utils/Models';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'src/app/Services/cookie.service';
import { USER_TYPES, API_ENDPOINTS, Utils } from 'src/app/Utils/Utils';
import { AccountService } from 'src/app/Services/account.service';
import { AccountComponent } from '../Account/account.component';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styleUrls: ['./update-test.component.css']
})
export class UpdateTestComponent implements OnInit {

  options: OptionModel[] = [];
  testDetails: TestModel = new TestModel();
  utils: Utils = new Utils();

  constructor(
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private accountService: AccountService,
    private http: HttpService
  ) { }

  ngOnInit() {
    if (this.cookieService.isLoggedIn()) {
      var userType = this.cookieService.getUserType();
      var testGuid = this.route.snapshot.params.testGuid;
      if (userType == USER_TYPES.admin || userType == USER_TYPES.examiner || testGuid == undefined || testGuid == null) {
        this.getTestBasicDetails(testGuid);
        this.populateInitialOptions();
      }
      else {
        this.router.navigateByUrl('/error-page');
      }
    }
    else {
      this.router.navigateByUrl('/');
      this.accountService.setLoginMode(true);
      this.modalService.showModal(AccountComponent);
    }
  }

  getTestBasicDetails(testGuid: String) {
    this.http.getData(API_ENDPOINTS.GetTestBasicDetails + "?id=" + testGuid).subscribe(response => {
      if (response.results != null) {
        if (response.results[0] != null) {
          this.testDetails = response.results[0];
          console.log(this.testDetails);
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

  populateInitialOptions() {

    var blankOption = new OptionModel();
    blankOption.id = this.options.length + 1;
    blankOption.optionLabel = 'Option ' + blankOption.id + ':';
    this.options.push(blankOption);

    var blankOption = new OptionModel();
    blankOption.id = this.options.length + 1;
    blankOption.optionLabel = 'Option ' + blankOption.id + ':';
    this.options.push(blankOption);

  }

  addOptions() {
    var newOption = new OptionModel();
    newOption.id = this.options.length + 1;
    newOption.optionLabel = 'Option ' + newOption.id + ':';
    this.options.push(newOption);
  }

  deleteOption(id: number) {
    this.options.splice(id, 1);
    this.options.forEach((element, index) => {
      element.id = index + 1;
      element.optionLabel = 'Option ' + element.id + ':';
    });
  }

  openQuestionModal(template: TemplateRef<any>) {
    this.modalService.showModal(template, { class: 'modal-lg' });
  }

  closeQuestionModal() {
    this.modalService.closeModal();
  }

}
