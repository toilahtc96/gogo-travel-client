<script lang="ts" setup>
import { ref } from 'vue';

const number = ref([
    {},
    {},
    {}
])
</script>
<template>
    <Header />
    <HeroArea />
    <Services />
    <div v-for="i in number">
        <Testimonial />
    </div>
    <!-- <AboutArea/> -->
    <!-- <WhatArea /> -->
    <!-- <WhyArea/> -->
    <!-- <Counter /> -->

    <!-- <Blog /> -->
    <!-- <Cta/> -->
    <!-- <BackTop /> -->
    <!-- <InitChat /> -->
    <Footer footerPadding="true" />
</template>
