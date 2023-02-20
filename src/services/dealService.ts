import axios from "@/core/httpClient";
import { Deal } from "@/type/Deal";
import { message } from "ant-design-vue";
export class DealService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getListDeal(page: Number, size: Number) {
        return axios.get(`/api/v1/deal/get-page`, {
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
    getDealById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/deal/get-by-id?id=` + id, this.config).then((data) => {
                return data.data;
            }).catch((err) => {
                message.error("Has error when get Deal by Id! " + id);
            })
        }
    }
    editDeal = (deal: Deal) => {
        return axios.post(`/api/v1/deal/edit`, deal, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit deal");
        })
    }
}