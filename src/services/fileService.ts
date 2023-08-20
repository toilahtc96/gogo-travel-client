import axios from "@/core/httpClient";

import { message } from "ant-design-vue";
export class FileService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || '',
            contentType: "multipart/form-data",
        },

    }

    uploadAvatar(fileList: any) {
        const formData = new FormData();
        formData.append("file", fileList);
        return axios.post(`/api/v1/upload/upload-avatar`, formData, this.config).then((data)=> { return data.data;})
        .catch((err) => {
            message.error("Has error when upload Image! " + err);
        })
    }

    getSingleImage = (imgPath: string) => {
        return axios.get(`/api/v1/upload/get-single-image?accessToken=` + localStorage.getItem("accessToken") + `&imagePath=` + imgPath,{ ...this.config, responseType: 'blob'})
            .then(response => {
                const blob = new Blob([response.data], { type: 'image/png' });
                const objectUrl = URL.createObjectURL(blob);
                return objectUrl;
            })
    }

    getNoImage = () => {
        return axios.get(`/api/v1/upload/get-no-image?accessToken=` + localStorage.getItem("accessToken"), { ...this.config, responseType: 'blob'})
            .then(response => {
                const blob = new Blob([response.data], { type: 'image/png' });
                const objectUrl = URL.createObjectURL(blob);
                return objectUrl;
            })
    }

    uploadFileCV = (fileList: any) => {
        const formData = new FormData();
        formData.append("file", fileList);
        return axios.post(`/api/v1/upload/upload-cv`, formData, this.config).then((data) => {return data.data;})
        .catch((err)=> {
            message.error("Has error when upload CV! " + err);
        })
    }

}