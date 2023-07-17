
<script lang="ts" setup>
import { VoucherService } from "@/services/voucherService";
import { Voucher } from "@/type/Voucher";
import { voucherType } from "@/type/VoucherType";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";

const emit = defineEmits(['setPageInfomation'])
const defaultPage = {
    page: 0,
    size: 10
}
const voucherService = new VoucherService();
const myVouchers = ref();
const pageInfomation = ref({
    first: 0,
    last: 0,
    total: 0
});



onMounted(() => {
    voucherService.findMyVoucher({ ...defaultPage }).then((data) => {
        myVouchers.value = data.data;
        if (data.total > 0) {
            pageInfomation.value.first = (defaultPage.page * defaultPage.size) + 1;
            pageInfomation.value.last = pageInfomation.value.first + data.data.length - 1;
            myVouchers.value.forEach((voucher: Voucher) => {
                voucher.startTime = dayjs(voucher.startTime);
                voucher.endTime = dayjs(voucher.endTime);
                voucher.value = voucher.value?.toFixed(0) ? +voucher.value?.toFixed(0) : undefined;
            });
        }
        pageInfomation.value.total = data.total;
        emit('setPageInfomation', pageInfomation);
    })
})

const dateFormat = ref("HH:mm DD-MM-YYYY");
</script>
<template>
    <div v-for="voucher in myVouchers" :key="voucher.id" class="col-xxl-12">
        <div class="course__item white-bg mb-30 fix">
            <div class="row gx-0">
                <div class="col-xxl-4 col-xl-4 col-lg-4">
                    <div class="course__thumb course__thumb-list w-img p-relative fix">
                        <router-link :to="`/voucher/edit/${voucher.id}`">
                            <img src="https://i.ibb.co/fqLw6hW/1000-F-324148849-j-Zw2-PUBae-KGZWahh-J6a-S4aj-Bdrd-Co-Z5-N.jpg"
                                alt="">
                        </router-link>
                        <div class="course__tag">
                            <a href="#" :class="voucher.color">
                                <p>Bonus
                                    <span v-if="voucher.voucherType">
                                        {{ voucher.value }} <span v-if="voucher.voucherType == voucherType.PERCENT"> %
                                            Salary
                                            Offer </span> <span v-else> đ </span>
                                    </span>
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-xxl-8 col-xl-8 col-lg-8">
                    <div class="course__right">
                        <div class="course__content course__content-3" style="padding-bottom:100px !important">
                            <div class="course__meta d-flex align-items-center">
                                <div class="course__lesson mr-20">
                                    <span v-if="voucher.startTime"><i class="far fa-clock"></i>
                                        {{ dayjs(voucher.startTime).format(dateFormat) }} </span>
                                </div>
                                <div class="course__rating">
                                    <span v-if="voucher.endTime"><i class="far fa-arrow-right"></i>
                                        {{ dayjs(voucher.endTime).format(dateFormat) }} </span>
                                </div>
                            </div>
                            <h3 class="course__title course__title-3">
                                <router-link :to="`/voucher/edit/${voucher.id}`">{{ voucher.title }}</router-link>
                            </h3>
                            <div class="course__summary">
                                <p>Bonus
                                    <span v-if="voucher.voucherType">
                                        {{ voucher.value }} <span v-if="voucher.voucherType == voucherType.PERCENT"> %
                                            Salary
                                            Offer </span> <span v-else> đ </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="course__more course__more-2 d-flex justify-content-between align-items-center">
                            <div class="course__btn">
                                <router-link :to="`/voucher/edit/${voucher.id}`" class="link-btn">
                                    Know Details
                                    <i class="far fa-arrow-right"></i>
                                    <i class="far fa-arrow-right"></i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
 
    
    