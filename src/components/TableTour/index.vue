<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { TourService } from '@/services/tourService';
import { TableColumnsType } from 'ant-design-vue';
import TourType from '@/type/TourType';


const props = defineProps(['tours'])
const columns: TableColumnsType = [
    { title: 'Hình nền chính', dataIndex: 'mainBackgroundUrl', key: 'mainBackgroundUrl', fixed: 'left' },
    { title: 'Hình liên hệ', dataIndex: 'contactBackgroundUrl', key: 'contactBackgroundUrl', fixed: 'left' },
    { title: 'Hình Thông tin tour', dataIndex: 'informationUrl', key: 'informationUrl', fixed: 'left' },
    { title: 'Trạng Thái', dataIndex: 'status', key: 'status' },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
    },
];

const tourService = new TourService();
let tours = ref({
    listData: ref<[TourType]>()
});
onMounted(async () => {
    tourService.getAll().then((data: [TourType]) => {
        tours.value = { ...tours.value, listData: data };
    });

})

watch(() => props.tours, (data) => {
    tours.value = data;
});
</script>
<template>
    <a-table :columns="columns" :data-source="tours.listData" :scroll="{ x: 1300, y: 1000 }">
        <template #bodyCell="{ column, record }">

            <template v-if="column.key === 'mainBackgroundUrl'">
                <img :src="record.mainBackgroundUrl" style="width:200px;height: 200px;" />
            </template>
            <template v-if="column.key === 'contactBackgroundUrl'">
                <img :src="record.contactBackgroundUrl" style="width:200px;height: 200px;" />
            </template>
            <template v-if="column.key === 'informationUrl'">
                <img :src="record.informationUrl" style="width:200px;height: 200px;" />
            </template>

            <template v-if="column.key === 'operation'">
                <router-link v-if="record.id" :to="{ name: 'admin-tour-edit', params: { id: record.id } }"><a>edit
                    </a></router-link>
            </template>
        </template>
    </a-table>
</template>