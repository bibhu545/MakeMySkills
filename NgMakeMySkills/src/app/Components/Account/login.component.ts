import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { ModalService } from 'src/app/Services/modal.service';
import { LoginRequestModel } from 'src/app/Utils/Models';
import { HttpService } from 'src/app/Services/http.service';
import { API_ENDPOINTS, USER_TYPES } from 'src/app/Utils/Utils';
import { CookieService } from 'src/app/Services/cookie.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: LoginRequestModel = new LoginRequestModel();

  constructor(
    private modalService: ModalService,
    private accountService: AccountService,
    private http: HttpService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {

  }

  login() {
    this.http.postData(API_ENDPOINTS.login, this.loginData).subscribe(response => {
      if (response.results != null) {
        if (response.results[0] != null) {
          this.cookieService.saveLoginDataInCookies(response.results[0], this.loginData.saveLogin);
          this.accountService.setLoggedIn(true);
          this.accountService.setUserType(this.cookieService.getUserType());
          this.closeModal();
          if (this.cookieService.getUserType() == USER_TYPES.admin) {
            this.router.navigateByUrl('/admin');
          }
          else {
            this.router.navigateByUrl('/user-home');
          }
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Username or password didn\'t match',
            footer: '<a href="/forgot-password">Need help in password?</a>'
          })
        }
      }
    }, error => {
      console.log(error);
    });
  }

  register() {
    this.accountService.setLoginMode(false);
  }

  closeModal() {
    this.modalService.closeModal();
  }

}
