import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-online-test',
  templateUrl: './online-test.component.html',
  styleUrls: ['./online-test.component.css']
})
export class OnlineTestComponent implements OnInit {

  constructor(private commonService: CommonService, private route: Router) { }

  ngOnInit() {
    this.commonService.setRoutePath(this.route.url);
  }

}
