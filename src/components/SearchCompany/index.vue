<!-- Fullname,code,province,district,precinct,star,information -->
<script lang="ts" setup>
import { AddressService } from "@/services/address";
import { AddressType } from "@/type/AddressType";
import { Address, SearchAddress } from "@/type/Address";
import { onBeforeMount, onMounted, reactive, Ref, ref, watch } from "vue";
import { StatusType } from "@/type/StatusType";
const addressService = new AddressService();
const emit = defineEmits(['searchCompany'])
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const formItemStyle = {
    labelCol3: { width: '40%', },
    labelColInput3: { width: '100%', float: 'left' },
};
const formState = ref<SearchAddress>({
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

</script>
<template>
    <div style="background-color: #f1f1f1;">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['fullname']" label="Tên Công ty" :style="formItemStyle.labelCol3" style="float:left">
                <a-input v-model:value="formState.companyName" />
            </a-form-item>

            <a-form-item :name="['code']" label="Code" :style="formItemStyle.labelCol3" style="float:left">
                <a-input v-model:value="formState.companyCode" />
            </a-form-item>
            <SearchAddressCode :provinceCode="formState.provinceCode" :districtCode="formState.districtCode"
                :precinctCode="formState.precinctCode" @changeAddress="changeAddress" />
            <a-form-item :name="['status']" label="Status" :style="formItemStyle.labelCol3" style="float:left">
                <a-select ref="select" v-model:value="formState.status" style="width: 120px">
                    <a-select-option v-for="data in StatusType" :key="data" :value="data">{{
                        data
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <div style="width:100%; float:left; text-align: center;">
                <a-button type="primary" html-type="submit">Tìm kiếm</a-button>
            </div>
        </a-form>
    </div>
</template>