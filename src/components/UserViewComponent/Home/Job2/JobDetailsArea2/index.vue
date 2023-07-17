<script lang="ts" setup>
import { JobService } from "@/services/jobService";
import { Job } from "@/type/Job";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { FileService } from "@/services/fileService";
import { StatusType } from "@/type/StatusType";
import { JobResponse } from "@/type/JobResponse";
import { onBeforeRouteUpdate } from 'vue-router';
import { ReviewType } from "@/type/ReviewType";

onBeforeRouteUpdate(async (to, from) => {
    // only fetch the user if the id changed as maybe only the query or the hash changed
    if (to.params.id !== from.params.id) {
        id = to.params.id;
        fetchJob();
    }
})
const fileService = new FileService();
const route = useRoute();
let id = route.params.id;
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
    tags: undefined,
    reasonForChoosing: undefined
});
const job = ref<JobResponse>();
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
            formState.value.title = data.title;
            formState.value.tags = data.tags;
            formState.value.reasonForChoosing = data.reasonForChoosing;
            job.value = data;

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
            if (job.value && job.value.avatarUrl) {
                fileService.getSingleImage(job.value.avatarUrl).then((data: string) => {
                    if (job.value) {
                        job.value.avatarUrlAfter = data;
                        job.value.color = getColor(1);
                    }
                })
            } else {
                fileService.getNoImage().then((data: string) => {
                    if (job.value) {
                        job.value.avatarUrlAfter = data;
                        job.value.color = getColor(1);
                    }
                })
            }
            if (job.value && job.value.tags) {
                if (typeof (job.value.tags) == 'string')
                    job.value.tags = job.value.tags.split(";");
            }
            if (job.value && job.value.reasonForChoosing) {
                if (typeof (job.value.reasonForChoosing) == 'string')
                    job.value.reasonForChoosing = job.value.reasonForChoosing.split(";");
            }
        })
    }
}
const getColor = (index: number) => {
    return "yellow";
}
onMounted(() => {
    fetchJob();
})
const job2SideBarElement = ref();
watch(job, () => {
    job2SideBarElement.value.setupJobSideBar(job.value);
})
onBeforeRouteUpdate(async (to, from) => {
    if (to.params.id !== from.params.id) {
        fetchJob();
        job2SideBarElement.value.setupJobSideBar(job.value);
    }
})
</script>
<style scoped>
.page__title-pre-block {
    display: inline-block;
    height: 24px;
    line-height: 26px;
    font-size: 14px;
    color: #ffffff;
    font-weight: 500;
    background: #fc4d93;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    padding: 0 7px;
    margin-bottom: 12px;
}

