<script lang="ts" setup>
import { UserService } from "@/services/userService";
import { User } from "@/type/User";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { JobService } from "@/services/jobService";
import { ProgressService } from "@/services/progressService";
import { message } from "ant-design-vue";
import { UpdateCvLinkOfProcessRequest } from "@/type/UpdateCvLinkOfProcessRequest";

// const editor = ClassicEditor;
// const editorData = ref('<p>Content of the editor.</p>');
// const editorConfig = ref({
//     // The configuration of the editor.
// });
const props = defineProps(['agencyId']);
const emit = defineEmits(['next-step']);
const route = useRoute();

const id = +route.params.id;
const jobService = new JobService();
const userService = new UserService();
const progressService = new ProgressService();
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
const uploadCvSuccess = (cvLink: string) => {
    updateCvLinkToProgress(cvLink);
    emit('next-step', cvLink);

}
const updateCvLinkToProgress = (cvLink: string) => {
    progressService.updateCvLinkAfterUpload({
        agencyId: props.agencyId,
        jobId: id,
        cvLink: cvLink
    });
}
</script>

<template>
    <div class="contact__form">
        <a-form :model="formState" name="nest-messages" @finish="onFinish">
            <div class="row">
                <div class="col-xxl-12">
                    <div class="contact__form-input">
                        <a-form-item :name="['test']">
                            <!-- <div id="app">
                                <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                            </div> -->
                            <DragFile @upload-cv-success="uploadCvSuccess" />
                        </a-form-item>
                    </div>
                </div>
            </div>
        </a-form>
    </div>
</template>