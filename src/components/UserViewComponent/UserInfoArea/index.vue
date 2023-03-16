<script setup lang="ts">
import { onMounted, ref, watch, watchEffect, computed, CSSProperties } from "vue";
import { UserService } from "@/services/userService";
import { UserResponse } from "@/type/UserResponse";
import { User } from "@/type/User";
import { message } from "ant-design-vue";
import { CompanyService } from "@/services/company";

const companyService = new CompanyService();
const userForm = ref<UserResponse>({
   id: undefined,
   roleName: undefined,
   companyName: undefined,
   typeId: undefined,
   description: undefined,
   name: undefined,
   star: undefined,
   information: undefined,
   status: undefined,
   birthDay: undefined,
   levelId: undefined,
   experienceYear: undefined,
   cvLink: undefined,
   username: undefined,
   password: undefined,
   typeName: undefined,
   companyId: undefined,
   userTypeCode: undefined,
   level: undefined
});
const userService = new UserService();
onMounted(() => {
   userService.getUserByToken().then((data: UserResponse) => {
      if (userForm.value)
         userForm.value = data;
   })
})

const updateUser = (value: User) => {
   userService.editUser({
      id: value.id,
      roleId: undefined,
      typeId: undefined,
      star: undefined,
      information: undefined,
      status: undefined,
      birthDay: undefined,
      levelId: undefined,
      cvLink: undefined,
      password: undefined,
      typeName: undefined,
      name: value.name,
      companyId: value.companyId,
      username: value.username,
      description: value.description,
      experienceYear: value.experienceYear
   }).then(() => {
      editModelRef.value.handleOk();
      if (value.companyId) {
         companyService.getCompanyById(value.companyId)?.then((data) => {
            userForm.value.companyName = data.name;
            userForm.value.companyId = data.id;
         })
      }
   }).catch((err) => {
      message.error("Có chút lỗi nhỏ khi cập nhật User");
   })
}


const editModelRef = ref();
</script>

<template>
   <section class="about__area pt-90 pb-150">
      <div class="container">
         <div class="row">
            <div class="col-xxl-5 offset-xxl-1 col-xl-6 col-lg-6">
               <div class="about__thumb-wrapper">

                  <div class="about__review">
                     <h5> <span>8,200+</span> five ster reviews</h5>
                  </div>
                  <div class="about__thumb ml-100">
                     <img src="@/assets/img/about/about.jpg" alt="">
                  </div>
                  <div class="about__banner mt--210">
                     <img src="@/assets/img/about/about-banner.jpg" alt="" class="ml-210">
                  </div>
                  <div class="about__student ml-270 mt--80">
                     <a href="#">
                        <img src="@/assets/img/about/student-4.jpg" alt="">
                        <img src="@/assets/img/about/student-3.jpg" alt="">
                        <img src="@/assets/img/about/student-2.jpg" alt="">
                        <img src="@/assets/img/about/student-1.jpg" alt="">
                     </a>
                     <p>Join over <span>4,000+</span> students</p>
                  </div>
               </div>
            </div>
            <div class="col-xxl-6 col-xl-6 col-lg-6">
               <div class="about__content pl-70 pr-60 pt-25">
                  <div class="section__title-wrapper mb-25">
                     <h2 class="section__title"><span class="yellow-bg-big">{{ userForm.name }} <img
                              src="@/assets/img/shape/yellow-bg-2.png" alt="">
                        </span></h2>
                     <p>{{ userForm.information }}</p>
                     <p>Làm việc tại: {{ userForm.companyName }}</p>
                  </div>
                  <div class="about__list mb-35">
                     <ul>
                        <li class="d-flex align-items-center"> <i class="icon_check"></i>{{ userForm.description }}</li>
                        <li class="d-flex align-items-center"> <i class="icon_check"></i>
                           {{ userForm.experienceYear }} năm kinh nghiệm</li>
                        <li class="d-flex align-items-center"> <i class="icon_check"></i> {{ userForm.level }} JAVA</li>
                     </ul>
                  </div>
                  <EditModal :user="userForm" @updateUser="updateUser" ref="editModelRef" />
               </div>
            </div>
         </div>
      </div>
   </section>
</template>