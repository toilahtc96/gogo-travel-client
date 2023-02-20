<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { LevelService } from '@/services/levelService';
import { TableColumnsType } from 'ant-design-vue';

const defaultPage = ref({
  page: 0,
  size: 5
});
let spinning = ref({ data: false });
const columns: TableColumnsType = [
  { title: 'Name', width: 200, dataIndex: 'levelName', key: 'levelName', fixed: 'left' },
  { title: 'Meaning', width: 300, dataIndex: 'meaning', key: 'meaning', fixed: 'left' },
  { title: 'status', width: 100, dataIndex: 'status', key: 'status' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

const levelService = new LevelService();
let levelActives = ref({
  listData: []
});
onMounted(async () => {
  spinning.value.data = true;
  levelService.getListLevel(defaultPage.value.page, defaultPage.value.size).then(data => {
    levelActives.value = { ...levelActives.value, listData: data.data };
    setTotal(data.total);
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
  levelService.getListLevel(page, pageSize).then((data) => {
    levelActives.value = { ...levelActives.value, listData: data.data };
    setTotal(data.total);
    spinning.value.data = false;
  });

}
const showSizeChange = (current: number, size: number) => {
  defaultPage.value.size = size;

}
</script>
<template>
  <a-spin :spinning="spinning.data">
    <a-table :columns="columns" :data-source="levelActives.listData" :scroll="{ x: 1300, y: 1000 }">
      <template #bodyCell="{ column, record}">
        
        <template v-if="column.key === 'operation'">
          <router-link v-if="record.id" :to="{ name: 'admin-level-edit', params: { id: record.id } }"><a>edit
          </a></router-link>
        </template>
      </template>
    </a-table>
  </a-spin>
  <Pagination :current="pageSetting.current" :total="pageSetting.total" @change="change" :pageSize="defaultPage.size"
    @showSizeChange="showSizeChange" />
</template>
