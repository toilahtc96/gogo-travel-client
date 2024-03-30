<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { AddressService } from "@/services/address";
import { message } from "ant-design-vue";
import router from "@/router/router";
import { AddressType } from "@/type/AddressType";
import { StatusType } from "@/type/StatusType";
const addressService = new AddressService();
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const formState = reactive({
  address: {
    type: AddressType.PROVINCE,
    name: '',
    parentId: '',
    status: StatusType.ACTIVED
  },
});
const onFinish = (values: any) => {
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
watch(() => formState.address.type, (data) => {
  if (data !== AddressType.PROVINCE) {
    if (data == AddressType.DISTRICT) {
      getAndBuildParentValue(AddressType.PROVINCE);
    }
    if (data == AddressType.PRECINCT) {
      getAndBuildParentValue(AddressType.DISTRICT);
    }
  }
})
const parentData = ref([{ "value": -1, "key": "" }]);
const getAndBuildParentValue = (data: AddressType) => {
  addressService.getByType(data).then((addressData) => {
    if (addressData !== null && addressData !== undefined) {
      parentData.value = [];
      for (let i = 0; i < addressData.length; i++) {
        parentData.value.push({
          "value": addressData[i].id,
          "key": addressData[i].name
        })
      }
    }
  })
}
</script>
<template>
  <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
    <a-form-item :name="['address', 'name']" label="Name" :rules="[{ required: true }]">
      <a-input v-model:value="formState.address.name" />
    </a-form-item>
    <a-form-item :name="['address', 'type']" label="Type">
      <a-select ref="select" v-model:value="formState.address.type" style="width: 15%" :rules="[{ required: true }]" allowClear>
        <a-select-option v-for="data in AddressType" :key="data" :value="data"> {{ data }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :name="['address', 'parentId']" label="Parent">
      <a-select ref="select" v-model:value="formState.address.parentId" style="width: 15%" allowClear
        :rules="[{ required: false }]">
        <a-select-option v-for="data in parentData" :key="data.value"> {{ data.key }} </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :name="['address', 'status']" label="Status">
      <StatusElement :status="formState.address.status" ref="select" />
    </a-form-item>
    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>