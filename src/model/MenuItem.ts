import { StatusType } from "@/type/StatusType"
import { MenuType } from "./MenuType"

export type MenuItem = {
    name: string,
    parentId: number,
    menuType: MenuType,
    path: string,
    status: StatusType,
    pathAddressPhysic: string,
}