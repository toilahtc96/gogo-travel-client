<script lang="ts" setup>
import {
  LayoutHeader as ALayoutHeader,
  Menu as AMenu,
  SubMenu as ASubMenu,
  MenuItem as AMenuItem,
} from "ant-design-vue";
</script>

<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 999, width: '100%' }">
    <div class  ="logo" />
    <div id="app">
    <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
      <a-sub-menu key="company">
        <template #title>Company</template>
          <a-menu-item key="companies">
            <router-link to="/admin/company">Company</router-link>
          </a-menu-item>
          <a-menu-item key="add-company">
            <router-link to="/admin/company/add">Add Company</router-link>
          </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="roles"> <router-link to="/admin/role">Role</router-link></a-menu-item>
      <a-sub-menu key="address">
        <template #title>Address</template>
        <a-menu-item-group title="Setup Address">
          <a-menu-item key="address-list">
            <router-link to="/admin/address">Address</router-link>
          </a-menu-item>
          <a-menu-item key="address-add">
            <router-link to="/admin/address/add"> Add Address </router-link>
          </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
    </a-menu>
    </div>
  </a-layout-header>
</template>

<style lang="scss" scoped>
.logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
