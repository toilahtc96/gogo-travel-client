<script lang="ts" setup>
import router from "@/router/router";
import { StepService } from "@/services/stepService";
import { StepCode } from "@/type/StepCode";
import { StatusType } from "@/type/StatusType";
import { message } from "ant-design-vue";
import { ref } from "vue";


const spinning = ref<boolean>(false);
const stepService = new StepService();
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
const formState = ref(
    {
        step: {
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
    stepService.addStep(values.step)
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
            router.replace("/admin/step")
        });
};
const selectStep = (stepCode: StepCode) => {
    formState.value.step.code = stepCode;
}
</script>
<template>
    <!-- :validate-messages="validateMessages" -->
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['step', 'code']" label="Code" :rules="[{ required: true }]">
                <StepSelectComponent :stepCode="formState.step.code" ref="selectStepCode"
                    @selectStep="selectStep" />
            </a-form-item>
            <a-form-item :name="['step', 'meaning']" label="Meaning" :rules="[{ required: true }]">
                <a-input v-model:value="formState.step.meaning" />
            </a-form-item>
            <a-form-item :name="['step', 'status']" label="Status">
                <StatusElement :status="formState.step.status" ref="select" />
            </a-form-item>

            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>