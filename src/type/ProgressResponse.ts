import { StatusType } from "./StatusType";

export interface ProgressResponse {
    id: number|undefined,
    agencyId: number|undefined,
    candidateId: number|undefined,
    stepId: number|undefined,
    status: StatusType|undefined,
    order: number|undefined,
}