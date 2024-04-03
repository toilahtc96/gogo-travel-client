<script lang="ts" setup>
const props = defineProps(['title', 'subtitle'])

const getImgUrl = () => {
   return new URL("https://i.ibb.co/vhvyP7N/Gogo-Travel.png").href;
};
</script>



<template>
   <section class="page__title-area page__title-height page__title-overlay d-flex align-items-center"
      :style="{ background: 'url(' + getImgUrl() + ')', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }">
      <div class="container">
         <div class="row">
            <div class="col-xxl-12">
               <div class="page__title-wrapper mt-110">
                  <h3 class="page__title"> {{ title }}</h3>
                  <nav aria-label="breadcrumb">
                     <ol class="breadcrumb">
                        <li class="breadcrumb-item ">
                           <router-link to="/">Trang Chủ ></router-link>
                        </li>
                        <li class="breadcrumb-item active" style="padding-left: 10px;" aria-current="page">
                           {{ subtitle }}</li>
                     </ol>
                  </nav>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>
