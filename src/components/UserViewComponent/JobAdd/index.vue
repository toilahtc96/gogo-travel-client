<script lang="ts" setup>
import { CareerService } from '@/services/careerService';
import { CompanyService } from '@/services/company';
import { JobService } from '@/services/jobService';
import { JobTypeService } from '@/services/jobTypeService';
import { WorkingFormService } from '@/services/workingFormService';
import { Career } from '@/type/Career';
import Company from '@/type/Company';
import { Job } from '@/type/Job';
import { JobType } from '@/type/JobType';
import { LevelName } from '@/type/LevelName';
import { WorkingForm } from '@/type/WorkingForm';
import { onMounted, ref } from 'vue';
import { FileService } from "@/services/fileService";
import { message } from 'ant-design-vue';
import { Voucher } from '@/type/Voucher';
import { VoucherService } from '@/services/voucherService';
import router from '@/router/router';

const voucherService = new VoucherService();
const fileService = new FileService();
const spinning = ref<boolean>(false);
const companyService = new CompanyService();
const jobTypeService = new JobTypeService();
const workingFormService = new WorkingFormService();
const careerService = new CareerService();
const jobService = new JobService();
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
const changeSpin = () => {
   spinning.value = !spinning.value;
}

const onFinish = () => {
   changeSpin();
   jobService.addJob(formState.value).then(() => {
      message.info("Add Job Success!");
   }).then(() => {
      changeSpin();
      window.location.href = "/";
   })
}


let defaultPage = ref({
   page: 0,
   size: 10
});
let listJobType = ref({
   listData: ref<[JobType]>()
});
const filterJobType = (input: string) => {
   jobTypeService.findJobType({ ...defaultPage.value, name: input }).then((data: any) => {
      listJobType.value = { listData: data.data };
   });
}
const selectJobType = (value: number) => {
   formState.value.jobTypeId = value;
}


let listWorkingForm = ref({
   listData: ref<[WorkingForm]>()
});
const filterWorkingForm = (input: string) => {
   workingFormService.findWorkingForm({ ...defaultPage.value, name: input }).then((data: any) => {
      listWorkingForm.value = { listData: data.data };
   });
}
const selectWorkingForm = (value: number) => {
   formState.value.workingFormId = value;
}

let listCompany = ref({
   listData: ref<[Company]>()
});
const filterCompany = (input: string) => {
   companyService.findCompany({ ...defaultPage.value, companyName: input }).then((data: any) => {
      listCompany.value = { listData: data.data };
   });
}
const selectCompany = (value: number) => {
   formState.value.companyId = value;
}
const selectLevel = (level: LevelName) => {
   formState.value.levelName = level;
}
const onAfterChangeMinSalary = (value: number) => {
   formState.value.rangeSalaryMin = value;
}
const onAfterChangeMaxSalary = (value: number) => {
   formState.value.rangeSalaryMax = value;
}
const minSalary = ref<number>(10);
const maxSalary = ref<number>(50);
let listCareer = ref({
   listData: ref<[Career]>()
});
const filterCareer = (input: string) => {
   careerService.findCareer({ ...defaultPage.value, name: input }).then((data: any) => {
      listCareer.value = { listData: data.data };
   });
}
const selectCareer = (value: number) => {
   formState.value.careerId = value;
}
const avatarUploadElement = ref();
const jobThumbnailImage = ref<string>("");
const setImageUrl = (imageAddressInServer: string) => {
   formState.value.thumbnail = imageAddressInServer;
   if (formState.value.thumbnail) {
      jobThumbnailImage.value = formState.value.thumbnail;
      avatarUploadElement.value.setAvatar(jobThumbnailImage.value);
   } else {
      fileService.getNoImage().then((data) => {
         jobThumbnailImage.value = data;
         avatarUploadElement.value.setAvatar(jobThumbnailImage.value);
      })
   }
}

