<script lang="ts" setup>
</script>

<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 999, width: '100%' }">
    <div class="logo" />
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
        <a-sub-menu key="roles">
          <template #title>Role</template>
          <a-menu-item-group title="Setup Role">
            <a-menu-item key="role-list">
              <router-link to="/admin/role">Role</router-link>
            </a-menu-item>
            <a-menu-item key="role-add">
              <router-link to="/admin/role/add"> Add Role </router-link>
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="user-type">
          <template #title>User Type</template>
          <a-menu-item-group title="Setup User Type">
            <a-menu-item key="user-type-list">
              <router-link to="/admin/user-type">User Type</router-link>
            </a-menu-item>
            <a-menu-item key="user-type-add">
              <router-link to="/admin/user-type/add"> Add User Type </router-link>
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="level">
          <template #title>Level</template>
          <a-menu-item-group title="Setup Level">
            <a-menu-item key="level">
              <router-link to="/admin/level">Level</router-link>
            </a-menu-item>
            <a-menu-item key="level-add">
              <router-link to="/admin/level/add"> Add Level</router-link>
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="deal">
          <template #title>Deal</template>
          <a-menu-item-group title="Setup Deal">
            <a-menu-item key="deal">
              <router-link to="/admin/deal">Deal</router-link>
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="user">
          <template #title>User</template>
          <a-menu-item-group title="Setup User">
            <a-menu-item key="user-list">
              <router-link to="/admin/user">User</router-link>
            </a-menu-item>
            <a-menu-item key="user-add">
              <router-link to="/admin/user/add"> Add User </router-link>
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="process">
          <template #title>Process</template>
          <a-menu-item-group title="Setup Process">
            <a-menu-item key="process">
              <router-link to="/admin/process">Process</router-link>
            </a-menu-item>
            <a-menu-item key="process-add">
              <router-link to="/admin/process/add"> Add Process</router-link>
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
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
        <a-sub-menu key="careers">
          <template #title>Career</template>
          <a-menu-item-group title="Setup Career">
            <a-menu-item key="career-list">
              <router-link to="/admin/career">Career</router-link>
            </a-menu-item>
            <a-menu-item key="career-add">
              <router-link to="/admin/career/add"> Add Career </router-link>
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="jobtypes">
          <template #title>Job Type</template>
          <a-menu-item-group title="Setup Job Type">
            <a-menu-item key="jobtype-list">
              <router-link to="/admin/job-type">Job type</router-link>
            </a-menu-item>
            <a-menu-item key="jobtype-add">
              <router-link to="/admin/job-type/add"> Add Job type </router-link>
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
