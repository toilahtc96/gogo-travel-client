<script lang="ts" setup>
import { AddReviewRequest } from "@/type/AddReviewRequest";
import { StatusType } from "@/type/StatusType";
import { onMounted, ref } from "vue";
import { ReviewService } from "@/services/reviewService";
import { message } from "ant-design-vue";
const props = defineProps(['objectId', 'type']);
const emit = defineEmits(['reloadReview']);
const reviewService = new ReviewService();
const formState = ref<AddReviewRequest>({
    description: undefined,
    status: StatusType.ACTIVED,
    star: undefined,
    objectId: undefined, //truyen vao props 
    type: undefined, // truyen vao props
});
const onFinish = () => {
    reviewService.addReview(formState.value).then((data: any) => {
        if (data.status == 204) {
            formState.value.description = '';
            formState.value.star = 0;
            message.info("Add Review Success!");
        }
    }).then(()=>{
       emit('reloadReview');
    })
}
const fixStar = (star: number) => {
    formState.value.star = star;
}
onMounted(() => {
    formState.value.objectId = props.objectId;
    formState.value.type = props.type;
})
</script>
<template>
    <div class="course__form">
        <h3>Write a Review</h3>
        <div class="course__form-inner">

            <a-form :model="formState" name="nest-messages" @finish="onFinish">
                <div class="col-xxl-12">
                    <div class="course__form-input">
                        <a-form-item :name="['star']" :rules="[{ required: true }]">
                            <Rate :value="formState.star" @change="fixStar" />
                        </a-form-item>
                    </div>
                </div>
                <div class="col-xxl-12">
                    <div class="course__form-input">
                        <a-form-item :name="['description']" :rules="[{ required: true }]">
                            <a-textarea v-model:value="formState.description" type="text" placeholder="Review Title" />
                        </a-form-item>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xxl-12">
                        <div class="course__form-btn mt-10 mb-55" style="text-align: center;">
                            <a-button type="primary" html-type="submit">Submit Review</a-button>
                        </div>
                    </div>
                </div>

            </a-form>
        </div>
    </div>
</template>