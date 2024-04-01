import { StatusType } from "./StatusType";

export default interface CompanyInformation {
    id: number|undefined,
    companyName: string|undefined,
    companyAddress: string|undefined,
    companyCityAddress: string|undefined,
    companyEmail: string|undefined,
    companyPhone: string|undefined,
    facebookLink: string|undefined,
    instagramLink: string|undefined,
    tikTokLink: string|undefined,
    status: StatusType|undefined
}

