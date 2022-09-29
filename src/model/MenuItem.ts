import { EntityStatus } from "./EntityStatus"
import { MenuType } from "./MenuType"

export type MenuItem = {
    name: string,
    parentId: number,
    menuType: MenuType,
    path: string,
    status: EntityStatus,
    pathAddressPhysic: string,
}