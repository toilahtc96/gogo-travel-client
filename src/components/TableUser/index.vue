<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { TableColumnsType } from 'ant-design-vue';
import { UserService } from '@/services/userService';
import { User } from '@/type/User';

const emit = defineEmits(['setSpin', 'setTotal', 'settingDataSearch', 'setPaging'])
const props = defineProps(['userActives', 'defaultCompanyPage'])
let rateInteract = ref<boolean>();
let defaultCompanyPage = ref({
    page: 0,
    size: 10
});
const columns: TableColumnsType = [
    { title: 'Full Name', width: 300, dataIndex: 'username', key: 'name', fixed: 'left' },
    { title: 'star', dataIndex: 'star', key: 'star' },
    { title: 'information', dataIndex: 'information', key: 'information' },
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
    userService.getPaging(defaultCompanyPage.value).then((data: [User]) => {
        userActives.value = { ...userActives.value, listData: data };
    }).then(() => {
        emit('setSpin', false)
    });
    // companyService.getAll().then((data) => {
    emit('setTotal', 1);
    // }).then(() => {
    emit('setSpin', false)
    // });
    rateInteract.value = true;
})


watch(() => props.userActives, (data) => {
    userActives.value = data;
});

</script>
<template>
    <a-table :columns="columns" :data-source="userActives.listData" :scroll="{ x: 1300, y: 1000 }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'star'">
                <rate :value="record.star" :isCanAccess="rateInteract" />
            </template>
            <template v-if="column.key === 'operation'">
                <router-link v-if="record.id" :to="{ name: 'admin-user-edit', params: { id: record.id } }"><a>edit
                    </a></router-link>
            </template>
        </template>
    </a-table>
</template>