<script setup lang="ts">
import { ref, watch } from "vue";
import { Navigation, EffectFade } from "swiper";
import TourResponse from '@/type/TourResponse';

const props = defineProps(["tour"])
const tourData = ref<TourResponse>(props.tour);
const backgroundStyle = ref("background: url('" +
    (tourData.value.mainBackgroundUrl == undefined ? "https://gogo-front-bucket.s3.ap-south-1.amazonaws.com/file-user-upload/hg-bg.jpg" : tourData.value.mainBackgroundUrl) +
    "'); height: 100%; background-position: center;background-repeat: no-repeat;background-size: cover;");
console.log(backgroundStyle.value);
const sliderData = ref([
    tourData.value.benefits,
    tourData.value.specialInTours
])
const modules = ref([Navigation, EffectFade]);

watch(() => props.tour, () => {
    tourData.value = props.tour;
    backgroundStyle.value = "background: url('" +
        (tourData.value.mainBackgroundUrl == undefined ? "https://gogo-front-bucket.s3.ap-south-1.amazonaws.com/file-user-upload/hg-bg.jpg" : tourData.value.mainBackgroundUrl) +
        "'); height: 100%; background-position: center;background-repeat: no-repeat;background-size: cover;";
    console.log(backgroundStyle.value);
})
</script>
<style scoped>
.testimonial__overlay::after {
    z-index: -1;
}

.image-container {
    position: relative;
    /* Needed for absolute positioning of the image */
    width: 100%;
    /* Ensures the container takes up full width */
}

.image-container img {
    width: 100%;
    /* Makes the image fill the width of the container */
    height: auto;
    /* Ensures the height adjusts proportionally */
    position: relative;
    /* Positions the image on top of the container */
    top: 0;
    /* Positions the image to the top of the container */
    left: 0;
    /* Positions the image to the left of the container */
    object-fit: contain;
    /* Scales the image to cover the container while maintaining aspect ratio */

}
</style>
<template>
    <section class="testimonial__area testimonial__overlay pt-175 pb-170" :style="backgroundStyle">
        <div class=" container">
            <div class="row">

                <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-10">
                    <div class="what__item transition-3 mb-30 p-relative fix">
                        <div class="what__thumb w-img">
                            <img :src="tourData.contactBackgroundUrl" alt="">
                        </div>
                        <div class="what__content p-absolute text-center">
                            <h3 class="what__title white-color">Liên hệ <br> với chúng tôi</h3>
                            <router-link to="/contact" class="e-btn e-btn-border-2">Bắt đầu hành trình của
                                bạn</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-10">
                    <div class="image-container">
                        <img :src="tourData.informationUrl" alt="Image description">
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>
