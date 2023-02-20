<script lang="ts" setup>
import router from "@/router/router";
import { ProcessService } from "@/services/processService";
import { ProcessCode } from "@/type/ProcessCode";
import { StatusType } from "@/type/StatusType";
import { message } from "ant-design-vue";
import { ref } from "vue";


const spinning = ref<boolean>(false);
const processService = new ProcessService();
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
const formState = ref(
    {
        process: {
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
    processService.addProcess(values.process)
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
            router.replace("/admin/process")
        });
};
const selectProcess = (processCode: ProcessCode) => {
    formState.value.process.code = processCode;
}
</script>
<template>
    <!-- :validate-messages="validateMessages" -->
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['process', 'code']" label="Code" :rules="[{ required: true }]">
                <ProcessSelectComponent :processCode="formState.process.code" ref="selectProcessCode"
                    @selectProcess="selectProcess" />
            </a-form-item>
            <a-form-item :name="['process', 'meaning']" label="Meaning" :rules="[{ required: true }]">
                <a-input v-model:value="formState.process.meaning" />
            </a-form-item>
            <a-form-item :name="['process', 'status']" label="Status">
                <StatusElement :status="formState.process.status" ref="select" />
            </a-form-item>

            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>