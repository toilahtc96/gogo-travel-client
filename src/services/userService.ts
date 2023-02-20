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
            message.error("Has error when get company data!");
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
}