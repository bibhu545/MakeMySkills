import { Injectable, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  constructor(private modalService: BsModalService) { }

  showModal(template: any, options = {}) {
    var updatedConfig = {
      ...this.config,
      ...options
    }
    this.modalRef = this.modalService.show(template, updatedConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }
}
