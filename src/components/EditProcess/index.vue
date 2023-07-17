<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
import { StepService } from "@/services/stepService";
import { StepCode } from "@/type/StepCode";
const stepService = new StepService();
const route = useRoute();
const spinning = ref<boolean>(false);
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
let formState = ref({
    step: {
        id: 0,
        meaning: '',
        code: '',
        status: StatusType.ACTIVED
    }
});
const fetchLevel = () => {
    const id = route.params.id;
    if (id) {
        changeSpinning();
        stepService.getStepById(id)?.then((data) => {
            formState.value.step.id = data.id;
            formState.value.step.meaning = data.meaning;
            formState.value.step.code = data.code;
            formState.value.step.status = data.status;
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
    stepService.editStep(values.step)
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
        })
        .catch(
            (err) => { message.error(err) }
        )
};

onMounted(() => {
    fetchLevel();
})

watch(() => route.params.id, () => {
    fetchLevel();
})

//todo:
const selectStep = (value: StepCode) => {
    formState.value.step.code = value;
}
const selectStatus = (value: StatusType) => {
    formState.value.step.status = value;
}

</script>
<template>
    <!-- :validate-messages="validateMessages" -->
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['step', 'id']" label="Id" :rules="[{ required: true }]" :hidden="true">
                <a-input-number :value="formState.step.id" />
            </a-form-item>
            <a-form-item :name="['step', 'code']" label="Code" :rules="[{ required: true }]">
                <StepSelectComponent :stepCode="formState.step.code" ref="selectStepCode"
                    @selectStep="selectStep" />
            </a-form-item>
            <a-form-item :name="['step', 'meaning']" label="Meaning" :rules="[{ required: true }]">
                <a-input v-model:value="formState.step.meaning" />
            </a-form-item>
            <a-form-item :name="['step', 'status']" label="Status">
                <StatusElement :status="formState.step.status" ref="select" @selectStatus="selectStatus" />
            </a-form-item>

            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>