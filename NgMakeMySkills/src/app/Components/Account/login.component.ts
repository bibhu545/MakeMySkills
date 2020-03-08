import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { ModalService } from 'src/app/Services/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginMode: boolean = true;
  constructor(
    private modalService: ModalService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }

  register() {
    this.accountService.setLoginMode(false);
  }

  closeModal() {
    this.modalService.closeModal();
  }

}
