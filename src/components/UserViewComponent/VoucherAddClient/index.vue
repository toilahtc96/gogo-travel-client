<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { message } from 'ant-design-vue';
import { VoucherService } from '@/services/voucherService';
import { StatusType } from '@/type/StatusType';
import { voucherType } from '@/type/VoucherType';
import { Voucher } from '@/type/Voucher';
import router from "@/router/router";
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';

const voucherService = new VoucherService();
const spinning = ref<boolean>(false);
const formState = ref<Voucher>({
   id: undefined,
   value: undefined,
   status: undefined,
   title: undefined,
   voucherType: undefined,
   startTime: undefined,
   endTime: undefined,
});
const dateFormat = "YYYY-MM-DDTHH:mm:ss";
const onFinish = () => {
   if (formState.value.startTime) {
      formState.value.startTime = dayjs(formState.value.startTime).format(dateFormat);
   }
   if (formState.value.endTime) {
      formState.value.endTime = dayjs(formState.value.endTime).format(dateFormat);
   }
   voucherService.addVoucher(formState.value).then((data) => {
      if (data && data.status === 204) {
         message.info("Success")
         router.push("/voucher");
      } else {
         message.error('Has error, Contact to developer')
      }
   })
}

let defaultPage = ref({
   page: 0,
   size: 10
});
onMounted(() => {

})


const voucherPlaceholder = ref("Voucher Value");
const selectStatus = (value: StatusType) => {
   formState.value.status = value;
}
const minValue = ref();
const maxValue = ref();
const selectVoucherType = (value: voucherType) => {
   formState.value.voucherType = value;
   minValue.value = undefined;
   maxValue.value = undefined;
   if (value == voucherType.CASH) {
      voucherPlaceholder.value = "Tiền mặt";
   } else {
      minValue.value = 0;
      maxValue.value = 100;
      voucherPlaceholder.value = "Phần Trăm Lương Offer";
      if (formState.value.value && formState.value.value > 100) {
         formState.value.value = 100;
         message.info("Max PERCENT is 100");
      }
   }
}

const dateFormatShow = "HH:mm:ss DD-MM-YYYY";
</script>
<style scoped>
.ant-input-number-input {
   margin-bottom: 0px !important;
}

.ant-picker-input input {
   margin-bottom: 0px !important;
}

.ant-picker {
   padding: 0 !important;
}

.ant-select-selector {
   background-color: #f3f4f8 !important;
   min-height: 60px;
}
</style>

<template>
   <a-spin :spinning="spinning">
      <section class="contact__area pt-115 pb-120">
         <div class="container">
            <div class="row">
               <div class="col-xxl-7 col-xl-7 col-lg-6">
                  <div class="contact__wrapper">
                     <div class="section__title-wrapper mb-40">
                        <h2 class="section__title">Add <span class="yellow-bg yellow-bg-big">Voucher<img
                                 src="@/assets/img/shape/yellow-bg.png" alt=""></span> Of Your Job</h2>
                        <p>Have a progress or? We'd love to hear from you.</p>
                     </div>
                     <div class="contact__form">
                        <a-form :model="formState" name="nest-messages" @finish="onFinish">
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
                                    <a-form-item :name="['voucherType']">
                                       <VoucherTypeSelect :voucherTypeSelected="formState.voucherType"
                                          ref="selectVoucherTypeElement" @selectVoucherType="selectVoucherType" />
                                    </a-form-item>
                                 </div>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col-xxl-12">
                                 <div class="contact__form-input">
                                    <a-form-item :name="['value']">
                                       <a-input-number v-model:value="formState.value" :placeholder="voucherPlaceholder"
                                          :min="minValue" :max="maxValue" />
                                    </a-form-item>
                                 </div>
                              </div>
                           </div>

                           <div class="row">
                              <div class="col-xxl-12">
                                 <div class="contact__form-input">
                                    <a-form-item :name="['status']">
                                       <StatusElement :status="formState.status" ref="select"  @selectStatus="selectStatus" />
                                    </a-form-item>
                                 </div>
                              </div>
                           </div>

                           <div class="row">
                              <div class="col-xxl-6 col-xl-6 col-md-6">
                                 <div class="contact__form-input">
                                    <a-form-item :name="['startTime']">
                                       <a-date-picker v-model:value="formState.startTime" :format="dateFormatShow"
                                          placeholder="From" :show-time="{ format: 'HH:mm:ss' }" />
                                    </a-form-item>
                                 </div>
                              </div>
                              <div class="col-xxl-6 col-xl-6 col-md-6">
                                 <div class="contact__form-input">
                                    <a-form-item :name="['endTime']">
                                       <a-date-picker v-model:value="formState.endTime" :format="dateFormatShow"
                                          placeholder="To" :show-time="{ format: 'HH:mm:ss' }" />
                                    </a-form-item>
                                 </div>
                              </div>
                           </div>
                           <div class="row">
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
               <VoucherInfoRightSiteBar />
            </div>
         </div>
      </section>
   </a-spin>
</template>