import axios from 'axios';

export default class WorkingAboveStudentService
{
    static getStudent(page = 1, que = ""){
        var base_url = `/api/Admin/students?page=${page}&sizeOfPage=15`;
        console.log("go to back");
        if(que==""){
            return axios.get(base_url);
        }else{
            return axios.get(base_url+`&searchText=${que}`);
        }
    }
    static getCourse(id)
    {
        console.log("go to back");
        return axios.get(`api/Admin/coursesStudent/${id}`);
    }
    static editStudent(model){
        console.log("go to back");
        return axios.put('api/Admin/editStudent', model);
    }
}