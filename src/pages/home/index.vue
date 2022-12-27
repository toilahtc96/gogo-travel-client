<script lang="ts" setup>
import { useCounterStore } from "@/stores/counter";
import { Button as AButton, ButtonGroup as AButtonGroup, MenuItem } from "ant-design-vue";
import { onMounted, reactive } from "vue";
import { MenuService } from "@/services/MenuService";

const counterStore = useCounterStore();
const menuService = new MenuService();
//get menu 
const listMenuItem = reactive([MenuItem]);
onMounted(() => {
  debugger;
  menuService.getMenu();
})

//end 
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>
