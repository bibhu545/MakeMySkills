import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { ModalService } from 'src/app/Services/modal.service';
import { LoginRequestModel } from 'src/app/Utils/Models';
import { HttpService } from 'src/app/Services/http.service';
import { API_ENDPOINTS } from 'src/app/Utils/Utils';

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
    private http: HttpService
  ) { }

  ngOnInit() {

  }

  login() {
    this.http.postData(API_ENDPOINTS.login, this.loginData).subscribe(response => {
      console.log(response);
      //set data at cookie and redirect to home according to user Type
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
