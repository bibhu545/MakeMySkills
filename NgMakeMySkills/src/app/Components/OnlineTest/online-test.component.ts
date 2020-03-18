import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-online-test',
  templateUrl: './online-test.component.html',
  styleUrls: ['./online-test.component.css']
})
export class OnlineTestComponent implements OnInit {
  topicWiseQuestionsList = [
    {TopicNumber: 1, Name: 'Reasoning Ability', TotalQn: 11, Questions: [{Qnumber: 0, Text: '', Summary: '', Visited: false},{},{},{},{},{},{},{},{},{},{}]},
    {TopicNumber: 2, Name: 'Quantitative Ability', TotalQn: 12, Questions: [{Qnumber: 0, Text: '', Summary: '', Visited: false},{},{},{},{},{},{},{},{},{},{},{}]},
    {TopicNumber: 3, Name: 'Verbal Ability', TotalQn: 20, Questions: [{Qnumber: 0, Text: '', Summary: '', Visited: false},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]}
  ];
  selectedQuestionNo = '';
  prevVisitedTopicNo = 0;
  prevVisitedQuestionNo = 0;
  currentQuestionText = '';
  currentQuestionNumber = 0;
  currentTopicNo = 0;

  constructor(private commonService: CommonService, private route: Router) {
  }

  ngOnInit() {
    this.commonService.setRoutePath(this.route.url);
    this.topicWiseQuestionsList.forEach(topic => {
      let count = 0;
      topic.Questions.forEach(question => {
        question.Qnumber = ++count;
        question.Text = 'T' + topic.TopicNumber + 'Q' + count + ' Data Sufficiency:<br>What is the age of Principal?<br>(I) There are 14 students in a class.<br>(II) The average age of students and principal is 16 years.<br>(III) The average ageof 14 students is 3 less than the average of 14 students and Principal.';
        question.Summary = "The ratio of ages of mother and son is 5:2 and mother's age is 16.";
        question.Visited = false;
      });
    });
    this.selectedQuestionNo = 'section1-qnshort1';
    this.prevVisitedTopicNo = 1;
    this.prevVisitedQuestionNo = 1;
    this.currentQuestionText = this.topicWiseQuestionsList[0].Questions[0].Text;
    this.currentQuestionNumber = 1;
    this.currentTopicNo = 1;
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

  setSelectedQuestion(topicNo, qNo) {
    if (this.prevVisitedTopicNo !== 0 && this.prevVisitedQuestionNo !== 0 && (this.prevVisitedTopicNo + this.prevVisitedQuestionNo !== topicNo + qNo)) {
      this.topicWiseQuestionsList[this.prevVisitedTopicNo - 1].Questions[this.prevVisitedQuestionNo - 1].Visited = true;
    }
    this.selectedQuestionNo = 'section' + topicNo + '-qnshort' + qNo;
    this.prevVisitedTopicNo = topicNo;
    this.prevVisitedQuestionNo = qNo;
    this.currentQuestionText = this.topicWiseQuestionsList[topicNo - 1].Questions[qNo - 1].Text;
    this.currentQuestionNumber = qNo;
    this.currentTopicNo = topicNo;
  }

}
