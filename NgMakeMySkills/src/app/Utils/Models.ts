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
    subject: TopicModel;
}