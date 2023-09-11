<script lang="ts" setup>
import { VoucherService } from '@/services/voucherService';
import { Voucher } from '@/type/Voucher';
import type { SelectProps } from 'ant-design-vue';
import { onMounted, ref, watch } from 'vue';
const props = defineProps(['listVoucher','style']);
const emit = defineEmits(['filter']);
const loading = ref(false);
const voucherService = new VoucherService();
onMounted(() => {

})
let data = ref<[Voucher]>(props.listVoucher.listData);
let options = ref<SelectProps['options']>([

]);
const handleChange = (value: string) => {
};

const inputKeyDown = (key: KeyboardEvent) => {
    loading.value = true;
    delay(function () {
        emit('filter', (key.target as HTMLSelectElement).value);
    }, 1000);
}
const value = ref("");
var delay = (function () {
    let timer: any = 0;
    return function (callback: any, ms: any) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

watch(() => props.listVoucher, () => {
    if (props.listVoucher) {
        openSelect.value = false;
        loading.value = false;
        options.value = [];
        Object.values(props.listVoucher.listData).forEach((item: any) => {
            options.value?.push({ value: item.id, label: `${item.title} - ( ${item.voucherType} : ${item.value} )`, key: item.id });
        });
        setTimeout(() => {
            openSelect.value = true;
        }, 100)

    }
})

let openSelect = ref<boolean>(false);

let listVoucher = ref({
    listData: ref<[Voucher]>()
});
let defaultPage = ref({
    page: 0,
    size: 10
});
onMounted(() => {
    voucherService.findVoucher({ ...defaultPage.value }).then((data: any) => {
        listVoucher.value = { listData: data.data };
    }).then(() => {
        if (listVoucher.value.listData) {
            options.value = [];
            Object.values(listVoucher.value.listData).forEach((item: Voucher) => {
                options.value?.push({ value: item.id, label: `${item.title} - ( ${item.voucherType} : ${item.value} )` });
            });
        }
    });
})
</script>
<template>
    <a-select v-model:value="value" :loading="loading" show-search placeholder="Select a voucher" style="style"
        :options="options" allowClear @inputKeyDown="inputKeyDown" @change="handleChange" :open="openSelect"
        @mousedown="openSelect = true" @focus="openSelect = true"  @blur="openSelect = false"
        @select="openSelect = false" ref="selectVoucher">
    </a-select>
</template>