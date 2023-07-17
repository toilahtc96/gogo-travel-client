<script lang="ts" setup>
import { ref } from 'vue'
import { SearchUserForm } from '@/type/SearchUserForm';
import { Voucher } from '@/type/Voucher';
import { VoucherService } from '@/services/voucherService';
import { SearchVoucherForm } from '@/type/SearchVoucherForm';
import dayjs from 'dayjs';

const voucherService = new VoucherService();
const tableVoucher = ref();
const defaultPage = ref({
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
  defaultPage.value.size = size;
}
let vouchers = ref({
  listData: ref<Voucher[]>()
});
const change = async (page: number, pageSize: number) => {
  tableVoucher.value.changePage(page, pageSize);
}
const setPaging = (page: number, pageSize: number) => {
  defaultPage.value.page = page;
  defaultPage.value.size = pageSize;
}

const dateFormatShow = "HH:mm:ss DD-MM-YYYY";
const searchVoucher = (formState: SearchVoucherForm) => {
  if(formState.from) {
    formState.from
    formState.from = dayjs(formState.from).format(dateFormatShow);
  }
  if(formState.to) {
    formState.to
    formState.to = dayjs(formState.to).format(dateFormatShow);
  }
  voucherService.findVoucher(formState).then((data) => {
    vouchers.value = data.data;
    setTotal(data.total);
  }).catch(err => {
    vouchers.value.listData = [];
    setSpin(false);
  })
}
</script>

<template>
  <a-spin :spinning="spinning.data">
    <SearchVoucher :defaultPage="defaultPage" @searchVoucher="searchVoucher" />
    <TableVoucher :vouchers="vouchers" @setSpin="setSpin" @setTotal="setTotal" ref="tableVoucher"
      :defaultPage="defaultPage" />
  </a-spin>
  <Pagination :current="pageSetting.current" :total="pageSetting.total" @change="change"
    :pageSize="defaultPage.size" @showSizeChange="showSizeChange" />
</template>