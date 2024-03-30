<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, } from "vue-router";
import { RoleService } from "@/services/role";

import { Role } from '@/type/Role';
import { message } from "ant-design-vue";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
import { RoleType } from "@/type/RoleType";
const roleService = new RoleService();
const route = useRoute();
let roleList;
const spinning = ref<boolean>(false);
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
let formState = ref({
    role: {
        id: 0,
        name: '',
        code: '',
        status: StatusType.ACTIVED
    }
});
const fetchRole = () => {

    const id = route.params.id;
    if (id) {
        changeSpinning();
        roleService.getRoleById(id)?.then((data) => {
            roleList = data;
            formState.value.role.id = roleList.id;
            formState.value.role.name = roleList.name;
            formState.value.role.code = roleList.code;
            formState.value.role.status = roleList.status;
            changeSpinning();
        });
    }
}
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const onFinish = (values: any) => {
    changeSpinning();
    roleService.editRole(values.role)
        .then(
            (data) => {
                if (data && data.status === 204) {
                    message.info("Success")

                } else {
                    message.error('Has error, Contact to developer')
                }
                changeSpinning();
            }
        ).then(() => {
            router.replace("/admin/role")
        })
        .catch(
            (err) => { message.error(err) }
        )
};

onMounted(() => {
    fetchRole();
})

watch(() => route.params.id, () => {
    fetchRole();
})
const selectRole = (value: RoleType) => {
    formState.value.role.code = value;
}
const selectStatus = (value: StatusType) => {
    formState.value.role.status = value;
}
</script>
<template>
    <!-- :validate-messages="validateMessages" -->
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['role', 'id']" label="Id" :rules="[{ required: true }]" :hidden="true">
                <a-input-number :value="formState.role.id" />
            </a-form-item>
            <a-form-item :name="['role', 'name']" label="Name" :rules="[{ required: true }]">
                <a-input v-model:value="formState.role.name"/>
            </a-form-item>
            <a-form-item :name="['role', 'code']" label="Code" :rules="[{ required: true }]">
                <RoleElement ref="select-role" :role="formState.role.code" style="width: 120px" @selectRole="selectRole" />
            </a-form-item>
            <a-form-item :name="['role', 'status']" label="Status">
                <StatusElement :status="formState.role.status" ref="select" @selectStatus="selectStatus" />
            </a-form-item>

            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>