<script setup lang="ts">
import { defineProps, ref } from 'vue';
const props = defineProps(['itemNumberStart', 'itemNumberEnd'])
const imageSrc = (imgSrc: string) => {
    return new URL(imgSrc, import.meta.url).href;
}
const courseItems = ref([
   {
      id: 1,
      courseImage: imageSrc(`../../../../assets/img/course/course-1.jpg`),
      listImg: imageSrc(`../../../../assets/img/course/list/course_list_1.jpeg`),
      lesson: '43',
      title: 'Become a product Manager learn the skills & job.',
      rating: '4.5',
      teacherImg: imageSrc(`../../../../assets/img/course/teacher/teacher-1.jpg`),
      teacherName: 'Jim Séchen',
      category: 'Art & Design',
      price: '21.00',
      oldPrice: '33.00'
   },
   {
      id: 2,
      courseImage: imageSrc(`../../../../assets/img/course/course-2.jpg`),
      listImg: imageSrc(`../../../../assets/img/course/list/course_list_2.jpeg`),
      lesson: '72',
      title: 'Fundamentals of music theory Learn new',
      rating: '4.0',
      teacherImg: imageSrc(`../../../../assets/img/course/teacher/teacher-2.jpg`),
      teacherName: 'Barry Tone',
      category: 'UX Design',
      price: '32.00',
      oldPrice: '68.00',
      color: 'sky-blue'
   },
   {
      id: 3,
      courseImage: imageSrc(`../../../../assets/img/course/course-3.jpg`),
      listImg: imageSrc(`../../../../assets/img/course/list/course_list_3.jpeg`),
      lesson: '35',
      title: 'Bases Matemáticas dios Álgebra Ecuacion',
      rating: '4.3',
      teacherImg: imageSrc(`../../../../assets/img/course/teacher/teacher-3.jpg`),
      teacherName: 'Samuel Serif',
      category: 'Development',
      price: '13.00',
      oldPrice: '19.00',
      color: 'green'
   },
   {
      id: 4,
      courseImage: imageSrc(`../../../../assets/img/course/course-4.jpg`),
      listImg: imageSrc(`../../../../assets/img/course/list/course_list_4.jpeg`),
      lesson: '60',
      title: 'Strategy law and organization Foundation',
      rating: '3.5',
      teacherImg: imageSrc(`../../../../assets/img/course/teacher/teacher-4.jpg`),
      teacherName: 'Elon Gated',
      category: 'Development',
      price: '62.00',
      oldPrice: '97.00',
      color: 'blue'
   },
   {
      id: 5,
      courseImage: imageSrc(`../../../../assets/img/course/course-5.jpg`),
      listImg: imageSrc(`../../../../assets/img/course/list/course_list_5.jpeg`),
      lesson: '28',
      title: 'The business Intelligence analyst Course 2022',
      rating: '4.5',
      teacherImg: imageSrc(`../../../../assets/img/course/teacher/teacher-5.jpg`),
      teacherName: 'Eleanor Fant',
      category: 'Marketing',
      price: '25.00',
      oldPrice: '36.00',
      color: 'orange'
   },
   {
      id: 6,
      courseImage: imageSrc(`../../../../assets/img/course/course-6.jpg`),
      listImg: imageSrc(`../../../../assets/img/course/list/course_list_6.jpeg`),
      lesson: '38',
      title: 'Bases Matemáticas dios Álgebra Ecuacion',
      rating: '4.8',
      teacherImg: imageSrc(`../../../../assets/img/course/teacher/teacher-6.jpg`),
      teacherName: 'Brian Cumin',
      category: 'Data Science',
      price: '35.00',
      oldPrice: '46.00',
      color: 'pink'
   },
   {
      id: 7,
      courseImage: imageSrc(`../../../../assets/img/course/course-7.jpg`),
      listImg: imageSrc(`../../../../assets/img/course/list/course_list_7.jpeg`),
      lesson: '26',
      title: 'Build your media and Public presence',
      rating: '4.6',
      teacherImg: imageSrc(`../../../../assets/img/course/teacher/teacher-7.jpg`),
      teacherName: 'Pelican Steve',
      category: 'Audio & Music',
      price: '46.00',
      oldPrice: '72.00',
      color: 'orange'
   },
   {
      id: 8,
      courseImage: imageSrc(`../../../../assets/img/course/course-8.jpg`),
      listImg: imageSrc(`../../../../assets/img/course/list/course_list_8.jpeg`),
      lesson: '13',
      title: 'Creative writing through Storytelling',
      rating: '4.4',
      teacherImg: imageSrc(`../../../../assets/img/course/teacher/teacher-8.jpg`),
      teacherName: 'Shahnewaz Sakil',
      category: 'Mechanical',
      price: '52.00',
      oldPrice: '72.00',
      color: 'pink'
   },
   {
      id: 9,
      courseImage: imageSrc(`../../../../assets/img/course/course-9.jpg`),
      listImg: imageSrc(`../../../../assets/img/course/list/course_list_9.jpeg`),
      lesson: '25',
      title: 'Product Manager Learn the Skills & job.',
      rating: '4.2',
      teacherImg: imageSrc(`../../../../assets/img/course/teacher/teacher-9.jpg`),
      teacherName: 'Hilary Ouse',
      category: 'Lifestyle',
      price: '15.00',
      oldPrice: '45.00',
      color: 'blue-2'
   },
])
</script>
<template>
   <div class="container">
      <div class="row">
         <div v-for="(course, index) in courseItems.slice(itemNumberStart, itemNumberEnd)" :key="index"
            class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 grid-item">
            <div class="course__item white-bg mb-30 fix">
               <div class="course__thumb w-img p-relative fix">
                  <router-link :to="`/course-details/${course.id}`">
                     <img :src="course.courseImage" alt="">
                  </router-link>
                  <div class="course__tag">
                     <a href="#" :class="course.color">{{ course.category }}</a>
                  </div>
               </div>
               <div class="course__content">
                  <div class="course__meta d-flex align-items-center justify-content-between">
                     <div class="course__lesson">
                        <span><i class="far fa-book-alt"></i>{{ course.lesson }} Lesson</span>
                     </div>
                     <div class="course__rating">
                        <span><i class="fas fa-star"></i>{{ course.rating }} (37)</span>
                     </div>
                  </div>
                  <h3 class="course__title">
                     <router-link :to="`/course-details/${course.id}`">{{ course.title }}</router-link>
                  </h3>
                  <div class="course__teacher d-flex align-items-center">
                     <div class="course__teacher-thumb mr-15">
                        <img :src="course.teacherImg" alt="">
                     </div>
                     <h6><router-link to="/instructor-details">{{ course.teacherName }}</router-link></h6>
                  </div>
               </div>
               <div class="course__more d-flex justify-content-between align-items-center">
                  <div class="course__status d-flex align-items-center">
                     <span :class="course.color">${{ course.price }}</span>
                     <span class="old-price">${{ course.oldPrice }}</span>
                  </div>
                  <div class="course__btn">
                     <router-link to="/course-details" class="link-btn">
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


