import axios from "@/core/httpClient";
import { IUserType } from "@/type/IUserType";
import { message } from "ant-design-vue";
export class UserTypeService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getListUserType(page: Number, size: Number) {
        return axios.get(`/api/v1/user-type/get-page`, {
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
    getUserTypeById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/user-type/get-by-id?id=` + id, this.config).then((data) => {
                return data.data;
            }).catch((err) => {
                message.error("Has error when get User Type by Id! " + id);
            })
        }
    }
    editUserType = (userType: IUserType) => {
        return axios.post(`/api/v1/user-type/edit`, userType, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit role");
        })
    }
    addUserType = (userType: IUserType) => {
        return axios.post(`/api/v1/user-type/add`, userType, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when add userType" + userType.code);
        })
    }
    getAll = () => {
        return axios.get(`/api/v1/user-type/get-page`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || ''
            }
        }).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get all role data!");
        })
    }
}