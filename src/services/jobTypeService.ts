import axios from "@/core/httpClient";
import { JobType } from "@/type/JobType";
import { message } from "ant-design-vue";
export class JobTypeService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getListJobTypeActive(page: Number, size: Number) {
        return axios.get(`/api/v1/job-type/get-page`, {
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
            message.error("Has error when get jobType data! "+ err);
        })
    }
    getJobTypeById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/job-type/get-by-id?id=` + id, this.config).then((data) => {
                return data.data;
            }).catch((err) => {
                message.error("Has error when get JobType by Id! " + id);
            })
        }
    }
    editJobType = (jobType: JobType) => {
        return axios.post(`/api/v1/job-type/edit`, jobType, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit jobType");
        })
    }
    addJobType = (jobType: JobType) => {
        return axios.post(`/api/v1/job-type/add`, jobType, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when add jobType" + jobType.name);
        })
    }
    getAll = () => {
        return axios.get(`/api/v1/job-type/get-page`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || ''
            }
        }).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get all jobType data!");
        })
    }
}