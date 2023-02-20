<script lang="ts" setup>

import { ProcessCode } from "@/type/ProcessCode";

const props = defineProps(['processCode'])
const emit = defineEmits(['selectProcess'])

const selectProcess = (value: ProcessCode) => {
    emit('selectProcess', value)
}
</script>
<template>
    <a-select ref="select" v-model:value="processCode" style="width: 300px" @click="selectProcess">
        <a-select-option v-for="data in ProcessCode" :key="data" :value="data">{{
            data
        }}</a-select-option>
    </a-select>
</template>