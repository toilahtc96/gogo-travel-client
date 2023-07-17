<script lang="ts" setup>

import { StepCode } from "@/type/StepCode";
import { defineProps } from "vue";
const props = defineProps(['stepCode'])
const emit = defineEmits(['selectStep'])

const selectStep = (value: StepCode) => {
    emit('selectStep', value)
}
</script>
<template>
    <a-select ref="select" v-model:value="stepCode" style="width: 300px" @click="selectStep" allowClear>
        <a-select-option v-for="data in StepCode" :key="data" :value="data"> {{
            data
        }}</a-select-option>
    </a-select>
</template>