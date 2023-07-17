import { ReviewType } from "./ReviewType";
import { StatusType } from "./StatusType";

export interface ReviewResponse {
    id: number|undefined,
    description: string|undefined,
    star: number|undefined,
    objectId: number|undefined,
    reviewOwner: number|undefined,
    type: ReviewType|undefined,
    status: StatusType|undefined,
    reviewOwnerName: string|undefined,
    reviewOwnerAvatar: string|undefined,
    reviewOwnerAvatarSrc: string|undefined,
}