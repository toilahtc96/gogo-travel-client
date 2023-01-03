import axios from "@/core/httpClient";
import { Company } from "@/type/Company";
import { message } from "ant-design-vue";
export class CompanyService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getListCompayActive(page: Number, size: Number) {
        return axios.get(`/api/v1/company/get-page`, {
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
            message.error("Has error when get company data!");
        })
    }
    getCompanyById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/company/get-by-id?id=` + id, this.config).then((data) => {
                return data.data;
            }).catch((err) => {
                message.error("Has error when get company by Id! " + id);
            })
        }
    }
    editCompany = (company: Company) => {
        return axios.post(`/api/v1/company/edit`, company, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit company");
        })
    }
    addCompany = (company: Company) => {
        return axios.post(`/api/v1/company/add`, company, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when add company");
        })
    }
    getAll = () => {
        return axios.get(`/api/v1/company/get-all`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || ''
            }
        }).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get company data!");
        })
    }
}