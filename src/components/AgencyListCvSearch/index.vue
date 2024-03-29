<!-- Fullname,code,province,district,precinct,star,information -->
<script lang="ts" setup>
import { ref } from "vue";
import { SearchAgencyCvForm } from "@/type/SearchAgencyCvForm";
import Company from "@/type/Company";
import { CompanyService } from "@/services/company";


let defaultPage = ref({
    page: 0,
    size: 10
});
const styleInput = "float: left; width: 30%;";
const formState = ref<SearchAgencyCvForm>({
    companyId: undefined,
    value:  undefined,
    status:  undefined,
    title:  undefined,
    voucherType:  undefined,
    from: undefined,
    to: undefined,
    page: 0,
    size: 10,
});
const companyService = new CompanyService();
let listCompany = ref({
    listData: ref<[Company]>()
});
const filterCompany = (input: string) => {
    companyService.findCompany({ ...defaultPage.value, companyName: input }).then((data: any) => {
        listCompany.value = { listData: data.data };
    });
}
const selectCompany = (value: number) => {
    formState.value.companyId = value;
}
const onFinish = () => {

}
const clearFilter = () => {
    formState.value.status = undefined;
}
</script>
<template>
    <section class="cart-area pt-100 pb-100">
        <div style="background-color: #f1f1f1;" class="container">
            <a-form :model="formState" name="nest-messages" @finish="onFinish">
                <a-form-item :name="['companyId']" label="Company" :style="styleInput">
                    <SearchCompanySelect ref="select-company" :companyId="formState.companyId"
                        :listCompany="listCompany" @filter="filterCompany" @selectCompany="selectCompany" />
                </a-form-item>
                Ngay nhan CV ( tu ngay - den ngay)
                Ngay nop CV ( tu ngay - den ngay)

                <div style="width:100%; float:left; text-align: center;">
                    <a-button type="primary" html-type="submit">Tìm kiếm</a-button>
                    <a-button @click="clearFilter" style="margin-left: 15px;">Clear Filter</a-button>
                </div>
            </a-form>
        </div>
    </section>
</template>