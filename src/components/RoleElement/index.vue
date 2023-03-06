<script lang="ts" setup>

import { RoleType } from "@/type/RoleType";

const props = defineProps(['role'])
const emit = defineEmits(['selectRole'])
const test = (value: RoleType) => {
    emit('selectRole',value);
}
</script>
<template>
    <a-select ref="select-role" v-model:value="props.role" style="width: 120px" @change="test" allowClear>
        <a-select-option v-for="data in RoleType" :key="data" :value="data">{{
            data
        }}</a-select-option>
    </a-select>
</template>