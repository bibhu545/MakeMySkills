import { Injectable } from '@angular/core';
import { CookieService as BaseCookieService } from 'ngx-cookie-service';
import { LoginResponseModel, UserModel } from '../Utils/Models';
import { AccountService } from './account.service';


@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(
    private cookieService: BaseCookieService,
    private accountService: AccountService
  ) { }

  isLoggedIn(): boolean {
    var dataFromCookie = this.cookieService.get('loggedUser').trim();
    if (dataFromCookie.length == 0) {
      return false;
    }
    return true;
  }

  saveLoginDataInCookies(loginData: LoginResponseModel, saveLogin: boolean = false) {
    var dataToSave: string = "";
    dataToSave = loginData.userId + "|" + loginData.email + "|" + loginData.firstName + "|" + loginData.lastName + "|" + loginData.joinedOn + "|" + loginData.userType;
    if (saveLogin) {
      var expiredDate = new Date();
      expiredDate.setDate(expiredDate.getDate() + 7);
      this.cookieService.set("loggedUser", dataToSave, expiredDate, '/');
    } else {
      var expiredDate = new Date();
      expiredDate.setDate(expiredDate.getDate() + 1);
      this.cookieService.set("loggedUser", dataToSave, expiredDate, '/');
    }
  }

  removeLoginDataFromCookies() {
    this.cookieService.delete("loggedUser");
  }

  getUserdataFromCookies(): UserModel {
    var dataFromCookie = this.cookieService.get('loggedUser').trim();
    if (dataFromCookie.length != 0) {
      var userArray = dataFromCookie.split("|");
      var userData: UserModel = new UserModel();
      userData.userId = parseInt(userArray[0]);
      userData.email = userArray[1];
      userData.firstName = userArray[2];
      userData.lastName = userArray[3];
      userData.joinedOn = userArray[4];
      userData.userType = parseInt(userArray[5]);
      return userData;
    }
    return null;
  }

  getUserType() {
    return this.getUserdataFromCookies() == null ? null : this.getUserdataFromCookies().userType;
  }

}
