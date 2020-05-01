import { Component, OnInit, Input } from '@angular/core';
import { ProfileDetails, UserModel } from 'src/app/Utils/Models';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() profileDetails: UserModel;
  editMode: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  changeMode() {
    this.editMode = !this.editMode;
  }

}
