<script lang="ts" setup>
import { onBeforeMount, onMounted, reactive, Ref, ref, watch } from "vue-demi";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { CompanyService } from "@/services/company";

import { Company } from '@/type/Company';
import { number } from "vue-types";
import { message } from "ant-design-vue";
import router from "@/router/router";
const companyService = new CompanyService();
const route = useRoute();

let companyList;

const featchCompany = () => {

  const id = route.params.id;
  if (id) {
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
    });
  }
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

// const validateMessages = {
//   required: '${label} is required!',
//   types: {
//     email: '${label} is not a valid email!',
//     number: '${label} is not a valid number!',
//   },
//   number: {
//     range: '${label} must be between ${min} and ${max}',
//   },
// };

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
  companyService.editCompany(values.company)
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

onMounted: {
  featchCompany();
}

watch(() => route.params.id, () => {
  featchCompany();
})
</script>
<template>
  <!-- :validate-messages="validateMessages" -->
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
    <a-form-item :name="['company', 'provinceCode']" label="Province Code" :rules="[{ required: true }]">
      <a-input v-model:value="formState.company.provinceCode" />
    </a-form-item>
    <a-form-item :name="['company', 'districtCode']" label="District Code" :rules="[{ required: true }]">
      <a-input v-model:value="formState.company.districtCode" />
    </a-form-item>
    <a-form-item :name="['company', 'precinctCode']" label="Precinct Code" :rules="[{ required: true }]">
      <a-input v-model:value="formState.company.precinctCode" />
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