<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { message } from "ant-design-vue";
import router from "@/router/router";
import { Voucher } from "@/type/Voucher";
import { StatusType } from "@/type/StatusType";
import { voucherType } from "@/type/VoucherType";
import { VoucherService } from "@/services/voucherService";
import dayjs from "dayjs";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;
const voucerService = new VoucherService();
const spinning = ref<boolean>(false);
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const formItemStyle = {
    labelCol3: { width: '100%', },
    labelColInput3: { width: '100%', float: 'left' },
};
const formState = ref<Voucher>({
    id: undefined,
    status: undefined,
    title: undefined,
    value: undefined,
    voucherType: undefined,
    startTime: undefined,
    endTime: undefined,
});
const onFinish = (values: Voucher) => {
    if (values.startTime) {
        values.startTime = dayjs(values.startTime).format(dateFormat);
    }
    if (values.endTime) {
        values.endTime = dayjs(values.endTime).format(dateFormat);
    }
    voucerService.editVoucher(values)
        .then(
            (data) => {
                if (data && data.status === 204) {
                    message.info("Success")
                    router.push("/admin/voucher")
                } else {
                    message.error('Has error, Contact to developer')
                }
            }
        )
        .catch(
            (err) => { message.error(err) }
        )
};
onMounted(() => {
    voucherPlaceholder.value = "Select Voucher Type";
    fetchVoucher();
})
const fetchVoucher = () => {
    if (id) {
        changeSpinning();
        voucerService.getVoucherById(id)?.then((data) => {
            formState.value.id = data.id;
            formState.value.title = data.title;
            formState.value.status = data.status;
            formState.value.value = data.value;
            formState.value.voucherType = data.voucherType;
            formState.value.startTime = dayjs(data.startTime);
            formState.value.endTime = dayjs(data.endTime);
            changeSpinning();
        })
    }
}
const styleInput = "float: left; width: 100%;";
const voucherPlaceholder = ref();
const selectStatus = (value: StatusType) => {
    formState.value.status = value;
}
const minValue = ref();
const maxValue = ref();
const selectVoucherType = (value: voucherType) => {
    formState.value.voucherType = value;
    minValue.value = undefined;
    maxValue.value = undefined;
    if (value == voucherType.CASH) {
        voucherPlaceholder.value = "Tiền mặt";
    } else {
        minValue.value = 0;
        maxValue.value = 100;
        voucherPlaceholder.value = "Phần Trăm Lương Offer";
        if (formState.value.value && formState.value.value > 100) {
            formState.value.value = 100;
            message.info("Max PERCENT is 100");
        }
    }
}
const dateFormat = "YYYY-MM-DDTHH:mm:ss";
const dateFormatShow = "HH:mm:ss DD-MM-YYYY";
let defaultPage = ref({
    page: 0,
    size: 10
});
</script>
<style scoped>
.ant-picker {
    width: 100%;
}

.ant-input-number {
    width: 100% !important;
}
</style>
<template>
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <!-- :rules="[{ required: true }]" -->
            <a-form-item :name="['id']" label="Id" :rules="[{ required: true }]" :hidden="true">
                <a-input-number :value="formState.id" />
            </a-form-item>
            <a-form-item :name="['title']" label="Title" :style="styleInput" :rules="[{ required: true }]"
                placeholder="Voucher Title">
                <a-input v-model:value="formState.title" />
            </a-form-item>
            <a-form-item :name="['voucherType']" label="Type" :style="styleInput">
                <VoucherTypeSelect :voucherTypeSelected="formState.voucherType" ref="selectVoucherTypeElement"
                    @selectVoucherType="selectVoucherType" />
            </a-form-item>
            <a-form-item :name="['value']" label="value" :style="styleInput">
                <a-input-number v-model:value="formState.value" :placeholder="voucherPlaceholder" :min="minValue"
                    :max="maxValue" />
            </a-form-item>
            <a-form-item :name="['status']" label="Status" :style="styleInput">
                <StatusElement :status="formState.status" ref="select" @selectStatus="selectStatus" />
            </a-form-item>
            <a-form-item :name="['startTime']" label="Start Time">
                <a-date-picker v-model:value="formState.startTime" :format="dateFormatShow"  :show-time="{ format: 'HH:mm:ss' }" />
            </a-form-item>
            <a-form-item :name="['endTime']" label="End Time">
                <a-date-picker v-model:value="formState.endTime" :format="dateFormatShow"  :show-time="{ format: 'HH:mm:ss' }" />
            </a-form-item>

            <!-- voucherType: undefined, -->
            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }" :style="styleInput">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>