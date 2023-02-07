<script lang="ts" setup>

import { StatusType } from "@/type/StatusType";

const props = defineProps(['status'])
</script>
<template>
    <a-select ref="select" v-model:value="status" style="width: 120px">
        <a-select-option v-for="data in StatusType" :key="data" :value="data">{{
            data
        }}</a-select-option>
    </a-select>
</template>