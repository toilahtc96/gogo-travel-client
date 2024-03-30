import axios from "@/core/httpClient";
import { Voucher } from "@/type/Voucher";
import { message } from "ant-design-vue";
export class VoucherService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getVoucherById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/voucher/get-by-id?id=` + id, this.config).then((data) => {
                
                return data.data;
            }).catch((err) => {
                message.error("Has error when get Voucher by Id! " + id);
            })
        }
    }
    editVoucher = (voucher: Voucher) => {
        return axios.post(`/api/v1/voucher/edit`, voucher, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit Voucher");
        })
    }
    addVoucher = (voucher: Voucher) => {
        return axios.post(`/api/v1/voucher/add`, voucher, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when add Voucher");
        })
    }
    findVoucher = (data: any) => {
        return axios.get(`/api/v1/voucher/find-by-field?`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || ''
            },
            params: { ...data }
        }).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get Voucher data!");
        })
    }

    findMyVoucher = (data: any) => {
        return axios.get(`/api/v1/voucher/find-my-voucher-by-field?`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || ''
            },
            params: { ...data }
        }).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get Voucher data!");
        })
    }
}