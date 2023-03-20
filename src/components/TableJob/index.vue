<script lang="ts" setup>
import { ref, onMounted, watch, defineEmits, defineProps } from 'vue'
import { JobService } from '@/services/jobService';
import { TableColumnsType } from 'ant-design-vue';
import { Job } from '@/type/Job';
import { EditTwoTone } from '@ant-design/icons-vue';
// import { SearchJob } from '@/type/SearchJob';

const emit = defineEmits(['setSpin', 'setTotal', 'settingDataSearch', 'setPaging'])
const props = defineProps(['jobActives', 'defaultJobPage', 'dataSearch'])
let defaultJobPage = ref({
    page: 0,
    size: 10
});
// let dataSearch = ref<SearchJob>({
//     information: '',
//     status: StatusType.ACTIVED,
//     page: defaultJobPage.value.page,
//     size: defaultJobPage.value.size
// });
const columns: TableColumnsType = [
    { title: 'information', dataIndex: 'information', key: 'information', fixed: 'left', width: 300 },
    { title: 'Career', dataIndex: 'careerName', key: 'careerName', fixed: 'left', width: 200 },
    { title: 'Job type', dataIndex: 'jobTypeName', key: 'jobTypeName', fixed: 'left', width: 200 },
    { title: 'Company Name', dataIndex: 'companyName', key: 'companyName', fixed: 'left', width: 200 },
    { title: 'WorkingForm Name', dataIndex: 'workingFormName', width: 150, key: 'workingFormName' },
    { title: 'Quantity', dataIndex: 'quantity', width: 150, key: 'quantity' },
    { title: 'Min Salary', dataIndex: 'rangeSalaryMin', width: 150, key: 'rangeSalaryMin' },
    { title: 'Max Salary', dataIndex: 'rangeSalaryMax', width: 150, key: 'rangeSalaryMax' },
    { title: 'Level Name', dataIndex: 'levelName', width: 150,  key: 'levelName' },
    { title: 'Status', dataIndex: 'status', width: 150, key: 'status' },
    { title: 'Custom Range', dataIndex: 'customRange', width: 150, key: 'customRange' },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
    },
];

const jobService = new JobService();
let jobActives = ref({
    listData: ref<[Job]>()
});
onMounted(async () => {
    emit('setSpin', true);
    jobService.getListJobActive(defaultJobPage.value.page, defaultJobPage.value.size).then((data: any) => {
        jobActives.value = { ...jobActives.value, listData: data.data };
        emit('setTotal', data.total);
    }).then(() => {
        emit('setSpin', false)
    });
})

watch(() => props.jobActives, (data) => {
    jobActives.value = data;
});
// watch(() => props.dataSearch, (data) => {
//     dataSearch.value = data;
// })
// const searchJob = (data: SearchJob) => {
// emit('setSpin', true)
// emit('settingDataSearch', data)
// jobService.findJob(data).then((data) => {
//     jobActives.value = { ...jobActives.value, listData: data.data };
//     emit('setTotal', data.total);
// }).then(() => {
//     jobActives.value.listData?.forEach((item) => {
//         getNameOfAddress(item.provinceCode, AddressType.PROVINCE, item);
//         getNameOfAddress(item.districtCode, AddressType.DISTRICT, item);
//         getNameOfAddress(item.precinctCode, AddressType.PRECINCT, item);
//     })
// }).then(() => {
//     emit('setSpin', false)
// });
// }
const changePage = async (page: number, pageSize: number) => {
    // emit('setPaging', page, pageSize)
    // emit('setSpin', true)
    // dataSearch.value.page = page;
    // dataSearch.value.size = pageSize;
    // jobService.findJob(dataSearch.value).then((data) => {
    //     jobActives.value = { ...jobActives.value, listData: data.data };
    //     emit('setTotal', data.total);
    // }).then(() => {
    //     jobActives.value.listData?.forEach((item) => {
    //         getNameOfAddress(item.provinceCode, AddressType.PROVINCE, item);
    //         getNameOfAddress(item.districtCode, AddressType.DISTRICT, item);
    //         getNameOfAddress(item.precinctCode, AddressType.PRECINCT, item);
    //     })
    // }).then(() => {
    //     emit('setSpin', false);
    // });
}
defineExpose({
    // searchJob,
    changePage
});
</script>
<template>
    <a-table :columns="columns" :data-source="jobActives.listData" :scroll="{ x: 700, y: 1000 }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'customRange'">
                <a-switch v-model:checked="record.customRange" checked-children="Thỏa thuận" un-checked-children="Không"
                    disabled />
            </template>
            <template v-if="column.key === 'operation'">
                <router-link v-if="record.id" :to="{ name: 'admin-job-edit', params: { id: record.id } }"><a>
                        <EditTwoTone />
                    </a></router-link>
            </template>
        </template>
    </a-table>
</template>