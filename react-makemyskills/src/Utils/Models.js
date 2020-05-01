export class TestModel {
    constructor(){
        this.testId = 0;
        this.userId = 0;
        this.testName = "";
        this.isActive = 0;
        this.topicId = 0;
        this.timeLimit = 0;
        this.correctAnswerMarks = 0;
        this.negetiveMarking = 0;
        this.passingPercentage = 0;
        this.suffleAnswers = false;
        this.suffleQuestions = false;
        this.revealAnswers = false;
        this.allowMultiple = false;
        this.testGuid = "";
        this.displayFromHome = false;
        this.dateAdded = new Date();
    }
}