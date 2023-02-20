import { ProcessCode } from "./ProcessCode";
import { StatusType } from "./StatusType";

export interface Process {
    id: number,
    code: ProcessCode,
    meaning: string,
    processId: number,
    status: StatusType,
}
