<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ProcessService } from '@/services/processService';
import { TableColumnsType } from 'ant-design-vue';

const defaultPage = ref({
  page: 0,
  size: 5
});
let spinning = ref({ data: false });
const columns: TableColumnsType = [
  { title: 'Code', width: 200, dataIndex: 'code', key: 'code', fixed: 'left' },
  { title: 'Meaning', width: 300, dataIndex: 'meaning', key: 'meaning', fixed: 'left' },
  { title: 'status', width: 100, dataIndex: 'status', key: 'status' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

const processService = new ProcessService();
let processActives = ref({
  listData: []
});
onMounted(async () => {
  spinning.value.data = true;
  processService.getListProcess(defaultPage.value.page, defaultPage.value.size).then(data => {
    if (data) {

      processActives.value = { ...processActives.value, listData: data.data };
      setTotal(data.total);
    }
  }).then(() => {
    spinning.value.data = false;
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
  spinning.value.data = true;
  processService.getListProcess(page, pageSize).then((data) => {
    if (data) {
      processActives.value = { ...processActives.value, listData: data.data };
      setTotal(data.total);
    }
    spinning.value.data = false;
  });

}
const showSizeChange = (current: number, size: number) => {
  defaultPage.value.size = size;

}
</script>
<template>
  <a-spin :spinning="spinning.data">
    <a-table :columns="columns" :data-source="processActives.listData" :scroll="{ x: 1300, y: 1000 }">
      <template #bodyCell="{ column, record }">

        <template v-if="column.key === 'operation'">
          <router-link v-if="record.id" :to="{ name: 'admin-process-edit', params: { id: record.id } }"><a>edit
            </a></router-link>
        </template>
      </template>
    </a-table>
  </a-spin>
  <Pagination :current="pageSetting.current" :total="pageSetting.total" @change="change" :pageSize="defaultPage.size"
    @showSizeChange="showSizeChange" />
</template>
