import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  subjects: string[] = [];

  constructor() { }

  ngOnInit() {
    this.populateSubjects();
  }

  populateSubjects(){
    for (let index = 0; index < 20; index++) {
      this.subjects.push("Subject " + index);
    }
  }

}
