import { Injectable } from '@angular/core';
import { Subject, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private loginMode: Subject<boolean> = new Subject<boolean>();
  loginMode$ = this.loginMode.asObservable();

  setLoginMode(value: boolean) {
    this.loginMode.next(value);
  }

  constructor() { }

}
