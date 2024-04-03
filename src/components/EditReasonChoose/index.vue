<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { ReasonChooseService } from '@/services/reasonChooseService';
import { TableColumnsType } from 'ant-design-vue';
import ReasonChooseType from '@/type/ReasonChooseType';
import { message } from "ant-design-vue";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
import { useRoute } from "vue-router";
const reasonChooseService = new ReasonChooseService();
const route = useRoute();
const comboAddress = ref();
const spinning = ref<boolean>(false);
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
const fetchReason = () => {
    const id = route.params.id;
    if (id) {
        changeSpinning();
        reasonChooseService.getById(id)?.then((data) => {
            formState.value.id = data.id;
            formState.value.icon = data.icon;
            formState.value.reasonMain = data.reasonMain;
            formState.value.reasonDescription = data.reasonDescription;
            formState.value.backgroundImage = data.backgroundImage;
            formState.value.status = data.status;
            changeSpinning();
        })
    }
}
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const formState = ref<ReasonChooseType>({
    id: undefined,
    reasonMain: undefined,
    reasonDescription: undefined,
    icon: undefined,
    backgroundImage: undefined,
    reasonMainName1:  undefined,
    reasonMainName2: undefined,
    status: undefined
});
const onFinish = (values: any) => {
    changeSpinning();
    reasonChooseService.edit(values)
        .then(
            (data) => {
                if (data && data.status === 200) {
                    message.info("Success")
                } else {
                    message.error('Has error, Contact to developer')
                }
                changeSpinning();
            }
        ).then(() => {
            router.replace("/admin/reason-choose")
        })
        .catch(
            (err) => { message.error(err) }
        )
};
onMounted(() => {
    fetchReason();
})

watch(() => route.params.id, () => {
    fetchReason();
})

const styleInput = "float: left; width: 100%;";
const formItemStyle = {
    labelCol3: { width: '100%', },
    labelColInput3: { width: '100%', float: 'left' },
};
const selectStatus = (value: StatusType) => {
    formState.value.status = value;
}
</script>
<template>
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['id']" label="Id" :rules="[{ required: true }]" :hidden="true">
                <a-input-number v-model:value="formState.id" />
            </a-form-item>
            <a-form-item :name="['reasonMain']" label="Lý do chính" :rules="[{ required: true }]">
                <a-input v-model:value="formState.reasonMain" />
            </a-form-item>
            <a-form-item :name="['reasonDescription']" label="Mô tả" >
                <a-input v-model:value="formState.reasonDescription" />
            </a-form-item>
            <a-form-item :name="['backgroundImage']" label="Link hình nền" >
                <a-input v-model:value="formState.backgroundImage" />
            </a-form-item>
            <a-form-item :name="['status']" label="Status" :style="styleInput">
                <StatusElement :status="formState.status" ref="select" @selectStatus="selectStatus" />
            </a-form-item>
            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }" :style="styleInput">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>