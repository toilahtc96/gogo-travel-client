<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, } from "vue-router";
import { JobTypeService } from "@/services/jobTypeService";

import { JobType } from '@/type/JobType';
import { message } from "ant-design-vue";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
const jobTypeService = new JobTypeService();
const spinning = ref<boolean>(false);
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
let formState = ref({
    jobType: {
        name: '',
        description: '',
        status: StatusType.ACTIVED
    }
});

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const onFinish = (values: any) => {
    changeSpinning();
    jobTypeService.addJobType(values.jobType)
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
            router.replace("/admin/job-type")
        })
        .catch(
            (err) => { message.error(err) }
        )
};
const selectStatus = (value: StatusType) => {
    formState.value.jobType.status = value;
}
</script>
<template>
    <!-- :validate-messages="validateMessages" -->
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['jobType', 'name']" label="Name" :rules="[{ required: true }]">
                <a-input v-model:value="formState.jobType.name"/>
            </a-form-item>
            <a-form-item :name="['jobType', 'description']" label="Description" :rules="[{ required: true }]">
                <a-input v-model:value="formState.jobType.description"/>
            </a-form-item>
            <a-form-item :name="['jobType', 'status']" label="Status">
                <StatusElement :status="formState.jobType.status" ref="select" @selectStatus="selectStatus" />
            </a-form-item>
            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>