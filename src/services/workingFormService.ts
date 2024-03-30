import axios from "@/core/httpClient";
import { WorkingForm } from "@/type/WorkingForm";
import { message } from "ant-design-vue";
export class WorkingFormService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getListWorkingFormActive(page: Number, size: Number) {
        return axios.get(`/api/v1/working-form/get-page`, {
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
            message.error("Has error when get workingForm data! "+ err);
        })
    }
    getWorkingFormById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/working-form/get-by-id?id=` + id, this.config).then((data) => {
                return data.data;
            }).catch((err) => {
                message.error("Has error when get WorkingForm by Id! " + id);
            })
        }
    }
    editWorkingForm = (workingForm: WorkingForm) => {
        return axios.post(`/api/v1/working-form/edit`, workingForm, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit workingForm");
        })
    }
    addWorkingForm = (workingForm: WorkingForm) => {
        return axios.post(`/api/v1/working-form/add`, workingForm, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when add workingForm" + workingForm.name);
        })
    }
    getAll = () => {
        return axios.get(`/api/v1/working-form/get-page`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || ''
            }
        }).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get all working Form data!");
        })
    }
    findWorkingForm = (data: any) => {
        return axios.get(`/api/v1/working-form/get-by-field?`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || ''
            },
           params:{ ...data}
        }).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get working form data!");
        })
    }
}