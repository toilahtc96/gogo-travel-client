import axios from "@/core/httpClient";
import { Career } from "@/type/Career";
import { message } from "ant-design-vue";
export class CareerService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getListCareerActive(page: Number, size: Number) {
        return axios.get(`/api/v1/career/get-page`, {
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
            message.error("Has error when get career data! "+ err);
        })
    }
    getCareerById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/career/get-by-id?id=` + id, this.config).then((data) => {
                return data.data;
            }).catch((err) => {
                message.error("Has error when get Career by Id! " + id);
            })
        }
    }
    editCareer = (career: Career) => {
        return axios.post(`/api/v1/career/edit`, career, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit career");
        })
    }
    addCareer = (career: Career) => {
        return axios.post(`/api/v1/career/add`, career, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when add career" + career.name);
        })
    }
    getAll = () => {
        return axios.get(`/api/v1/career/get-page`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || ''
            }
        }).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get all career data!");
        })
    }
    
    findCareer = (data: any) => {
        return axios.get(`/api/v1/career/get-by-field?`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || ''
            },
           params:{ ...data}
        }).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get career data!");
        })
    }
}