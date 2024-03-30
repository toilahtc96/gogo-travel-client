<script lang="ts" setup>
import { ref, onMounted, onUpdated, watch } from 'vue'
import { Address, SearchAddress } from '@/type/Address';
import { AddressService } from '@/services/address';
import type { TableColumnsType } from 'ant-design-vue';
import { StatusType } from '@/type/StatusType';
import { AddressType } from '@/type/AddressType';


const emit = defineEmits(['setSpin', 'setTotal', 'settingDataSearch', 'setPaging'])
const props = defineProps(['listAddress', 'defaultCompanyPage', 'dataSearch', 'defaultPage'])
const addressService = new AddressService();
const columns: TableColumnsType = [
    { title: 'Type', dataIndex: 'type', key: '1' },
    { title: 'Province Name', width: 200, dataIndex: 'provinceName', key: 'provinceName', fixed: 'left' },
    { title: 'District Name', dataIndex: 'districtName', key: 'districtName' },
    { title: 'Precinct Name', dataIndex: 'precinctName', key: 'precinctName' },
    { title: 'Status', dataIndex: 'status', key: '5' },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
    },
];
let listAddress = ref({
    listData: ref<[Address]>()
});
let dataSearch = ref<SearchAddress>({
    provinceCode: undefined,
    provinceName: undefined,
    districtCode: undefined,
    districtName: undefined,
    precinctCode: undefined,
    precinctName: undefined,
    type: AddressType.PROVINCE,
    status: StatusType.ACTIVED,
    page: props.defaultPage.page,
    size: props.defaultPage.size
});
watch(() => props.listAddress, (data) => {
    listAddress.value.listData = data;
});
watch(() => props.dataSearch, (data) => {
    dataSearch.value = data;
})

onMounted(async () => {
    emit('setSpin', true);
    addressService.findAddress({ page: props.defaultPage.page, size: props.defaultPage.size }).then((data: any) => {
        listAddress.value = { ...listAddress.value, listData: data.data };
        emit('setTotal', data.total);
    }).then(() => {
        emit('setSpin', false);
    });

})

const changePage = async (
    page: number,
    pageSize: number,
    provinceCode: string,
    provinceName: string,
    districtCode: string,
    districtName: string,
    precinctCode: string,
    precinctName: string,
    type: AddressType
) => {
    emit('setPaging', page, pageSize)
    emit('setSpin', true)
    dataSearch.value.page = page;
    dataSearch.value.size = pageSize;
    dataSearch.value.provinceCode = provinceCode;
    dataSearch.value.provinceName = provinceName;
    dataSearch.value.districtCode = districtCode;
    dataSearch.value.districtName = districtName;
    dataSearch.value.precinctCode = precinctCode;
    dataSearch.value.precinctName = precinctName;
    dataSearch.value.type = type;
    addressService.findAddress(dataSearch.value).then((data) => {
        listAddress.value = { ...listAddress.value, listData: data.data };
        emit('setTotal', data.total);
    }).then(() => {
        emit('setSpin', false);
    });
}

defineExpose({
    changePage
});
</script>

<template>
    <a-table :columns="columns" :data-source="listAddress.listData" :scroll="{ x: 1300, y: 1000 }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'operation'">
                <router-link :to="{ name: 'admin-address-edit', params: { id: record.id } }"><a>edit </a></router-link>
            </template>
        </template>
    </a-table>
</template>
