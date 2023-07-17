<script lang="ts" setup>
import { defineEmits, defineProps, onMounted } from "vue";
import { voucherType } from "@/type/VoucherType";

const props = defineProps(['voucherTypeSelected'])
const emit = defineEmits(['selectVoucherType'])


const selectVoucherType = (value: voucherType) => {
    emit('selectVoucherType', value)
}
</script>
<template>
    <a-select ref="select" v-model:value="voucherTypeSelected" @change="selectVoucherType" allowClear
        placeholder="select voucher type">
        <a-select-option v-for="data in voucherType" :key="data" :value="data"> {{
            data
        }}</a-select-option>
    </a-select>
</template>
