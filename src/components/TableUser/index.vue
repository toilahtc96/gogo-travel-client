<script lang="ts" setup>
import { ref, onMounted, watch, defineEmits, defineProps } from 'vue'
import { TableColumnsType } from 'ant-design-vue';
import { UserService } from '@/services/userService';
import { User } from '@/type/User';
import { CompanyService } from '@/services/company';
import { UserTypeService } from '@/services/userTypeService';
import dayjs, { Dayjs } from 'dayjs';
const emit = defineEmits(['setSpin', 'setTotal', 'settingDataSearch', 'setPaging'])
const props = defineProps(['userActives', 'defaultCompanyPage'])
const companyService = new CompanyService();
const userTypeService = new UserTypeService();

let rateInteract = ref<boolean>();

const columns: TableColumnsType = [
    { title: 'User Name', width: 200, dataIndex: 'username', key: 'name', fixed: 'left' },
    { title: 'Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: 'Role', width: 150, dataIndex: 'roleName', key: 'roleName' },
    { title: 'Company', width: 150, dataIndex: 'companyName', key: 'companyName' },
    { title: 'Type', width: 150, dataIndex: 'typeName', key: 'typeName' },
    { title: 'Description', width: 150, dataIndex: 'description', key: 'description' },
    { title: 'Star', width: 200, dataIndex: 'star', key: 'star' },
    { title: 'Information', width: 150, dataIndex: 'information', key: 'information' },
    { title: 'BirthDay', width: 150, dataIndex: 'birthDay', key: 'birthDay' },
    { title: 'Level', width: 150, dataIndex: 'levelId', key: 'levelId' },
    { title: 'Experience Year', width: 150, dataIndex: 'experienceYear', key: 'experienceYear' },
    { title: 'CV', width: 150, dataIndex: 'cvLink', key: 'cvLink' },
    { title: 'Status', width: 150, dataIndex: 'status', key: 'Status' },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
    },
];

const userService = new UserService();
let userActives = ref({
    listData: ref<[User]>()
});
onMounted(async () => {
    emit('setSpin', true);
    userService.getPaging({ ...props.defaultCompanyPage }).then((data: any) => {
        userActives.value = { ...userActives.value, listData: data.data };
        userActives.value.listData?.forEach((item) => {
            if (item.typeId) {
                getUserTypeById(item.typeId).then(() => {
                    item.typeName = rs.value;
                })
            }
            if (item.birthDay) {
                item.birthDay = getDateToDatePicker(item.birthDay);
            }
        })
        emit('setTotal', data.total)
    }).then(() => {
        emit('setSpin', false)
    });
    rateInteract.value = true;
})


watch(() => props.userActives, (data) => {
    userActives.value.listData = data;
    userActives.value.listData?.forEach((item) => {
        if (item.typeId) {
            getUserTypeById(item.typeId).then(() => {
                item.typeName = rs.value;
            })
        }
        if (item.birthDay) {
            item.birthDay = getDateToDatePicker(item.birthDay);
        }
    })
    emit('setSpin', false)
});

const getCompanyNameById = async (companyId: number) => {
    companyService.getCompanyById(companyId)?.then((data) => {
        return data.name;
    })
}
let rs = ref<string>('');
const getUserTypeById = async (id: number) => {
    return userTypeService.getUserTypeById(id)?.then((data) => {
        rs.value = data.meaning;
    })
}
const dateFormat = 'YYYY/MM/DD';
const getDateToDatePicker = (date: Dayjs) => {
    return dayjs(date, dateFormat);
}
</script>
<template>
    <a-table :columns="columns" :data-source="userActives.listData" :scroll="{ x: 700, y: 1000 }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'roleId'">
                <span v-if="!record.roleId"> </span>
            </template>
            <template v-if="column.key === 'companyId'">
                <span v-if="!record.companyId"> </span>
            </template>
            <template v-if="column.key === 'typeId'">
                <span v-if="!record.typeId"> </span>
            </template>
            <template v-if="column.key === 'levelId'">
                <span v-if="!record.levelId"> </span>
            </template>
            <template v-if="column.key === 'star'">
                <Rate :value="record.star" :isCanAccess="rateInteract" />
            </template>
            <template v-if="column.key === 'birthDay'">
                <a-date-picker v-if="record.birthDay" v-model:value="record.birthDay" :disabled="true" />
            </template>
            <template v-if="column.key === 'cvLink'">
                <span v-if="!record.cvLink"> </span>
                <a v-if="record.cvLink" :href="record.cvLink" target="_blank">Link Download CV</a>
            </template>
            <template v-if="column.key === 'operation'">
                <router-link v-if="record.id" :to="{ name: 'admin-user-edit', params: { id: record.id } }"><a>edit
                    </a></router-link>
            </template>
        </template>
    </a-table>
</template>