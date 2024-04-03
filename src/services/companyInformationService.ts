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
            message.error("Has error when get company information data!");
        })
    }

    // getAll, edit, 

    editCompanyInformation = (companyInformation: CompanyInformation) => {
        return axios.patch(`/api/v1/company-information/edit`, companyInformation, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit company information");
        })
    }

    addCompanyInformation = (companyInformation: CompanyInformation) => {
        return axios.post(`/api/v1/company-information/add`, companyInformation, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when add company information");
        })
    }

    getCompanyInformationById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/company-information/get-by-id?id=` + id, this.config).then((data) => {
                return data.data;
            }).catch((err) => {
                message.error("Has error when get company information by Id! " + id);
            })
        }
    }
}