import axios from "@/core/httpClient";
import { Step } from "@/type/Step";
import { message } from "ant-design-vue";
export class StepService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getListStep(page: Number, size: Number) {
        return axios.get(`/api/v1/step/get-page`, {
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
    getStepById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/step/get-by-id?id=` + id, this.config).then((data) => {
                return data.data;
            }).catch((err) => {
                message.error("Has error when get step by Id! " + id);
            })
        }
    }
    editStep = (step: Step) => {
        return axios.post(`/api/v1/step/edit`, step, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit Step");
        })
    }
    addStep = (step: Step) => {
        return axios.post(`/api/v1/step/add`, step, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when add Step");
        })
    }
    
    getAll = () => {
        return axios.get(`/api/v1/step/get-all`, this.config).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get step  ");
        })
    }
}