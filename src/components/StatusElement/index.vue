<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";
import { StatusType } from "@/type/StatusType";

const props = defineProps(['status'])
const emit = defineEmits(['selectStatus'])

const selectStatus = (value: StatusType) => {
    emit('selectStatus',value)
}
</script>
<template>
    <a-select ref="select" v-model:value="status" style="width: 120px" @change="selectStatus" allowClear>
        <a-select-option v-for="data in StatusType" :key="data" :value="data">{{
            data
        }}</a-select-option>
    </a-select>
</template>