.course__tab-2 .nav-tabs .nav-item {
    width: 33% !important;
}
</style>
<template>
    <section class="page__title-area pt-120 pb-90">
        <div class="page__title-shape">
            <img class="page-title-shape-5 d-none d-sm-block" src="@/assets/img/page-title/page-title-shape-1.png" alt="">
            <img class="page-title-shape-6" src="@/assets/img/page-title/page-title-shape-6.png" alt="">
            <img class="page-title-shape-7" src="@/assets/img/page-title/page-title-shape-4.png" alt="">
        </div>
        <div class="container">
            <div class="row">
                <div class="col-xxl-8 col-xl-8 col-lg-8">
                    <div class="course__wrapper">
                        <div class="page__title-content mb-25">
                            <div class="page__title-breadcrumb">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><router-link to="/"> Home </router-link></li>
                                        <li class="breadcrumb-item"></li>
                                        <li class="breadcrumb-item"><router-link to="/"> Jobs </router-link></li>
                                        <li class="breadcrumb-item active" aria-current="page">{{ job?.title }}</li>
                                    </ol>
                                </nav>
                            </div>
                            <span class="page__title-pre" v-if="job?.status == StatusType.ACTIVED">
                                Còn thời hạn
                            </span>
                            <span class="page__title-pre-block" v-else> Đã hết hạn </span>

                            <h5 class="page__title-3">{{ job?.title }}</h5>
                        </div>
                        <div class="course__meta-2 d-sm-flex mb-30">
                            <div class="course__teacher-3 d-flex align-items-center ml-70 mb-30">
                                <div class="course__teacher-thumb-3 mr-15">
                                    <img :src="job?.avatarUrlAfter" alt="">
                                </div>
                                <div class="course__teacher-info-3">
                                    <h5>Creater</h5>
                                    <p><a href="#">{{ job?.agencyName }}</a></p>
                                </div>
                            </div>
                            <div class="course__update ml-80 mb-30">
                                <h5>Last Update:</h5>
                                <p>July 24, 2022</p>
                            </div>
                            <div class="course__rating-2 mb-30 ml-80">
                                <h5>Review:</h5>
                                <div class="course__rating-inner d-flex align-items-center">
                                    <ul>
                                        <li><a href="#"> <i class="fas fa-star"></i> </a></li>
                                        <li><a href="#"> <i class="fas fa-star"></i> </a></li>
                                        <li><a href="#"> <i class="fas fa-star"></i> </a></li>
                                        <li><a href="#"> <i class="fas fa-star"></i> </a></li>
                                        <li><a href="#"> <i class="fas fa-star"></i> </a></li>
                                    </ul>
                                    <p>4.5</p>
                                </div>
                            </div>
                        </div>
                        <div class="course__img w-img mb-30">
                            <img :src="jobThumbnailImage" alt="">
                        </div>
                        <div class="course__tab-2 mb-45">
                            <ul class="nav nav-tabs" id="courseTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="description-tab" data-bs-toggle="tab"
                                        data-bs-target="#description" type="button" role="tab" aria-controls="description"
                                        aria-selected="true"> <i class="icon_ribbon_alt"></i> <span>Discription</span>
                                    </button>
                                </li>
                                <!-- <li class="nav-item" role="presentation">
                                                <button class="nav-link " id="curriculum-tab" data-bs-toggle="tab"
                                                    data-bs-target="#curriculum" type="button" role="tab" aria-controls="curriculum"
                                                    aria-selected="false"> <i class="icon_book_alt"></i> <span>Curriculum</span>
                                                </button>
                                            </li> -->
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="review-tab" data-bs-toggle="tab" data-bs-target="#review"
                                        type="button" role="tab" aria-controls="review" aria-selected="false"> <i
                                            class="icon_star_alt"></i> <span>Reviews</span> </button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="member-tab" data-bs-toggle="tab" data-bs-target="#member"
                                        type="button" role="tab" aria-controls="member" aria-selected="false"> <i
                                            class="fal fa-user"></i> <span>Members</span> </button>
                                </li>
                            </ul>
                        </div>
                        <div class="course__tab-content mb-95">
                            <div class="tab-content" id="courseTabContent">
                                <div class="tab-pane fade show active" id="description" role="tabpanel"
                                    aria-labelledby="description-tab">
                                    <div class="course__description">
                                        <p><span v-html="job?.information"></span></p>
                                    </div>
                                </div>
                                <!-- CurriculumTab start -->
                                <ReviewTab :objectId="id" :type="ReviewType.REVIEW_JOB" />
                                <!-- CurriculumTab end -->

                                <!-- CurriculumTab start -->
                                <MemberTab />
                                <!-- CurriculumTab end -->
                                <div class="tab-pane fade show active" id="description" role="tabpanel"
                                    aria-labelledby="description-tab">
                                    <div class="course__description">
                                        <div class="course__tag-2 mb-35 mt-35">
                                            <i class="fal fa-tag"></i>
                                            <a href="#" v-for="(data, index) in job?.tags" :key="data" :value="data">
                                                {{ data }}
                                                <span
                                                    v-if="job?.tags && Array.isArray(job?.tags) && (index != (job?.tags?.length - 1))">,
                                                </span>
                                            </a>
                                        </div>
                                        <div class="course__description-list mb-45" v-if="job?.reasonForChoosing">
                                            <h4>Why choose me?</h4>
                                            <ul>
                                                <li v-for="data in job?.reasonForChoosing" :key="data" :value="data"> <i
                                                        class="icon_check"></i> {{ data }}</li>

                                            </ul>
                                        </div>
                                        <!-- todo: nhung nguoi dang tuyen dung cung jobtype -->
                                        <AgencySameJobType :jobTypeId="job?.jobTypeId" />
                                    </div>
                                </div>
                                <!-- CurriculumTab start -->
                                <!-- <CurriculumTab /> -->
                                <!-- CurriculumTab end -->

                                <div class="course__share">
                                    <h3>Share :</h3>
                                    <ul>
                                        <li>
                                            <a href="#" class="fb"><i class="fab fa-facebook-f"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="tw"><i class="fab fa-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="pin"><i class="fab fa-pinterest-p"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="course__related">
                            <div class="row">
                                <div class="col-xxl-12">
                                    <div class="section__title-wrapper mb-40">
                                        <h2 class="section__title">Related <span class="yellow-bg yellow-bg-big">Job<img
                                                    src="@/assets/img/shape/yellow-bg.png" alt=""></span></h2>
                                        <p>You don't have to struggle alone, you've got our assistance and help.</p>
                                    </div>
                                </div>
                            </div>
                            <!-- slider courses start-->
                            <SliderCourses />
                            <!-- slider courses end-->
                        </div>
                    </div>
                </div>

                <!-- course side bar start -->
                <Job2Sidebar ref="job2SideBarElement" />
                <!-- course side bar end -->

            </div>
        </div>
    </section>
</template>