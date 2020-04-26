import axios from "axios";

export default class HttpService {
    async postData(url, data) {
        this.showLoader();
        var result = await axios.post(url, data);
        setTimeout(() => {
            this.hideLoader();
        }, 750);
        return result;
    }
    async getData(url) {
        this.showLoader();
        var result = await axios.get(url);
        setTimeout(() => {
            this.hideLoader();
        }, 750);
        return result;
    }

    showLoader() {
        document.getElementById('apiProgress').style.display = "block";
    }
    hideLoader() {
        document.getElementById('apiProgress').style.display = "none";
    }
}