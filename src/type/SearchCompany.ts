
import { StatusType } from "./StatusType";

export interface SearchCompany {
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