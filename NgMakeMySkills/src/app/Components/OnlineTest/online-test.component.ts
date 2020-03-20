import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';
import { Router } from '@angular/router';
import { interval, timer } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { ModalService } from 'src/app/Services/modal.service';
import { ConfirmationDialogComponent } from '../Common/confirmation-dialog/confirmation-dialog.component';

const MARKER = {
  'answered': 1,
  'not-answered': 2,
  'marked': 3,
  'marked-and-answered': 4,
  'not-visited': 5
}

@Component({
  selector: 'app-online-test',
  templateUrl: './online-test.component.html',
  styleUrls: ['./online-test.component.css']
})
export class OnlineTestComponent implements OnInit {
  topicWiseQuestionsList = [
    {TopicNumber: 1, Name: 'Reasoning Ability', TotalQn: 11, Questions: [{Qnumber: 0, Text: '', Summary: '', NotAnswered: false, Answered: false, Marked: false, MarkedAndAnswered: false, SelectedOptionId: 0, Options: []},{},{},{},{},{},{},{},{},{},{}]},
    {TopicNumber: 2, Name: 'Quantitative Ability', TotalQn: 12, Questions: [{Qnumber: 0, Text: '', Summary: '', NotAnswered: false, Answered: false, Marked: false, MarkedAndAnswered: false, SelectedOptionId: 0, Options: []},{},{},{},{},{},{},{},{},{},{},{}]},
    {TopicNumber: 3, Name: 'Verbal Ability', TotalQn: 20, Questions: [{Qnumber: 0, Text: '', Summary: '', NotAnswered: false, Answered: false, Marked: false, MarkedAndAnswered: false, SelectedOptionId: 0, Options: []},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]}
  ];
  selectedQuestionNo = '';
  prevVisitedTopicNo = 0;
  prevVisitedQuestionNo = 0;
  currentQuestionNo = 0;
  currentTopicNo = 0;
  reachedEndText = false;
  seconds = 60;
  minutes = 59;
  hours = 0;
  title: string = "Confirm Submit Test";
  ownMessage: boolean = false;
  message: any = "Are You Sure You want to Submit Test.";
  btnOkText: string = "Confirm Submission.";
  btnCancelText: string = "Go back to test";

  constructor(
    private commonService: CommonService, 
    private route: Router,
    private modalService: ModalService
    ) {
  }

  ngOnInit() {
    this.commonService.setRoutePath(this.route.url);
    this.topicWiseQuestionsList.forEach(topic => {
      let count = 0;
      topic.Questions.forEach(question => {
        question.Qnumber = ++count;
        question.Text = 'T' + topic.TopicNumber + 'Q' + count + ' Data Sufficiency:<br>What is the age of Principal?<br>(I) There are 14 students in a class.<br>(II) The average age of students and principal is 16 years.<br>(III) The average ageof 14 students is 3 less than the average of 14 students and Principal.';
        question.Summary = "The ratio of ages of mother and son is 5:2 and mother's age is 16.";
        question.NotAnswered = false;
        question.Answered = false;
        question.Marked = false;
        question.MarkedAndAnswered = false;
        question.SelectedOptionId = 0;
        question.Options = [{OptionNo: 1, Text: ''}, {OptionNo: 2, Text: ''}, {OptionNo: 3, Text: ''}, {OptionNo: 4, Text: ''}];
        question.Options[0].Text = 'Both (II) and (III)';
        question.Options[1].Text = 'Both (I) and (III)';
        question.Options[2].Text = 'Both (I) and (II)';
        question.Options[3].Text = 'All (I), (II) and (III)';
      });
    });
    this.selectedQuestionNo = 'section1-qnshort1';
    this.prevVisitedTopicNo = 1;
    this.prevVisitedQuestionNo = 1;
    this.currentQuestionNo = 1;
    this.currentTopicNo = 1;
    //this.setTimerForOneHour();
  }

  setTimerForOneHour() {
    const numbers = timer(500, 1000);
    const upperLimitOfSeconds = 60;
    numbers.pipe(
      takeWhile(y => !(this.hours == 0 && this.minutes == 0 && this.seconds == 0))
    )
    .subscribe(x => {
      if(x !== 0 && x % 60 === 0){
        this.seconds = 0;
        this.minutes = this.minutes - 1;
      }
      else{
      this.seconds = upperLimitOfSeconds - (x % 60);
      }
    },
    error => {},
    () => alert("Times Up!!"));
  }

  getTimerInString(time) {
    if(time <= 9 && time >= 0){
      return '0'+ time;
    }
    else{
      return '' + time;
    }
  }

