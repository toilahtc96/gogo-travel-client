
import { LevelName } from "./LevelName";
import { StatusType } from "./StatusType";
import { UserType } from "./UserType";

export interface SearchUserForm {
    username: string|undefined,
    name: string|undefined,
    companyId: number|undefined,
    userType: UserType|undefined,
    level: LevelName|undefined,
    experience:number|undefined,
    star: number|undefined,
    status: StatusType|undefined,
    page: number|undefined,
    size: number
}