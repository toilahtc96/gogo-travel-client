<script lang="ts" setup>
import { ref } from 'vue'
import { Job } from '@/type/Job';
import { StatusType } from '@/type/StatusType';

const tableJob = ref();
const defaultJobPage = ref({
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
  status: StatusType.ACTIVED,
  page: defaultJobPage.value.page,
  size: defaultJobPage.value.size
});

const setSpin = (spinValue: boolean) => {
  spinning.value.data = spinValue;
}
const showSizeChange = (current: number, size: number) => {
  defaultJobPage.value.size = size;
}

let jobActives = ref({
  listData: ref<[Job]>()
});
const change = async (page: number, pageSize: number) => {
  tableJob.value.changePage(page, pageSize);
}
const searchJob = (data: any) => {
  data.page = defaultJobPage.value.page;
  data.size = defaultJobPage.value.size;
  tableJob.value.searchJob(data);
}
const setPaging = (page: number, pageSize: number) => {
  defaultJobPage.value.page = page;
  defaultJobPage.value.size = pageSize;
}

</script>

<template>
  <a-spin :spinning="spinning.data">
    <SearchJob @searchJob="searchJob" />
    <TableJob :jobActives="jobActives" :dataSearch="dataSearch" @setSpin="setSpin" @setTotal="setTotal"
      ref="tableJob" :defaultJobPage="defaultJobPage" />
  </a-spin>
  <Pagination :current="pageSetting.current" :total="pageSetting.total" @change="change"
    :pageSize="defaultJobPage.size" @showSizeChange="showSizeChange" />
</template>