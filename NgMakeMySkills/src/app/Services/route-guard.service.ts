import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs'
import { CookieService } from './cookie.service';
import { ModalService } from './modal.service';
import { AccountComponent } from '../Components/Account/account.component';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService, private modalService: ModalService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!this.cookieService.isLoggedIn()){
      this.modalService.showModal(AccountComponent);
      this.router.navigateByUrl("/");
    }
    else{
      return true;
    }
  }

}
