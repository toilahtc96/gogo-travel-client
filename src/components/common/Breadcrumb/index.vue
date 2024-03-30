
<script lang="ts" setup>
const props = defineProps(['title', 'subtitle'])

const getImgUrl = (pic: string) => {
   return new URL("assets/img/page-title/" + pic, 'http://127.0.0.1:3000/src/').href;
};
</script>



<template>
   <section class="page__title-area page__title-height page__title-overlay d-flex align-items-center"
      :style="{ background: 'url(' + getImgUrl('page-title.jpg') + ')', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }">
      <div class="container">
         <div class="row">
            <div class="col-xxl-12">
               <div class="page__title-wrapper mt-110">
                  <h3 class="page__title"> {{ title }}</h3>
                  <nav aria-label="breadcrumb">
                     <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                           <router-link to="/">Home</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                           {{ subtitle }}</li>
                     </ol>
                  </nav>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>
