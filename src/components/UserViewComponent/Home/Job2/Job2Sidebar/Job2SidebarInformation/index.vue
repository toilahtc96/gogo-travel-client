<script setup lang="ts">
import { JobResponse } from "@/type/JobResponse";
import { onMounted, ref } from "vue";

onMounted(() => {

})
const job = ref<JobResponse>();
const setupJobSideBar = (jobData: JobResponse) => {
   job.value = jobData;
}
defineExpose({
   setupJobSideBar
})
</script>

<template>
   <div class="course__shape">
      <img class="course-dot" src="@/assets/img/course/course-dot.png" alt="">
   </div>
   <div class="course__sidebar-widget-2 white-bg mb-20">
      <div class="course__video">
         <div class="course__video-thumb w-img mb-25">
            <img src="@/assets/img/course/video/course-video.jpg" alt="">
            <div class="course__video-play">
               <a-button href="https://youtu.be/yJg-Y5byMMw" data-fancybox="" class="play-btn"> <i class="fas fa-play"
                     style="margin-top:16px"></i> </a-button>
            </div>
         </div>
         <div class="course__video-meta mb-25 d-flex align-items-center justify-content-between">
            <div class="course__video-price">
               <!-- <h5>$74.<span>00</span> </h5>
                        <h5 class="old-price">$129.00</h5> -->
            </div>
            <div class="course__video-discount">
               <span>{{ job?.voucherInfo }}</span>
            </div>
         </div>
         <div class="course__video-content mb-35">
            <ul>
               <li class="d-flex align-items-center">
                  <div class="course__video-icon  ">
                     <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">
                        <path class="st0" d="M2,6l6-4.7L14,6v7.3c0,0.7-0.6,1.3-1.3,1.3H3.3c-0.7,0-1.3-0.6-1.3-1.3V6z" />
                        <polyline class="st0" points="6,14.7 6,8 10,8 10,14.7 " />
                     </svg>
                  </div>
                  <div class="course__video-info">
                     <h5><span>Company :</span> {{ job?.companyName }}</h5>
                  </div>
               </li>
               <li class="d-flex align-items-center">
                  <div class="course__video-icon  ">
                     <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">

                        <path class="st0" d="M4,19.5C4,18.1,5.1,17,6.5,17H20" />
                        <path class="st0" d="M6.5,2H20v20H6.5C5.1,22,4,20.9,4,19.5v-15C4,3.1,5.1,2,6.5,2z" />
                     </svg>
                  </div>
                  <div class="course__video-info">
                     <h5><span>Level :</span>{{ job?.levelName }}</h5>
                  </div>
               </li>
               <li class="d-flex align-items-center">
                  <div class="course__video-icon  ">
                     <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">
                        <circle class="st0" cx="8" cy="8" r="6.7" />
                        <polyline class="st0" points="8,4 8,8 10.7,9.3 " />
                     </svg>
                  </div>
                  <div class="course__video-info">
                     <h5><span>End Time :</span>End date</h5>
                  </div>
               </li>
               <li class="d-flex align-items-center">
                  <div class="course__video-icon  ">
                     <svg>
                        <path class="st0" d="M13.3,14v-1.3c0-1.5-1.2-2.7-2.7-2.7H5.3c-1.5,0-2.7,1.2-2.7,2.7V14" />
                        <circle class="st0" cx="8" cy="4.7" r="2.7" />
                     </svg>
                  </div>
                  <div class="course__video-info">
                     <h5><span>Quantity :</span>{{ job?.quantity }}</h5>
                  </div>
               </li>
               <li class="d-flex align-items-center">
                  <div class="course__video-icon  ">
                     <svg>
                        <circle class="st0" cx="8" cy="8" r="6.7" />
                        <line class="st0" x1="1.3" y1="8" x2="14.7" y2="8" />
                        <path class="st0"
                           d="M8,1.3c1.7,1.8,2.6,4.2,2.7,6.7c-0.1,2.5-1,4.8-2.7,6.7C6.3,12.8,5.4,10.5,5.3,8C5.4,5.5,6.3,3.2,8,1.3z" />
                     </svg>
                  </div>
                  <div class="course__video-info">
                     <h5><span>Language :</span>English them db</h5>
                  </div>
               </li>
            </ul>
         </div>
         <div class="course__enroll-btn">
            <router-link :to="`/job/step/${job?.id}`" class="e-btn e-btn-7 w-100">Enroll
               <i class="far fa-arrow-right"></i>
            </router-link>
         </div>
      </div>
   </div>
</template>