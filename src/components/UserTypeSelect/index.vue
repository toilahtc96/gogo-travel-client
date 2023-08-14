<script lang="ts" setup>

import { UserType } from "@/type/UserType";
import { watch } from "vue";

const props = defineProps(['userTypeCode'])
const emit = defineEmits(['selectUserType'])
const selectUserType = (value: UserType) => {
    emit('selectUserType',value);
}
</script>
<template>
    <a-select ref="select-role" v-model:value="props.userTypeCode" style="width: 50%" @change="selectUserType" allowClear>
        <a-select-option v-for="data in UserType" :key="data" :value="data"> {{
            data
        }}</a-select-option>
    </a-select>
</template>