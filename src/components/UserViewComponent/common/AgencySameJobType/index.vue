<script lang="ts" setup>
import { FileService } from "@/services/fileService";
import { JobService } from "@/services/jobService";
import { JobResponse } from "@/type/JobResponse";
import { onMounted, watch, ref } from "vue";

const props = defineProps(['jobTypeId']);
const jobService = new JobService();
const fileService = new FileService();
const agencySameJobTypes = ref<JobResponse[]>()
onMounted(() => {
    fetchThreeAgencySameJobType();
})
watch(props.jobTypeId, () => {
    fetchThreeAgencySameJobType();
})
const fetchThreeAgencySameJobType = () => {
    jobService.findJob({ page: 0, size: 3, jobTypeId: props.jobTypeId }).then((data) => {
        agencySameJobTypes.value = data.data;
    }).then(() => {
        agencySameJobTypes.value?.forEach((job) => {
            if (job.avatarUrl) {
                job.avatarUrlAfter = job.avatarUrl;
            } else {
                fileService.getNoImage().then((data) => {
                    job.avatarUrlAfter = data;
                })
            }
        })
    })
}
</script>
<template>
    <div class="course__instructor mb-45">
        <h3>Other Agency With Job</h3>
        <div class="course__instructor-wrapper d-md-flex align-items-center">
            <div class="course__instructor-item d-flex align-items-center ml-70" v-for="(data, index) in agencySameJobTypes"
                :key="index">
                <div class="course__instructor-thumb mr-20">
                    <img :src="data.avatarUrlAfter" alt="">
                </div>
                <div class="course__instructor-content">
                    <h3> <router-link :to="`/job-detail-2/${data.id}`"> {{ data.title }} </router-link></h3>
                    <p> <router-link :to="`/job-detail-2/${data.id}`"> {{ data.companyName }} </router-link></p>
                    <p> {{ data.jobTypeName }}</p>
                </div>
            </div>
        </div>
    </div>
</template>