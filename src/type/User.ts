import { StatusType } from "./StatusType";
import dayjs, { Dayjs } from 'dayjs';

export interface User {
    id: number|undefined,
    roleId: number|undefined,
    companyId: number|undefined,
    typeId: number|undefined,
    description: string|undefined,
    name: string|undefined,
    star: number|undefined,
    information: string|undefined,
    status: StatusType|undefined,
    birthDay: Dayjs|undefined,
    levelId: number|undefined,
    experienceYear: number|undefined,
    cvLink: string|undefined,
    username: string|undefined,
    password: string|undefined,
    typeName: string|undefined,
}