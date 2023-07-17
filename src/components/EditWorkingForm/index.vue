<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, } from "vue-router";
import { WorkingFormService } from "@/services/workingFormService";

import { message } from "ant-design-vue";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
const workingFormService = new WorkingFormService();
const route = useRoute();
let workingFormList;
const spinning = ref<boolean>(false);
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
let formState = ref({
    workingForm: {
        id: 0,
        name: '',
        description: '',
        status: StatusType.ACTIVED
    }
});
const fetchWorkingForm = () => {

    const id = route.params.id;
    if (id) {
        changeSpinning();
        workingFormService.getWorkingFormById(id)?.then((data) => {
            workingFormList = data;
            formState.value.workingForm.id = workingFormList.id;
            formState.value.workingForm.name = workingFormList.name;
            formState.value.workingForm.description = workingFormList.description;
            formState.value.workingForm.status = workingFormList.status;
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
    workingFormService.editWorkingForm(values.workingForm)
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
            router.replace("/admin/working-form")
        })
        .catch(
            (err) => { message.error(err) }
        )
};

onMounted(() => {
    fetchWorkingForm();
})

watch(() => route.params.id, () => {
    fetchWorkingForm();
})

const selectStatus = (value: StatusType) => {
    formState.value.workingForm.status = value;
}
</script>
<template>
    <!-- :validate-messages="validateMessages" -->
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['workingForm', 'id']" label="Id" :rules="[{ required: true }]" :hidden="true">
                <a-input-number :value="formState.workingForm.id" />
            </a-form-item>
            <a-form-item :name="['workingForm', 'name']" label="Name" :rules="[{ required: true }]">
                <a-input v-model:value="formState.workingForm.name" />
            </a-form-item>
            <a-form-item :name="['workingForm', 'description']" label="Description" :rules="[{ required: true }]">
                <a-input v-model:value="formState.workingForm.description" />
            </a-form-item>
            <a-form-item :name="['workingForm', 'status']" label="Status">
                <StatusElement :status="formState.workingForm.status" ref="select" @selectStatus="selectStatus" />
            </a-form-item>
          
            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>