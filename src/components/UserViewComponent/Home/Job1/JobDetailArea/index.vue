<script lang="ts" setup>
import { JobService } from "@/services/jobService";
import { Job } from "@/type/Job";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { FileService } from "@/services/fileService";

const fileService = new FileService();
const route = useRoute();
const id = route.params.id;
const spinning = ref<boolean>(false);
const jobService = new JobService();
const minSalary = ref<number>();
const maxSalary = ref<number>();
const changeSpinning = () => {
    spinning.value = !spinning.value;
};

const jobThumbnailImage = ref<string>("");
const formState = ref<Job>({
    id: undefined,
    jobTypeId: undefined,
    companyId: undefined,
    levelName: undefined,
    careerId: undefined,
    workingFormId: undefined,
    quantity: undefined,
    rangeSalaryMin: undefined,
    rangeSalaryMax: undefined,
    information: '',
    status: undefined,
    customRange: false,
    thumbnail: undefined,
    title: undefined,
    voucherId: undefined,
    tags:undefined,
    reasonForChoosing: undefined
});
const fetchJob = () => {
    if (id) {
        changeSpinning();
        jobService.getJobById(id)?.then((data) => {
            formState.value.id = data.id;
            formState.value.information = data.information;
            formState.value.careerId = data.careerId;
            formState.value.workingFormId = data.workingFormId;
            formState.value.companyId = data.companyId;
            formState.value.customRange = data.customRange;
            formState.value.jobTypeId = data.jobTypeId;
            formState.value.levelName = data.levelName;
            formState.value.quantity = data.quantity;
            minSalary.value = data.rangeSalaryMin;
            maxSalary.value = data.rangeSalaryMax;
            formState.value.rangeSalaryMax = data.rangeSalaryMax;
            formState.value.rangeSalaryMin = data.rangeSalaryMin;
            formState.value.status = data.status;
            formState.value.thumbnail = data.thumbnail;
            
            changeSpinning();
        }).then(() => {
            if (formState.value.thumbnail) {
                
                fileService.getSingleImage(formState.value.thumbnail).then((data) => {
                    jobThumbnailImage.value = data;
                })
            } else {
                fileService.getNoImage().then((data) => {
                    jobThumbnailImage.value = data;
                })
            }
        })
    }
}
onMounted(() => {
    fetchJob();
})
</script>

<template>
    <a-spin :spinning="spinning">
        <JobDetailTitle />
        <section class="event__area pb-110">
            <div class="container">
                <div class="row">
                    <div class="col-xxl-8 col-xl-8 col-lg-8">
                        <div class="events__wrapper">
                            <div class="events__thumb mb-35 w-img">
                                <img :src="jobThumbnailImage" alt="thumnail-job">
                            </div>
                            <div class="events__details mb-35">
                                <h3>Description</h3>
                                <p v-text="formState.information"></p>
                            </div>
                            <div class="events__allow mb-40">
                                <h3>This event will allow participants to:</h3>
                                <ul>
                                    <li><i class="fal fa-check"></i> Business's managers, leaders</li>
                                    <li><i class="fal fa-check"></i> Downloadable lectures, code and design assets for all
                                        projects</li>
                                    <li><i class="fal fa-check"></i> Anyone who is finding a chance to get the promotion
                                    </li>
                                </ul>
                            </div>
                            <div class="events__tag">
                                <span><i class="fal fa-tag"></i></span>
                                <a href="#">Big data, </a>
                                <a href="#">Data analysis,</a>
                                <a href="#">Data modeling</a>
                            </div>
                        </div>
                    </div>
                    <JobRightSiteBar />
                </div>
            </div>
        </section>
    </a-spin>
</template>

  