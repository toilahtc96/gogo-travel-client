<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { RegistrationService } from '@/services/registrationService';
import { TableColumnsType } from 'ant-design-vue';
import type Registration from '@/type/Registration';

const spinning = ref<boolean>(false);
const changeSpinning = () => {
    spinning.value = !spinning.value;
};

const props = defineProps(['companyActives'])
const columns: TableColumnsType = [
    { title: 'Tên Người Đăng Ký', dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Số Điện Thoại', dataIndex: 'phone', key: 'phone' },
    { title: 'Tour Quan Tâm', dataIndex: 'tourName', key: 'tourName' },
    { title: 'Thông Tin Thêm', dataIndex: 'information', key: 'information' },
];
const defaultPage = ref({
    page: 0,
    size: 5
});

const registrationService = new RegistrationService();
let registrations = ref({
    listData: ref<[Registration]>()
});
onMounted(async () => {
    changeSpinning();
    registrationService.getListRegistration(defaultPage.value.page, defaultPage.value.size).then((data: [Registration]) => {
        registrations.value = { ...registrations.value, listData: data };
        changeSpinning();
    });

})
const setTotal = (total: Number) => {
    pageSetting.value.total = total;
}
watch(() => props.companyActives, (data) => {
    registrations.value = data;
});
let pageSetting = ref({
    current: new Number(1),
    total: new Number(0),
});
const change = async (page: number, pageSize: number) => {
    spinning.value = true;
    registrationService.getListRegistration(page, pageSize).then((data) => {
        registrations.value = { ...registrations.value, listData: data };
        spinning.value = false;
    });
    registrationService.getAll().then((data) => {
        setTotal(data.length);
    });
}
const showSizeChange = (current: number, size: number) => {
    defaultPage.value.size = size;
    pageSetting.value.current = current;

}
</script>
<template>
    <a-spin :spinning="spinning">
        <a-table :columns="columns" :data-source="registrations.listData" :scroll="{ x: 1300, y: 1000 }">
            <template #bodyCell="{ column, record }">
            </template>
        </a-table>
    </a-spin>
    <Pagination :current="pageSetting.current" :total="pageSetting.total" @change="change" :pageSize="defaultPage.size"
        @showSizeChange="showSizeChange" />
</template>