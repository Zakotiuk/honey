import axios from 'axios';

export default class CourseForStudentService {
    static getCourse(page = 1, que = "") {
        var base_url = `/api/Course/courses?page=${page}&sizeOfPage=15`;
        console.log("go to back");
        if (que == "") {
            return axios.get(base_url);
        } else {
            return axios.get(base_url + `&searchText=${que}`);
        }
    }
    static sub(model) {
        console.log("go to back");
        return axios.post('api/Course/subscription', model);
    }
    static unsub(model) {
        console.log("go to back");
        return axios.post('api/Course/unsubscription', model);
    }
    static getProfile(id) {
        return axios.get(`api/Admin/profile?id=${id}`);
    }
}