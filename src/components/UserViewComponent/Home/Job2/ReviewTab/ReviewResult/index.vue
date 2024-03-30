<script lang="ts" setup>

import { ReviewService } from "@/services/reviewService";
import { ReviewResponse } from "@/type/ReviewResponse";
import { onMounted, ref } from "vue";
import { onBeforeRouteUpdate } from "vue-router";

const reviewService = new ReviewService();
const props = defineProps(['objectId']);
const defaultPage = ref({
    size: 3,
    page: 0
})
const reviews = ref<ReviewResponse[]>();
const average = ref(0);
const total = ref(0);
const totalStar = ref(0);
const numberStarRate = ref();
const fiveStarNum = ref(0);
const fourStarNum = ref(0);
const threeStarNum = ref(0);
const twoStarNum = ref(0);
const oneStarNum = ref(0);
const fiveStarStyle = ref("width: 0%;");
const fourStarStyle = ref("width: 0%;");
const threeStarStyle = ref("width: 0%;");
const twoStarStyle = ref("width: 0%;");
const oneStarStyle = ref("width: 0%;");
const fiveDataWidth = ref("0%");
const fourDataWidth = ref("0%");
const threeDataWidth = ref("0%");
const twoDataWidth = ref("0%");
const oneDataWidth = ref("0%");
const getReview = (objectId: number | undefined, reviewUserId: number | undefined) => {
    reviewService.findReview(defaultPage.value.size, defaultPage.value.page, objectId, reviewUserId)
        .then((data) => {
            reviews.value = data.data;
            total.value = data.total;
            totalStar.value = data.totalStar;
            numberStarRate.value = data.numberStarRate;
        }).then(() => {
            //todo: tinh toan lai, check dieu kien
            if (typeof (totalStar.value) == 'number' && typeof (total.value) == 'number' && total.value != 0) {
                average.value = +(totalStar.value / total.value).toFixed(1);
            } else {
                average.value = 0;
            }
            if (numberStarRate.value) {
                if (typeof (total.value) == 'number' && total.value != 0) {
                    fiveDataWidth.value = (numberStarRate.value[5] / total.value * 100).toFixed(1) + "%"
                    fiveStarNum.value = +(numberStarRate.value[5] / total.value).toFixed(1);
                    fiveStarStyle.value = "width: " + (numberStarRate.value[5] / total.value * 100) + "%";
                    fourDataWidth.value = (numberStarRate.value[4] / total.value * 100).toFixed(1) + "%"
                    fourStarNum.value = +(numberStarRate.value[4] / total.value).toFixed(1);
                    fourStarStyle.value = "width: " + (numberStarRate.value[4] / total.value * 100) + "%";
                    threeDataWidth.value = (numberStarRate.value[3] / total.value * 100).toFixed(1) + "%"
                    threeStarNum.value = +(numberStarRate.value[3] / total.value).toFixed(1);
                    threeStarStyle.value = "width: " + (numberStarRate.value[3] / total.value * 100) + "%";
                    twoDataWidth.value = (numberStarRate.value[2] / total.value * 100).toFixed(1) + "%"
                    twoStarNum.value = +(numberStarRate.value[2] / total.value).toFixed(1);
                    twoStarStyle.value = "width: " + (numberStarRate.value[2] / total.value * 100) + "%";
                    oneDataWidth.value = (numberStarRate.value[1] / total.value * 100).toFixed(1) + "%"
                    oneStarNum.value = +(numberStarRate.value[1] / total.value).toFixed(1);
                    oneStarStyle.value = "width: " + (numberStarRate.value[1] / total.value * 100) + "%";
                }
            }
        })
}
onMounted(() => {
    getReview(props.objectId, undefined);
})
onBeforeRouteUpdate(async (to, from) => {

    reviews.value = [];
    average.value = 0;
    total.value = 0;
    totalStar.value = 0;
    numberStarRate.value = 0;
    fiveStarNum.value = 0;
    fourStarNum.value = 0;
    threeStarNum.value = 0;
    twoStarNum.value = 0;
    oneStarNum.value = 0;
    fiveStarStyle.value = "width: 0%;";
    fourStarStyle.value = "width: 0%;";
    threeStarStyle.value = "width: 0%;";
    twoStarStyle.value = "width: 0%;";
    oneStarStyle.value = "width: 0%;";
    fiveDataWidth.value = "0%";
    fourDataWidth.value = "0%";
    threeDataWidth.value = "0%";
    twoDataWidth.value = "0%";
    oneDataWidth.value = "0%";
    // only fetch the user if the id changed as maybe only the query or the hash changed
    if (to.params.id !== from.params.id) {
        let objectId: number = +(to.params.id);
        getReview(objectId, undefined);
    }
})
defineExpose({
    getReview
})

</script>
<template>
    <h3>Reviews</h3>
    <p>Most of Review?</p>

    <div class="course__review-rating mb-50">
        <div class="row g-0">
            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4">
                <div class="course__review-rating-info grey-bg text-center">
                    <h5>{{ average }}</h5>
                    <ul>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                        <li><a href="#"> <i class="icon_star"></i> </a></li>
                    </ul>
                    <p>{{ total }} Ratings</p>
                </div>
            </div>
            <div class="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8">
                <div class="course__review-details grey-bg">
                    <h5>Detailed Rating</h5>
                    <div class="course__review-content" style="margin-bottom:28px ">
                        <div class="course__review-item d-flex align-items-center justify-content-between">
                            <div class="course__review-text">
                                <span>5 stars</span>
                            </div>
                            <div class="course__review-progress">
                                <div class="single-progress" :data-width="fiveDataWidth" :style="fiveStarStyle"></div>
                            </div>
                            <div class="course__review-percent">
                                <h5>{{ fiveDataWidth }}</h5>
                            </div>
                        </div>
                        <div class="course__review-item d-flex align-items-center justify-content-between">
                            <div class="course__review-text">
                                <span>4 stars</span>
                            </div>
                            <div class="course__review-progress">
                                <div class="single-progress" :data-width="fourDataWidth" :style="fourStarStyle"></div>
                            </div>
                            <div class="course__review-percent">
                                <h5>{{ fourDataWidth }}</h5>
                            </div>
                        </div>
                        <div class="course__review-item d-flex align-items-center justify-content-between">
                            <div class="course__review-text">
                                <span>3 stars</span>
                            </div>
                            <div class="course__review-progress">
                                <div class="single-progress" :data-width="threeDataWidth" :style="threeStarStyle"></div>
                            </div>
                            <div class="course__review-percent">
                                <h5>{{ threeDataWidth }}</h5>
                            </div>
                        </div>
                        <div class="course__review-item d-flex align-items-center justify-content-between">
                            <div class="course__review-text">
                                <span>2 stars</span>
                            </div>
                            <div class="course__review-progress">
                                <div class="single-progress" :data-width="twoDataWidth" :style="twoStarStyle"></div>
                            </div>
                            <div class="course__review-percent">
                                <h5>{{ twoDataWidth }}</h5>
                            </div>
                        </div>
                        <div class="course__review-item d-flex align-items-center justify-content-between">
                            <div class="course__review-text">
                                <span>1 stars</span>
                            </div>
                            <div class="course__review-progress">
                                <div class="single-progress" :data-width="oneDataWidth" :style="oneStarStyle"></div>
                            </div>
                            <div class="course__review-percent">
                                <h5>{{ oneDataWidth }}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>