import axios from "@/core/httpClient";
import ReasonChooseType from "@/type/ReasonChooseType";
import { message } from "ant-design-vue";
export class ReasonChooseService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getFourActive() {
        return axios.get(`/public/reason-choose/get-four-active`).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get reason choose data!");
        })
    }

    getAll() {
        return axios.get(`/api/v1/reason-choose/get-all`).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get reason choose data!");
        })
    }


    // getAll, edit, 

    edit = (ReasonChoose: ReasonChooseType) => {
        return axios.patch(`/api/v1/reason-choose/edit`, ReasonChoose, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit reason choose");
        })
    }

    add = (ReasonChoose: ReasonChooseType) => {
        return axios.post(`/api/v1/reason-choose/add`, ReasonChoose, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when add reason choose");
        })
    }

    getById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/reason-choose/get-by-id?id=` + id, this.config).then((data) => {
                return data.data;
            }).catch((err) => {
                message.error("Has error when get reason choose by Id! " + id);
            })
        }
    }
}