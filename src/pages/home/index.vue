<script lang="ts" setup>
import { useCounterStore } from "@/stores/counter";
import { Button as AButton, ButtonGroup as AButtonGroup, MenuItem } from "ant-design-vue";
import { onMounted, reactive } from "vue";

const counterStore = useCounterStore();
const listMenuItem = reactive([MenuItem]);
onMounted(() => {
})
</script>

<template>
</template>
