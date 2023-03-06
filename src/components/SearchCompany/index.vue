<!-- Fullname,code,province,district,precinct,star,information -->
<script lang="ts" setup>
import { AddressService } from "@/services/address";
import { AddressType } from "@/type/AddressType";
import { SearchCompany } from '@/type/SearchCompany';
import { ref } from "vue";
import { StatusType } from "@/type/StatusType";
const addressService = new AddressService();
const emit = defineEmits(['searchCompany'])
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const formItemStyle = {
    labelCol3: { width: '50%', },
    labelColInput3: { width: '100%', float: 'left' },
};
const formState = ref<SearchCompany>({
    companyName: '',
    companyCode: '',
    provinceCode: '',
    districtCode: '',
    precinctCode: '',
    star: -1,
    information: '',
    status: StatusType.ACTIVED,
    page: 0,
    size: 5
})
const onFinish = () => {
    emit('searchCompany', formState.value);
}

const changeAddress = (data: string, type: AddressType) => {
    switch (type) {
        case AddressType.PROVINCE:
            formState.value.provinceCode = data;
            break;
        case AddressType.DISTRICT:
            formState.value.districtCode = data;
            break;
        case AddressType.PRECINCT:
            formState.value.precinctCode = data;
            break;
        default:
            break;
    }
}
let provinceName = ref<string>('province');
let districtName = ref<string>('district');
let precinctName = ref<string>('precinct');
</script>
<template>
    <div style="background-color: #f1f1f1;">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['fullname']" label="Comapny Name" :style="formItemStyle.labelCol3" style="float:left">
                <a-input v-model:value="formState.companyName" />
            </a-form-item>

            <a-form-item :name="['code']" label="Code" :style="formItemStyle.labelCol3" style="float:left">
                <a-input v-model:value="formState.companyCode" />
            </a-form-item>
            <ComboAddress :provinceCode="formState.provinceCode" :districtCode="formState.districtCode"
                :precinctCode="formState.precinctCode" @changeAddress="changeAddress" :provinceName="provinceName"
                :districtName="districtName" :precinctName="precinctName" :formItemStyle="formItemStyle" />
            <a-form-item :name="['status']" label="Status" :style="formItemStyle.labelCol3" style="float:left">
                <StatusElement :status="formState.status" ref="select" />
            </a-form-item>
            <div style="width:100%; float:left; text-align: center;">
                <a-button type="primary" html-type="submit">Tìm kiếm</a-button>
            </div>
        </a-form>
    </div>
</template>