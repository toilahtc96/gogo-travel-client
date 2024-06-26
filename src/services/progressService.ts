import axios from "@/core/httpClient";
import { Progress } from "@/type/Progress";
import { UpdateCvLinkOfProcessRequest } from "@/type/UpdateCvLinkOfProcessRequest";
import { message } from "ant-design-vue";
export class ProgressService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getListProgress(page: Number, size: Number) {
        return axios.get(`/api/v1/progress/get-page`, {
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
            message.error("Has error when get user type data! " + err);
        })
    }
    getProgressById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/progress/get-by-id?id=` + id, this.config).then((data) => {
                return data.data;
            }).catch((err) => {
                message.error("Has error when get Progress by Id! " + id);
            })
        }
    }
    editProgress = (progress: Progress) => {
        return axios.post(`/api/v1/progress/edit`, progress, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit progress");
        })
    }

    getProgressOfUser(jobIb: number | string | undefined, candidateId: number | string | undefined) {
        return axios.get(`/api/v1/progress/get-by-candidate-job`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || ''
            },
            params: {
                jobIb,
                candidateId,
            }
        }).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get progress of user data! " + err);
        })
    }

    updateCvLinkAfterUpload = (updateCvLink: UpdateCvLinkOfProcessRequest) => {
        return axios.post(`/api/v1/progress/update-cv-by-candidate-agency-job`, updateCvLink, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when update cv link to progress");
        })
    }

    getListProgressOfAgency(page: Number, size: Number) {
        return axios.get(`/api/v1/progress/get-active-of-agency`, {
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
            message.error("Has error when get getListProgressOfAgency! " + err);
        })
    }
}