<script lang="ts" setup>
import { onBeforeMount, onMounted, reactive, Ref, ref, watch } from "vue-demi";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { AddressService } from "@/services/address";

import { Address } from '@/type/Address';
import { number } from "vue-types";
import { message } from "ant-design-vue";
import router from "@/router/router";
const addressService = new AddressService();
const route = useRoute();

let address;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const formState = reactive({
  address: {
    type : '1',
    name: '',
    parentId : 0,
    status: 1,
  },
});
const onFinish = (values: any) => {
  console.log('Success:', values.address);
  addressService.addAddress(values.address)
    .then(
      (data) => {
        if (data && data.status === 204) {
          message.info("Success")
          router.push("/admin/address")
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

</script>
<template>
  <!-- :validate-messages="validateMessages" -->
  <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
    <a-form-item :name="['address', 'parentId']" label="ParentId" :rules="[{ required: true }]">
      <a-input v-model:value="formState.address.parentId" />
    </a-form-item>
    <a-form-item :name="['address', 'name']" label="Name" :rules="[{ required: true }]">
      <a-input v-model:value="formState.address.name" />
    </a-form-item>
    <a-form-item :name="['address', 'type']" label="Type">
      <a-select ref="select" v-model:value="formState.address.type" style="width: 120px" :rules="[{ required: true }]">
        <a-select-option value="1">Province</a-select-option>
        <a-select-option value="2">District</a-select-option>
        <a-select-option value="3">Precinct</a-select-option>
      </a-select>
    </a-form-item>
    <!-- <a-form-item :name="['address', 'parentId']" label="Parent" :rules="[{ required: true }]">
      <a-input v-model:value="formState.address.code" />
    </a-form-item> -->
    <a-form-item :name="['address', 'status']" label="Status">
      <a-select ref="select" v-model:value="formState.address.status" style="width: 120px" @change="handleChangeStatus">
        <a-select-option value="0">Active</a-select-option>
        <a-select-option value="1">Disable</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>