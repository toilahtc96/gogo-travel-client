<script lang="ts" setup>
import { ref } from 'vue'
import Company from '@/type/Company';
import { StatusType } from '@/type/StatusType';
// import { SearchCompany } from '@/type/SearchCompany';

const tableCompany = ref();
const defaultCompanyPage = ref({
  page: 0,
  size: 10
});
let spinning = ref({ data: true }); 
let pageSetting = ref({
  current: new Number(1),
  total: new Number(0),
});

const setTotal = (total: Number) => {
  pageSetting.value.total = total;
}

let dataSearch = ref({
  companyName: '',
  companyCode: '',
  provinceCode: '',
  districtCode: '',
  precinctCode: '',
  star: 1,
  information: '',
  status: StatusType.ACTIVED,
  page: defaultCompanyPage.value.page,
  size: defaultCompanyPage.value.size
});

const setSpin = (spinValue: boolean) => {
  spinning.value.data = spinValue;
}
const showSizeChange = (current: number, size: number) => {
  defaultCompanyPage.value.size = size;
}
const settingDataSearch = (data: any) => {
  dataSearch.value = data;
  dataSearch.value.page = defaultCompanyPage.value.page;
  dataSearch.value.size = defaultCompanyPage.value.size;
}

let companyActives = ref({
  listData: ref<[Company]>()
});
const change = async (page: number, pageSize: number) => {
  tableCompany.value.changePage(page, pageSize);
}
const searchCompany = (data: any) => {
  data.page = defaultCompanyPage.value.page;
  data.size = defaultCompanyPage.value.size;
  debugger;
  tableCompany.value.searchCompany(data);
}
const setPaging = (page: number, pageSize: number) => {
  defaultCompanyPage.value.page = page;
  defaultCompanyPage.value.size = pageSize;
}

</script>

<template>
  <a-spin :spinning="spinning.data">
    <SearchCompany @searchCompany="searchCompany" />
    <TableCompany :companyActives="companyActives" :dataSearch="dataSearch" @setSpin="setSpin" @setTotal="setTotal"
      ref="tableCompany" :defaultCompanyPage="defaultCompanyPage" />
  </a-spin>
  <Pagination :current="pageSetting.current" :total="pageSetting.total" @change="change"
    :pageSize="defaultCompanyPage.size" @showSizeChange="showSizeChange" />
</template>