<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { ReasonChooseService } from '@/services/reasonChooseService';
import { TableColumnsType } from 'ant-design-vue';
import ReasonChooseType from '@/type/ReasonChooseType';


const props = defineProps(['reasonChoosess'])
const columns: TableColumnsType = [
    { title: 'Lý do chính', dataIndex: 'reasonMain', key: 'reasonMain', fixed: 'left' },
    { title: 'Mô tả', dataIndex: 'reasonDescription', key: 'reasonDescription', fixed: 'left' },
    { title: 'Hình nền', dataIndex: 'backgroundImage', key: 'backgroundImage' },
    { title: 'Trạng Thái', dataIndex: 'status', key: 'status' },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
    },
];

const resonChooseService = new ReasonChooseService();
let reasonChoosess = ref({
    listData: ref<[ReasonChooseType]>()
});
onMounted(async () => {
    resonChooseService.getAll().then((data: [ReasonChooseType]) => {
        reasonChoosess.value = { ...reasonChoosess.value, listData: data };
    });

})

watch(() => props.reasonChoosess, (data) => {
    reasonChoosess.value = data;
});
</script>
<template>
    <a-table :columns="columns" :data-source="reasonChoosess.listData" :scroll="{ x: 1300, y: 1000 }">
        <template #bodyCell="{ column, record }">

            <template v-if="column.key === 'backgroundImage'">
                <img :src="record.backgroundImage" style="width:50px;height: 50px;"/>
            </template>

            <template v-if="column.key === 'operation'">
                <router-link v-if="record.id"
                    :to="{ name: 'admin-reason-choose-edit', params: { id: record.id } }"><a>edit
                    </a></router-link>
            </template>
        </template>
    </a-table>
</template>