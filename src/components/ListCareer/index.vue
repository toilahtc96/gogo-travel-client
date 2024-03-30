<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { CareerService } from '@/services/careerService';
import { TableColumnsType } from 'ant-design-vue';
import { EditTwoTone } from '@ant-design/icons-vue';

const defaultPage = ref({
  page: 0,
  size: 5
});
let spinning = ref({ data: false });
const columns: TableColumnsType = [
  { title: 'Career Name', width: 300, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'status',width: 100, dataIndex: 'status', key: 'status' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

const careerService = new CareerService();
let careerActives = ref({
  listData: []
});
onMounted(async () => {
spinning.value.data=true;  
  careerService.getListCareerActive(defaultPage.value.page, defaultPage.value.size).then(data => {
    careerActives.value = { ...careerActives.value, listData: data };
  }).then(()=>{
    spinning.value.data=false;
  });
  careerService.getAll().then((data) => {
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
  careerService.getListCareerActive(page, pageSize).then((data) => {
    careerActives.value = { ...careerActives.value, listData: data };
    spinning.value.data=false;
  });
  careerService.getAll().then((data) => {
    setTotal(data.length);
  });
}
const showSizeChange = (current: number, size: number) => {
  defaultPage.value.size=size;

}
</script>
<template>
  <a-spin :spinning="spinning.data">
    <a-table :columns="columns" :data-source="careerActives.listData" :scroll="{ x: 1300, y: 1000 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <router-link v-if="record.id" :to="{ name: 'admin-career-edit', params: { id: record.id } }"><a><EditTwoTone />
            </a></router-link>
        </template>
      </template>
    </a-table>
  </a-spin>
  <Pagination :current="pageSetting.current" :total="pageSetting.total" @change="change"
    :pageSize="defaultPage.size" @showSizeChange="showSizeChange" />
</template>
