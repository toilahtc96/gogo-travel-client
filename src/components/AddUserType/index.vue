<script lang="ts" setup>
import router from "@/router/router";
import { UserTypeService } from "@/services/userTypeService";
import { StatusType } from "@/type/StatusType";
import { message } from "ant-design-vue";
import { ref } from "vue";


const spinning = ref<boolean>(false);
const userTypeService = new UserTypeService();
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
const formState = ref(
    {
        userType: {
            meaning: '',
            code: '',
            status: StatusType.ACTIVED
        }
    });
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const onFinish = (values: any) => {
    changeSpinning();
    userTypeService.addUserType(values.userType)
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
            router.replace("/admin/user-type")
        });
};
</script>
<template>
    <!-- :validate-messages="validateMessages" -->
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['userType', 'code']" label="Code" :rules="[{ required: true }]">
                <a-input v-model:value="formState.userType.code" />
            </a-form-item>
            <a-form-item :name="['userType', 'meaning']" label="Meaning" :rules="[{ required: true }]">
                <a-input v-model:value="formState.userType.meaning" />
            </a-form-item>
            <a-form-item :name="['userType', 'status']" label="Status">
                <StatusElement :status="formState.userType.status" ref="select" />
            </a-form-item>

            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>