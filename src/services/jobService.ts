import axios from "@/core/httpClient";
import { Job } from "@/type/Job";
import { message } from "ant-design-vue";
export class JobService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getListJobActive(page: number, size: number) {
        return axios.get(`/api/v1/job/find-by-field`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || ''
            },
            params: {
                page,
                size
            }
        }).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get job data!");
        })
    }
    getJobById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/job/get-by-id?id=` + id, this.config).then((data) => {
                return data.data;
            }).catch((err) => {
                message.error("Has error when get job by Id! " + id);
            })
        }
    }
    editJob = (job: Job) => {
        return axios.post(`/api/v1/job/edit`, job, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit job");
        })
    }
    addJob = (job: Job) => {
        return axios.post(`/api/v1/job/add`, job, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when add job");
        })
    }
    findJob = (data: any) => {
        return axios.get(`/api/v1/job/find-by-field?`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || ''
            },
           params:{ ...data}
        }).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get job data!");
        })
    }
}