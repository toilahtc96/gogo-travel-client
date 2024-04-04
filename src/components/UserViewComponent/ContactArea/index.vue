<script lang="ts" setup>

import { useRoute } from "vue-router";
import router from "@/router/router";
import { onMounted } from "vue";
import { watch } from "vue";
import { ref } from "vue";
const route = useRoute();
const whereOfCustomer = ref("");
onMounted(()=>{
   if(route.params.where) {
      whereOfCustomer.value = route.params.where.toString();
   }
})
</script>

<template>
   <section class="contact__area pt-115 pb-120">
      <div class="container">
         <div class="row">
            <div class="col-xxl-7 col-xl-7 col-lg-6">
               <div class="contact__wrapper">
                  <div class="section__title-wrapper mb-40">
                     <h2 class="section__title">Thông Tin<span class="yellow-bg yellow-bg-big"> Của Bạn<img
                              src="@/assets/img/shape/yellow-bg.png" alt=""></span></h2>
                     <p>Hãy để chúng tôi giúp bạn! Cung cấp thông tin liên hệ của bạn để được tư vấn miễn phí.</p>
                  </div>
                  <div class="contact__form">
                     <Registration :whereOfCustomer="whereOfCustomer"/>
                  </div>
               </div>
            </div>
            <ContactInfo />
         </div>
      </div>
   </section>
</template>