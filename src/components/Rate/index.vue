<script lang="ts" setup>
import { defineComponent, onMounted, ref, watch , defineProps} from 'vue';
const props = defineProps(['isCanAccess', 'star'])
const star = ref<number>();
let isCanAccess = ref<boolean>(false);
onMounted(() => {
  isCanAccess.value = props.isCanAccess;
})
const fixStar = (value: number) => { }
</script>
<template>
  <a-rate :value="star" :disabled="isCanAccess" @change="fixStar" />
</template>