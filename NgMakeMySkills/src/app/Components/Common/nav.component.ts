import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/Services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  openAccountModal(template: TemplateRef<any>) {
    this.modalService.showModal(template);
  }

}
