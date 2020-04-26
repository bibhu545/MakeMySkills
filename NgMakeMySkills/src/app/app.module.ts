import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/Home/home.component';
import { LoginComponent } from './Components/Account/login.component';
import { SignupComponent } from './Components/Account/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavComponent } from './Components/Common/nav.component';
import { AccountComponent } from './Components/Account/account.component';
import { NotFoundComponent } from './Components/Common/not-found.component';
import { CreateTestComponent } from './Components/Test/create-test.component';
import { UpdateTestComponent } from './Components/Test/update-test.component';
import { PublishTestComponent } from './Components/Test/publish-test.component';
import { CandidateHomeComponent } from './Components/Users/Candidate/candidate-home.component';
import { UserHomeComponent } from './Components/Users/user-home.component';
import { FooterComponent } from './Components/Common/footer.component';
import { CustomDatePipe } from './Pipes/custom-date.pipe';
import { NgsRevealModule } from 'ngx-scrollreveal';
import { OnlineTestComponent } from './Components/OnlineTest/online-test.component';
import { ConfirmationDialogComponent } from './Components/Common/confirmation-dialog/confirmation-dialog.component';
import { CookieService } from './Services/cookie.service';
import { CookieService as BaseCookieService } from 'ngx-cookie-service';
import { ExaminerHomeComponent } from './Components/Users/Examiner/examiner-home.component';
import { AdminDashboardComponent } from './Components/Admin/DashBoard/admin-dashboard.component';
import { MatTabsModule, MatProgressSpinnerModule } from '@angular/material';
import { TestDetailsComponent } from './Components/Partial/test-details.component';

import { CreateBatchComponent } from './Components/Batch/create-batch.component';
import { ChangePasswordComponent } from './Components/Account/change-password.component';
import { HttpService } from './Services/http.service';
import { UserDetailsComponent } from './Components/Users/user-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    NavComponent,
    AccountComponent,
    NotFoundComponent,
    CreateTestComponent,
    UpdateTestComponent,
    PublishTestComponent,
    CandidateHomeComponent,
    UserHomeComponent,
    FooterComponent,
    CustomDatePipe,
    OnlineTestComponent,
    ConfirmationDialogComponent,
    AdminDashboardComponent,
    ExaminerHomeComponent,
    TestDetailsComponent,
    CreateBatchComponent,
    ChangePasswordComponent,
    UserDetailsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgsRevealModule,
    MatTabsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    CookieService,
    BaseCookieService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpService, multi: true }
  ],
  bootstrap: [AppComponent],
 
  entryComponents: [AccountComponent, CreateBatchComponent, ChangePasswordComponent, CreateBatchComponent]

})
export class AppModule { }
