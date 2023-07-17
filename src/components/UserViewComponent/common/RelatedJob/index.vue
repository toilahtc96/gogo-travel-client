<script lang="ts" setup>
import { onBeforeRouteUpdate } from "vue-router";

const props = defineProps(['DetailsPage',]);
onBeforeRouteUpdate(async (to, from) => {
    if (to.params.id !== from.params.id) {
    }
})
defineExpose({
    // loadRelatedJob
    //can bang history
})
</script>
<template>
    <div :class="`${DetailsPage ? DetailsPage : 'course__sidebar-widget grey-bg'}`">
        <div class="course__sidebar-course">
            <h3 class="course__sidebar-title">Related Job</h3>
            <ul>
                <li>
                    <div class="course__sm d-flex align-items-center mb-30">
                        <div class="course__sm-thumb mr-20">
                            <a href="#">
                                <img src="@/assets/img/course/sm/course-sm-1.jpg" alt="">
                            </a>
                        </div>
                        <div class="course__sm-content">
                            <h5><router-link to="/">Tao bang lich su moi co phan nay</router-link></h5>
                            <div class="course__sm-price">
                                <span>$54.00</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
    