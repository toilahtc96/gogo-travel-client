import { StatusType } from "./StatusType";

export default interface ReasonChooseType {
    id: number | undefined,
    reasonMain: string | undefined,
    reasonDescription: string | undefined,
    icon: string | undefined,
    backgroundImage: string | undefined,
    status: StatusType | undefined,
    reasonMainName1: string | undefined,
    reasonMainName2: string | undefined,
}