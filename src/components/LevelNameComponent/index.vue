<script lang="ts" setup>

import { defineProps } from "vue";
import { LevelName } from "@/type/LevelName";

const props = defineProps(['levelName'])
const emit = defineEmits(['selectLevel'])

const selectLevel = (value: LevelName) => {
    emit('selectLevel', value)
}
</script>
<template>
    <a-select ref="select" v-model:value="levelName" placeholder="Level Require" @change="selectLevel" allowClear>
        <a-select-option v-for="data in LevelName" :key="data" :value="data"> {{
            data
        }}</a-select-option>
    </a-select>
</template>