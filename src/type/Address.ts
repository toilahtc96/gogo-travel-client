import { StatusType } from "./StatusType";

export interface Address  {
    id: number,
    name: string,
    status: number,
    code: string,
}
export interface SearchAddress {
    companyName: string,
    companyCode: string,
    provinceCode: string,
    districtCode: string,
    precinctCode: string,
    star: number,
    information: string,
    status: StatusType,
    page: number,
    size: number
}