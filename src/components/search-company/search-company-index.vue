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
let listProvince = ref<Address[]>();

let listDistrict = ref<Address[]>();

let listPrecinct = ref<Address[]>();
onMounted: {
    addressService.getByType(AddressType.PROVINCE).then(data => {
        if (data) {
            listProvince.value = data;
        }
    });
}

const changeProvince = (value: string) => {
    addressService.getByParentCode(value).then(data => {
        if (data) {
            listDistrict.value = data;
        }
    })
}
const changeDistrict = (value: string) => {
    addressService.getByParentCode(value).then(data => {
        if (data) {
            listPrecinct.value = data;
        }
    })
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
            <a-form-item :name="['provinceCode']" label="Province" :style="formItemStyle.labelCol3" style="float:left">
                <a-select ref="select" v-model:value="formState.provinceCode" :style="formItemStyle.labelColInput3"
                    @change="changeProvince">
                    <a-select-option v-for="data in listProvince" :key="data" :value="data.code">{{
                        data.name
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item :name="['districtCode']" label="District " :style="formItemStyle.labelCol3" style="float:left">
                <a-select ref="select" v-model:value="formState.districtCode" :style="formItemStyle.labelColInput3"
                    @change="changeDistrict">
                    <a-select-option v-for="data in listDistrict" :key="data" :value="data.code">{{
                        data.name
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item :name="['precinctCode']" label="Precinct" :style="formItemStyle.labelCol3" style="float:left">
                <a-select ref="select" v-model:value="formState.precinctCode" :style="formItemStyle.labelColInput3">
                    <a-select-option v-for="data in listPrecinct" :key="data" :value="data.code">{{
                        data.name
                    }}</a-select-option>
                </a-select>
            </a-form-item>
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