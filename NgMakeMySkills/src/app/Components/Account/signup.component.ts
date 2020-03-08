import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { ModalService } from 'src/app/Services/modal.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private modalService: ModalService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }

  login() {
    this.accountService.setLoginMode(true);
  }

  closeModal() {
    this.modalService.closeModal();
  }

}
