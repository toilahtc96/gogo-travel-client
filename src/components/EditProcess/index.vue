<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
import { ProcessService } from "@/services/processService";
import { ProcessCode } from "@/type/ProcessCode";
const processService = new ProcessService();
const route = useRoute();
const spinning = ref<boolean>(false);
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
let formState = ref({
    process: {
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
        processService.getProcessById(id)?.then((data) => {
            formState.value.process.id = data.id;
            formState.value.process.meaning = data.meaning;
            formState.value.process.code = data.code;
            formState.value.process.status = data.status;
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
    processService.editProcess(values.process)
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
const selectProcess = (value: ProcessCode) => {
    formState.value.process.code = value;
}
const selectStatus = (value: StatusType) => {
    formState.value.process.status = value;
}

</script>
<template>
    <!-- :validate-messages="validateMessages" -->
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['process', 'id']" label="Id" :rules="[{ required: true }]" :hidden="true">
                <a-input-number :value="formState.process.id" />
            </a-form-item>
            <a-form-item :name="['process', 'code']" label="Code" :rules="[{ required: true }]">
                <ProcessSelectComponent :processCode="formState.process.code" ref="selectProcessCode"
                    @selectProcess="selectProcess" />
            </a-form-item>
            <a-form-item :name="['process', 'meaning']" label="Meaning" :rules="[{ required: true }]">
                <a-input v-model:value="formState.process.meaning" />
            </a-form-item>
            <a-form-item :name="['process', 'status']" label="Status">
                <StatusElement :status="formState.process.status" ref="select" @selectStatus="selectStatus" />
            </a-form-item>

            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>