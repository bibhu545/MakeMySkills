import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/Services/cookie.service';
import { UserModel } from 'src/app/Utils/Models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  userData: UserModel;
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userData = this.cookieService.getUserdataFromCookies();
    if (this.userData == null) {
      this.router.navigateByUrl('/');
    }
  }

}
