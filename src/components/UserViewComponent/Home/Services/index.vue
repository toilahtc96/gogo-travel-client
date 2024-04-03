<script setup lang="ts">
import { ReasonChooseService } from "@/services/reasonChooseService";
import { onMounted, ref } from "vue";
import ReasonChooseType from "@/type/ReasonChooseType";
const reasonChooseService = new ReasonChooseService();

let reasonChooses = ref<ReasonChooseType[]>();

onMounted(() => {
    reasonChooseService.getFourActive().then((data: any) => {
        if (data) {
            reasonChooses.value = data;
        }
    }).then(() => {
        reasonChooses.value?.forEach(reason => {
            if (reason.reasonMain != null && reason.reasonMain.split(" ").length > 3) {
                let reasonMainArr = reason.reasonMain.split(" ");
                reason.reasonMainName1 = reasonMainArr[0] + " " + reasonMainArr[1];
                reason.reasonMainName2 = "";
                for (var i = 2; i < reasonMainArr.length; i++) {
                    if (reasonMainArr[i] != undefined) {
                        reason.reasonMainName2 += reasonMainArr[i] + " ";
                    }
                }
            } else {
                reason.reasonMainName1 = reason.reasonMain;
                reason.reasonMainName2 = " Tốt";
            }
            if (reason.backgroundImage != null) {
                reason.backgroundImage = 'background-image: url(' + reason.backgroundImage + ')';

            }
        })
    })
})
</script>
<template>
    <section class="services__area pt-115 pb-40">
        <div class="container">
            <div class="row">
                <div class="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3">
                    <div class="section__title-wrapper section-padding mb-60 text-center">
                        <h2 class="section__title">Tại sao nên<span class="yellow-bg"> Đồng Hành
                                <img src="@/assets/img/shape/yellow-bg-2.png" alt="">
                            </span> cùng Gogo Travel</h2>
                        <p>Bạn chỉ cần tận hưởng chuyến đi, mọi vấn đề đã có chúng tôi đồng hành cùng bạn</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6" v-for="item in reasonChooses" :key="item.id"
                    :data="item">
                    <div class="services__item mb-30" :style="item.backgroundImage">
                        <div class="services__content">
                            <h3 class="services__title">
                                <router-link to="/contact">{{ item.reasonMainName1 }} <br />{{ item.reasonMainName2
                                    }}</router-link>
                            </h3>
                            <p>{{ item.reasonDescription }}</p>

                            <router-link to="/contact" class="link-btn-2">
                                <i class="far fa-arrow-right"></i>
                                <i class="far fa-arrow-right"></i>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>@/services/reasonChooseService