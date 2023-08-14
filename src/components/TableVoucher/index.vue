<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { TableColumnsType } from 'ant-design-vue';
import { VoucherService } from '@/services/voucherService';
import dayjs, { Dayjs } from 'dayjs';
import { Voucher } from '@/type/Voucher';
import { SearchVoucherForm } from '@/type/SearchVoucherForm';
const emit = defineEmits(['setSpin', 'setTotal', 'settingDataSearch', 'setPaging'])
const props = defineProps(['vouchers', 'defaultPage'])

let rateInteract = ref<boolean>();

const columns: TableColumnsType = [
    { title: 'Title', width: 200, dataIndex: 'title', key: 'title', fixed: 'left' },
    { title: 'Voucher Type', width: 100, dataIndex: 'voucherType', key: 'voucherType', fixed: 'left' },
    { title: 'Value', width: 150, dataIndex: 'value', key: 'value' },
    { title: 'Start Time', width: 150, dataIndex: 'startTime', key: 'startTime' },
    { title: 'End Time', width: 150, dataIndex: 'endTime', key: 'endTime' },
    { title: 'Status', width: 150, dataIndex: 'status', key: 'Status' },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
    },
];

const voucherService = new VoucherService();
let vouchers = ref({
    listData: ref<[Voucher]>()
});
onMounted(async () => {
    emit('setSpin', true);
    voucherService.findVoucher({ ...props.defaultPage }).then((data: any) => {
        vouchers.value = { ...vouchers.value, listData: data.data };
        vouchers.value.listData?.forEach((item) => {
            if (item.startTime) {
                item.startTime = getDateToDatePicker(dayjs(item.startTime));
            }
            if (item.endTime) {
                item.endTime = getDateToDatePicker(dayjs(item.endTime));
            }
        })
        emit('setTotal', data.total)
    }).then(() => {
        emit('setSpin', false)
    });
    rateInteract.value = true;
})

watch(() => props.vouchers, (data) => {
    vouchers.value.listData = data;
    vouchers.value.listData?.forEach(item => {

        item.startTime = dayjs(data.startTime);
        item.endTime = dayjs(data.endTime);
    })
    emit('setSpin', false)
});
let rs = ref<string>('');
const dateFormat = 'YYYY/MM/DD';
const dateFormatShow = 'YYYY/MM/DD HH:mm:ss';
const getDateToDatePicker = (date: Dayjs) => {
    return dayjs(date, dateFormatShow);
}

const dataSearch = ref<SearchVoucherForm>({
    value: undefined,
    title: undefined,
    voucherType: undefined,
    from: undefined,
    to: undefined,
    status: undefined,
    page: props.defaultPage.page,
    size: props.defaultPage.size,
});

const changePage = async (page: number, pageSize: number) => {
    emit('setPaging', page, pageSize)
    emit('setSpin', true)
    dataSearch.value.page = page;
    dataSearch.value.size = pageSize;
    
    voucherService.findVoucher(dataSearch.value).then((data) => {
        vouchers.value = { ...vouchers.value, listData: data.data };
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
    <a-table :columns="columns" :data-source="vouchers.listData" :scroll="{ x: 700, y: 1000 }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'startTime'">
                <a-date-picker v-if="record.startTime" v-model:value="record.startTime" :disabled="true"
                    :show-time="{ format: 'HH:mm:ss' }" />
            </template>
            <template v-if="column.key === 'endTime'">
                <a-date-picker v-if="record.endTime" v-model:value="record.endTime" :disabled="true"
                    :show-time="{ format: 'HH:mm:ss' }" />
            </template>
            <template v-if="column.key === 'operation'">
                <router-link v-if="record.id" :to="{ name: 'admin-voucher-edit', params: { id: record.id } }"><a>edit
                    </a></router-link>
            </template>
        </template>
    </a-table>
</template>