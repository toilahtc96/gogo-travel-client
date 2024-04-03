<script lang="ts" setup>
import { ref } from 'vue'
import TourType from '@/type/TourType';

let spinning = ref({ data: true }); 

let tours = ref({
  listData: ref<[TourType]>()
});
</script>

<template>
    <TableTour :tours="tours" ref="TableTour"/>
</template>