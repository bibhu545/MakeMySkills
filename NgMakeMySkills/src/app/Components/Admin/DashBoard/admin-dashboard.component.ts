import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { ModalService } from 'src/app/Services/modal.service';
import { TopicModel } from 'src/app/Utils/Models';
import { API_ENDPOINTS, Utils, USER_TYPES } from 'src/app/Utils/Utils';
import { CookieService } from 'src/app/Services/cookie.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';
import { AccountComponent } from '../../Account/account.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  utils: Utils = new Utils();
  todaysDate: Date = new Date();
  subjectKeyword: string;
  topics: TopicModel[] = [];
  tempTopics: TopicModel[] = [];
  topicData: TopicModel = new TopicModel();
  tempTopicData: TopicModel = new TopicModel();
  subjectEdit: boolean = false;
  editError: boolean = false;

  constructor(
    private http: HttpService,
    private modalService: ModalService,
    private cookieService: CookieService,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    if (this.cookieService.getUserType() == USER_TYPES.admin) {
      this.getCommonData();
    }
    else {
      this.router.navigateByUrl("/error-page");
    }
  }

  getCommonData() {
    this.http.getData(API_ENDPOINTS.getCommondataForAdmin).subscribe(response => {
      if (response.results != null) {
        if (response.results.length > 0) {
          this.topics = response.results[0];
          this.tempTopics = this.topics;
          var currentTopic = this.tempTopics.filter(x => x.topicId == this.topicData.topicId);
          if (currentTopic.length > 0) {
            this.topicData = currentTopic[0];
          }
          else {
            this.topicData = new TopicModel();
          }
        }
      }
      else {
        this.utils.showErrorMessage("Some error occured. Please reload the page.");
      }
    }, error => {
      this.utils.showServerError(error);
    });
  }

  editTopic(template: TemplateRef<any>, item: TopicModel) {
    this.topicData = new TopicModel();
    this.topicData.topicName = item.topicName;
    this.topicData.topicId = item.topicId;
    this.topicData.isActive = item.isActive;
    this.topicData.subTopics = item.subTopics;
    this.subjectEdit = true;
    this.topicData.subTopics.forEach(element => {
      element.editMode = false;
    });
    this.tempTopicData = JSON.parse(JSON.stringify(this.topicData))
    this.openSubjectModal(template);
  }

  addSubtopic() {
    var subTopicData = new TopicModel();
    this.topicData.subTopics.push(subTopicData);
  }

  addSubject() {
    this.http.postData(API_ENDPOINTS.addTopic, this.topicData).subscribe(response => {
      if (response.results != null) {
        if (response.results[0]) {
          this.getCommonData();
          this.closeModal();
        }
        else {
          this.utils.showErrorMessage("Some internal error occured. Please try again.");
        }
      }
      else {
        this.utils.showErrorMessage("Some internal error occured. " + response.errorMessage);
      }
    }, error => {
      this.utils.showServerError(error);
    });
  }

  filterSubjects() {
    this.topics = this.tempTopics.filter((item) => item.topicName.includes(this.subjectKeyword));
  }

  editSubTopic(item: TopicModel) {
    this.topicData.subTopics.filter(x => x.topicId == item.topicId)[0].editMode = true;
  }

  cancelEditSubTopic(item: TopicModel) {
    var data = this.topicData.subTopics.filter(x => x.topicId == item.topicId)[0];
    data.editMode = false;
    data.topicName = this.tempTopicData.subTopics.filter(x => x.topicId == item.topicId)[0].topicName;
  }

  updateTopic(item: TopicModel) {
    if (item.topicName == null || item.topicName.trim() == "") {
      this.editError = true;
      return;
    }
    else {
      this.editError = false;
      this.http.postData(API_ENDPOINTS.EditTopic, item).subscribe(response => {
        if (response.results != null) {
          if (response.results[0]) {
            this.topicData.subTopics.forEach(element => {
              element.editMode = false;
            });
            this.getCommonData();
            if (item.topicId == this.topicData.topicId) {
              this.closeModal();
            }
          }
          else {
            this.utils.showErrorMessage("Some error occured. Please try again.");
          }
        }
        else {
          this.utils.showErrorMessage("Some internal error occured. " + response.errorMessage);
        }
      }, error => {
        this.utils.showServerError(error);
      });
    }
  }

  deleteTopic(item: TopicModel) {
    this.utils.showConfirm("You won't be able to revert this!", "Yes, delete it!").then((result) => {
      if (result.value) {
        this.http.postData(API_ENDPOINTS.DeleteTopic, item).subscribe(response => {
          if (response.results != null) {
            if (response.results[0]) {
              this.getCommonData();
              if (item.topicId == this.topicData.topicId) {
                this.closeModal();
                this.utils.showSuccessMessage("Deleted!");
              }
            }
            else {
              this.utils.showErrorMessage("Some error occured. Please try again.");
            }
          }
          else {
            this.utils.showErrorMessage("Some internal error occured. " + response.errorMessage);
          }
        }, error => {
          this.utils.showServerError(error);
        });
      }
    })
  }

  openSubjectModal(template: TemplateRef<any>) {
    if (!this.subjectEdit) {
      this.topicData = new TopicModel();
    }
    this.editError = false;
    this.modalService.showModal(template);
  }

  closeModal() {
    this.modalService.closeModal();
    this.subjectEdit = false;
  }

}
