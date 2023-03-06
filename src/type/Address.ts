import { Ref } from "vue";
import { AddressType } from "./AddressType";
import { StatusType } from "./StatusType";

export interface Address  {
    id: number,
    name: string,
    status: number,
    code: string,
}
export interface SearchAddress {
    name: string,
    status: StatusType,
    page: number,
    size: number
}
