<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { CompanyInformationService } from '@/services/companyInformationService';
import { TableColumnsType } from 'ant-design-vue';
import CompanyInformation from '@/type/CompanyInformation';
import { StatusType } from '@/type/StatusType';


const props = defineProps(['companyActives'])
const columns: TableColumnsType = [
    { title: 'Tên Công Ty', dataIndex: 'companyName', key: 'companyName', fixed: 'left' },
    { title: 'Địa Chỉ Chính', width: 300, dataIndex: 'companyAddress', key: 'companyAddress', fixed: 'left' },
    { title: 'Thành Phố', width: 100, dataIndex: 'companyCityAddress', key: 'companyCityAddress', fixed: 'left' },
    { title: 'Email', dataIndex: 'companyEmail', key: 'companyEmail' },
    { title: 'Số Điện Thoại', dataIndex: 'companyPhone', key: 'companyPhone' },
    { title: 'FaceBook', dataIndex: 'facebookLink', key: 'facebookLink' },
    { title: 'Instagram', dataIndex: 'instagramLink', key: 'instagramLink' },
    { title: 'Tiktok', dataIndex: 'tikTokLink', key: 'tikTokLink' },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
    },
];

const companyInformationService = new CompanyInformationService();
let companyInformationActives = ref({
    listData: ref<[CompanyInformation]>()
});
onMounted(async () => {
    companyInformationService.getFirstActive().then((data: [CompanyInformation]) => {
        companyInformationActives.value = { ...companyInformationActives.value, listData: [data] };
        console.log(companyInformationActives.value)
    });
    
})

watch(() => props.companyActives, (data) => {
    companyInformationActives.value = data;
});
</script>
<template>
    <a-table :columns="columns" :data-source="companyInformationActives.listData" :scroll="{ x: 1300, y: 1000 }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'operation'">
                <router-link v-if="record.id" :to="{ name: 'admin-company-information-edit', params: { id: record.id } }"><a>edit
                    </a></router-link>
            </template>
        </template>
    </a-table>
</template>