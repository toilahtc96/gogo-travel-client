<script lang="ts" setup>
import { ref, onMounted, onUpdated } from 'vue'
import { Address, SearchAddress } from '@/type/Address';
import { AddressService } from '@/services/address';
import { StatusType } from '@/type/StatusType';
const defaultPage = ref({
  page: 0,
  size: 5
});
let spinning = ref({ data: true });
let pageSetting = ref({
  current: new Number(1),
  total: new Number(0),
});
const addressService = new AddressService();
let listAddress = ref({
  listData: ref<[Address]>()
});
let nameAddress = ref<string>();
const searchAddress = (value: SearchAddress) => {
  // tim kiem o day
  addressService.findAddress(value).then((data) => {
    nameAddress.value = value.name;
    listAddress.value = data.data
    setTotal(data.total);
  })
}


const setSpin = (spinValue: boolean) => {
  spinning.value.data = spinValue;
}
const showSizeChange = (current: number, size: number) => {
  defaultPage.value.size = size;
  searchAddressComponent.value.settingDefaultPage(size);
}
const change = async (page: number, pageSize: number) => {
  addressTable.value.changePage(page, pageSize, nameAddress.value);
}

const addressTable = ref();
const setTotal = (total: Number) => {
  pageSetting.value.total = total;
}
let dataSearch = ref<SearchAddress>({
  name: '',
  status: StatusType.ACTIVED,
  page: defaultPage.value.page,
  size: defaultPage.value.size
});
const searchAddressComponent = ref();

</script>

<template>
  <a-spin :spinning="spinning.data">
    <SearchAddressComponent @searchAddress="searchAddress" :defaultPage="defaultPage" ref="searchAddressComponent"/>
    <TableAddress :listAddress="listAddress" :dataSearch="dataSearch" @setSpin="setSpin" @setTotal="setTotal" 
    :defaultPage="defaultPage" ref="addressTable" :defaultCompanyPage="defaultPage" />
  </a-spin>

  <Pagination :current="pageSetting.current" :total="pageSetting.total" @change="change"
    :pageSize="defaultPage.size" @showSizeChange="showSizeChange"  />
</template>
