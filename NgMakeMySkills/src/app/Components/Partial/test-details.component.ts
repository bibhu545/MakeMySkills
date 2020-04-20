import { Component, OnInit, Input } from '@angular/core';
import { TestModel } from 'src/app/Utils/Models';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {

  @Input() test: TestModel;

  constructor() { }

  ngOnInit() {
  }

}
