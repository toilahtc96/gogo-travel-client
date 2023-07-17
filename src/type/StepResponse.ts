import { StatusType } from "./StatusType";
import { StepCode } from "./StepCode";

export interface StepResponse {
    id: number|undefined,
    code: StepCode|undefined|string,
    meaning: string|undefined,
    status: StatusType|undefined,
    order: number|undefined
}