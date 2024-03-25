<script setup lang="ts">
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, EffectFade } from "swiper";

const testimonialData = ref([
    {
        id: 1,
    },
    {
        id: 2,
    }
])
const sliderData = ref([
    {
        id: 1,
        img: `home-3/testi-1.jpg`
    },
    {
        id: 2,
        img: `home-3/testi-1.jpg`
    },

    {
        id: 3,
        img: `home-3/testi-1.jpg`
    },
])

const getImgUrl = (pic: string) => {
    return new URL(`@/assets/img/testimonial/` + pic, import.meta.url).href;
};
const modules = ref([Navigation, EffectFade]);
const getStyleBG = () => {
    console.log('{background:' + new URL(`../../../../assets/img/testimonial/home-3/hg-bg.jpg`, import.meta.url).href + "}");
    return '{background:' + new URL(`../../../../assets/img/testimonial/home-3/hg-bg.jpg`, import.meta.url).href + "}";
}
</script>
<style scoped>
.testimonial__overlay::after {
    z-index: -1;
}
</style>
<template>
    <section class="testimonial__area testimonial__overlay pt-175 pb-170" style="background: url(http://localhost:3000/src/assets/img/testimonial/home-3/hg-bg.jpg);   /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;">
            <div class=" container">
        <div class="row">
            <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-10">
                <div class="testimonial__slider-3">
                    <h3 class="testimonial__title">Student <br> Community Feedback</h3>
                    <div class="testimonial__slider-wrapper swiper-container testimonial-text mb-35">

                        <swiper ref="mySwiper" :modules="modules" :loop="true" :autoplay="{ delay: 5000 }"
                            :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }">
                            <swiper-slide v-for="item in sliderData" :key="item.id">
                                <div class="testimonial__item-3">
                                    <p>“After I started learning design with Quillow, I realized that I had improved to
                                        very advanced levels. While I am studying at my university, I design as an
                                        additional
                                        income and I am sure that I will do this professionally.”</p>

                                    <div class="testimonial__info-2">
                                        <h4>James Lee,</h4>
                                        <span>Student @Educal University</span>
                                    </div>

                                    <div class="testimonial__nav-thumb ">
                                        <img :src="getImgUrl(item.img)" alt="">

                                    </div>
                                </div>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
            </div>

            <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-10">
                <!-- <div class="testimonial__video ml-70 fix">
                        <div class="testimonial__thumb-3">
                            <iframe src="https://www.youtube.com/embed/Rr0uFzAOQus" title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                        </div>
                        <div class="testimonial__video-content d-sm-flex">
                            <div class="testimonial__video-icon mr-20 mb-20">
                                <span>
                                    <svg version="1.1" id="educal-youtube" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24"
                                        style="enable-background:new 0 0 24 24;" xml:space="preserve">
                                        <path class="st0"
                                            d="M22,11.1V12c0,5.5-4.5,10-10,10C6.5,22,2,17.5,2,12C2,6.5,6.5,2,12,2c1.4,0,2.8,0.3,4.1,0.9" />
                                        <polyline class="st0" points="22,4 12,14 9,11 " />
                                    </svg>
                                </span>
                            </div>
                            <div class="testimonial__video-text">
                                <h4>Course Outcome</h4>
                                <p>Faff about A bit of how's your father getmate cack codswallop crikey argy-bargy cobblers
                                    lost his bottle.</p>
                            </div>
                        </div>
                    </div> -->
                <div class="what__item transition-3 mb-30 p-relative fix">
                    <div class="what__thumb w-img">
                        <img src="@/assets/img/what/what-2.jpg" alt="">
                    </div>
                    <div class="what__content p-absolute text-center">
                        <h3 class="what__title white-color">Liên hệ <br> Với chúng tôi</h3>
                        <router-link to="/contact" class="e-btn e-btn-border-2">Bắt đầu hành trình của bạn</router-link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </section>
</template>
