import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/Services/modal.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpService } from 'src/app/Services/http.service';
import { BatchModel } from "../../Utils/Models";
import { API_ENDPOINTS, Utils } from 'src/app/Utils/Utils';
import { CookieService } from '../../Services/cookie.service';

@Component({
  selector: 'app-create-batch',
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.css']
})

export class CreateBatchComponent implements OnInit {

  createBatchFormGroup: any;
  constructor(
    private http: HttpService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.createBatchFormGroup = this.formBuilder.group({
      batchCode: new FormControl('', [Validators.required]),
      batchDetails: new FormControl('', [Validators.required]),
      regnoRequired: new FormControl(false),
      approvalRequired: new FormControl(false),
      memberApproval: new FormControl(false)
    });
  }

  getFormControl(name) {
    return this.createBatchFormGroup.get(name);
  }

  createNewBatch(batchData: BatchModel) {
    batchData.userId = this.cookieService.getUserdataFromCookies().userId;
    this.http.postData(API_ENDPOINTS.AddBatch, batchData).subscribe(data => {
      if (data.results != null) {
        if (data.results[0]) {
          this.closeModal();
          new Utils().showSuccessMessage("New batch addedd.");
        }
        else {
          new Utils().showErrorMessage("Some error occured. Please try again.");
        }
      }
    }, error => {
      new Utils().showErrorMessage("Some error occured. Please try again.");
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }

}
