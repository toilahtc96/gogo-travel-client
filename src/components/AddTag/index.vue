
<script lang="ts" setup>
import { ref, nextTick, onMounted, watch } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';

const props = defineProps(['title'])
const emit = defineEmits(['resultTag']);
const inputRef = ref();
const tags = ref<string[]>([]);
const inputVisible = ref(false);
const inputValue = ref('');

const setTag = (tagOfJob: string) => {
    
    tags.value = tagOfJob.split(";");
}
const handleClose = (removedTag: string) => {
    let tagAfter = tags.value.filter(tag => tag !== removedTag);
    tags.value = tagAfter;
};

const showInput = () => {
    inputVisible.value = true;
    nextTick(() => {
        inputRef.value.focus();
    });
};

const handleInputConfirm = (e: Event) => {
    let inputAfterValue = inputValue.value;
    let tagAfter = tags.value;
    if (inputValue.value && tags.value.indexOf(inputValue.value) === -1) {
        tagAfter = [...tags.value, inputValue.value];
    }
    tags.value = tagAfter;
    inputValue.value = '';
    const result = tags.value.join(";")
    emit('resultTag', result, e);
};
defineExpose({
    setTag,
});

</script>

<template>
    <template v-for="(tag, index) in tags" :key="tag">
        <a-tooltip v-if="tag.length > 20" :title="tag">
            <a-tag :closable="index >= 0" @close="handleClose(tag)">
                {{ `${tag.slice(0, 20)}...` }}
            </a-tag>
        </a-tooltip>
        <a-tag v-else :closable="index >= 0" @close="handleClose(tag)">
            {{ tag }}
        </a-tag>
    </template>
    <a-input v-if="inputVisible" ref="inputRef" v-model:value="inputValue" type="text" size="small"
        :style="{ width: '78px' }" @blur="handleInputConfirm" @keyup.enter="handleInputConfirm" />
    <a-tag v-else style="background: #fff; border-style: dashed" @click="showInput">
        <plus-outlined />
        {{ props.title }}
    </a-tag>
</template>