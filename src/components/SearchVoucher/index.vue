<!-- Fullname,code,province,district,precinct,star,information -->
<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";
import { StatusType } from "@/type/StatusType";
import { SearchVoucherForm } from '@/type/SearchVoucherForm';
import { voucherType } from '@/type/VoucherType';
import { message } from 'ant-design-vue';
const emit = defineEmits(['searchVoucher'])
const props = defineProps(['defaultPage'])
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const formItemStyle = {
    labelCol3: { width: '50%', },
    labelColInput3: { width: '100%', float: 'left' },
};
const formState = ref<SearchVoucherForm>({
    value: undefined,
    title: undefined,
    voucherType: undefined,
    from: undefined,
    to: undefined,
    status: undefined,
    page: props.defaultPage.page,
    size: props.defaultPage.size,
})
const onFinish = () => {
    emit('searchVoucher', formState.value);
}
const styleInput = "float: left; width: 45%;";

const selectStatus = (value: StatusType) => {
    formState.value.status = value;
}
const clearFilter = () => {
    formState.value.value = undefined;
    formState.value.title = undefined;
    formState.value.voucherType = undefined;
    formState.value.from = undefined;
    formState.value.to = undefined;
    formState.value.status = undefined;
}

const voucherPlaceholder = ref();
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
</script>
<template>
    <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
        <a-form-item :name="['title']" label="Title" :style="styleInput"
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

        <a-form-item :name="['from']" label="From" :style="styleInput">
            <a-date-picker v-model:value="formState.from" :format="dateFormatShow" :show-time="{ format: 'HH:mm:ss' }" />
        </a-form-item>
        <a-form-item :name="['to']" label="To" :style="styleInput">
            <a-date-picker v-model:value="formState.to" :format="dateFormatShow" :show-time="{ format: 'HH:mm:ss' }" />
        </a-form-item>
        <a-form-item :name="['status']" label="Status" :style="styleInput">
            <StatusElement :status="formState.status" ref="select" @selectStatus="selectStatus" />
        </a-form-item>
        <div style="width:100%; float:left; text-align: center;">
            <a-button type="primary" html-type="submit">Tìm kiếm</a-button>
            <a-button @click="clearFilter" style="margin-left: 15px;">Clear Filter</a-button>
        </div>
    </a-form>
</template>