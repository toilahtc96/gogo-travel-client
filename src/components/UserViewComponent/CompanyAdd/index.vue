<script lang="ts" setup>
import { CompanyService } from '@/services/company';
import Company from '@/type/Company';
import { onMounted, ref } from 'vue';
import { message } from 'ant-design-vue';
import { AddressType } from '@/type/AddressType';
import { AddressService } from "@/services/address";
import { Address } from '@/type/Address';
import { StatusType } from '@/type/StatusType';
import router from "@/router/router";

const spinning = ref<boolean>(false);
const addressService = new AddressService();
const companyService = new CompanyService();
const formState = ref<Company>({
   id: undefined,
   name: undefined,
   provinceCode: undefined,
   districtCode: undefined,
   precinctCode: undefined,
   provinceName: undefined,
   districtName: undefined,
   precinctName: undefined,
   star: undefined,
   information: undefined,
   status: StatusType.ACTIVED,
});
const changeSpin = ()=>{
   spinning.value= !spinning.value;
}
const onFinish = () => {
   console.log(formState.value);
   changeSpin();
   companyService.addCompany(formState.value).then(()=>{
      router.replace("/job-add");
   }).then(()=>{
      changeSpin();
   });
}


let defaultPage = ref({
   page: 0,
   size: 10
});
let listCompany = ref({
   listData: ref<[Company]>()
});
const filterCompany = (input: string) => {
   companyService.findCompany({ ...defaultPage.value, companyName: input }).then((data: any) => {
      listCompany.value = { listData: data.data };
   });
}


const changeAddress = (data: string, type: AddressType) => {
   switch (type) {
      case AddressType.PROVINCE:
         formState.value.provinceCode = data;
         break;
      case AddressType.DISTRICT:
         formState.value.districtCode = data;
         break;
      case AddressType.PRECINCT:
         formState.value.precinctCode = data;
         break;
      default:
         break;
   }
}
let provinceName = ref<[string, string]>(['company', 'provinceCode']);
let districtName = ref<[string, string]>(['company', 'districtCode']);
let precinctName = ref<[string, string]>(['company', 'precinctCode']);

let listProvince = ref<Address[]>();
let listDistrict = ref<Address[]>();
let listPrecinct = ref<Address[]>();
const comboAddress = ref();
const changeProvince = (value: string, isResetValue: boolean) => {
   let temp = formState.value.districtCode;
   formState.value.districtCode = '';
   addressService.getByTypeAndParentCode(AddressType.DISTRICT, value).then(data => {
      if (data) {
         console.log(temp);
         console.log(formState.value);
         listDistrict.value = data;
         if (!isResetValue) {
            formState.value.districtCode = temp;
         }
         comboAddress.value.changeProvince(formState.value.provinceCode)
         changeDistrict(formState.value.districtCode, isResetValue);
      }
   })
}
const changeDistrict = (value: string | undefined, isResetValue: boolean) => {
   let temp = formState.value.precinctCode;
   formState.value.precinctCode = '';
   addressService.getByTypeAndParentCode(AddressType.PRECINCT, value).then(data => {
      if (data) {
         listPrecinct.value = data;
         if (!isResetValue) {
            formState.value.precinctCode = temp;
         }
         console.log(formState.value)
         comboAddress.value.changeDistrict(formState.value.districtCode)
         comboAddress.value.changePrecinct(formState.value.precinctCode)
      }
   })
}
onMounted(() => {

})
const styleInput = "float: left; width: 100%;";
const selectStatus = (value: StatusType) => {
   formState.value.status = value;
}
const formItemStyle = {
   labelCol3: { width: '100%', },
   labelColInput3: { width: '100%', float: 'left' },
};
</script>

<template>
   <a-spin :spinning="spinning">
      <section class="contact__area pt-115 pb-120">
         <div class="container">
            <div class="row">
               <div class="col-xxl-7 col-xl-7 col-lg-6">
                  <div class="contact__wrapper">
                     <div class="section__title-wrapper mb-40">
                        <h2 class="section__title">Add Your <span class="yellow-bg yellow-bg-big">Company<img
                                 src="@/assets/img/shape/yellow-bg.png" alt=""></span> </h2>
                        <p>Have a progress or? We'd love to hear from you.</p>
                     </div>
                     <div class="contact__form">
                        <a-form :model="formState" name="nest-messages" @finish="onFinish">

                           <div class="row">
                              <div class="col-xxl-12">
                                 <div class="contact__form-input">
                                    <a-form-item :name="['name']" :rules="[{ required: true }]">
                                       <a-input placeholder="Company Name" v-model:value="formState.name" />
                                    </a-form-item>
                                 </div>
                              </div>
                           </div>


                           <ComboAddress ref="comboAddress" :provinceCode="formState.provinceCode"
                              :districtCode="formState.districtCode" :precinctCode="formState.precinctCode"
                              @changeAddress="changeAddress" :provinceName="provinceName" :districtName="districtName"
                              :precinctName="precinctName"
                              @changeProvince="changeProvince(formState.provinceCode ? formState.provinceCode : '', true)"
                              @changeDistrict="changeDistrict(formState.districtCode, true)"
                              :formItemStyle="formItemStyle" />

                           <div class="row">
                              <div class="col-xxl-12">
                                 <div class="contact__form-input">
                                    <a-form-item :name="['information']" :rules="[{ required: true }]">
                                       <a-textarea placeholder="Company Information" v-model:value="formState.information" />
                                    </a-form-item>
                                 </div>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col-xxl-12">
                                 <div class="contact__form-input">
                                    <a-form-item :name="['status']" :style="styleInput">
                                       <StatusElement :status="formState.status" ref="select" placeholder="Select Status"
                                          @selectStatus="selectStatus" />
                                    </a-form-item>
                                 </div>
                              </div>
                           </div>

                           <div class="col-xxl-12">
                              <div class="contact__btn" style="text-align: center;">
                                 <a-button type="primary" class="e-btn" html-type="submit">Submit</a-button>
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

   
   