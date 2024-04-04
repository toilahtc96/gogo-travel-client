<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CompanyInformationService } from '@/services/companyInformationService';
import CompanyInformation from '@/type/CompanyInformation';
import { message } from 'ant-design-vue';
import type Registration from '@/type/Registration';
import { StatusType } from '@/type/StatusType';
import { RegistrationService } from '@/services/registrationService';
const registrationService = new RegistrationService();

const companyInformationService = new CompanyInformationService();
const formPhone = ref<Registration>({
    id: undefined,
    postId: undefined,
    name: "Người dùng ẩn danh",
    phone: undefined,
    email: "Người dùng ẩn danh",
    tourName: "Người dùng ẩn danh",
    information: "Người dùng ẩn danh",
    status: StatusType.ACTIVED
})

const onFinish = () => {
    registrationService.addRegistration(formPhone.value).then((data: any) => {
        if (data && data.status == 204) {
            message.success("Cảm ơn bạn đã đăng kí, Chúng tôi sẽ sớm liên lạc cho bạn");
            formPhone.value.phone = undefined;
        } else {
            message.error("Có chút lỗi nhỏ, Hãy liên hệ chúng tôi qua facebook để được giải đáp");
        }
    })
}

const formState = ref<CompanyInformation>({
    id: undefined,
    companyName: undefined,
    companyAddress: undefined,
    companyCityAddress: undefined,
    companyEmail: undefined,
    companyPhone: undefined,
    facebookLink: undefined,
    instagramLink: undefined,
    tikTokLink: undefined,
    status: undefined,
});
companyInformationService.getFirstActive().then(data => {
    formState.value = data;
})
const props = defineProps(['footerBgTwo', 'footerPadding'])
const getFooterBg = (footerBgTwo: boolean) => {
    // return new URL(imgSrc, import.meta.url).href;
    if (footerBgTwo) {
        return new URL('../../../../@/assets/img/logo/low-res-logo.png', import.meta.url).href;
    } else {
        return new URL('../../../../assets/img/logo/low-res-logo.png', import.meta.url).href;

    }
}
</script>
<template>
    <footer>
        <div :class="`footer__area ${footerBgTwo ? 'grey-bg-2' : 'footer-bg'}`">
            <div :class="`footer__top ${footerPadding ? 'pt-90' : 'pt-190'} pb-40`">
                <div class="container">
                    <div class="row">
                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-6">
                            <div class="footer__widget mb-50">
                                <div class="footer__widget-head mb-22">
                                    <div class="footer__logo">
                                        <router-link to="/">
                                            <img :src="getFooterBg(footerBgTwo)" alt=""
                                                style="width: 100px; margin-left: 50px">
                                        </router-link>
                                    </div>
                                </div>
                                <div :class="`${footerBgTwo ? 'footer__widget-body-2' : 'footer__widget-body'}`">
                                    <p>GoGo Travel hân hạnh mang đến cho quý khách những ý tưởng du lịch sáng tạo và các
                                        kế hoạch du lịch hoàn hảo, được thiết kế riêng để đáp ứng nhu cầu của từng cá
                                        nhân. Đội ngũ chuyên gia du lịch giàu kinh nghiệm của chúng tôi sẽ đồng hành
                                        cùng bạn trong suốt hành trình, từ khâu lên kế hoạch cho đến khi bạn trở về nhà
                                        an toàn.</p>

                                    <div class="footer__social">
                                        <ul>
                                            <li style="margin-left: 0px !important;"><a :href=formState.facebookLink
                                                    target="_blank"><i class="fab fa-facebook-f"></i></a></li>
                                            <li><a :href=formState.tikTokLink class="tw" target="_blank"><i
                                                        class="fab fa-tiktok"></i></a></li>
                                            <li style="margin-left: 10px;margin-right: 0;" target="_blank"><a
                                                    :href=formState.instagramLink class="pin"><i
                                                        class="fab fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-6" style="float: right;">
                            <div class="footer__widget footer__pl-70 mb-50">
                                <div class="footer__widget-head mb-22">
                                    <h3 :class="`${footerBgTwo ? 'footer__widget-title-2' : 'footer__widget-title'}`">
                                        Nhận thông tin các chuyến đi mới</h3>
                                </div>
                                <div class="footer__widget-body">
                                    <div :class="`${footerBgTwo ? 'footer__subscribe-2' : 'footer__subscribe'}`">
                                        <a-form :model="formPhone" @finish="onFinish">
                                            <div class="footer__subscribe-input mb-15">
                                                <a-form-item :name="['phone']"
                                                    :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn' }]">
                                                    <a-input type="phone" style="text-align: right;"
                                                        placeholder="Số điện thoại của bạn"
                                                        v-model:value="formPhone.phone" />
                                                </a-form-item>
                                                <button type="submit">
                                                    <i class="far fa-arrow-right"></i>
                                                    <i class="far fa-arrow-right"></i>
                                                </button>
                                            </div>
                                        </a-form>
                                        <p>Chúng tôi sẽ thông tin đến bạn sớm nhất.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="`${footerBgTwo ? 'footer__bottom footer__bottom-2' : 'footer__bottom'}`">
                <div class="container">
                    <div class="row">
                        <div class="col-xxl-12">
                            <div
                                :class="`${footerBgTwo ? 'footer__copyright-2 text-center' : 'footer__copyright text-center'}`">
                                <p>© 2023 GogoTravel, All Rights Reserved. Design By <router-link
                                        to="/">HTC</router-link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>