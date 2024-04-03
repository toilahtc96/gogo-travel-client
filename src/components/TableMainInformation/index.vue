<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { MainInformationService } from '@/services/mainInformationService';
import { TableColumnsType } from 'ant-design-vue';
import MainInformationType from "@/type/MainInformationType";


const props = defineProps(['mainInformationActives'])
const columns: TableColumnsType = [
    { title: 'Tiêu đề lớn', dataIndex: 'title', key: 'title', fixed: 'left' },
    { title: 'Tiêu đề nhỏ', dataIndex: 'subtitle', key: 'subtitle', fixed: 'left' },
    { title: 'Thông tin thêm 1', dataIndex: 'smallInformation1', key: 'smallInformation1' },
    { title: 'Thông tin thêm 2', dataIndex: 'smallInformation2', key: 'smallInformation2' },
    { title: 'Ảnh chính', dataIndex: 'heroImage', key: 'heroImage' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
    },
];

const mainInformationService = new MainInformationService();
let mainInformationActives = ref({
    listData: ref<[MainInformationType]>()
});
onMounted(async () => {
    mainInformationService.getFirstActive().then((data: MainInformationType) => {
        mainInformationActives.value = { ...mainInformationActives.value, listData: [data] };
    });

})

watch(() => props.mainInformationActives, (data) => {
    mainInformationActives.value = data;
});
</script>
<template>
    <a-table :columns="columns" :data-source="mainInformationActives.listData" :scroll="{ x: 1300, y: 1000 }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'heroImage'">
                <img :src="record.heroImage" style="width: 300px;"/>
            </template>
            <template v-if="column.key === 'operation'">
                <router-link v-if="record.id"
                    :to="{ name: 'admin-main-information-edit', params: { id: record.id } }"><a>edit
                    </a></router-link>
            </template>
        </template>
    </a-table>
</template>