<script lang="ts" setup>

import { ProcessCode } from "@/type/ProcessCode";
import { ref } from "vue";
const props = defineProps(['current'])
const emit = defineEmits(['editProcess']);
const current = ref(props.current);
const editProcess = (value: any) => {
    switch (value) {
        case ProcessCode.INIT:
            current.value = 0;
            break;
        case ProcessCode.SEND_CV_TO_AGENCY:
            current.value = 1;
            break;
        case ProcessCode.SEND_CV_TO_COMPANY:
            current.value = 2;
            break;
        case ProcessCode.SUCCESS:
            current.value = 3;
            break;
        case ProcessCode.FAIL:
            current.value = 4;
            break;
        default:
            break;
    }
    emit('editProcess', current.value);
}
</script>
<template>
    <a-steps :current="current" size="small">
        <a-step v-for="data in ProcessCode" :key="data" :title="data" @click="editProcess(data)" />
    </a-steps>
</template>