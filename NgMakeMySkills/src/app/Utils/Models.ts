export class OptionModel {
    id: number;
    optionLabel: String;
    optionText: String;
    isAnswer: boolean;
}

export class LoginRequestModel {
    email: string = "";
    password: string = "";
    saveLogin: boolean = false;
}

export class SignupModel {
    email: string = "";
    firstName: string = "";
    lastName: string = "";
    password: string = "";
    confirmPassword: string = "";
    userType: number;
}

export class LoginResponseModel {
    isLoggedIn: boolean = false;
    userId: number;
    email: string = "";
    firstName: string = "";
    lastName: string = "";
    userType: number;
    joinedOn: any;
    message: string = "";
}

export class UserModel {
    userId: number;
    email: string = "";
    firstName: string = "";
    lastName: string = "";
    userType: number;
    joinedOn: any;
}

export class TopicModel {
    topicId: number;
    topicName: string = "";
    isActive: boolean = true;
    subTopics: TopicModel[] = [];
    editMode: boolean = false;
}

export class TestModel {
    testId: number = 0;
    userId: number = 0;
    testName: string = "";
    isActive: number = 0;
    topicId: number = 0;
    timeLimit: number = 0;
    correctAnswerMarks: number = 0;
    negetiveMarking: number = 0;
    passingPercentage: number = 0;
    suffleQuestions: boolean = false;
    suffleAnswers: boolean = false;
    allowMultiple: boolean = false;
    revealAnswers: boolean = false;
    testGuid: string = "";
}

export class TopicWiseQuestionModel {
    TopicNumber: number = 0;
    Name: string = '';
    TotalQn: number = 0;
    Questions: QuestionWithOptionsModel[] = [];
}

export class QuestionWithOptionsModel {
    Qnumber: number = 0;
    Text: string = '';
    Summary: string = '';
    NotAnswered: boolean = false;
    Answered: boolean = false;
    Marked: boolean = false;
    MarkedAndAnswered: boolean = false;
    SelectedOptionId: number = 0;
    Options: OptionsModel[] = [];
}

export class OptionsModel {
    OptionNo: number = 0;
    Text: string = '';
}

export class TopicWiseAnswerCountModel {
    TopicNumber: number = 0;
    Name: string = '';
    Answered: number = 0;
    NotAnswered: number = 0;
    Marked: number = 0;
    NotVisited: number = 0;
}