<script lang="ts" setup>
import { Layout as ALayout } from "ant-design-vue";
import SiteHeader from "@/components/SiteHeader/index.vue";
import SiteFooter from "@/components/SiteFooter/index.vue";
import SiteContent from "@/components/SiteContent/index.vue";
</script>

<template>
  <a-layout>
    <site-header />
    <site-content />
    <site-footer />
  </a-layout>
</template>
