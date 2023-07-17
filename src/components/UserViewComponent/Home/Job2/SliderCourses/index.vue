<script lang="ts" setup>
import { Pagination } from "swiper";
import { ref } from "vue";
import { JobService } from "@/services/jobService";
import { JobResponse } from "@/type/JobResponse";
import { FileService } from "@/services/fileService";

const fileService = new FileService();

const breakpoints = {
    550: { slidesPerView: 1, },
    768: { slidesPerView: 2, },
    992: { slidesPerView: 2, },
};

const jobService = new JobService();
let defaultPage = ref({
    page: 0,
    size: 10
});
let listJob = ref<[JobResponse]>();

const getColor = (index: number) => {
    return "yellow";
}

const imageStyle = "width: 100%; height: 245px";
const modules = ref([Pagination]);
</script>
<template>
    <div class="row">
        <div class="col-xxl-12">
            <div class="course__slider swiper-container pb-60">

                <swiper ref="mySwiper" class="pb-50" :space-between="25" :slides-per-view="2" :modules="modules"
                    :pagination="{ clickable: true }" :loop="true" :breakpoints="breakpoints">
                    <swiper-slide v-for="course in listJob" :key="course.id">
                        <div class="course__item course__item-3 swiper-slide white-bg mb-30 fix">
                            <div class="course__thumb w-img p-relative fix">
                                <router-link :to="`//${course.id}`">
                                    <img :src="course.thumbnail" alt="">
                                </router-link>
                                <div class="course__tag">
                                    <a href="#" :class="course.color">{{ course.careerName }}</a>
                                </div>
                            </div>
                            <div class="course__content">
                                <div class="course__meta d-flex align-items-center justify-content-between">
                                    <div class="course__lesson">
                                        <span><i class="far fa-book-alt"></i>{{ course.companyName }} Lesson</span>
                                    </div>
                                    <div class="course__rating">
                                        <span><i class="icon_user"></i>{{ course.quantity }} </span>
                                    </div>
                                </div>
                                <h3 class="course__title">
                                    <router-link :to="`//${course.id}`">{{ course.title }}</router-link>
                                </h3>
                                <div class="course__teacher d-flex align-items-center">
                                    <div class="course__teacher-thumb mr-15">
                                        <img :src="course.thumbnail" alt="">
                                    </div>
                                    <h6><router-link to="/">{{ course.title }}</router-link></h6>
                                </div>
                            </div>
                            <div class="course__more d-flex justify-content-between align-items-center">
                                <div class="course__status d-flex align-items-center">
                                    <span :class="course.color">${{ course.rangeSalaryMin }}</span>
                                    <span class="old-price">${{ course.rangeSalaryMax }}</span>
                                </div>
                                <div class="course__btn">
                                    <router-link to="/" class="link-btn">
                                        Know Details
                                        <i class="far fa-arrow-right"></i>
                                        <i class="far fa-arrow-right"></i>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
        </div>
    </div>
</template>