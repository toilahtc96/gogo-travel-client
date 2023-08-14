<script lang="ts" setup>
import { ref, onMounted, onUpdated } from 'vue'
import { Address, SearchAddress } from '@/type/Address';
import { AddressService } from '@/services/address';
import { StatusType } from '@/type/StatusType';
import { AddressType } from '@/type/AddressType';
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
let provinceCode = ref<string>();
let provinceName = ref<string>();
let districtCode = ref<string>();
let districtName = ref<string>();
let precinctCode = ref<string>();
let precinctName = ref<string>();
let type = ref<AddressType>();
const searchAddress = (value: SearchAddress) => {
  // tim kiem o day
  addressService.findAddress(value).then((data) => {
    provinceCode.value = value.provinceCode;
    provinceName.value = value.provinceName;
    districtCode.value = value.districtCode;
    districtName.value = value.districtName;
    precinctCode.value = value.provinceCode;
    precinctName.value = value.precinctName;
    type.value = value.type;
    listAddress.value = data.data;
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
  //   precinctName: string,
  //   type: AddressType
  addressTable.value.changePage(page, pageSize, provinceCode.value, provinceName.value,
    districtCode.value, districtName.value, precinctCode.value, precinctName.value, type.value);
}

const addressTable = ref();
const setTotal = (total: Number) => {
  pageSetting.value.total = total;
}
let dataSearch = ref<SearchAddress>({
  provinceCode: undefined,
  provinceName: undefined,
  districtCode: undefined,
  districtName: undefined,
  precinctCode: undefined,
  precinctName: undefined,
  type: AddressType.PROVINCE,
  status: StatusType.ACTIVED,
  page: defaultPage.value.page,
  size: defaultPage.value.size
});
const searchAddressComponent = ref();

</script>

<template>
  <a-spin :spinning="spinning.data">
    <SearchAddressComponent @searchAddress="searchAddress" :defaultPage="defaultPage" ref="searchAddressComponent" />
    <TableAddress :listAddress="listAddress" :dataSearch="dataSearch" @setSpin="setSpin" @setTotal="setTotal"
      :defaultPage="defaultPage" ref="addressTable" :defaultCompanyPage="defaultPage" />
  </a-spin>

  <Pagination :current="pageSetting.current" :total="pageSetting.total" @change="change" :pageSize="defaultPage.size"
    @showSizeChange="showSizeChange" />
</template>
