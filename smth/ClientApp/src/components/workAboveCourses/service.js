import axios from 'axios';

export default class WorkingAboveCoursesService
{
    static getCourse(page = 1, que = ""){
        var base_url = `/api/Course/courses?page=${page}&sizeOfPage=15`;
        console.log("go to back");
        if(que==""){
            return axios.get(base_url);
        }else{
            return axios.get(base_url+`&searchText=${que}`);
        }
    }
    static addCourse(model){
        console.log("go to back");
        return axios.post('api/Admin/addCourse', model);
    }
}