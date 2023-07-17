import axios from "@/core/httpClient";
import { Progress } from "@/type/Progress";
import { message } from "ant-design-vue";
export class ProgressService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getListProgress(page: Number, size: Number) {
        return axios.get(`/api/v1/progress/get-page`, {
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
            message.error("Has error when get user type data! "+ err);
        })
    }
    getProgressById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/progress/get-by-id?id=` + id, this.config).then((data) => {
                return data.data;
            }).catch((err) => {
                message.error("Has error when get Progress by Id! " + id);
            })
        }
    }
    editProgress = (progress: Progress) => {
        return axios.post(`/api/v1/progress/edit`, progress, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit progress");
        })
    }

    getProgressOfUser(jobIb: number|string) {
        return axios.get(`/api/v1/progress/get-by-candidate-job`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || ''
            },
            params: {
                jobIb
            }
        }).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get progress of user data! "+ err);
        })
    }
}