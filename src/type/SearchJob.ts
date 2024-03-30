
import { LevelName } from "./LevelName";
import { StatusType } from "./StatusType";

export interface SearchJob {
    jobTypeId: number| undefined,
    companyId: number| undefined,
    rangeSalary: number| undefined,
    levelName: LevelName| undefined,
    customRange: boolean| undefined,
    careerId: number| undefined,
    workingFormId: number| undefined,
    information: string| undefined,
    status: StatusType| undefined,
    page: number| undefined,
    size: number
}