<script lang="ts" setup>
import { StatusType } from "@/type/StatusType";

const props = defineProps(['status'])
const emit = defineEmits(['selectStatus'])

const selectStatus = (value: StatusType) => {
    emit('selectStatus',value)
}
</script>
<template>
    <a-select ref="select" v-model:value="props.status" @change="selectStatus" allowClear placeholder="Select Status">
        <a-select-option v-for="data in StatusType" :key="data" :value="data"> {{
            data
        }}</a-select-option>
    </a-select>
</template>