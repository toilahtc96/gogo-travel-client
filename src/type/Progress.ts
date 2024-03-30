import { StatusType } from "./StatusType";

export interface Progress {
    id: string|number|undefined,
    agencyId:string|number|undefined,
    candidateId:string|number|undefined,
    status:StatusType|undefined,
    stepId:string|number|undefined,
    candidateName:string|undefined,
    agencyName:string|undefined,
    levelName:string|undefined,
    companyName:string|undefined,
    careerName:string|undefined,
    createdDate:string|Date|undefined,
    cvLink: string|undefined,    
    sendCvCompanyTime: string|undefined,
    candidateSendCvTime: string|undefined,
    companyId: number|undefined
}