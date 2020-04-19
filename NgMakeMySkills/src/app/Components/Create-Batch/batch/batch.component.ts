import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { ModalService } from 'src/app/Services/modal.service';
import { LoginRequestModel } from 'src/app/Utils/Models';
import { HttpService } from 'src/app/Services/http.service';
import { API_ENDPOINTS, USER_TYPES } from 'src/app/Utils/Utils';
import { CookieService } from 'src/app/Services/cookie.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {

  createBatchFormGroup: any;
  constructor(
    private modalService: ModalService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private http: HttpService,
    private router: Router,
    private cookieService: CookieService
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
