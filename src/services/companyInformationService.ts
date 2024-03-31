import axios from "@/core/httpClient";
import { message } from "ant-design-vue";
export class CompanyInformationService {
    getFirstActive() {
        return axios.get(`/public/company-information/get-first-active`).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get company data!");
        })
    }
}