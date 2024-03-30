import axios from "@/core/httpClient";
import { Role } from "@/type/Role";
import { message } from "ant-design-vue";
export class RoleService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getListRoleActive(page: Number, size: Number) {
        return axios.get(`/api/v1/role/get-page`, {
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
            message.error("Has error when get role data! "+ err);
        })
    }
    getRoleById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/role/get-by-id?id=` + id, this.config).then((data) => {
                return data.data;
            }).catch((err) => {
                message.error("Has error when get Role by Id! " + id);
            })
        }
    }
    editRole = (role: Role) => {
        return axios.post(`/api/v1/role/edit`, role, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit role");
        })
    }
    addRole = (role: Role) => {
        return axios.post(`/api/v1/role/add`, role, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when add role" + role.name);
        })
    }
    getAll = () => {
        return axios.get(`/api/v1/role/get-page`, {
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