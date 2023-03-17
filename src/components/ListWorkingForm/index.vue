<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { WorkingFormService } from '@/services/workingFormService';
import { TableColumnsType } from 'ant-design-vue';
import { EditTwoTone } from '@ant-design/icons-vue';

const defaultPage = ref({
  page: 0,
  size: 5
});
let spinning = ref({ data: false });
const columns: TableColumnsType = [
  { title: 'WorkingForm Name', width: 300, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Description', width: 300, dataIndex: 'description', key: 'description', fixed: 'left' },
  { title: 'status',width: 100, dataIndex: 'status', key: 'status' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

const workingFormService = new WorkingFormService();
let workingFormActives = ref({
  listData: []
});
onMounted(async () => {
spinning.value.data=true;  
  workingFormService.getListWorkingFormActive(defaultPage.value.page, defaultPage.value.size).then(data => {
    workingFormActives.value = { ...workingFormActives.value, listData: data };
  }).then(()=>{
    spinning.value.data=false;
  });
  workingFormService.getAll().then((data) => {
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
  workingFormService.getListWorkingFormActive(page, pageSize).then((data) => {
    workingFormActives.value = { ...workingFormActives.value, listData: data };
    spinning.value.data=false;
  });
  workingFormService.getAll().then((data) => {
    setTotal(data.length);
  });
}
const showSizeChange = (current: number, size: number) => {
  defaultPage.value.size=size;

}
</script>
<template>
  <a-spin :spinning="spinning.data">
    <a-table :columns="columns" :data-source="workingFormActives.listData" :scroll="{ x: 1300, y: 1000 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <router-link v-if="record.id" :to="{ name: 'admin-working-form-edit', params: { id: record.id } }"><a><EditTwoTone />
            </a></router-link>
        </template>
      </template>
    </a-table>
  </a-spin>
  <Pagination :current="pageSetting.current" :total="pageSetting.total" @change="change"
    :pageSize="defaultPage.size" @showSizeChange="showSizeChange" />
</template>
