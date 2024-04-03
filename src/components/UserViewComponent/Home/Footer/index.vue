 
<script setup lang="ts">
import { ref } from 'vue';
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
                        <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6">
                            <div class="footer__widget mb-50">
                                <div class="footer__widget-head mb-22">
                                    <div class="footer__logo">
                                        <router-link to="/">
                                            <img :src="getFooterBg(footerBgTwo)" alt="" style="width: 100px; margin-left: 50px">
                                        </router-link>
                                    </div>
                                </div>
                                <div :class="`${footerBgTwo ? 'footer__widget-body-2' : 'footer__widget-body'}`">
                                    <p>GoGo Travel hân hạnh mang đến cho quý khách những ý tưởng du lịch sáng tạo và các kế hoạch du lịch hoàn hảo, được thiết kế riêng để đáp ứng nhu cầu của từng cá nhân. Đội ngũ chuyên gia du lịch giàu kinh nghiệm của chúng tôi sẽ đồng hành cùng bạn trong suốt hành trình, từ khâu lên kế hoạch cho đến khi bạn trở về nhà an toàn.</p>

                                    <div class="footer__social">
                                        <ul>
                                            <li style="margin-left: 0px !important;"><a href="#"><i
                                                        class="fab fa-facebook-f"></i></a></li>
                                            <li><a href="#" class="tw"><i class="fab fa-twitter"></i></a></li>
                                            <li style="margin-left: 10px;margin-right: 0;"><a href="#" class="pin"><i
                                                        class="fab fa-pinterest-p"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-5 col-sm-3"></div>
                        <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-5 col-sm-6" style="float: right;">
                            <div class="footer__widget footer__pl-70 mb-50">
                                <div class="footer__widget-head mb-22">
                                    <h3 :class="`${footerBgTwo ? 'footer__widget-title-2' : 'footer__widget-title'}`">
                                        Nhận thông tin các chuyến đi mới</h3>
                                </div>
                                <div class="footer__widget-body">
                                    <div :class="`${footerBgTwo ? 'footer__subscribe-2' : 'footer__subscribe'}`">
                                        <form action="#">
                                            <div class="footer__subscribe-input mb-15">
                                                <input type="email" placeholder="Email của bạn">
                                                <button type="submit">
                                                    <i class="far fa-arrow-right"></i>
                                                    <i class="far fa-arrow-right"></i>
                                                </button>
                                            </div>
                                        </form>
                                        <p>Nhận tin tức và cập nhật mới nhất ngay tại hộp thư đến của bạn.</p>
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
                                <p>© 2023 GogoTravel, All Rights Reserved. Design By <router-link to="/">HTC</router-link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
  
   