<script lang="ts" setup>
import { User } from '@/type/User';
import { UserType } from '@/type/UserType';
import type { SelectProps } from 'ant-design-vue';
import { onMounted, ref, watch } from 'vue';
const props = defineProps(['listUser']);
const emit = defineEmits(['filter']);
onMounted(() => {

})
let data = ref<[User]>(props.listUser.listData);
watch(() => props.listUser, () => {
    data = ref<[User]>(props.listUser.listData);
    if (data.value) {
        Object.values(data.value).forEach((item: User) => {
            options.value?.push({ value: item.id, label: item.name });
        });
    }
})
let options = ref<SelectProps['options']>([

]);
const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};
const handleBlur = () => {
    console.log('blur');
};
const handleFocus = () => {
    console.log('focus');
};
const filterOption = (input: string, option: any) => {
    emit('filter', input, option);
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const value = ref("");
const current = ref(2);
</script>
<template>
    <a-select v-model:value="value" show-search placeholder="Select a person" style="width: 200px" :options="options" allowClear
        :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange">
    </a-select>
</template>