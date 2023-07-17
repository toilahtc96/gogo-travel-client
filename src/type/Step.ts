import { StepCode } from "./StepCode";
import { StatusType } from "./StatusType";

export interface Step {
    id: number,
    code: StepCode,
    meaning: string,
    stepId: number,
    status: StatusType,
}
