<!-- Fullname,code,province,district,precinct,star,information -->
<script lang="ts" setup>
import { AddressType } from "@/type/AddressType";
import { SearchAddress } from "@/type/Address";
import { ref, defineProps, defineEmits } from "vue";
import { StatusType } from "@/type/StatusType";
const emit = defineEmits(['searchAddress'])
const props = defineProps(['defaultPage'])
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const formItemStyle = {
    labelCol3: { width: '50%', },
    labelColInput3: { width: '100%', float: 'left' },
};
const formState = ref<SearchAddress>({
    provinceCode:'',
    provinceName: '',
    districtCode: '',
    districtName: '',
    precinctCode: '',
    precinctName: '',
    type: AddressType.PROVINCE,
    status: StatusType.ACTIVED,
    page: props.defaultPage.page,
    size: props.defaultPage.size
})
const onFinish = () => {
    console.log("searchAddress")
    emit('searchAddress', formState.value);
}
const settingDefaultPage = (size: number) => {
    formState.value.size = size;
}
const changeTypeAddressSelect = (type: AddressType) => {
    switch (type) {
        case AddressType.PROVINCE: {
            break;
        }
        case AddressType.PROVINCE: {
            break;
        }
        case AddressType.PROVINCE: {
            break;
        }
        default: break;
    }
}
defineExpose({
    settingDefaultPage
})

</script>
<template>
    <div style="background-color: #f1f1f1;">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['provinceName']" label="Province Name" :style="formItemStyle.labelCol3" style="float:left">
                <a-input v-model:value="formState.provinceName" />
            </a-form-item>
            <a-form-item :name="['districtName']" label="District Name" :style="formItemStyle.labelCol3" style="float:left">
                <a-input v-model:value="formState.districtName" />
            </a-form-item>
            <a-form-item :name="['precinctName']" label="Precinct Name" :style="formItemStyle.labelCol3" style="float:left">
                <a-input v-model:value="formState.precinctName" />
            </a-form-item>
            <a-form-item :name="['type']" label="Type" :style="formItemStyle.labelCol3" style="float:left">
                <a-select ref="select" v-model:value="formState.type" style="width: 50%" :rules="[{ required: true }]"
                    allowClear>
                    <a-select-option v-for="data in AddressType" :key="data" :value="data"
                        @change="changeTypeAddressSelect"> {{ data }}</a-select-option>
                </a-select>
            </a-form-item>
            <div style="width:100%; float:left; text-align: center;">
                <a-button type="primary" html-type="submit">Tìm kiếm</a-button>
            </div>
        </a-form>
    </div>
</template>