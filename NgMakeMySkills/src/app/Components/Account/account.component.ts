import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/Services/modal.service';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  loginMode: boolean = true;

  constructor(
    private modalService: ModalService,
    private accountService: AccountService
  ) {
    this.accountService.loginMode$.subscribe(data => {
      this.loginMode = data;
    })
  }

  ngOnInit() {
  }
  
}
