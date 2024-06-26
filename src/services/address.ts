import axios from "@/core/httpClient";
import { Address } from "@/type/Address";
import { AddressType } from "@/type/AddressType";
import { ResponseData } from "@/type/ResponseData";
import { message } from "ant-design-vue";
export class AddressService {
    config = {
        headers: {
            accessToken: localStorage.getItem("accessToken") || ''
        }
    }
    getListAddressActive = () => {
        return axios.get<Address[]>(`/api/v1/address/get-all`, this.config).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get address data!");
        })
    }
    getAddressById = (id: any) => {
        if (id) {
            return axios.get(`/api/v1/address/get-by-id?id=` + id, this.config).then((data) => {
                return data.data;
            }).catch((err) => {

                message.error("Has error when get address by Id! " + id);
            })
        }
    }
    editAddress = (address: Address) => {

        return axios.post(`/api/v1/address/edit`, address, this.config).then((data) => {
            return data;
        }).catch((err) => {
            message.error("Has error when edit address");
        })
    }
    addAddress = (address: Address) => {
        return axios.post(`/api/v1/address/add`, address, this.config).then((data) => {
            return data;
        }).catch((err) => {
            if (err.response.data) {
                message.error(err.response.data);
            } else {
                message.error("Has error when add address");
            }
        })
    }
    getByType = (type: AddressType) => {
        return axios.get<Address[]>(`api/v1/address/get-by-type?type=` + type, this.config).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get address by type");
        })
    }
    getByTypeAndParentCode = (type: AddressType, parentCode: string|undefined) => {
        return axios.get<Address[]>(`api/v1/address/get-by-type-and-parent-code?parentCode=` + parentCode + "&type=" + type, this.config).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get address by type");
        })
    }
    getAddressByTypeAndCode = (code: string, type: AddressType) => {
        return axios.get<Address>(`api/v1/address/get-by-code-and-type?code =` + code + "&type=" + type, this.config).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get address by type");
        })
    }

    getByTypePaging = (type: AddressType, page: number, size: number) => {
        return axios.get<Address[]>(`api/v1/address/get-by-type-paging?type=` + type + `&page=` + page + `&size=` + size, this.config).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get address by type");
        })
    }

    findAddress = (data: any) => {
        return axios.get(`/api/v1/address/get-by-field?`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || ''
            },
            params: { ...data }
        }).then((data) => {
            return data.data;
        }).catch((err) => {
            message.error("Has error when get address data!");
        })
    }
}