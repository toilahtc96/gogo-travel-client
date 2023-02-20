import { StatusType } from "./StatusType";
import dayjs, { Dayjs } from 'dayjs';

export interface User {
    id: number,
    roleId: number,
    companyId: number,
    typeId: number,
    description: string,
    name: string,
    star: number,
    information: string,
    status: StatusType,
    birthDay: Dayjs,
    levelId: number,
    experienceYear: number,
    cvLink: string,
    username: string,
    password: string,
    typeName: string,
}