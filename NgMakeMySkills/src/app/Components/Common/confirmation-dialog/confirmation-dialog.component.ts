import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/Services/modal.service';

const RETURNMESSAGE = {
  'decline' : 1,
  'accept' : 2,
  'dismiss' : 3
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() title: string;
  @Input() ownMessage: boolean;
  @Input() message: any;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  @Output() messageToReturn = new EventEmitter<number>();

  returnMessage: number;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
    console.log("object")
    console.log(this.title)
    console.log(this.ownMessage)
    console.log(this.message)
  }

  // closeModal() {
  //   this.modalService.closeModal();
  // }

  public decline() {
    //this.activeModal.close(false);
    this.returnMessage = RETURNMESSAGE.decline;
    this.messageToReturn.emit(this.returnMessage);
    this.modalService.closeModal();
  }

  public accept() {
    //this.activeModal.close(true);
    this.returnMessage = RETURNMESSAGE.accept;
    this.messageToReturn.emit(this.returnMessage);
    this.modalService.closeModal();

  }

  public dismiss() {
    this.returnMessage = RETURNMESSAGE.dismiss;
    this.messageToReturn.emit(this.returnMessage);
    this.modalService.closeModal();
  }
}
