<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { TourService } from '@/services/tourService';
import TourType from "@/type/TourType";

const tourService = new TourService();
const tours = ref<TourType[]>();
onMounted(() => {
    tourService.getTourHome().then((data) => {
        if(data) {
            tours.value = data;
        }
    })
})
</script>
<template>
    <Header />
    <HeroArea />
    <Services />
    <div v-for="tour in tours" :key="tour.id">
        <Testimonial v-if="tour && tour.id && tour.id %2==0" :tour="tour"/>
        <TestimonialMirror v-else :tour="tour"/>
    </div>
    <Footer footerPadding="true" />
</template>
