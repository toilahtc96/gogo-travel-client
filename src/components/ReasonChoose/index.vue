<script lang="ts" setup>
import { ref } from 'vue'
import ReasonChooseType from '@/type/ReasonChooseType';
// import { SearchCompany } from '@/type/SearchCompany';

let spinning = ref({ data: true }); 

let reasonChooses = ref({
  listData: ref<[ReasonChooseType]>()
});
</script>

<template>
    <TableReasonChoose :reasonChooses="reasonChooses" ref="TableReasonChoose"/>
</template>