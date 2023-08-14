<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { CompanyService } from "@/services/company";
import { message } from "ant-design-vue";
import { AddressService } from "@/services/address";
import { AddressType } from "@/type/AddressType";
import { Address } from "@/type/Address";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
const companyService = new CompanyService();
const addressService = new AddressService();
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const formItemStyle = {
    labelCol3: { width: '100%', },
    labelColInput3: { width: '100%', float: 'left' },
};
const formState = reactive({
    company: {
        name: '',
        code: '',
        provinceCode: '',
        districtCode: '',
        precinctCode: '',
        star: 0,
        information: '',
        status: StatusType.ACTIVED
    },
});
const onFinish = (values: any) => {
    companyService.addCompany(values.company)
        .then(
            (data) => {
                if (data && data.status === 204) {
                    message.info("Success")
                    router.push("/admin/company")
                } else {
                    message.error('Has error, Contact to developer')
                }
            }
        )
        .catch(
            (err) => { message.error(err) }
        )
};
let listProvince = ref<Address[]>();
let listDistrict = ref<Address[]>();
let listPrecinct = ref<Address[]>();
onMounted(() => {
    addressService.getByType(AddressType.PROVINCE).then(data => {
        if (data) {
            listProvince.value = data;
        }
    });
})

const changeProvince = (value: string) => {
    formState.company.districtCode = '';
    formState.company.precinctCode = '';
    addressService.getByTypeAndParentCode(AddressType.DISTRICT,value).then(data => {
        if (data) {
            listDistrict.value = data;
        }
    })
}
const changeDistrict = (value: string) => {
    formState.company.precinctCode = '';
    addressService.getByTypeAndParentCode(AddressType.PRECINCT,value).then(data => {
        if (data) {
            listPrecinct.value = data;
        }
    })
}

const changeAddress = (data: string, type: AddressType) => {
    switch (type) {
        case AddressType.PROVINCE:
            formState.company.provinceCode = data;
            break;
        case AddressType.DISTRICT:
            formState.company.districtCode = data;
            break;
        case AddressType.PRECINCT:
            formState.company.precinctCode = data;
            break;
        default:
            break;
    }
}
const fixStar = (star: number) => {
    formState.company.star = star;
}
let provinceName = ref<[string,string]>(['company', 'provinceCode']);
let districtName = ref<[string,string]>(['company', 'districtCode']);
let precinctName = ref<[string,string]>(['company', 'precinctCode']);
const styleInput = "float: left; width: 100%;";
const selectStatus = (value: StatusType)=>{
    formState.company.status= value;
}
</script>
<template>
    <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
        <a-form-item :name="['company', 'name']" label="Name" :rules="[{ required: true }]">
            <a-input v-model:value="formState.company.name" />
        </a-form-item>
        <a-form-item :name="['company', 'code']" label="Code" :rules="[{ required: true }]">
            <a-input v-model:value="formState.company.code" />
        </a-form-item>
        <ComboAddress :provinceCode="formState.company.provinceCode" :districtCode="formState.company.districtCode"
            :precinctCode="formState.company.precinctCode" @changeAddress="changeAddress" :provinceName="provinceName"
            :districtName="districtName" :precinctName="precinctName" :formItemStyle="formItemStyle"/>
        <a-form-item :name="['company', 'star']" label="Star" :style="styleInput">
            <Rate :value="formState.company.star" @change="fixStar" />
        </a-form-item> 
        <a-form-item :name="['company', 'information']" label="Infomation"  :style="styleInput">
            <a-input v-model:value="formState.company.information" />
        </a-form-item>
        <a-form-item :name="['company', 'status']" label="Status"  :style="styleInput">
            <StatusElement :status="formState.company.status" ref="select"  @selectStatus="selectStatus"/>
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }"  :style="styleInput">
            <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
    </a-form>
</template>