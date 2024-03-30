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
        <a-sub-menu key="progress">
          <template #title>Progress</template>
          <a-menu-item-group title="Setup Progress">
            <a-menu-item key="progress">
              <router-link to="/admin/progress">Progress</router-link>
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
        <a-sub-menu key="step">
          <template #title>Step</template>
          <a-menu-item-group title="Setup Step">
            <a-menu-item key="step">
              <router-link to="/admin/step">Step</router-link>
            </a-menu-item>
            <a-menu-item key="step-add">
              <router-link to="/admin/step/add"> Add Step</router-link>
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
        <a-sub-menu key="workingForms">
          <template #title>Working Form </template>
          <a-menu-item-group title="Setup Working Form">
            <a-menu-item key="workingForm-list">
              <router-link to="/admin/working-form">Working Form</router-link>
            </a-menu-item>
            <a-menu-item key="workingForm-add">
              <router-link to="/admin/working-form/add"> Add Working Form </router-link>
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="jobs">
          <template #title>Job</template>
          <a-menu-item-group title="Job Manage">
            <a-menu-item key="Job-list">
              <router-link to="/admin/job">Jobs</router-link>
            </a-menu-item>
            <a-menu-item key="job-add">
              <router-link to="/admin/job/add"> Add Job </router-link>
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="vouchers">
          <template #title>Voucher</template>
          <a-menu-item-group title="Voucher Manage">
            <a-menu-item key="Voucher-list">
              <router-link to="/admin/voucher">Vouchers</router-link>
            </a-menu-item>
            <a-menu-item key="voucher-add">
              <router-link to="/admin/voucher/add"> Add Voucher </router-link>
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
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
