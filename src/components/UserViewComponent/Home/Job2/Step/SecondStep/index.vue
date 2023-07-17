<script lang="ts" setup>
import { UserService } from "@/services/userService";
import { User } from "@/type/User";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { JobService } from "@/services/jobService";
import { message } from "ant-design-vue";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// const editor = ClassicEditor;
// const editorData = ref('<p>Content of the editor.</p>');
// const editorConfig = ref({
//     // The configuration of the editor.
// });
const route = useRoute();

const id = +route.params.id;
const props = defineProps(['agencyId']);
const jobService = new JobService();
const userService = new UserService();
const agency = ref<User>();
const getAgency = (agencyId: number) => {
    userService.getUserById(agencyId)?.then((data) => {
        agency.value = data;
    })
}
onMounted(() => {
    if (props.agencyId) {
        getAgency(props.agencyId);
    }
    if (!props.agencyId) {
        jobService.getJobById(id)?.then((data) => {
            getAgency(data.agencyId);
        })
    }
})
const formState = ref({
    "description": ""
});
const onFinish = () => {
    message.success('success');
}
</script>

<template>
    <div class="container">
        <div class="col-xxl-12">
            <p>Đối tác của bạn đang tiến hành gửi CV của bạn tới công ty chủ quản, Hoạt động này thường xảy ra
                trong khoảng 1 đến 2 ngày. </p>
            <div style="float: left;">
                Thông tin ứng tuyển
            </div>
        </div>


        <div class="col-xxl-12">
            <p>Đối tác của bạn đang tiến hành gửi CV của bạn tới công ty chủ quản, Hoạt động này thường xảy ra
                trong khoảng 1 đến 2 ngày. </p>
            <div style="float: left;">
                Thông tin ứng tuyển
            </div>
        </div>
        <div class="col-xxl-12">
            <p>Đối tác của bạn đang tiến hành gửi CV của bạn tới công ty chủ quản, Hoạt động này thường xảy ra
                trong khoảng 1 đến 2 ngày. </p>
            <div style="float: left;">
                Thông tin ứng tuyển
            </div>
        </div>
        <div class="col-xxl-12">
            <p>Đối tác của bạn đang tiến hành gửi CV của bạn tới công ty chủ quản, Hoạt động này thường xảy ra
                trong khoảng 1 đến 2 ngày. </p>
            <div style="float: left;">
                Thông tin ứng tuyển
            </div>
        </div>
    </div>
</template>