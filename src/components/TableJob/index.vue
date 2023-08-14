<script lang="ts" setup>
import { ref, onMounted, watch, } from 'vue'
import { JobService } from '@/services/jobService';
import { TableColumnsType } from 'ant-design-vue';
import { Job } from '@/type/Job';
import { EditTwoTone } from '@ant-design/icons-vue';
import { SearchJob } from '@/type/SearchJob';
import { StatusType } from '@/type/StatusType';
// import { SearchJob } from '@/type/SearchJob';

const emit = defineEmits(['setSpin', 'setTotal', 'settingDataSearch', 'setPaging'])
const props = defineProps(['jobActives', 'defaultJobPage', 'dataSearch'])

// let dataSearch = ref<SearchJob>({
//     information: '',
//     status: StatusType.ACTIVED,
//     page: defaultJobPage.value.page,
//     size: defaultJobPage.value.size
// });
const columns: TableColumnsType = [
    { title: 'title', dataIndex: 'title', key: 'title', fixed: 'left', width: 300 },
    { title: 'tags', dataIndex: 'tags', key: 'tags', fixed: 'left', width: 300 },
    { title: 'progress', dataIndex: 'voucherTitle', key: 'voucherTitle', fixed: 'left', width: 300 },
    { title: 'Career', dataIndex: 'careerName', key: 'careerName', width: 200 },
    { title: 'Job type', dataIndex: 'jobTypeName', key: 'jobTypeName', width: 200 },
    { title: 'Company Name', dataIndex: 'companyName', key: 'companyName', width: 200 },
    { title: 'WorkingForm Name', dataIndex: 'workingFormName', width: 150, key: 'workingFormName' },
    { title: 'Quantity', dataIndex: 'quantity', width: 150, key: 'quantity' },
    { title: 'Min Salary', dataIndex: 'rangeSalaryMin', width: 150, key: 'rangeSalaryMin' },
    { title: 'Max Salary', dataIndex: 'rangeSalaryMax', width: 150, key: 'rangeSalaryMax' },
    { title: 'Level Name', dataIndex: 'levelName', width: 150, key: 'levelName' },
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
    jobService.getListJobActive(props.defaultJobPage.page, props.defaultJobPage.size).then((data: any) => {
        jobActives.value = { ...jobActives.value, listData: data.data };
        emit('setTotal', data.total);
    }).then(() => {
        emit('setSpin', false)
    });
})
const dataSearch = ref<SearchJob>({
    jobTypeId: undefined,
    companyId: undefined,
    rangeSalary: undefined,
    levelName: undefined,
    customRange: undefined,
    careerId: undefined,
    workingFormId: undefined,
    information: undefined,
    status: StatusType.ACTIVED,
    page: props.defaultJobPage.page,
    size: props.defaultJobPage.size
});
watch(() => props.jobActives, (data) => {
    jobActives.value = data;
});
watch(() => props.dataSearch, (data) => {
    dataSearch.value = data;
})
const searchJob = (data: SearchJob) => {
    emit('setSpin', true)
    emit('settingDataSearch', data)
    jobService.findJob(data).then((result) => {
        
        jobActives.value = { ...jobActives.value, listData: result.data };
        emit('setTotal', result.total);
    }).finally(() => {
        emit('setSpin', false)
    });
}
const changePage = async (page: number, pageSize: number) => {
    emit('setPaging', page, pageSize)
    emit('setSpin', true)
    dataSearch.value.page = page;
    dataSearch.value.size = pageSize;
    
    jobService.findJob(dataSearch.value).then((data) => {
        jobActives.value = { ...jobActives.value, listData: data.data };
        emit('setTotal', data.total);
    }).then(() => {
        emit('setSpin', false);
    });
}
defineExpose({
    searchJob,
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