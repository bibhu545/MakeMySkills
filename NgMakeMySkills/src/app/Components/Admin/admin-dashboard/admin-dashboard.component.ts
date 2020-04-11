import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { ModalService } from 'src/app/Services/modal.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  subjects: string[] = [];
  
  constructor(private http: HttpService, private modalService: ModalService) { }

  ngOnInit() {
    this.populateSubjects();
  }

  populateSubjects(){
    for (let index = 0; index < 20; index++) {
      this.subjects.push("Subject " + index);
    }
  }

  openSubjectModal(template: TemplateRef<any>){
    this.modalService.showModal(template);
  }

  closeModal(){
    this.modalService.closeModal();
  }

}
