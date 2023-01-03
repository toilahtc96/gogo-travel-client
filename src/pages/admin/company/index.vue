<script lang="ts" setup>
import { Ref, ref, onMounted, reactive, watch, computed, onActivated, onRenderTriggered, onUpdated } from 'vue'
import { CompanyService } from '../../../services/company';
import { List, TableColumnsType } from 'ant-design-vue';

const defaultCompanyPage = ref({
  page: 0,
  size: 5
});
let spinning = ref({ data: false });
const columns: TableColumnsType = [
  { title: 'Full Name', width: 300, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Code', width: 100, dataIndex: 'code', key: 'code', fixed: 'left' },
  { title: 'province', dataIndex: 'provinceCode', key: '1' },
  { title: 'district', dataIndex: 'districtCode', key: '2' },
  { title: 'precinct', dataIndex: 'precinctCode', key: '3' },
  { title: 'star', dataIndex: 'star', key: '4' },
  { title: 'information', dataIndex: 'information', key: '5' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

const companyService = new CompanyService();
let companyActives = ref({
  listData: []
});
onMounted(async () => {
spinning.value.data=true;  
  companyService.getListCompayActive(defaultCompanyPage.value.page, defaultCompanyPage.value.size).then(data => {
    companyActives.value = { ...companyActives.value, listData: data };
  }).then(()=>{
    spinning.value.data=false;
  });
  companyService.getAll().then((data) => {
    setTotal(data.length);
  }).then(() => {
    spinning.value.data=false;
  });
})
let pageSetting = ref({
  current: new Number(1),
  total: new Number(0),
});

const setTotal = (total: Number) => {
  pageSetting.value.total = total;
}

const change = async (page: Number, pageSize: Number) => {
  spinning.value.data=true;
  companyService.getListCompayActive(page, pageSize).then((data) => {
    companyActives.value = { ...companyActives.value, listData: data };
    spinning.value.data=false;
  });
  companyService.getAll().then((data) => {
    setTotal(data.length);
  });
}
const showSizeChange = (current: number, size: number) => {
  debugger;
  defaultCompanyPage.value.size=size;

}
watch(() => companyActives.value.listData, (oldData, newData) => {
})
watch(() => pageSetting.value.total, (oldData, newData) => {
})
</script>

<template>
  <a-spin :spinning="spinning.data">
    <a-table :columns="columns" :data-source="companyActives.listData" :scroll="{ x: 1300, y: 1000 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <router-link v-if="record.id" :to="{ name: 'admin-company-edit', params: { id: record.id } }"><a>edit
            </a></router-link>
        </template>
      </template>
    </a-table>
  </a-spin>
  <Pagination :current="pageSetting.current" :total="pageSetting.total" @change="change"
    :pageSize="defaultCompanyPage.size" @showSizeChange="showSizeChange" />
</template>
