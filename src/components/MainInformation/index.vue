<script lang="ts" setup>
import { ref } from 'vue'
import MainInformationType from "@/type/MainInformationType";

const tableMainInformation = ref();
let spinning = ref({ data: true }); 

let mainInformationActives = ref({
  listData: ref<[MainInformationType]>()
});
</script>

<template>
    <TableMainInformation :mainInformationActives="mainInformationActives" ref="tableMainInformation"/>
</template>