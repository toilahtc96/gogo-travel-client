import axios from "@/core/httpClient";
import { message } from "ant-design-vue";
const config = {
    headers:{
      accessToken: localStorage.getItem("accessToken")|| "",
    }
  };
export class MenuService {
    
    getMenu = async () => {
        debugger;
        axios.get(`api/v1/menu/user/`,config)
            .then(data => {
                debugger;
            }).catch(err => {
                debugger;
            })
    }
}