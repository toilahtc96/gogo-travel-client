import axios from "@/core/httpClient";
import { AddReviewRequest } from "@/type/AddReviewRequest";
import { message } from "ant-design-vue";
export class ReviewService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    addReview = (addReviewRequest: AddReviewRequest) => {
        return axios.post(`/api/v1/review/add`, addReviewRequest, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit Review");
        })
    }
    findReview = (size: number, page: number, objectId: number|undefined, reviewUserId: number|undefined) => {
        return axios.get(`/api/v1/review/find-by-field`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || ''
            },
            params: {
                size,
                page, 
                objectId, 
                reviewUserId
            }
        }).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get review data! " + err);
        })
    }
}