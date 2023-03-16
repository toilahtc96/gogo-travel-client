<script lang="ts" setup>
import { ref, watch, onMounted } from "vue-demi";
import { useRoute, } from "vue-router";
import { CareerService } from "@/services/careerService";

import { Career } from '@/type/Career';
import { message } from "ant-design-vue";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
const careerService = new CareerService();
const spinning = ref<boolean>(false);
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
let formState = ref({
    career: {
        name: '',
        status: StatusType.ACTIVED
    }
});

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const onFinish = (values: any) => {
    changeSpinning();
    careerService.addCareer(values.career)
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
            router.replace("/admin/career")
        })
        .catch(
            (err) => { message.error(err) }
        )
};
const selectStatus = (value: StatusType) => {
    formState.value.career.status = value;
}
</script>
<template>
    <!-- :validate-messages="validateMessages" -->
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['career', 'name']" label="Name" :rules="[{ required: true }]">
                <a-input v-model:value="formState.career.name"/>
            </a-form-item>
            <a-form-item :name="['career', 'status']" label="Status">
                <StatusElement :status="formState.career.status" ref="select" @selectStatus="selectStatus" />
            </a-form-item>
            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>