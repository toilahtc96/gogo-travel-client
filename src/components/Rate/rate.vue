<script lang="ts" setup>
import { defineComponent, ref } from 'vue';
const star = ref<number>();
const fixStar = (value: number) => {}
</script>
<template>
  <a-rate :value="star" allow-half @change="fixStar" />
</template>