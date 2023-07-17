<script setup lang="ts">
import { ref } from 'vue';
import { JobService } from "@/services/jobService";
import { Job } from "@/type/Job";
import { JobResponse } from "@/type/JobResponse";
import { FileService } from "@/services/fileService";
import { LevelName } from '@/type/LevelName';
import SocketRequest from '@/components/socket/SocketRequest.js';
const fileService = new FileService();

let socketRequest: any = SocketRequest.getInstance();
const jobService = new JobService();
let defaultPage = ref({
   page: 0,
   size: 10
});
let listJob = ref<[JobResponse]>();

jobService.findJob({ ...defaultPage.value }).then((data) => {
   listJob.value = data.data;
}).then(() => {
   listJob.value?.forEach((job, index) => {
      if (job.thumbnail) {
         fileService.getSingleImage(job.thumbnail).then((data) => {
            job.thumbnailAfter = data;
            job.color = getColor(index);
         })
      } else {
         fileService.getNoImage().then((data) => {
            job.thumbnailAfter = data;
            job.color = getColor(index);
         })
      }
      if (job.avatarUrl) {
         fileService.getSingleImage(job.avatarUrl).then((data) => {
            job.avatarUrlAfter = data;
            job.color = getColor(index);
         })
      } else {
         fileService.getNoImage().then((data) => {
            job.avatarUrlAfter = data;
            job.color = getColor(index);
         })
      }
   })
})
function getRandomInt(max: number) {
   return Math.floor(Math.random() * max);
}
const getColor = (index: number) => {
   let rd = getRandomInt(4);
   if (rd == 0) {
      return "yellow";
   }
   if (rd == 1) {
      return "sky-blue";
   }
   if (rd == 2) {
      return "green";
   }
   if (rd == 3) {
      return "pink";
   }
}
const imageStyle = "width: 100%; height: 245px";
</script>
<template>
   <div class="container">
      <div class="row">
         <div v-for="(job, index) in listJob" :key="index" class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 grid-item">
            <div class="course__item white-bg mb-30 fix">
               <div class="course__thumb w-img p-relative fix">
                  <router-link :to="`/job-detail-2/${job.id}`">
                     <img :src="job.thumbnailAfter" :alt="job.thumbnail" :style="imageStyle" v-if="job.thumbnailAfter">
                  </router-link>
                  <div class="course__tag" v-if="job.voucherInfo">
                     <a href="#" :class="job.color"> {{ job.voucherInfo }}</a>
                  </div>
               </div>
               <div class="course__content">
                  <div class="course__meta d-flex align-items-center justify-content-between">
                     <div class="course__lesson">
                        <span v-if="job.companyName"><i class="far fa-book-alt"></i> {{ job.companyName }}</span>
                     </div>
                     <div class="course__rating">
                        <span><i class="fas fa-user"></i> {{ job.quantity }}</span>
                     </div>
                  </div>
                  <h3 class="course__title">
                     <router-link :to="`/job-detail-2/${job.id}`">
                        <span v-if="job.title">
                           {{ job.title }} <span v-if="job.levelName"> - {{ job.levelName }}</span>
                        </span>
                        <span v-else> No name <span v-if="job.levelName"> - {{ job.levelName }}</span> </span>
                     </router-link>
                  </h3>
                  <div class="course__teacher d-flex align-items-center">
                     <div class="course__teacher-thumb mr-15">
                        <img :src="job.avatarUrlAfter" :alt="job.avatarUrl" v-if="job.avatarUrlAfter">
                     </div>
                     <h6>
                        <!-- <router-link to="/list-job-of-users"> -->
                        {{ job.agencyName }}
                        <!-- </router-link> -->
                     </h6>
                  </div>
               </div>
               <div class="course__more d-flex justify-content-between align-items-center">
                  <div class="course__status d-flex align-items-center">
                     <span :class="job.color" v-if="job.rangeSalaryMax">${{ job.rangeSalaryMax }}</span>
                     <span class="old-price" v-if="job.rangeSalaryMin">${{ job.rangeSalaryMin }}</span>
                  </div>
                  <div class="course__btn">
                     <router-link :to="`/job-detail-2/${job.id}`" class="link-btn">
                        Know Details
                        <i class="far fa-arrow-right"></i>
                        <i class="far fa-arrow-right"></i>
                     </router-link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>


