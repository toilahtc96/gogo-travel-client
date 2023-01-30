<script lang="ts" setup>
import { Ref, ref, onMounted, reactive, watch, computed, onActivated, onRenderTriggered, onUpdated } from 'vue'
import { RoleService } from '../../../services/role';
import { List, TableColumnsType } from 'ant-design-vue';

const defaultPage = ref({
  page: 0,
  size: 5
});
let spinning = ref({ data: false });
const columns: TableColumnsType = [
  { title: 'Role Name', width: 300, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Code', width: 200, dataIndex: 'code', key: 'code', fixed: 'left' },
  { title: 'status',width: 100, dataIndex: 'status', key: 'status' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

const roleService = new RoleService();
let roleActives = ref({
  listData: []
});
onMounted(async () => {
spinning.value.data=true;  
  roleService.getListRoleActive(defaultPage.value.page, defaultPage.value.size).then(data => {
    roleActives.value = { ...roleActives.value, listData: data };
  }).then(()=>{
    spinning.value.data=false;
  });
  roleService.getAll().then((data) => {
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
  roleService.getListRoleActive(page, pageSize).then((data) => {
    roleActives.value = { ...roleActives.value, listData: data };
    spinning.value.data=false;
  });
  roleService.getAll().then((data) => {
    setTotal(data.length);
  });
}
const showSizeChange = (current: number, size: number) => {
  defaultPage.value.size=size;

}
watch(() => roleActives.value.listData, (oldData, newData) => {
})
watch(() => pageSetting.value.total, (oldData, newData) => {
})
</script>

<template>
  <a-spin :spinning="spinning.data">
    <a-table :columns="columns" :data-source="roleActives.listData" :scroll="{ x: 1300, y: 1000 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <router-link v-if="record.id" :to="{ name: 'admin-role-edit', params: { id: record.id } }"><a>edit
            </a></router-link>
        </template>
      </template>
    </a-table>
  </a-spin>
  <Pagination :current="pageSetting.current" :total="pageSetting.total" @change="change"
    :pageSize="defaultPage.size" @showSizeChange="showSizeChange" />
</template>
