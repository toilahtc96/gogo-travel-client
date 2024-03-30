import { Ref } from "vue";
import { AddressType } from "./AddressType";
import { StatusType } from "./StatusType";

export interface Address {
    id: number,
    provinceCode: string | undefined,
    provinceName: string | undefined,
    districtCode: string | undefined,
    districtName: string | undefined,
    precinctCode: string | undefined,
    precinctName: string | undefined,
    type: AddressType,
    status: number,
}
export interface SearchAddress {
    provinceCode: string | undefined,
    provinceName: string | undefined,
    districtCode: string | undefined,
    districtName: string | undefined,
    precinctCode: string | undefined,
    precinctName: string | undefined,
    type: AddressType,
    status: StatusType,
    page: number,
    size: number
}
