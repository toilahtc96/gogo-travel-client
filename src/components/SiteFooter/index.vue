<script lang="ts" setup>
import { LayoutFooter as ALayoutFooter } from "ant-design-vue";
</script>

<template>
  <a-layout-footer :style="{ textAlign: 'center' }">
    Ant Design ©{{ new Date().getFullYear() }} Created by HTC
  </a-layout-footer>
</template>
