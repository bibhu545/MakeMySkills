import Swal from 'sweetalert2';

 export const BaseUrl = "http://www.makemyskills.me";
//export const BaseUrl = "http://makemyskills.me";

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
    EditQuestions: BaseUrl + '/Test/EditQuestions',
    AddBatch: BaseUrl + '/Batch/AddBatch'
}

export const USER_TYPES = {
    admin: 0,
    candidate: 1,
    examiner: 2
}

export class Utils {

    constructor() {

    }

    getDateFromServer(date: string): Date {
        if(date == null){
            return null;
        }
        else{
            return new Date(parseInt(date.substring(6, date.length - 2)));
        }
    }

    showErrorMessage(message: string, footerMessage?: string) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
            footer: footerMessage
        })
    }
    showSuccessMessage(message: string) {
        Swal.fire(
            message,
            'Your file has been deleted.',
            'success'
        )
    }
    showConfirm(message: string, confirmBtnText: string) {
        return Swal.fire({
            title: 'Are you sure?',
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmBtnText
        });
    }
    showServerError(error: any) {
        this.showErrorMessage("Some internal error occured. " + error.message);
    }
}