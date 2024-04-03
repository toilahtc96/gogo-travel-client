<script lang="ts" setup>
import { ref } from 'vue';
import type Registration from '@/type/Registration';
import { StatusType } from '@/type/StatusType';
import { RegistrationService } from '@/services/registrationService';
import { message } from 'ant-design-vue';
import router from "@/router/router";
import { useRoute } from "vue-router";
const route = useRoute();
const registrationService = new RegistrationService();
let formState = ref<Registration>({
   id: undefined,
   postId: undefined,
   name: undefined,
   phone: undefined,
   email: undefined,
   tourName: undefined,
   information: undefined,
   status: StatusType.ACTIVED,
});

const onFinish = () => {
   registrationService.addRegistration(formState.value).then((data: any) => {
      if (data && data.status == 204) {
         message.success("Cảm ơn bạn đã đăng kí, Chúng tôi sẽ sớm liên lạc cho bạn");
         router.push("/");
      } else {
         message.error("Có chút lỗi nhỏ, Hãy liên hệ chúng tôi qua facebook để được giải đáp");
      }
   })
}
</script>
<template>
   <a-form :model="formState" name="nest-messages" @finish="onFinish">
      <div class="row">
         <div class="col-xxl-6 col-xl-6 col-md-6">
            <div class="contact__form-input">
               <a-form-item :name="['name']" :rules="[{ required: true }]">
                  <a-input type="text" placeholder="Tên của bạn" v-model:value="formState.name" />
               </a-form-item>
            </div>
         </div>
         <div class="col-xxl-6 col-xl-6 col-md-6">
            <div class="contact__form-input">
               <a-form-item :name="['email']">
                  <a-input type="text" placeholder="Email của bạn" v-model:value="formState.email" />
               </a-form-item>
            </div>
         </div>
         <div class="col-xxl-12">
            <div class="contact__form-input">
               <a-form-item :name="['phone']" :rules="[{ required: true }]">
                  <a-input type="text" placeholder="Số điện thoại của bạn" v-model:value="formState.phone" />
               </a-form-item>
            </div>
         </div>
         <div class="col-xxl-12">
            <div class="contact__form-input">
               <a-form-item :name="['tourName']">
                  <a-input type="text" placeholder="Chuyến đi mà bạn quan tâm" v-model:value="formState.tourName" />
               </a-form-item>
            </div>
         </div>
         <div class="col-xxl-12">
            <div class="contact__form-input">
               <a-form-item :name="['information']">
                  <a-textarea type="text-area" placeholder="Thông tin mà chúng tôi cần quan tâm về bạn"
                     v-model:value="formState.information" />
               </a-form-item>
            </div>
         </div>

         <div class="col-xxl-12">
            <a-form-item class="contact__btn">
               <a-button type="primary" html-type="submit" class="contact__btn">Gửi ngay</a-button>
            </a-form-item>
         </div>
      </div>
   </a-form>
</template>