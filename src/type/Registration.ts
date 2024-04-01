import { StatusType } from "./StatusType";

export default interface Registration {
    id: number | undefined,
    postId: string | undefined,
    name: string | undefined,
    phone: string | undefined,
    email: string | undefined,
    tourName: string | undefined,
    information: string | undefined,
    status: StatusType | undefined
}

