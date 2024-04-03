import axios from "@/core/httpClient";
import TourType from "@/type/TourType";
import { message } from "ant-design-vue";
export class TourService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getTourHome() {
        return axios.get(`/public/tour/home-tour`).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get home tour!");
        })
    }

    edit = (tourType: TourType) => {
        return axios.patch(`/api/v1/post/edit`, tourType, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit tour");
        })
    }

    add = (tourType: TourType) => {
        return axios.post(`/api/v1/post/add`, tourType, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when add tour");
        })
    }

    getById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/post/get-by-id?id=` + id, this.config).then((data) => {
                return data.data;
            }).catch((err) => {
                message.error("Has error when get tour by Id! " + id);
            })
        }
    }

    getAll = () => {
        return axios.get(`/api/v1/post/get-all`, this.config).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get tour");
        })
    }
}