<script lang="ts" setup>
import { ref } from 'vue'
import { StatusType } from '@/type/StatusType';
import { User } from '@/type/User';
import { SearchUserForm } from '@/type/SearchUserForm';
import { UserService } from '@/services/userService';
import { debug } from 'console';

const userService = new UserService();
const tableUser = ref();
const defaultCompanyPage = ref({
  page: 0,
  size: 10
});
let spinning = ref({ data: true }); let pageSetting = ref({
  current: new Number(1),
  total: new Number(0),
});

const setTotal = (total: Number) => {
  pageSetting.value.total = total;
}

const setSpin = (spinValue: boolean) => {
  spinning.value.data = spinValue;
}
const showSizeChange = (current: number, size: number) => {
  defaultCompanyPage.value.size = size;
}
let userActives = ref({
  listData: ref<User[]>()
});
const change = async (page: number, pageSize: number) => {
  tableUser.value.changePage(page, pageSize);
}
const setPaging = (page: number, pageSize: number) => {
  defaultCompanyPage.value.page = page;
  defaultCompanyPage.value.size = pageSize;
}
const searchUser = (formState: SearchUserForm) => {
  //todo: tim kiem o day 
  // setup to userActives
  // //recheck
  userService.getPaging(formState).then((data) => {
    debugger;
    userActives.value = data.data;
    setTotal(data.total);
  }).catch(err => {
    userActives.value.listData = [];
    setSpin(false);
  })
}
</script>

<template>
  <a-spin :spinning="spinning.data">
    <SearchUser :defaultPage="defaultCompanyPage" @searchUser="searchUser" />
    <TableUser :userActives="userActives" @setSpin="setSpin" @setTotal="setTotal" ref="tableCompany"
      :defaultCompanyPage="defaultCompanyPage" />
  </a-spin>
  <Pagination :current="pageSetting.current" :total="pageSetting.total" @change="change"
    :pageSize="defaultCompanyPage.size" @showSizeChange="showSizeChange" />
</template>