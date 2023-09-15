
<script  lang="ts" setup>
import { ProgressService } from "@/services/progressService";
import { StepCode } from "@/type/StepCode";
import { ProgressResponse } from "@/type/ProgressResponse";
import { StatusType } from "@/type/StatusType";
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import FirstStep from "@/pages/user-pages/step/first-step/index.vue";
import SecondStep from "@/pages/user-pages/step/second-step/index.vue";
import { StepResponse } from "@/type/StepResponse";
import { StepService } from "@/services/stepService";
import { h } from 'vue';
import {
   UserOutlined,
   SolutionOutlined,
   ContainerOutlined,
   LoadingOutlined,
   FileDoneOutlined,
   BankTwoTone,
   CloudUploadOutlined,

} from '@ant-design/icons-vue';
//onMounted 

const route = useRoute();
//1 : goi xem co step chưa
//2 nếu chưa có => tạo
//3: trả về, setupdata xem ở bước nào
const id = +route.params.id;
const progressService = new ProgressService();
const progresses = ref<ProgressResponse[]>();
const currentStep = ref<ProgressResponse>();
const stepes = ref<StepResponse[]>();
const stepService = new StepService();
const stepLength = ref<number>(0);
onMounted(() => {
   progressService.getProgressOfUser(id, undefined).then((data) => {
      progresses.value = data;
      progresses.value?.forEach((item: ProgressResponse) => {
         item.status === StatusType.ACTIVED;
         currentStep.value = item;
         if (currentStep.value?.order) {
            current.value = currentStep.value?.order;
         }
         current.value = currentStep.value.stepId !== undefined ? currentStep.value.stepId : 0;
         return;
      })
   }).catch((err) => {
      message.error("error : " + err);
   })

   stepService.getAll().then((data) => {
      stepes.value = data;
      stepLength.value = stepes.value?.length || 0;
   })
})
let current = ref<number>(0);

const next = () => {
   current.value = current.value + 1;
};
const finishProgress = () => {
   message.success("Chúc mừng bạn đã hoàn thành tiến trình");
   isShow.value = "display:none;";
}

const isShow = ref<string>("");
const nextStep = () => {
   next();
}

const getIconAnt = (icon: string | undefined) => {
   if (icon == undefined) {
      return h(LoadingOutlined);
   }
   switch (icon) {
      case "UserOutlined":
         return h(UserOutlined);
      case "ContainerOutlined":
         return h(ContainerOutlined);
      case "SolutionOutlined":
         return h(SolutionOutlined);
      case "FileDoneOutlined":
         return h(FileDoneOutlined);
      case "BankTwoTone":
         return h(BankTwoTone);
      case "CloudUploadOutlined":
         return h(CloudUploadOutlined);

      default:
         return h(LoadingOutlined);
   }
}
</script>
<style scoped>
.steps-content {
   margin-top: 16px;
   border: 1px dashed #e9e9e9;
   border-radius: 6px;
   background-color: #fafafa;
   min-height: 200px;
   text-align: center;
   padding-top: 80px;
}

.steps-action {
   margin-top: 24px;
}

[data-theme='dark'] .steps-content {
   background-color: #2f2f2f;
   border: 1px dashed #404040;
}
</style>
<template>
   <section class="events__area pt-115 pb-120 p-relative">
      <div class="events__shape">
         <img class="events-1-shape" src="@/assets/img/events/events-shape.png" alt="" style="z-index: -1;">
      </div>
      <div class="container">
         <div>
            <a-steps :current="current">
               <a-step v-for="item in stepes" :key="item.code" :title="item.meaning" :icon="getIconAnt(item.icon)" />
            </a-steps>
            <div class="steps-content">
               <div v-if="current === 0">
                  <FirstStep :agencyId="currentStep?.agencyId" @next-step="nextStep" />
               </div>
               <div v-if="current === 1">
                  <SecondStep />
               </div>
               <div v-if="current === 2">
                  <ThirdStep />
               </div>
            </div>
            <!-- <div class="steps-action">
               <a-button v-if="current < stepLength - 1" type="primary" @click="next">Tiếp theo</a-button>
               <a-button v-if="current == stepLength - 1" type="primary" @click="finishProgress">
                  Hoàn Thành
               </a-button>
               <a-button v-if="current > 0" style="margin-left: 8px" @click="prev" :style="isShow">Quay Lại</a-button>
            </div> -->
         </div>
      </div>
   </section>
</template>
    