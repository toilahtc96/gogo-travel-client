import { StatusType } from "./StatusType"

export interface AddReviewRequest {
    description: undefined|string,
    status: StatusType|undefined|string,
    star: number|undefined,
    objectId: number|undefined,
    type: number|undefined,
};