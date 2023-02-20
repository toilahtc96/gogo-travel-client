import axios from "@/core/httpClient";
import { Process } from "@/type/Process";
import { message } from "ant-design-vue";
export class ProcessService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getListProcess(page: Number, size: Number) {
        return axios.get(`/api/v1/process/get-page`, {
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
    getProcessById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/process/get-by-id?id=` + id, this.config).then((data) => {
                return data.data;
            }).catch((err) => {
                message.error("Has error when get process by Id! " + id);
            })
        }
    }
    editProcess = (process: Process) => {
        return axios.post(`/api/v1/process/edit`, process, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit Process");
        })
    }
    addProcess = (process: Process) => {
        return axios.post(`/api/v1/process/add`, process, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when add Process");
        })
    }
}