onMounted(() => {
   formState.value.rangeSalaryMin = minSalary.value;
   formState.value.rangeSalaryMax = minSalary.value;
   formState.value.quantity = 0;
   formState.value.levelName = LevelName.JUNIOR;
})
const listVoucher = ref({
   listData: ref<[Voucher]>()
});
const filterVoucher = (input: string) => {
   voucherService.findVoucher({ ...defaultPage.value, title: input }).then((data: any) => {
      listVoucher.value = { listData: data.data };
   });
}
const addJobTag = (tagsJoin: string) => {
   formState.value.tags = tagsJoin;
}
const addReasonForChoosing = (reasonForChoosingJoin: string) => {
   formState.value.reasonForChoosing = reasonForChoosingJoin;
}
const tagTitle = ref("New Tag");
const reasonTitle = ref("New Reason");
</script>

<template>
   <a-spin :spinning="spinning">
      <section class="contact__area pt-115 pb-120">
         <div class="container">
            <div class="row">
               <div class="col-xxl-7 col-xl-7 col-lg-6">
                  <div class="contact__wrapper">
                     <div class="section__title-wrapper mb-40">
                        <h2 class="section__title">Add <span class="yellow-bg yellow-bg-big">Job<img
                                 src="@/assets/img/shape/yellow-bg.png" alt=""></span> Of Your Company</h2>
                        <p>Have a progress or? We'd love to hear from you.</p>
                     </div>
                     <div class="contact__form">
                        <a-form :model="formState" name="nest-messages" @finish="onFinish">
                           <div class="row">
                              <div class="col-xxl-12">
                                 <div class="contact__form-input">
                                    <a-form-item :name="['thumbnail']">
                                       <AvatarUpload ref="avatarUploadElement" @setImageUrl="setImageUrl"
                                          :avatarImageBlob="jobThumbnailImage" />
                                    </a-form-item>
                                 </div>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col-xxl-12">
                                 <div class="contact__form-input">
                                    <a-form-item :name="['title']" :rules="[{ required: true }]">
                                       <a-input placeholder="Title Of The Job" v-model:value="formState.title" />
                                    </a-form-item>
                                 </div>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col-xxl-12">
                                 <div class="contact__form-input">
                                    <a-form-item :name="['tags']" :rules="[{ required: true }]">
                                       <AddTag style="width: 50%" @resultTag="addJobTag" v-model:value="formState.tags"
                                          :title="tagTitle" />
                                    </a-form-item>
                                 </div>
                              </div>
                           </div>


                           <div class="row">
                              <div class="col-xxl-12">
                                 <div class="contact__form-input">
                                    <a-form-item :name="['reasonForChoosing']" :rules="[{ required: true }]">
                                       <AddTag style="width: 50%" @resultTag="addReasonForChoosing"
                                          v-model:value="formState.reasonForChoosing" :title="reasonTitle" />
                                    </a-form-item>
                                 </div>
                              </div>
                           </div>


                           <div class="row">
                              <div class="col-xxl-12">
                                 <div class="contact__form-input">
                                    <a-form-item :name="['voucherId']">
                                       <SearchVoucherSelect @filter="filterVoucher" :listVoucher="listVoucher"
                                          style="width: 50%" v-model:value="formState.voucherId" />
                                    </a-form-item>
                                 </div>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col-xxl-6 col-xl-6 col-md-6">
                                 <div class="contact__form-input">
                                    <div class="col-xxl-5 col-xl-5 col-md-5" style="float:left;width: 60%;">
                                       <a-form-item :name="['companyId']" :rules="[{ required: true }]">
                                          <SearchCompanySelect ref="select-company" :companyId="formState.companyId"
                                             :listCompany="listCompany" @filter="filterCompany"
                                             @selectCompany="selectCompany" />
                                       </a-form-item>
                                    </div>
                                    <div class="col-xxl-1 col-xl-1 col-md-1" style="float:left;width: 40%;">
                                       <a-button type="link" href="/company-add">Or Add New</a-button>
                                    </div>
                                 </div>
                              </div>

                              <div class="col-xxl-6 col-xl-6 col-md-6">
                                 <div class="contact__form-input">
                                    <a-form-item :name="['jobTypeId']" :rules="[{ required: true }]">
                                       <SearchJobTypeSelect ref="select-jobType" :jobTypeId="formState.jobTypeId"
                                          :listJobType="listJobType" @filter="filterJobType"
                                          @selectJobType="selectJobType" />
                                    </a-form-item>

                                 </div>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col-xxl-12">
                                 <div class="contact__form-input">
                                    <a-form-item :name="['information']">
                                       <a-textarea placeholder="Some Information to candidate"
                                          v-model:value="formState.information" />
                                    </a-form-item>
                                 </div>
                              </div>
                           </div>

                           <div class="row">
                              <div class="col-xxl-6 col-xl-6 col-md-6">
                                 <div class="contact__form-input">
                                    <a-form-item :name="['quantity']" :rules="[{ required: true }]">
                                       <a-label>Quantity</a-label>
                                       <a-slider :min="1" :max="20" />
                                    </a-form-item>
                                 </div>
                              </div>
                              <div class="col-xxl-6 col-xl-6 col-md-6">
                                 <div class="contact__form-input">
                                    <a-form-item :name="['levelName']" :rules="[{ required: true }]">
                                       <LevelNameComponent :levelName="formState.levelName" ref="selectLevelName"
                                          @selectLevel="selectLevel" />
                                    </a-form-item>
                                 </div>
                              </div>
                           </div>

                           <div class="row">
                              <div class="col-xxl-6 col-xl-6 col-md-6">
                                 <div class="contact__form-input">
                                    <a-form-item :name="['rangeSalaryMin']" :rules="[{ required: true }]">
                                       <a-label>Salary From </a-label>
                                       <a-slider v-model:value="minSalary" :min="1" :max="100"
                                          @afterChange="onAfterChangeMinSalary" />
                                    </a-form-item>
                                 </div>
                              </div>
                              <div class="col-xxl-6 col-xl-6 col-md-6">
                                 <div class="contact__form-input">
                                    <a-form-item :name="['rangeSalaryMax']" :rules="[{ required: true }]">
                                       <a-label>To </a-label>
                                       <a-slider v-model:value="maxSalary" :min="1" :max="100"
                                          @afterChange="onAfterChangeMaxSalary" />
                                    </a-form-item>
                                 </div>
                              </div>
                              <div class="row">
                                 <div class="col-xxl-6 col-xl-6 col-md-6">
                                    <div class="contact__form-input">
                                       <a-form-item :name="['careerId']" :rules="[{ required: true }]">
                                          <SearchCareerSelect ref="select-career-form" :careerId="formState.careerId"
                                             :listCareer="listCareer" @filter="filterCareer"
                                             @selectCareer="selectCareer" />
                                       </a-form-item>
                                    </div>
                                 </div>
                                 <div class="col-xxl-6 col-xl-6 col-md-6">
                                    <div class="contact__form-input">
                                       <a-form-item :name="['workingFormId']" :rules="[{ required: true }]">
                                          <SearchWorkingFormSelect ref="select-working-form"
                                             :workingFormId="formState.workingFormId" :listWorkingForm="listWorkingForm"
                                             @filter="filterWorkingForm" @selectWorkingForm="selectWorkingForm" />
                                       </a-form-item>
                                    </div>
                                 </div>
                              </div>
                              <div class="row">
                                 <div class="col-xxl-6 col-xl-6 col-md-6">
                                    <div class="contact__form-input">
                                       <a-form-item :name="['status']">
                                          <StatusElement :status="formState.status" ref="select" />
                                       </a-form-item>
                                    </div>
                                 </div>
                                 <div class="col-xxl-6 col-xl-6 col-md-6">
                                    <div class="contact__form-input">
                                       <a-form-item :name="['customRange']">
                                          <a-label>Flex Range </a-label>
                                          <a-switch v-model:checked="formState.customRange" checked-children="Thỏa thuận"
                                             un-checked-children="Không" />
                                       </a-form-item>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-xxl-12">
                                 <div class="contact__form-agree  d-flex align-items-center mb-20">
                                    <input class="e-check-input" type="checkbox" id="e-agree">
                                    <label class="e-check-label" for="e-agree">I agree to the<a href="#">Terms &
                                          Conditions</a></label>
                                 </div>
                              </div>
                              <div class="col-xxl-12">
                                 <div class="contact__btn" style="text-align: center;">
                                    <a-button type="primary" class="e-btn" html-type="submit">Submit</a-button>
                                 </div>
                              </div>
                           </div>
                        </a-form>
                     </div>
                  </div>
               </div>
               <ContactInfo />
            </div>
         </div>
      </section>
   </a-spin>
</template>

   
   