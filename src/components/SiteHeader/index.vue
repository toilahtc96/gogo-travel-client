<script lang="ts" setup>
</script>

<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 999, width: '100%' }">
    <div class="logo">
      <img src="@/assets/img/logo/low-res-logo.png" alt="" style="padding-bottom: 25%;">
    </div>
    <div id="app">
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-sub-menu key="company">
          <template #title>Thông tin công ty</template>
          <a-menu-item key="companies">
            <router-link to="/admin/company-information">Xem</router-link>
          </a-menu-item>
          <a-menu-item key="add-company">
            <router-link to="/admin/company-information/add">Thêm mới</router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>

    </div>
  </a-layout-header>
</template>

<style lang="scss" scoped>
.logo {
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
