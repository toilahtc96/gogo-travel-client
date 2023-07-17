<script lang="ts" setup>
import { ReviewService } from "@/services/reviewService";
import { ReviewResponse } from "@/type/ReviewResponse";
import { onMounted, ref } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { FileService } from "@/services/fileService";

const fileService = new FileService();
const pageSetting = ref({
    current: 0,
    total: 0
})
const reviewService = new ReviewService();
const props = defineProps(['objectId', 'reviewUserId']);
const defaultPage = ref({
    size: 3,
    page: 0
})
const reviews = ref<ReviewResponse[]>();
const getComment = (objectId: number | undefined, reviewUserId: number | undefined) => {
    reviewService.findReview(defaultPage.value.size, defaultPage.value.page, objectId, reviewUserId)
        .then((data) => {
            reviews.value = data.data;
            pageSetting.value.total = data.total;
        }).then(() => {
            reviews.value?.forEach(review => {
                if (review.reviewOwnerAvatar) {
                    fileService.getSingleImage(review.reviewOwnerAvatar).then(data => {
                        review.reviewOwnerAvatarSrc = data;
                    })
                } else {
                    fileService.getNoImage().then(data => {
                        review.reviewOwnerAvatarSrc = data;
                    })
                }
            })
        })
}
onMounted(() => {
    getComment(props.objectId, undefined);
})


onBeforeRouteUpdate(async (to, from) => {
    reviews.value = [];
    pageSetting.value.total = 0;
    // only fetch the user if the id changed as maybe only the query or the hash changed
    if (to.params.id !== from.params.id) {
        getComment(+to.params.id, undefined);
    }
})

let objectId = ref(props.objectId);
let reviewUserId = ref(props.reviewUserId);
const change = async (page: number, pageSize: number) => {
    defaultPage.value.size = pageSize;
    defaultPage.value.page = page;
    reviewService.findReview(defaultPage.value.size, defaultPage.value.page, objectId.value, reviewUserId.value)
        .then((data) => {
            reviews.value = data.data;
            pageSetting.value.total = data.total;
        }).then(() => {
            reviews.value?.forEach(review => {
                if (review.reviewOwnerAvatar) {
                    fileService.getSingleImage(review.reviewOwnerAvatar).then(data => {
                        review.reviewOwnerAvatarSrc = data;
                    })
                } else {
                    fileService.getNoImage().then(data => {
                        review.reviewOwnerAvatarSrc = data;
                    })
                }
            })
        })
}
const showSizeChange = (current: number, size: number) => {
    defaultPage.value.size = size;
}

onBeforeRouteUpdate(async (to, from) => {
    if (to.params.id !== from.params.id) {
        // props.objectId = to.params.id
        objectId.value = to.params.id;
    }
})
defineExpose({
    getComment,
})
</script>
<template>
    <div class="course__comment mb-75">
        <h3>{{ pageSetting.total }} Comments</h3>

        <ul>
            <li v-for="(comment, index) in reviews" :key="index">
                <div class="course__comment-box ">
                    <div class="course__comment-thumb float-start">
                        <img :src="comment.reviewOwnerAvatarSrc" alt="">
                    </div>
                    <div class="course__comment-content">
                        <div class="course__comment-wrapper ml-70 fix">
                            <div class="course__comment-info ml-20 float-start">
                                <h4>{{ comment.reviewOwnerName }}</h4>
                                <span>July 14, 2022</span>
                            </div>
                            <div class="course__comment-rating float-start float-sm-end">
                                <ul>
                                    <li>
                                        <Rate :value="comment.star" :isCanAccess="true" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="course__comment-text ml-70">
                            <p class="pl-70">{{ comment.description }}</p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <Pagination :current="pageSetting.current" :total="pageSetting.total" @change="change" :pageSize="defaultPage.size"
            @showSizeChange="showSizeChange" />
    </div>
</template>