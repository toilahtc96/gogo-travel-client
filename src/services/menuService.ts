import axios from "@/core/httpClient";
import { message } from "ant-design-vue";
const config = {
    headers:{
      accessToken: localStorage.getItem("accessToken")|| "",
    }
  };
export class MenuService {
    
    getMenu = async () => {
        
        axios.get(`api/v1/menu/user/`,config)
            .then(data => {
                
            }).catch(err => {
                
            })
    }
}