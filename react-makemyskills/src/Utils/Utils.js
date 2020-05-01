// export const BaseUrl = "http://www.makemyskills.me";
export const BaseUrl = "http://makemyskills.me";

export const API_ENDPOINTS = {
    login: BaseUrl + '/Account/login',
    signup: BaseUrl + '/Account/signup',
    addTopic: BaseUrl + '/Admin/AddTopic',
    getCommondataForAdmin: BaseUrl + '/Admin/GetCommondataForAdmin',
    EditTopic: BaseUrl + '/Admin/EditTopic',
    DeleteTopic: BaseUrl + '/Admin/DeleteTopic',
    GelHomePageCommonData: BaseUrl + '/Common/GetHomePageCommonData',
    GetCommonDataForTest: BaseUrl + '/Test/GetCommonDataForTest',
    UpdateTestDetails: BaseUrl + '/Test/UpdateTestDetails',
    GetTestBasicDetails: BaseUrl + '/Test/GetTestBasicDetails',
    AddQuestions: BaseUrl + '/Test/AddQuestions',
    GetQuestionsForTest: BaseUrl + '/Test/GetQuestionsForTest',
    GetUserHomeData: BaseUrl + '/Test/GetUserHomeData',
    DeleteQuestions: BaseUrl + '/Test/DeleteQuestions',
    EditQuestions: BaseUrl + '/Test/EditQuestions'
}