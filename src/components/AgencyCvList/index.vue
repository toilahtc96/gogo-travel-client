<script  lang="ts" setup>
import { onMounted, ref } from "vue";
import { ProgressService } from "@/services/ProgressService";
import { Progress } from "@/type/Progress";

const progressService = new ProgressService();
let defaultPage = ref({
    page: 0,
    size: 10
});
let pageSetting = ref({
    current: new Number(1),
    total: new Number(0),
});
const agencyCvList = ref<Progress[]>();
let spinning = ref({ data: true });
onMounted(() => {
    progressService.getListProgressOfAgency(defaultPage.value.page, defaultPage.value.size).then((data) => {
        agencyCvList.value = data.data;
        spinning.value.data = false;
    })
})


</script>

<template>
    <section class="cart-area pt-100 pb-100">
        <a-spin :spinning="spinning.data">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="table-content table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="cart-product-name">Tên Công ty</th>
                                        <th class="cart-product-name">Tên người ứng tuyển</th>
                                        <th class="product-price">Vị trí công việc</th>
                                        <th class="product-name">Link CV</th>
                                        <th class="product-name">Trạng thái CV</th>
                                        <th class="product-name">Thời gian ƯV nộp CV</th>
                                        <th class="product-name">Thời gian nộp CV tới công ty</th>
                                        <th class="product-action">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody class="border-0">

                                    <tr v-for="progress in agencyCvList" :key="progress.id" :value="progress">
                                        <td class="product-name">
                                            <span class="text-center">{{ progress.companyName }}</span>
                                        </td>
                                        <td class="product-name">
                                            <span class="text-center">{{ progress.candidateName }}</span>
                                        </td>
                                        <td class="product-name">
                                            <a :href="progress.cvLink" target="_blank"> <span class="text-center">Link
                                                    CV</span>
                                            </a>
                                        </td>
                                        <td class="product-name">
                                            <span class="text-center">{{ progress.careerName }}</span>
                                        </td>
                                        <td class="product-name">
                                            <span class="text-center">{{ progress.stepId }}</span>
                                        </td>
                                        <td class="product-name">
                                            <span class="text-center">{{ progress.candidateSendCvTime }}</span>
                                        </td>
                                        <td class="product-name">
                                            <span class="text-center">{{ progress.sendCvCompanyTime }}</span>
                                        </td>
                                        <td class="product-name">
                                            <span class="text-center">
                                                <a-button type="primary"> Update Progress</a-button>
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </a-spin>
    </section>
</template>

   
   