import { StatusType } from "./StatusType";

export default interface MainInformationType {
    id: number|undefined,
    title: string|undefined,
    subtitle: string|undefined,
    smallInformation1: string|undefined,
    smallInformation2: string|undefined,
    heroImage: string|undefined,
    status: StatusType|undefined
}