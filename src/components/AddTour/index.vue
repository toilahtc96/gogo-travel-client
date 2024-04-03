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
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const formItemStyle = {
    labelCol3: { width: '100%', },
    labelColInput3: { width: '100%', float: 'left' },
};
const styleInput = "float: left; width: 100%;";
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
    status: StatusType.ACTIVED
});
const onFinish = (values: any) => {
    tourService.add(values)
        .then(
            (data) => {
                if (data && data.status === 204) {
                    message.info("Success")
                    router.push("/admin/tour")
                } else {
                    message.error('Has error, Contact to developer')
                }
            }
        )
        .catch(
            (err) => { message.error(err) }
        )
};
const selectStatus = (value: StatusType) => {
    formState.value.status = value;
}
</script>
<template>
    <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
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
</template>