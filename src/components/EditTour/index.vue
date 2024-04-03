<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { TableColumnsType } from 'ant-design-vue';
import { message } from "ant-design-vue";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
import { useRoute } from "vue-router";
import { TourService } from '@/services/tourService';
import TourType from '@/type/TourType';


const tourService = new TourService();
const route = useRoute();
const spinning = ref<boolean>(false);
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
const fetchTour = () => {
    debugger;
    const id = route.params.id;
    if (id) {
        changeSpinning();
        tourService.getById(id)?.then((data) => {
            formState.value.id = data.id;
            formState.value.mainBackgroundUrl = data.mainBackgroundUrl;
            formState.value.contactBackgroundUrl = data.contactBackgroundUrl;
            formState.value.informationUrl = data.informationUrl;
            formState.value.status = data.status;
            changeSpinning();
        })
    }
}
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const formState = ref<TourType>({
    id: undefined,
    tourCode: undefined,
    dayInTour: undefined,
    tourName: undefined,
    tourSmallInformation: undefined,
    priceOncePerson: undefined,
    benefit: undefined,
    specialInTour: undefined,
    mainBackgroundUrl: undefined,
    informationUrl: undefined,
    contactBackgroundUrl: undefined,
    status: undefined
});
const onFinish = (values: any) => {
    changeSpinning();
    tourService.edit(values)
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
            router.replace("/admin/tour")
        })
        .catch(
            (err) => { message.error(err) }
        )
};
onMounted(() => {
    fetchTour();
})

watch(() => route.params.id, () => {
    fetchTour();
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
            <!-- mainBackgroundUrl informationUrl contactBackgroundUrl -->
            <a-form-item :name="['mainBackgroundUrl']" label="Link ảnh Hình nền chính" :rules="[{ required: true }]">
                <a-input v-model:value="formState.mainBackgroundUrl" />
            </a-form-item>
            <a-form-item :name="['contactBackgroundUrl']" label="Link Hình nền liên hệ" :rules="[{ required: true }]">
                <a-input v-model:value="formState.contactBackgroundUrl" />
            </a-form-item>
            <a-form-item :name="['informationUrl']" label="Link  ảnh Thông tin tour" :rules="[{ required: true }]">
                <a-input v-model:value="formState.informationUrl" />
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