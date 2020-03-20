export class OptionModel {
    id: number;
    optionLabel: String;
    optionText: String;
    isAnswer: boolean;
}

export class LoginRequestModel {
    email: string = "";
    password: string = "";
}

export class SignupModel{
    email: "";
    firstName: "";
    lastName: "";
    password: "";
    confirmPassword: "";
    userType: "";
}