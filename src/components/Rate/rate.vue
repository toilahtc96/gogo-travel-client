<script lang="ts" setup>
import { defineComponent, ref } from 'vue';
const star = ref<number>();
let isCanAccess = ref<boolean>(false);
const fixStar = (value: number) => { }
</script>
<template>
  <a-rate :value="star" :disabled="isCanAccess" allow-half @change="fixStar" />
</template>