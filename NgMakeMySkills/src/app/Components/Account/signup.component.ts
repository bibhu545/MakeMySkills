import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { ModalService } from 'src/app/Services/modal.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupModel } from 'src/app/Utils/Models';
import { HttpService } from 'src/app/Services/http.service';
import { API_ENDPOINTS } from 'src/app/Utils/Utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupFormGroup: any;

  constructor(
    private modalService: ModalService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.prepareSignupForm();
  }

  prepareSignupForm() {
    this.signupFormGroup = this.formBuilder.group({
      userType: new FormControl(1, [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  getFormControl(name) {
    return this.signupFormGroup.get(name);
  }

  submitSignup(signupData: SignupModel) {
    if (this.signupFormGroup.valid) {
      this.signupFormGroup.reset();
      this.http.postData(API_ENDPOINTS.signup, signupData).subscribe(response => {
        console.log(response);
        if (response.results != null) {
          if (response.results[0] != null) {
            console.log(response.results[0]);
            this.router.navigate(['/user-home']);
          }
        }
      }, error => {
        console.log(error);
      });
    }
  }

  login() {
    this.accountService.setLoginMode(true);
  }

  closeModal() {
    this.modalService.closeModal();
  }

}
