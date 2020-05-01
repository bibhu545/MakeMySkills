import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/Services/modal.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-batch',
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.css']
})

export class CreateBatchComponent implements OnInit {

  createBatchFormGroup: any;
  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createBatchFormGroup = this.formBuilder.group({
      userType: new FormControl(1, [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  getFormControl(name) {
    return this.createBatchFormGroup.get(name);
  }

  closeModal() {
    this.modalService.closeModal();
  }

}
