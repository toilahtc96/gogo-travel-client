<script lang="ts" setup>
import { watch, defineProps } from 'vue';
const props = defineProps(['current', 'total', 'pageSize'])
const emit = defineEmits(['change', 'showSizeChange'])
const change = (page: number, pageSize: number) => {
  if (page > 0) {
    page--;
  }
  emit('change', page, pageSize);
}
const showSizeChange = (current: number, size: number) => {
  emit('showSizeChange', current, size);
}
</script>
<template>
  <a-pagination v-model:current="current" :total="total" :pageSize="pageSize" style="float:right" @change="change"
    show-size-changer @showSizeChange="showSizeChange" />
</template>