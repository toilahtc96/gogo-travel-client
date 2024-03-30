import { StatusType } from "./StatusType";

export default interface Company {
    id: number|undefined,
    name:string|undefined,
    provinceCode: string|undefined,
    districtCode: string|undefined,
    precinctCode: string|undefined,
    provinceName: string|undefined,
    districtName: string|undefined,
    precinctName: string|undefined,
    star: number|undefined,
    information: string|undefined,
    status: StatusType|undefined,
}

