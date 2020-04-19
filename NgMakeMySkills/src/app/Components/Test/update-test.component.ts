import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/Services/modal.service';
import { AnswerModel, TestModel, QuestionModel, TopicModel } from 'src/app/Utils/Models';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'src/app/Services/cookie.service';
import { USER_TYPES, API_ENDPOINTS, Utils } from 'src/app/Utils/Utils';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styleUrls: ['./update-test.component.css']
})
export class UpdateTestComponent implements OnInit {

  newQuestion: QuestionModel = new QuestionModel();
  testDetails: TestModel = new TestModel();
  utils: Utils = new Utils();
  topics: TopicModel[] = [];
  testTopic: TopicModel = new TopicModel();
  isValidSubtopic: boolean = false;
  reservedQuestions: QuestionModel[] = [];
  testQuestions: QuestionModel[] = [];
  filterTopic: number = 0;
  editMode: boolean = false;

  constructor(
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private http: HttpService
  ) { }

  ngOnInit() {
    var userType = this.cookieService.getUserType();
    var testGuid = this.route.snapshot.params.testGuid;
    if (userType == USER_TYPES.admin || userType == USER_TYPES.examiner || testGuid == undefined || testGuid == null) {
      this.getTestBasicDetails(testGuid);
      this.populateInitialOptions();
    }
    else {
      this.router.navigateByUrl('/error-page');
    }
  }

  getQuestionsForTest() {
    this.http.getData(API_ENDPOINTS.GetQuestionsForTest + '?id=' + this.testDetails.testId).subscribe(response => {
      if (response.results != null) {
        if (response.results[0] != null) {
          this.testQuestions = response.results[0];
          this.reservedQuestions = this.testQuestions;
        }
        else {
          this.utils.showErrorMessage("Oops...Some error occured. Please refresh the page.");
        }
      }
      else {
        this.utils.showErrorMessage("Some internal error occured. " + response.errorMessage);
      }
    }, error => {
      this.utils.showServerError(error);
    });
  }

  filterByTopic() {
    if (this.filterTopic == 0) {
      this.testQuestions = this.reservedQuestions;
    }
    else {
      this.testQuestions = this.reservedQuestions.filter(x => x.topicId == this.filterTopic);
    }
  }

  getTestBasicDetails(testGuid: String) {
    this.http.getData(API_ENDPOINTS.GetTestBasicDetails + "?id=" + testGuid).subscribe(response => {
      if (response.results != null) {
        if (response.results[0] != null) {
          this.testDetails = response.results[0];
          this.getCommonDataForTest();
          this.getQuestionsForTest();
        }
        else {
          this.router.navigateByUrl('/error-page');
          this.utils.showErrorMessage("You are trying to edit a test which does not exists.");
        }
      }
      else {
        this.utils.showErrorMessage("Some internal error occured. " + response.errorMessage);
      }
    }, error => {
      this.utils.showServerError(error);
    });
  }

  getCommonDataForTest() {
    this.http.getData(API_ENDPOINTS.GetCommonDataForTest).subscribe(response => {
      if (response.results != null) {
        if (response.results.length > 0) {
          this.topics = response.results[0];
          this.testTopic = this.topics.filter(x => x.topicId == this.testDetails.topicId)[0];
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

  populateInitialOptions() {

    var blankOption = new AnswerModel();
    blankOption.optionId = this.newQuestion.options.length + 1;
    blankOption.optionLabel = 'Option ' + blankOption.optionId + ':';
    this.newQuestion.options.push(blankOption);

    var blankOption = new AnswerModel();
    blankOption.optionId = this.newQuestion.options.length + 1;
    blankOption.optionLabel = 'Option ' + blankOption.optionId + ':';
    this.newQuestion.options.push(blankOption);

  }

  addOptions() {
    var newOption = new AnswerModel();
    newOption.optionId = this.newQuestion.options.length + 1;
    newOption.optionLabel = 'Option ' + newOption.optionId + ':';
    this.newQuestion.options.push(newOption);
  }

  deleteOption(id: number) {
    this.newQuestion.options.splice(id, 1);
    this.newQuestion.options.forEach((element, index) => {
      element.optionId = index + 1;
      element.optionLabel = 'Option ' + element.optionId + ':';
    });
  }

  validateSubtopic() {
    if (this.newQuestion.topicId <= 0) {
      this.isValidSubtopic = false;
    }
    else {
      this.isValidSubtopic = true;
    }
  }

  addQuestion() {
    this.newQuestion.testId = this.testDetails.testId;
    this.newQuestion.userId = this.testDetails.userId;
    if (this.testTopic.subTopics.length == 0) {
      this.newQuestion.topicId == this.testDetails.topicId;
    }
    else {
      this.http.postData(API_ENDPOINTS.AddQuestions, this.newQuestion).subscribe(response => {
        if (response.results != null) {
          if (response.results[0] != null) {
            this.closeQuestionModal();
            this.utils.showSuccessMessage("New question added.");
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

  setEditMode(template: TemplateRef<any>, item: QuestionModel) {
    this.editMode = true;
    this.newQuestion = item;
    this.isValidSubtopic = true;
    this.openQuestionModal(template);
  }

  editQuestion() {
    this.http.postData(API_ENDPOINTS.EditQuestions, this.newQuestion).subscribe(response => {
      if (response.results != null) {
        if (response.results[0] != null) {
          this.closeQuestionModal();
          this.utils.showSuccessMessage("Question updated.");
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

  deleteQuestion(item: QuestionModel) {
    this.utils.showConfirm("You won't be able to revert this!", "Yes, delete it!").then((result) => {
      if (result.value) {
        this.http.postData(API_ENDPOINTS.DeleteQuestions, item).subscribe(response => {
          if (response.results != null) {
            if (response.results[0] != null) {
              this.getQuestionsForTest();
              this.utils.showSuccessMessage("Question deleted.");
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
    });
  }

  openQuestionModal(template: TemplateRef<any>) {
    if (!this.editMode) {
      this.newQuestion = new QuestionModel();
      this.populateInitialOptions();
    }
    this.modalService.showModal(template, { class: 'modal-lg' });
  }

  closeQuestionModal() {
    this.editMode = false;
    this.getQuestionsForTest();
    this.modalService.closeModal();
  }

}
