import axios from "@/core/httpClient";
import { Company } from "@/type/Company";
import { ResponseData } from "@/type/ResponseData";
import { message } from "ant-design-vue";
export class CompanyService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getListCompayActive = () => {
        return axios.get(`/api/v1/company/get-all`, this.config).then((data) => {
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
        return axios.post(`/api/v1/company/edit`, company).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit company");
        })
    }
    addCompany = (company: Company) => {
        return axios.post(`/api/v1/company/add`, company).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when add company");
        })
    }
}