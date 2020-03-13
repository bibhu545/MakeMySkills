import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/Home/home.component';
import { LoginComponent } from './Components/Account/login.component';
import { SignupComponent } from './Components/Account/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './Components/Common/nav.component';
import { AccountComponent } from './Components/Account/account.component';
import { NotFoundComponent } from './Components/Common/not-found.component';
import { CreateTestComponent } from './Components/Test/create-test.component';
import { UpdateTestComponent } from './Components/Test/update-test.component';
import { PublishTestComponent } from './Components/Test/publish-test.component';
import { CandidateHomeComponent } from './Components/Users/Candidate/candidate-home.component';
import { TeacherHomeComponent } from './Components/Users/Teacher/teacher-home.component';
import { UserHomeComponent } from './Components/Users/user-home.component';
import { FooterComponent } from './Components/Common/footer.component';
import { CustomDatePipe } from './Pipes/custom-date.pipe';
import {NgsRevealModule} from 'ngx-scrollreveal';
import { OnlineTestComponent } from './Components/OnlineTest/online-test.component';


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
    TeacherHomeComponent,
    UserHomeComponent,
    FooterComponent,
    CustomDatePipe,
    OnlineTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgsRevealModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AccountComponent]
})
export class AppModule { }
