import axios from "@/core/httpClient";
import type Registration from "@/type/Registration";
import { message } from "ant-design-vue";
export class RegistrationService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getListRegistration(page: number, size: number) {
        return axios.get(`api/v1/registration/get-page`, {
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
    addRegistration = (registration: Registration) => {
        return axios.post(`api/v1/registration/add`, registration, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when add job");
        })
    }
    
    getAll()  {
        return axios.get(`api/v1/registration/get-all`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || ''
            }
        }).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get job data!");
        })
    }
}