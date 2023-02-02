<script lang="ts" setup>
import { Ref, ref, onMounted, reactive, watch, computed, onActivated, onRenderTriggered, onUpdated } from 'vue'
import { Address } from '../../../type/Address';
import { AddressService } from '../../../services/address';
import type { TableColumnsType } from 'ant-design-vue';
import router from '@/router/router';

const columns: TableColumnsType = [
  { title: 'Name', width: 300, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Code', width: 100, dataIndex: 'code', key: 'code', fixed: 'left' },
  { title: 'Type', dataIndex: 'type', key: '1' },
  { title: 'parent', dataIndex: 'parentId', key: 'parent' },
  { title: 'Status', dataIndex: 'status', key: '5' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

const addressService = new AddressService();
let listAddress = ref<Address[]>();

onMounted(() => {
  addressService.getListAddressActive().then((data: (Address[] | void)) => {
    if (data ) {
      listAddress.value = data;
    }
  }).then(() => {

  });
})

onUpdated(() => {
  addressService.getListAddressActive().then((data: (Address[] | void)) => {
    if (data ) {
      listAddress.value = data;
    }
  }).then(() => {

  });
})
</script>

<template>
  <router-view></router-view>
  <a-table :columns="columns" :data-source="listAddress" :scroll="{ x: 1300, y: 1000 }">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'parent' && record.parentId === 0">
        ---
      </template>
      <template v-if="column.key === 'operation'">
        <router-link :to="{ name: 'admin-address-edit', params: { id: record.id } }"><a>edit </a></router-link>
      </template>
    </template>
  </a-table>
</template>
