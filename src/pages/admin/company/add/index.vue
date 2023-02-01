<script lang="ts" setup>
import { onBeforeMount, onMounted, reactive, Ref, ref, watch } from "vue-demi";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { CompanyService } from "@/services/company";

import { Company } from '@/type/Company';
import { number } from "vue-types";
import { message } from "ant-design-vue";
import { AddressService } from "@/services/address";
import { AddressType } from "@/type/AddressType";
import { Address } from "@/type/Address";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
const companyService = new CompanyService();
const addressService = new AddressService();
const route = useRoute();
let company;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
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
  console.log('Success:', values.company);
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

const handleChangeStatus = () => {

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
  <!-- :validate-messages="validateMessages" -->
  <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
    <a-form-item :name="['company', 'name']" label="Name" :rules="[{ required: true }]">
      <a-input v-model:value="formState.company.name" />
    </a-form-item>
    <a-form-item :name="['company', 'code']" label="Code" :rules="[{ required: true }]">
      <a-input v-model:value="formState.company.code" />
    </a-form-item>
    <a-form-item :name="['company', 'provinceCode']" label="Province"  >
      <a-select ref="select" v-model:value="formState.company.provinceCode" 
        @change="changeProvince">
        <a-select-option v-for="data in listProvince" :key="data" :value="data.code">{{
          data.name
        }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :name="['company', 'districtCode']" label="District ">
      <a-select ref="select" v-model:value="formState.company.districtCode" 
        @change="changeDistrict">
        <a-select-option v-for="data in listDistrict" :key="data" :value="data.code">{{
          data.name
        }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :name="['company', 'precinctCode']" label="Precinct" >
      <a-select ref="select" v-model:value="formState.company.precinctCode" >
        <a-select-option v-for="data in listPrecinct" :key="data" :value="data.code">{{
          data.name
        }}</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item :name="['company', 'star']" label="Star">
      <a-input-number v-model:value="formState.company.star" />
    </a-form-item>
    <a-form-item :name="['company', 'information']" label="Infomation">
      <a-input v-model:value="formState.company.information" />
    </a-form-item>
    <a-form-item :name="['company', 'status']" label="Status">
      <a-select ref="select" v-model:value="formState.company.status" style="width: 120px" @change="handleChangeStatus">
        <a-select-option value="0">Active</a-select-option>
        <a-select-option value="1">Disable</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>