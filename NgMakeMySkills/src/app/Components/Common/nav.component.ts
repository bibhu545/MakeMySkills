import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/Services/modal.service';
import { AccountComponent } from '../Account/account.component';
import { AccountService } from 'src/app/Services/account.service';
import { CookieService } from 'src/app/Services/cookie.service';
import { Router } from '@angular/router';
import { USER_TYPES, API_ENDPOINTS, Utils } from 'src/app/Utils/Utils';
import { HttpService } from 'src/app/Services/http.service';
import { TopicModel } from 'src/app/Utils/Models';
import { ChangePasswordComponent } from '../Account/change-password.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLoggedIn: boolean = false;
  isExaminer: boolean = false;
  utils: Utils = new Utils;
  topics: TopicModel[] = [];

  constructor(
    private modalService: ModalService,
    private accountService: AccountService,
    private cookieService: CookieService,
    private router: Router,
    private http: HttpService
  ) {
    this.accountService.loggedIn$.subscribe(data => {
      this.isLoggedIn = data;
    });

    this.accountService.userType$.subscribe(data => {
      this.isExaminer = data == USER_TYPES.examiner;
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.cookieService.isLoggedIn();
    this.http.getData(API_ENDPOINTS.GelHomePageCommonData).subscribe(response => {
      if (response.results != null) {
        if (response.results.length > 0) {
          this.topics = response.results[0];
          console.log('%c Topics', 'color:orange;font-weight:bold');
          console.table(this.topics);
          this.topics = this.topics.splice(0, 8);
          if (this.cookieService.getUserType() != null) {
            this.isExaminer = this.cookieService.getUserType() == USER_TYPES.examiner;
          }
        }
        else {
          this.utils.showErrorMessage("Some error occured. Please try again.");
        }
      }
      else {
        this.utils.showErrorMessage("Some internal error occured. " + response.errorMessage);
      }
    }, error => {
      this.utils.showErrorMessage("Some internal error occured. " + error.message);
    })
  }

  logout() {
    this.cookieService.removeLoginDataFromCookies();
    this.accountService.setLoggedIn(false);
    this.router.navigateByUrl('/');
  }

  openAccountModal(e) {
    this.modalService.showModal(AccountComponent);
  }

  openChangePasswordModal(e) {
    e.preventDefault();
    this.modalService.showModal(ChangePasswordComponent);
  }

}
