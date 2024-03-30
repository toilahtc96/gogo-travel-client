import axios from "@/core/httpClient";
import { Level } from "@/type/level";
import { message } from "ant-design-vue";
export class LevelService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getListLevel(page: Number, size: Number) {
        return axios.get(`/api/v1/level/get-page`, {
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
    getLevelById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/level/get-by-id?id=` + id, this.config).then((data) => {
                return data.data;
            }).catch((err) => {
                message.error("Has error when get Level by Id! " + id);
            })
        }
    }
    editLevel = (level: Level) => {
        return axios.post(`/api/v1/level/edit`, level, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit role");
        })
    }
    addLevel = (level: Level) => {
        return axios.post(`/api/v1/level/add`, level, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when add Level" + level.name);
        })
    }
    getAll = () => {
        return axios.get(`/api/v1/level/get-all`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || ''
            }
        }).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get all level data!");
        })
    }
}