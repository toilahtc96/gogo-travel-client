import axios from "@/core/httpClient";
import { User } from "@/type/User";
import { message } from "ant-design-vue";
import { List } from "lodash";
export class UserService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getPaging = (data: any) => {
        return axios.get(`/api/v1/user/get-page?`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || ''
            },
            params: {...data}
        }).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get user data!");
        })
    }

    getUserById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/user/get-by-id?id=` + id, this.config).then((data) => {
                return data.data;
            }).catch((err) => {
                message.error("Has error when get User by Id! " + id);
            })
        }
    }
    editUser = (user: User) => {
        return axios.post(`/api/v1/user/edit`, user, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit user");
        })
    }
}