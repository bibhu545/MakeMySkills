import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/Services/modal.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }
 
  closeAccountModal() {
    this.modalService.closeModal();
  }

}
