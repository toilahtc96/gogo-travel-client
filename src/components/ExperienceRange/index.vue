<script lang="ts" setup>
import { ref } from 'vue';
const emit = defineEmits(["chooseExperience"])
const sliderValue = ref<number>(0);
const change = (value: number) => {
    emit('chooseExperience', value);
}
</script>
<style scoped>
.icon-wrapper {
    position: relative;
    padding: 0px 30px;
}

.icon-wrapper .anticon {
    position: absolute;
    top: -2px;
    width: 16px;
    height: 16px;
    line-height: 1;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.25);
}

.icon-wrapper .anticon:first-child {
    left: 0;
}

.icon-wrapper .anticon:last-child {
    right: 0;
}
</style>
<template>
    <div class="icon-wrapper">
        <a-slider v-model:value="sliderValue" :min="0" :max="20" @change="change" />
    </div>
</template>