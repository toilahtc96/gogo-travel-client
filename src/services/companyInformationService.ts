import axios from "@/core/httpClient";
import CompanyInformation from "@/type/CompanyInformation";
import { message } from "ant-design-vue";
export class CompanyInformationService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getFirstActive() {
        return axios.get(`/public/company-information/get-first-active`).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get company data!");
        })
    }

    // getAll, edit, 

    editCompanyInformation = (companyInformation: CompanyInformation) => {
        return axios.post(`/api/v1/company-information/edit`, companyInformation, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit company");
        })
    }

    addCompany = (companyInformation: CompanyInformation) => {
        return axios.post(`/api/v1/company-information/add`, companyInformation, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when add company");
        })
    }
}