<script lang="ts" setup>

import { StepCode } from "@/type/StepCode";
import { ref, defineProps } from "vue";
const props = defineProps(['current'])
const emit = defineEmits(['editStep']);
const current = ref(props.current);
const editStep = (value: any) => {
    switch (value) {
        case StepCode.INIT:
            current.value = 0;
            break;
        case StepCode.SEND_CV_TO_AGENCY:
            current.value = 1;
            break;
        case StepCode.SEND_CV_TO_COMPANY:
            current.value = 2;
            break;
        case StepCode.SUCCESS:
            current.value = 3;
            break;
        case StepCode.FAIL:
            current.value = 4;
            break;
        default:
            break;
    }
    emit('editStep', current.value);
}
</script>
<template>
    <a-steps :current="current" size="small">
        <a-step v-for="data in StepCode" :key="data" :title="data" @click="editStep(data)" />
    </a-steps>
</template>