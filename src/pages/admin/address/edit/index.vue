<script lang="ts" setup>
import { onBeforeMount, onMounted, reactive, Ref, ref, watch } from "vue-demi";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
import router from "@/router/router";
import { AddressType } from "@/type/AddressType";
import { Address } from "@/type/Address";
import { AddressService } from "@/services/address";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const route = useRoute();
const addressService = new AddressService();
const spinning = ref<boolean>(false);
const changeSpinning = () => {
  spinning.value = !spinning.value;
}
let addressChanging;
const formState = reactive({
  address: {
    id: 0,
    name: '',
    status: 0,
  }
});
const fetchAddress = () => {
  const id = route.params.id;
  if (id) {
    changeSpinning();
    addressService.getAddressById(id)?.then((data) => {
      addressChanging = data;
      formState.address.id = addressChanging.id;
      formState.address.name = addressChanging.name;
      formState.address.status = addressChanging.status;
      changeSpinning();
    });
  }
}


const onFinish = (values: any) => {
  
  changeSpinning();
  addressService.editAddress(values.address)
    .then(
      (data) => {
        if (data && data.status === 204) {
          message.info("Success")
          router.push("/admin/address")
        } else {
          message.error('Has error, Contact to developer')
        }
        changeSpinning();
      }
    )
    .catch(
      (err) => { message.error(err) }
    )
};

const handleChangeStatus = () => {
}


const state = reactive({
  dataProvince: [],
  fetching: false,
});

function getListAddressByType(type: AddressType) {
  state.dataProvince = [];
  state.fetching = true;
  addressService.getByType(type).then((data) => {
    const dataRender = data.map((province: any) => ({
      label: `${province.name}`,
      value: province.code,
    }));
    state.dataProvince = dataRender;
  }).catch((err) => {
  }).finally(() => {
    state.fetching = false;
  })
}


const fetchProvince = () => {
  getListAddressByType(AddressType.PROVINCE);
}

onMounted: {
  fetchAddress();
}

watch(() => route.params.id, () => {
  fetchAddress();
})

</script>
<template>
  <a-spin :spinning="spinning">
    <!-- :validate-messages="validateMessages" -->
    <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
      <a-form-item :name="['address', 'id']" label="Id" :hidden="true">
        <a-input-number v-model:value="formState.address.id" />
      </a-form-item>
      <a-form-item :name="['address', 'name']" label="name">
        <a-input v-model:value="formState.address.name" />
      </a-form-item>
      <a-form-item :name="['address', 'status']" label="Status">
        <a-select ref="select" v-model:value="formState.address.status" style="width: 120px" @change="handleChangeStatus">
          <a-select-option value="ACTIVE">ACTIVE</a-select-option>
          <a-select-option value="BLOCK">BLOCK</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </a-spin>
</template>