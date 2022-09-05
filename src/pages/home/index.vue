<script lang="ts" setup>
import { useCounterStore } from "@/stores/counter";
import { Button as AButton, ButtonGroup as AButtonGroup } from "ant-design-vue";

const counterStore = useCounterStore();
</script>

<template>
  <div>
    <p>{{ counterStore.count }}</p>
    <p>Double Count: {{ counterStore.doubleCount }}</p>
    <a-button-group>
      <a-button type="primary" @click="counterStore.increment">++</a-button>
      <a-button type="primary" danger @click="counterStore.decrement">
        --
      </a-button>
    </a-button-group>
  </div>
</template>
