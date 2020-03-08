import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/Services/modal.service';
import { AccountComponent } from '../Account/account.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  openAccountModal(e) {
    this.modalService.showModal(AccountComponent);
  }

}
