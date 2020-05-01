import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/Services/cookie.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/Services/modal.service';
import { AccountComponent } from '../Account/account.component';
import { USER_TYPES } from 'src/app/Utils/Utils';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  candidateMode: boolean = true;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    if (this.cookieService.isLoggedIn()) {
      if (this.cookieService.getUserType() == USER_TYPES.examiner) {
        this.candidateMode = false;
      }
      else if(this.cookieService.getUserType() == USER_TYPES.candidate){
        this.candidateMode = true;
      }
      else{
        this.router.navigateByUrl('/error-page');
      }
    }
    else {
      this.router.navigateByUrl('/');
      this.modalService.showModal(AccountComponent);
    }
  }

}
