import { LoginRequestType } from "@/model/LoginRequestType";
import axios from "@/core/httpClient";
import { message } from "ant-design-vue";
import { RegisterRequest } from "@/model/RegisterRequest";
import { UserRegisterRequest } from "@/model/UserRegisterRequest";

export class AuthenticationService {
    login = async (formLogin: LoginRequestType) => {
        localStorage.removeItem("accessToken");
        axios.post(`/api/v1/authentication/login`, formLogin)
            .then((data: any) => {
                if (!data) {
                    message.error("Has error when login! Please contact developer");
                } else {
                    localStorage.setItem("accessToken", data.data);
                    window.location.href = "/admin"
                }
            }).catch((err: any) => {
                message.error("Has error call login! Please contact developer");
            })
    }

    register = async (formRegister: RegisterRequest) => {
        localStorage.removeItem("accessToken");
        axios.post(`/api/v1/authentication/register`, formRegister)
            .then((data: any) => {
                if (data.status == 204) {
                    window.location.href = "/admin"
                }
            }).catch((err: any) => {
                message.error("Has error call login! Please contact developer");
            })
    }

    userRegister = async (formRegister: UserRegisterRequest) => {
        localStorage.removeItem("accessToken");
        axios.post(`/api/v1/authentication/user-register`, formRegister)
            .then((data: any) => {
                if (data.status == 204) {
                    window.location.href = "/login"
                }
            }).catch((err: any) => {
                message.error("Has error call login! Please contact developer");
            })
    }
}