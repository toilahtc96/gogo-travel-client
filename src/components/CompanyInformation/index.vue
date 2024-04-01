<script lang="ts" setup>
import { ref } from 'vue'
import CompanyInformation from '@/type/CompanyInformation';
// import { SearchCompany } from '@/type/SearchCompany';

const tableCompany = ref();
let spinning = ref({ data: true }); 

let companyInformationActives = ref({
  listData: ref<[CompanyInformation]>()
});
</script>

<template>
    <TableCompanyInformation :companyInformationActives="companyInformationActives" ref="tableCompanyInformation"/>
</template>