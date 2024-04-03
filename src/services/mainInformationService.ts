import axios from "@/core/httpClient";
import MainInformationType from "@/type/MainInformationType";
import { message } from "ant-design-vue";
export class MainInformationService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getFirstActive() {
        return axios.get(`/public/main-information/get-first-active`).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get main information data!");
        })
    }

    // // getAll, edit, 

    edit = (MainInformationType: MainInformationType) => {
        return axios.patch(`/api/v1/main-information/edit`, MainInformationType, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when main information");
        })
    }

    // addCompanyInformation = (companyInformation: CompanyInformation) => {
    //     return axios.post(`/api/v1/company-information/add`, companyInformation, this.config).then((data) => {
    //         return data;
    //     }).catch((err) => {
    //         message.error("Has error when add company");
    //     })
    // }

    getById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/main-information/get-by-id?id=` + id, this.config).then((data) => {
                return data.data;
            }).catch((err) => {
                message.error("Has error when get main information by Id! " + id);
            })
        }
    }
}