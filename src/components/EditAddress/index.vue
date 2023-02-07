<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue-demi";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import router from "@/router/router";
import { AddressType } from "@/type/AddressType";
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


const state = reactive({
  dataProvince: ref<{ label: string; value: any; }[]>(),
  fetching: false,
});

function getListAddressByType(type: AddressType) {
  state.dataProvince = [{
    label: '',
    value: ''
  }];
  state.fetching = true;
  addressService.getByType(type).then((data) => {
    state.dataProvince = data!.map((province: any) => ({
      label: `${province.name}`,
      value: province.code,
    }));
  }).finally(() => {
    state.fetching = false;
  })
}

const fetchProvince = () => {
  getListAddressByType(AddressType.PROVINCE);
}

onMounted(() => {
  fetchAddress();
})

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
        <StatusElement :status="formState.address.status" ref="select" />
      </a-form-item>
      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </a-spin>
</template>