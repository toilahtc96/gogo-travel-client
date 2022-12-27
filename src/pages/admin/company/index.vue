<script lang="ts" setup>
import { Ref, ref, onMounted, reactive, watch, computed, onActivated, onRenderTriggered, onUpdated } from 'vue'
import { Company } from '../../../type/Company';
import { CompanyService } from '../../../services/company';
import type { TableColumnsType } from 'ant-design-vue';
import router from '@/router/router';

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
let listCompanyActive = await companyService.getListCompayActive();
const test = () => {
  alert(1)
}
onUpdated(() => {
  companyService.getListCompayActive().then((data) => {
    listCompanyActive = data;
  }).then(()=> {
    listCompanyActive = [];
  });
})
watch(()=> listCompanyActive, ()=> {
  console.log(listCompanyActive)
})
</script>

<template>
  <router-view></router-view>
  <a-table :columns="columns" :data-source="listCompanyActive" :scroll="{ x: 1300, y: 1000 }">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'operation'">
        <router-link :to="{ name: 'admin-company-edit', params: { id: record.id } }"><a>edit </a></router-link>
      </template>
    </template>
  </a-table>
</template>
