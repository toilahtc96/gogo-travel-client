<script lang="ts" setup>
import { ref } from "vue";
import { ReasonChooseService } from '@/services/reasonChooseService';
import { TableColumnsType } from 'ant-design-vue';
import ReasonChooseType from '@/type/ReasonChooseType';
import { message } from "ant-design-vue";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
const reasonChooseService = new ReasonChooseService();
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const formItemStyle = {
    labelCol3: { width: '100%', },
    labelColInput3: { width: '100%', float: 'left' },
};
const styleInput = "float: left; width: 100%;";
const formState = ref<ReasonChooseType>({
    id: undefined,
    reasonMain: undefined,
    reasonDescription: undefined,
    icon: undefined,
    backgroundImage: undefined,
    reasonMainName1:  undefined,
    reasonMainName2: undefined,
    status: StatusType.ACTIVED
});
const onFinish = (values: any) => {
    reasonChooseService.add(values)
        .then(
            (data) => {
                if (data && data.status === 204) {
                    message.info("Success")
                    router.push("/admin/reason-choose")
                } else {
                    message.error('Has error, Contact to developer')
                }
            }
        )
        .catch(
            (err) => { message.error(err) }
        )
};
const selectStatus = (value: StatusType) => {
    formState.value.status = value;
}
</script>
<template>
    <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
        <a-form-item :name="['reasonMain']" label="Lý do chính (4-6 từ)" :rules="[{ required: true }]">
            <a-input v-model:value="formState.reasonMain" />
        </a-form-item>
        <a-form-item :name="['reasonDescription']" label="Mô tả thêm (~10 từ)">
            <a-input v-model:value="formState.reasonDescription" />
        </a-form-item>
        <a-form-item :name="['backgroundImage']" label="Link Ảnh nền">
            <a-input v-model:value="formState.backgroundImage" />
        </a-form-item>
        <a-form-item :name="['status']" label="Status" :style="styleInput">
            <StatusElement :status="formState.status" ref="select" @selectStatus="selectStatus" />
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }" :style="styleInput">
            <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
    </a-form>
</template>