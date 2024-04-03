<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
import { MainInformationService } from '@/services/mainInformationService';
import MainInformationType from "@/type/MainInformationType";
const mainInformationService = new MainInformationService();
const route = useRoute();
const comboAddress = ref();
const spinning = ref<boolean>(false);
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
const fetchMainInformation = () => {
    const id = route.params.id;
    if (id) {
        changeSpinning();
        mainInformationService.getById(id)?.then((data) => {
            formState.value.id = data.id;
            formState.value.title = data.title;
            formState.value.subtitle = data.subtitle;
            formState.value.smallInformation1 = data.smallInformation1;
            formState.value.smallInformation2 = data.smallInformation2;
            formState.value.heroImage = data.heroImage;
            formState.value.status = data.status;
            changeSpinning();
        })
    }
}
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const formState = ref<MainInformationType>({
    id: undefined,
    title: undefined,
    subtitle: undefined,
    smallInformation1: undefined,
    smallInformation2: undefined,
    heroImage: undefined,
    status: undefined
});
const onFinish = (values: any) => {
    changeSpinning();
    mainInformationService.edit(values)
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
            router.replace("/admin/main-information")
        })
        .catch(
            (err) => { message.error(err) }
        )
};
onMounted(() => {
    fetchMainInformation();
})

watch(() => route.params.id, () => {
    fetchMainInformation();
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
            <a-form-item :name="['title']" label="Tiêu đề lớn" :rules="[{ required: true }]">
                <a-input v-model:value="formState.title" />
            </a-form-item>
            <a-form-item :name="['subtitle']" label="Tiêu đề nhỏ">
                <a-input v-model:value="formState.subtitle" />
            </a-form-item>
            <a-form-item :name="['smallInformation1']" label="Thông tin thêm 1">
                <a-input v-model:value="formState.smallInformation1" />
            </a-form-item>
            <a-form-item :name="['smallInformation2']" label="Thông tin thêm 2">
                <a-input v-model:value="formState.smallInformation2" />
            </a-form-item>
            <a-form-item :name="['heroImage']" label="Link Ảnh chính">
                <a-input v-model:value="formState.heroImage" />
            </a-form-item>
            <a-form-item :name="['status']" label="Status" :style="styleInput" >
                <StatusElement :status="formState.status" ref="select" @selectStatus="selectStatus" :disabled="true"/>
            </a-form-item>
            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }" :style="styleInput">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>