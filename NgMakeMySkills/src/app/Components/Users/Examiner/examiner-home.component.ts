import { Component, OnInit } from '@angular/core';
import { BatchComponent } from '../../Create-Batch/batch/batch.component';
import { ModalService } from 'src/app/Services/modal.service';

@Component({
  selector: 'app-examiner-home',
  templateUrl: './examiner-home.component.html',
  styleUrls: ['./examiner-home.component.css']
})
export class ExaminerHomeComponent implements OnInit {
  showBatchPopup = false;
  constructor( private modalService: ModalService) { }
  openBatchModal(e) {
    this.modalService.showModal(BatchComponent);
  }
  ngOnInit() {
  }

}
