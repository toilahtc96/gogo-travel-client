
<script  lang="ts" setup>
import { Autoplay, EffectFade, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref } from "vue";

const brandData = ref([
  {
    id: "1",
    img: "brand-1.png",
  },
  {
    id: "2",
    img: "brand-2.png",
  },
  {
    id: "3",
    img: "brand-3.png",
  },
  {
    id: "4",
    img: "brand-4.png",
  },
  {
    id: "5",
    img: "brand-5.png",
  },
  {
    id: "6",
    img: "brand-1.png",
  },
]);
const breakpoints = ref({
  550: { slidesPerView: 3 },
  768: { slidesPerView: 4 },
  1200: { slidesPerView: 6 },
});

const getImgUrl = (pic: string) => {
   return new URL("@/assets/img/brand/" + pic, import.meta.url).href;
};
const modules = ref([Navigation, EffectFade,Autoplay ]);
</script>

<template>
  <div class="brand__area pb-110">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12">
          <div class="brand__content text-center">
            <h3 class="brand__title">Trusted by 100 world's best companies</h3>
          </div>
        </div>
      </div>
      <div class="brand-active swiper-container">
        <swiper ref="mySwiper" class="swiper-wrapper align-items-center" :space-between="25" :slides-per-view="6"
          :modules="modules" :loop="true" :breakpoints="breakpoints">
          <swiper-slide v-for="brand in brandData" :key="brand.id">
            <div class="brand__item text-center">
              <img :src="getImgUrl(brand.img)" class="img-fluid" alt="img" />
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <div class="row">
        <div class="col-xxl-12">
          <div class="brand__more text-center">
            <router-link to="/about" class="link-btn">
              View all partners
              <i class="far fa-arrow-right"></i>
              <i class="far fa-arrow-right"></i>
            </router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
