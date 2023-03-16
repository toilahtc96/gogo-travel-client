import { StatusType } from "./StatusType";
import dayjs, { Dayjs } from 'dayjs';
import { RoleType } from "./RoleType";
import { UserType } from "./UserType";
import { LevelName } from "./LevelName";

export interface UserResponse {
    id: number|undefined,
    roleName: RoleType|undefined,
    companyName: string|undefined,
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
    companyId: number|undefined,
    userTypeCode: UserType|undefined,
    level:LevelName|undefined
}