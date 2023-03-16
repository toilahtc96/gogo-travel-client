<!-- Fullname,code,province,district,precinct,star,information -->
<script lang="ts" setup>
import { AddressService } from "@/services/address";
import { AddressType } from "@/type/AddressType";
import { SearchAddress } from "@/type/Address";
import { ref, watch, defineProps, defineEmits } from "vue";
import { StatusType } from "@/type/StatusType";
const addressService = new AddressService();
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
    name: '',
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
defineExpose({
    settingDefaultPage
})

</script>
<template>
    <div style="background-color: #f1f1f1;">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['name']" label="Address Name" :style="formItemStyle.labelCol3" style="float:left">
                <a-input v-model:value="formState.name" />
            </a-form-item>

            <div style="width:100%; float:left; text-align: center;">
                <a-button type="primary" html-type="submit">Tìm kiếm</a-button>
            </div>
        </a-form>
    </div>
</template>