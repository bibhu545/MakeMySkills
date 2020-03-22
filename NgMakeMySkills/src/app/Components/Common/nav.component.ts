import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/Services/modal.service';
import { AccountComponent } from '../Account/account.component';
import { AccountService } from 'src/app/Services/account.service';
import { CookieService } from 'src/app/Services/cookie.service';
import { Router } from '@angular/router';
import { USER_TYPES } from 'src/app/Utils/Utils';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLoggedIn: boolean = false;
  isExaminer: boolean = false;

  constructor(
    private modalService: ModalService,
    private accountService: AccountService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.accountService.loggedIn$.subscribe(data => {
      this.isLoggedIn = data;
    });

    this.accountService.userType$.subscribe(data => {
      console.log(data);
      console.log(data == USER_TYPES.examiner);
      this.isExaminer = data == USER_TYPES.examiner;
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.cookieService.isLoggedIn();
  }

  logout() {
    this.cookieService.removeLoginDataFromCookies();
    this.accountService.setLoggedIn(false);
    this.router.navigateByUrl('/');
  }

  openAccountModal(e) {
    this.modalService.showModal(AccountComponent);
  }

}
