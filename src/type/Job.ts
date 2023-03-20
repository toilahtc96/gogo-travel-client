import { LevelName } from "./LevelName";

export interface Job {
    id: number|undefined,
    jobTypeId: number|undefined,
    companyId: number|undefined,
    levelName: LevelName|undefined,
    careerId: number|undefined,
    workingFormId: number|undefined,
    quantity: number|undefined,
    rangeSalaryMin: number|undefined,
    rangeSalaryMax: number|undefined,
    information: string|undefined,
    status: string|undefined,
    customRange: boolean|undefined,
}