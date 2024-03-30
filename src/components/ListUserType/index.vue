<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { UserTypeService } from '@/services/userTypeService';
import { TableColumnsType } from 'ant-design-vue';

const defaultPage = ref({
  page: 0,
  size: 5
});
let spinning = ref({ data: false });
const columns: TableColumnsType = [
  { title: 'Meaning', width: 300, dataIndex: 'meaning', key: 'meaning', fixed: 'left' },
  { title: 'Code', width: 200, dataIndex: 'code', key: 'code', fixed: 'left' },
  { title: 'status',width: 100, dataIndex: 'status', key: 'status' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

const userTypeService = new UserTypeService();
let userTypeActives = ref({
  listData: []
});
onMounted(async () => {
spinning.value.data=true;  
userTypeService.getListUserType(defaultPage.value.page, defaultPage.value.size).then(data => {
  userTypeActives.value = { ...userTypeActives.value, listData: data.data };
  console.log(userTypeActives.value)
  }).then(()=>{
    spinning.value.data=false;
  });
  userTypeService.getAll().then((data) => {
    setTotal(data?.length);
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
  userTypeService.getListUserType(page, pageSize).then((data) => {
    userTypeActives.value = { ...userTypeActives.value, listData: data.data };
    spinning.value.data=false;
  });
  userTypeService.getAll().then((data) => {
    setTotal(data.length);
  });
}
const showSizeChange = (current: number, size: number) => {
  defaultPage.value.size=size;

}
</script>
<template>
  <a-spin :spinning="spinning.data">
    <a-table :columns="columns" :data-source="userTypeActives.listData" :scroll="{ x: 1300, y: 1000 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <router-link v-if="record.id" :to="{ name: 'admin-user-type-edit', params: { id: record.id } }"><a>edit
            </a></router-link>
        </template>
      </template>
    </a-table>
  </a-spin>
  <Pagination :current="pageSetting.current" :total="pageSetting.total" @change="change"
    :pageSize="defaultPage.size" @showSizeChange="showSizeChange" />
</template>
