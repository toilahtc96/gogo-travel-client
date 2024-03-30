<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps(['objectId', 'type', 'reviewUserId']);
const commentElement = ref();
const reviewResultElement = ref();
const reloadReview = () => {
    commentElement.value.getComment(props.objectId, props.reviewUserId);
    reviewResultElement.value.getReview(props.objectId, props.reviewUserId);
}
</script>
<template>
    <div class="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
        <div class="course__review">
            <ReviewResult :objectId="props.objectId" ref="reviewResultElement"  />
            <Comments :objectId="props.objectId" ref="commentElement" />
            <WriteReviewForm :objectId="props.objectId" :type="props.type" @reloadReview="reloadReview" />
        </div>
    </div>
</template>