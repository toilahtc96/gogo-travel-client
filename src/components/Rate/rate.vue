<script lang="ts" setup>
import { defineComponent, onMounted, ref, watch } from 'vue';
const props = defineProps(['isCanAccess', 'star'])
const star = ref<number>();
let isCanAccess = ref<boolean>(false);
onMounted(() => {
  isCanAccess.value = props.isCanAccess;
})
const fixStar = (value: number) => { }
</script>
<template>
  <a-rate :value="star" :disabled="isCanAccess" allow-half @change="fixStar" />
</template>