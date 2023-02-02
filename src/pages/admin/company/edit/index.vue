<script lang="ts" setup>
import { onBeforeMount, onMounted, reactive, Ref, ref, watch } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { CompanyService } from "@/services/company";

import { Company } from '@/type/Company';
import { number } from "vue-types";
import { message } from "ant-design-vue";
import router from "@/router/router";
import { AddressService } from "@/services/address";
import { AddressType } from "@/type/AddressType";
import { Address } from "@/type/Address";
const addressService = new AddressService();
const companyService = new CompanyService();
const route = useRoute();

let companyList;
const spinning = ref<boolean>(false);
const changeSpinning = () => {
  spinning.value = !spinning.value;
};
const featchCompany = () => {

  const id = route.params.id;
  if (id) {

    changeSpinning();
    companyService.getCompanyById(id)?.then((data) => {
      companyList = data;
      formState.company.companyId = companyList.id;
      formState.company.name = companyList.name;
      formState.company.code = companyList.code;
      formState.company.provinceCode = companyList.provinceCode;
      formState.company.districtCode = companyList.districtCode;
      formState.company.precinctCode = companyList.precinctCode;
      formState.company.star = companyList.star;
      formState.company.information = companyList.information;
      formState.company.status = companyList.status;
      changeSpinning();
    }).then(() => {
      if (formState.company.provinceCode !== '') {
        changeProvince(formState.company.provinceCode);
      }
    }).then(() => {
      if (formState.company.districtCode !== '') {
        changeDistrict(formState.company.districtCode);
      }
    });
  }
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const formState = reactive({
  company: {
    companyId: 0,
    name: '',
    code: '',
    provinceCode: '',
    districtCode: '',
    precinctCode: '',
    star: 0,
    information: '',
    status: 1
  },
});
const onFinish = (values: any) => {
  console.log('Success:', values.company);
  changeSpinning();
  companyService.editCompany(values.company)
    .then(
      (data) => {
        if (data && data.status === 204) {
          message.info("Success")

        } else {
          message.error('Has error, Contact to developer')
        }
        changeSpinning();
      }
    ).then(() => {
      router.replace("/admin/company")
    })
    .catch(
      (err) => { message.error(err) }
    )
};

const handleChangeStatus = () => {

}

onMounted: {
  featchCompany();
}

watch(() => route.params.id, () => {
  featchCompany();
})

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
const fixStar = (star: number) => {
  formState.company.star = star;
}

</script>
<template>
  <!-- :validate-messages="validateMessages" -->
  <a-spin :spinning="spinning">
    <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
      <a-form-item :name="['company', 'companyId']" label="Id" :rules="[{ required: true }]" :hidden="true">
        <a-input-number v-model:value="formState.company.companyId" />
      </a-form-item>
      <a-form-item :name="['company', 'name']" label="Name" :rules="[{ required: true }]">
        <a-input v-model:value="formState.company.name" />
      </a-form-item>
      <a-form-item :name="['company', 'code']" label="Code" :rules="[{ required: true }]">
        <a-input v-model:value="formState.company.code" />
      </a-form-item>
      <a-form-item :name="['company', 'provinceCode']" label="Province">
        <a-select ref="select" v-model:value="formState.company.provinceCode" @change="changeProvince">
          <a-select-option v-for="data in listProvince" :key="data" :value="data.code">{{
            data.name
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :name="['company', 'districtCode']" label="District ">
        <a-select ref="select" v-model:value="formState.company.districtCode" @change="changeDistrict">
          <a-select-option v-for="data in listDistrict" :key="data" :value="data.code">{{
            data.name
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :name="['company', 'precinctCode']" label="Precinct">
        <a-select ref="select" v-model:value="formState.company.precinctCode">
          <a-select-option v-for="data in listPrecinct" :key="data" :value="data.code">{{
            data.name
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :name="['company', 'star']" label="Star">
        <rate :value="formState.company.star" @change="fixStar" />
      </a-form-item>
      <a-form-item :name="['company', 'information']" label="Infomation">
        <a-input v-model:value="formState.company.information" />
      </a-form-item>
      <a-form-item :name="['company', 'status']" label="Status">
        <a-select ref="select" v-model:value="formState.company.status" style="width: 120px"
          @change="handleChangeStatus">
          <a-select-option value="0">Active</a-select-option>
          <a-select-option value="1">Disable</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </a-spin>
</template>