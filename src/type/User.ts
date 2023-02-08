import { EntityStatus } from "@/model/EntityStatus";

export interface User {
    id: number,
    roleId: number,
    companyId: number,
    typeId: number,
    description: string,
    name: string,
    star: number,
    information: string,
    status: EntityStatus,
    birthDay: Date,
    levelId: number,
    experienceYear: number,
    cvLink: string,
    username: string,
    password: string,
}