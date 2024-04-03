<script lang="ts" setup>
</script>

<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 999, width: '100%' }">
    <div class="logo">
      <img src="@/assets/img/logo/low-res-logo.png" alt="" style="padding-bottom: 25%; width: 50px;">
    </div>
    <div id="app">
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-sub-menu key="main-information">
          <template #title>Thông tin Header</template>
          <a-menu-item key="main-information">
            <router-link to="/admin/main-information">Xem</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="reason">
          <template #title>Lý do chọn</template>
          <a-menu-item key="reasons">
            <router-link to="/admin/reason-choose">Xem</router-link>
          </a-menu-item>
          <a-menu-item key="add-reason-choose">
            <router-link to="/admin/reason-choose/add">Thêm mới</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="tours">
          <template #title>Các Tour</template>
          <a-menu-item key="tours">
            <router-link to="/admin/tour">Xem</router-link>
          </a-menu-item>
          <a-menu-item key="add-tour">
            <router-link to="/admin/tour/add">Thêm mới</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="registration">
          <template #title>Thông tin Người đăng ký</template>
          <a-menu-item key="registrations">
            <router-link to="/admin/registration">Xem</router-link>
          </a-menu-item>
        </a-sub-menu>
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
