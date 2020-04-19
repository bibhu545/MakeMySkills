import { Component, OnInit } from '@angular/core';
import { ChangePasswordModel } from 'src/app/Utils/Models';
import { ModalService } from 'src/app/Services/modal.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordModel: ChangePasswordModel = new ChangePasswordModel();

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalService.closeModal();
  }

}
