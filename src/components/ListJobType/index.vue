<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { JobTypeService } from '@/services/jobTypeService';
import { TableColumnsType } from 'ant-design-vue';
import { EditTwoTone } from '@ant-design/icons-vue';

const defaultPage = ref({
  page: 0,
  size: 5
});
let spinning = ref({ data: false });
const columns: TableColumnsType = [
  { title: 'JobType Name', width: 300, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Description', width: 300, dataIndex: 'description', key: 'description', fixed: 'left' },
  { title: 'status',width: 100, dataIndex: 'status', key: 'status' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

const jobTypeService = new JobTypeService();
let jobTypeActives = ref({
  listData: []
});
onMounted(async () => {
spinning.value.data=true;  
  jobTypeService.getListJobTypeActive(defaultPage.value.page, defaultPage.value.size).then(data => {
    jobTypeActives.value = { ...jobTypeActives.value, listData: data };
  }).then(()=>{
    spinning.value.data=false;
  });
  jobTypeService.getAll().then((data) => {
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
  jobTypeService.getListJobTypeActive(page, pageSize).then((data) => {
    jobTypeActives.value = { ...jobTypeActives.value, listData: data };
    spinning.value.data=false;
  });
  jobTypeService.getAll().then((data) => {
    setTotal(data.length);
  });
}
const showSizeChange = (current: number, size: number) => {
  defaultPage.value.size=size;

}
</script>
<template>
  <a-spin :spinning="spinning.data">
    <a-table :columns="columns" :data-source="jobTypeActives.listData" :scroll="{ x: 1300, y: 1000 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <router-link v-if="record.id" :to="{ name: 'admin-job-type-edit', params: { id: record.id } }"><a><EditTwoTone />
            </a></router-link>
        </template>
      </template>
    </a-table>
  </a-spin>
  <Pagination :current="pageSetting.current" :total="pageSetting.total" @change="change"
    :pageSize="defaultPage.size" @showSizeChange="showSizeChange" />
</template>
