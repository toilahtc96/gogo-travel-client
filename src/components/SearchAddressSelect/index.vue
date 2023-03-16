<script lang="ts" setup>
import { AddressService } from '@/services/address';
import { Address } from '@/type/Address'
import { AddressType } from '@/type/AddressType';
import type { SelectProps } from 'ant-design-vue';
import { onMounted, ref, watch, defineProps, defineEmits } from 'vue';
const props = defineProps(['listAddress', 'addressCode', 'addressType','key']);
const emit = defineEmits(['filter', 'selectAddress']);
const addressService = new AddressService();
let defaultPage = ref({
    page: 0,
    size: 10
});
let listAddress = ref({
    listData: ref<[Address]>()
});
onMounted(() => {
    addressService.getByTypePaging(addressType.value, defaultPage.value.page, defaultPage.value.size).then((data: any) => {
        listAddress.value = { listData: data };
    }).then(() => {
        if (listAddress.value.listData) {
            options.value = [];
            Object.values(listAddress.value.listData).forEach((item: Address) => {
                options.value?.push({ value: item.id, label: item.name });
            });
        }
    });
})
watch(() => props.listAddress, () => {
    if (props.listAddress) {
        openSelect.value = false;
        loading.value = false;
        options.value = [];
        Object.values(props.listAddress.listData).forEach((item: any) => {
            options.value?.push({ value: item.id, label: item.name });
        });
    }
})

watch(() => props.addressCode, () => {
    if (props.addressCode) {
        getAddressByCode(props.addressCode, addressType.value);
    }
})

watch(() => props.addressType, () => {
    if (props.addressType) {
        addressType.value = props.addressType;
    }
})

const getAddressByCode = (code: string, type: AddressType) => {
    addressService.getAddressByTypeAndCode(code, type)?.then((data) => {
        if (data) {
            if (!options.value?.includes({ value: data.id, label: data.name })) {
                options.value?.push({ value: data.id, label: data.name });
            }
        }
    }).then(() => {
        addressCode.value = props.addressCode;
    })
}
let options = ref<SelectProps['options']>([

]);
const handleChange = (value: number) => {
    emit('selectAddress', value);
};
const handleBlur = () => {
    openSelect.value = false;
};
let inputCancel = ref("");
const filterOption = (input: string) => {
    // return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

let openSelect = ref<boolean>(false);
const addressCode = ref("");
const addressType = ref<AddressType>(AddressType.PROVINCE);
const loading = ref(false);
const inputKeyDown = (key: KeyboardEvent) => {
    loading.value = true;
    delay(function () {
        emit('filter', (key.target as HTMLSelectElement).value);
    }, 1000);
}

var delay = (function () {
    let timer: any = 0;
    return function (callback: any, ms: any) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();
const selectAddress = ref<Element>();
</script>
<template>
    <a-select :loading="loading" v-model:value="addressCode" show-search placeholder="Select a address" style="width: 50%"
        :options="options" :filter-option="filterOption" :open="openSelect" @select="openSelect = false"
        @mousedown="openSelect = true"  @blur="handleBlur" @change="handleChange" ref="selectAddress"
        @inputKeyDown="inputKeyDown" allowClear :key="key"/>
</template>