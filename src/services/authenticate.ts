import { LoginRequestType } from "@/model/LoginRequestType";
import axios from "@/core/httpClient";
import { message } from "ant-design-vue";

export class AuthenticationService {
     login = async (formLogin: LoginRequestType) =>{
        localStorage.removeItem("accessToken");
        axios.post(`/api/v1/authentication/login`,formLogin)
        .then((data: any)=>{
            if(!data.data.accessToken){
                message.error("Has error when login! Please contact developer");
            } else {
                localStorage.setItem("accessToken",data.data.accessToken);
                window.location.href="/admin"
            } 
        }).catch((err: any)=> { 
            message.error("Has error call login! Please contact developer");
        })
    }
}