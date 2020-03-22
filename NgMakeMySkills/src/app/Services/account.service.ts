import { Injectable } from '@angular/core';
import { Subject, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private loginMode: Subject<boolean> = new Subject<boolean>();
  loginMode$ = this.loginMode.asObservable();

  private loggedIn: Subject<boolean> = new Subject<boolean>();
  loggedIn$ = this.loggedIn.asObservable();

  private userType: Subject<number> = new Subject<number>();
  userType$ = this.userType.asObservable();

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  setUserType(value: number) {
    this.userType.next(value);
  }

  setLoginMode(value: boolean) {
    this.loginMode.next(value);
  }

  constructor() { }

}
