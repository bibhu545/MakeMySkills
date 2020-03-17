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