  getFromCharCode(index) {
    return String.fromCharCode('A'.charCodeAt(0) + index);
  }

  scrollAndActivateCurrentSection(currentTopicNo) {
    document.querySelector('#section' + currentTopicNo).scrollIntoView({
      behavior: 'smooth'
    });
    this.setSelectedQuestion(currentTopicNo, 1);
  }

  scrollAndActivateCurrentQuestion(topicNo, qNo) {
    document.querySelector('#section' + topicNo + '-qnshort' + qNo).scrollIntoView({
      behavior: 'smooth'
    });
    this.setSelectedQuestion(topicNo, qNo);
  }

  setNextQuestion() {
    if(this.currentQuestionNo === this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions.length){
      if(this.currentTopicNo === this.topicWiseQuestionsList.length) {
        // finish test
        this.setSelectedQuestion(this.currentTopicNo ,this.currentQuestionNo);
        this.reachedEndText = true;
      }
      else {
        this.scrollAndActivateCurrentSection(this.currentTopicNo + 1);
      }
    }
    else {
      this.scrollAndActivateCurrentQuestion(this.currentTopicNo, this.currentQuestionNo + 1);
    }
  }

  setSelectedQuestion(topicNo, qNo) {
    if (this.prevVisitedTopicNo !== 0 && this.prevVisitedQuestionNo !== 0 && (this.prevVisitedTopicNo + this.prevVisitedQuestionNo !== topicNo + qNo)) {
      let marker = this.getMarkerForQNo(this.prevVisitedTopicNo,this.prevVisitedQuestionNo);
      if(marker === 1){
        this.enableOnlyMarker(MARKER.answered);
      }
      else if(marker === 2){
        this.enableOnlyMarker(MARKER["not-answered"]);
      }
      else if(marker === 3){
        this.enableOnlyMarker(MARKER.marked);
      }
      else if(marker === 4){
        this.enableOnlyMarker(MARKER["marked-and-answered"]);
      }
    }
    this.reachedEndText = false;
    this.selectedQuestionNo = 'section' + topicNo + '-qnshort' + qNo;
    this.prevVisitedTopicNo = topicNo;
    this.prevVisitedQuestionNo = qNo;
    this.currentQuestionNo = qNo;
    this.currentTopicNo = topicNo;
  }

  setSelectedOption(optionNo) {
    this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].SelectedOptionId = optionNo;
  }

  toggleSelectedOption(optionNo) {
    if(this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].SelectedOptionId === 0){
      this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].SelectedOptionId = optionNo;
    }
    else{
      this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].SelectedOptionId = 0;
    }
  }

  setMarkForReviewMarker() {
    if(this.getMarkerForQNo(this.currentTopicNo, this.currentQuestionNo) == 1) {
      this.enableOnlyMarker(MARKER["marked-and-answered"]);
    }
    else {
      this.enableOnlyMarker(MARKER.marked);
    }
  }

  confirmSubmittingTest(template: TemplateRef<any>) {
    console.log(template)
    this.modalService.showModal(template);
  }

  alertReturnValue($event) {
    alert($event);
  }

  enableOnlyMarker(marker) {
    if (marker === 1) {
      this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].Answered = true;
      this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].NotAnswered = false;
      this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].Marked = false;
      this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].MarkedAndAnswered = false;
    }
    else if (marker === 2) {
      this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].Answered = false;
      this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].NotAnswered = true;
      this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].Marked = false;
      this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].MarkedAndAnswered = false;
    }
    else if( marker === 3) {
      this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].Answered = false;
      this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].NotAnswered = false;
      this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].Marked = true;
      this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].MarkedAndAnswered = false;
    }
    else if (marker === 4) {
      this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].Answered = false;
      this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].NotAnswered = false;
      this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].Marked = false;
      this.topicWiseQuestionsList[this.currentTopicNo - 1].Questions[this.currentQuestionNo - 1].MarkedAndAnswered = true;
    }
  }

  getMarkerForQNo(topicNo, qNo) {
    if(this.topicWiseQuestionsList[topicNo - 1].Questions[qNo - 1].SelectedOptionId !== 0) {
      if(this.topicWiseQuestionsList[topicNo - 1].Questions[qNo - 1].Marked || this.topicWiseQuestionsList[topicNo - 1].Questions[qNo - 1].MarkedAndAnswered){
        return MARKER["marked-and-answered"];
      }
      else{
        return MARKER.answered;
      }
    }
    else if(this.topicWiseQuestionsList[topicNo - 1].Questions[qNo - 1].Marked){
      return MARKER.marked;
    }
    else{
      return MARKER["not-answered"];
    }
  }

}
