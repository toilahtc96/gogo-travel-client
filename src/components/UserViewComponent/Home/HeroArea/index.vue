<script setup lang="ts">

import { MainInformationService } from '@/services/mainInformationService';
import MainInformationType from '@/type/MainInformationType';
import { StatusType } from '@/type/StatusType';
import { onMounted, ref } from 'vue';

const mainInformationService = new MainInformationService();
let mainInformation = ref<MainInformationType>({
    id: undefined,
    title: "Kiến tạo Trải nghiệm du lịch tuyệt vời cho bạn",
    subtitle: "Với hơn 10+ gói tour du lịch đa dạng",
    smallInformation1: "Cung cấp hướng dẫn cụ thể cho bạn với từng chặng đường",
    smallInformation2: "Sứ mệnh của chúng tôi là giúp bạn có những trải nghiệm tuyệt vời nhất",
    heroImage: undefined,
    status: StatusType.ACTIVED

});
onMounted(() => {
    mainInformationService.getFirstActive().then((data) => {
        if (data) {
            mainInformation = data;
        }
    })
})
</script>
<template>
    <section class="hero__area hero__height hero__height-2 d-flex align-items-center blue-bg-3 p-relative fix">
        <div class="hero__shape">
            <img class="hero-1-circle" src="@/assets/img/shape/hero/hero-1-circle.png" alt="">
            <img class="hero-1-circle-2" src="@/assets/img/shape/hero/hero-1-circle-2.png" alt="">
            <img class="hero-1-dot-2" src="@/assets/img/shape/hero/hero-1-dot-2.png" alt="">
        </div>
        <div class="container">
            <div class="hero__content-wrapper mt-90">
                <div class="row align-items-center">
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                        <div class="hero__content hero__content-2 p-relative z-index-1">
                            <h3 class="hero__title hero__title-2">
                                {{ mainInformation.title }}
                            </h3>
                            <h4>{{ mainInformation.subtitle }}</h4>
                            <p>{{ mainInformation.smallInformation1 }}</p>

                            <div class="hero__search">
                                <form action="#">
                                    <div class="hero__search-input mb-10">
                                        <input type="text" placeholder="Bạn muốn đi đến nơi nào?"
                                            style="text-align: right;">
                                        <button type="submit"><i class="fad fa-search"></i></button>
                                    </div>
                                </form>
                                <p>{{ mainInformation.smallInformation2 }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                        <div class="hero__thumb-wrapper mb--120">
                            <div class="hero__thumb-2 scene">
                                <img class="hero-big" src="https://i.ibb.co/k4PQBH3/image.png" alt="">
                                <img class="hero-shape-purple" src="@/assets/img/hero/hero-2/hero-shape-purple.png"
                                    alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>