
<script setup lang="ts">
const props = defineProps(['DetailsPage'])
</script>
<template>
<div :class="`${DetailsPage ? DetailsPage : 'course__sidebar-widget grey-bg'}`">
   <div class="course__sidebar-course">
      <h3 class="course__sidebar-title">Related courses</h3>
      <ul>
         <li>
            <div class="course__sm d-flex align-items-center mb-30">
               <div class="course__sm-thumb mr-20">
                  <a href="#">
                     <img src="@/assets/img/course/sm/course-sm-1.jpg" alt="">
                  </a>
               </div>
               <div class="course__sm-content">
                  <div class="course__sm-rating">
                     <ul>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                     </ul>
                  </div>
                  <h5><router-link to="/">Development</router-link></h5>
                  <div class="course__sm-price">
                     <span>$54.00</span>
                  </div>
               </div>
            </div>
         </li>
         <li>
            <div class="course__sm d-flex align-items-center mb-30">
               <div class="course__sm-thumb mr-20">
                  <a href="#">
                     <img src="@/assets/img/course/sm/course-sm-2.jpg" alt="">
                  </a>
               </div>
               <div class="course__sm-content">
                  <div class="course__sm-rating">
                     <ul>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                     </ul>
                  </div>
                  <h5><router-link to="/">Data Science</router-link></h5>
                  <div class="course__sm-price">
                     <span>$72.00</span>
                  </div>
               </div>
            </div>
         </li>
         <li>
            <div class="course__sm d-flex align-items-center mb-10">
               <div class="course__sm-thumb mr-20">
                  <a href="#">
                     <img src="@/assets/img/course/sm/course-sm-3.jpg" alt="">
                  </a>
               </div>
               <div class="course__sm-content">
                  <div class="course__sm-rating">
                     <ul>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                     </ul>
                  </div>
                  <h5><router-link to="/">UX Design</router-link></h5>
                  <div class="course__sm-price">
                     <span>Free</span>
                  </div>
               </div>
            </div>
         </li>
      </ul>
   </div>
</div>
</template>