<script lang="ts" setup>
import { UserService } from "@/services/userService";
import { ProgressService } from "@/services/progressService";
import { User } from "@/type/User";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { JobService } from "@/services/jobService";
import { message } from "ant-design-vue";
import { StatusType } from "@/type/StatusType";
import { Progress } from "@/type/Progress";
import { Item } from "ant-design-vue/lib/menu";
import { DateService } from "@/services/dateService";
const route = useRoute();

const progressService = new ProgressService();
const id = +route.params.id;
const props = defineProps(['agencyId']);
const jobService = new JobService();
const userService = new UserService();
const agency = ref<User>();
const dateService = new DateService();
const getAgency = (agencyId: number) => {
    userService.getUserById(agencyId)?.then((data) => {
        agency.value = data;
    })
}
watch(props.agencyId, () => {
    progressService.getProgressOfUser(id, props.agencyId).then((data: Progress[]) => {
        data.forEach(item => {
            formState.value = item;
        })
    }).then(() => {
        if (formState.value.createdDate != undefined) {
            console.log(typeof (formState.value.createdDate))
        }
    })
})
onMounted(() => {
    progressService.getProgressOfUser(id, props.agencyId).then((data: Progress[]) => {
        data.forEach(item => {
            formState.value = item;
        })
    }).then(() => {
        if (formState.value.createdDate != undefined && typeof (formState.value.createdDate) == 'string') {
            formState.value.createdDate = dateService.convertDateFormat(formState.value.createdDate);
        }
    })
})
const formState = ref<Progress>({
    id: undefined,
    agencyId: undefined,
    candidateId: undefined,
    status: undefined,
    stepId: undefined,
    candidateName: undefined,
    agencyName: undefined,
    levelName: undefined,
    companyName: undefined,
    careerName: undefined,
    createdDate: undefined,
    cvLink: undefined
});
const onFinish = () => {
    message.success('success');
}
const editStep = () => {

}
const addDateAndConvert = (inputDate: string, day: number): string => {
    return dateService.addDaysAndConvert(inputDate, day);
}
</script>
<style scoped>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
    color: #333;
}

p {
    color: #666;
}

.btn {
    display: inline-block;
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
}
</style>
<template>
    <div class="container">
        <h2>Thông Báo Tiếp Nhận CV</h2>
        <p>Chào bạn {{ formState.candidateName }},</p>
        <p>Chúc mừng! Chúng tôi đã tiếp nhận thành công CV của bạn cho vị trí {{ formState.careerName }}. Dưới đây là một số
            thông
            tin liên quan đến quá trình gửi CV của bạn:</p>
        <ul>
            <li><strong>Công ty:</strong> {{ formState.companyName }}</li>
            <li><strong>Trạng thái CV:</strong> Đang được tiến hành gửi cho công ty</li>
            <li><strong>Thời gian gửi:</strong> {{ formState.createdDate }}</li>
            <li><strong>Thời gian dự kiến phản hồi từ công ty:</strong> {{ formState.createdDate }}
            </li>
        </ul>
        <p>Để kiểm tra lại thông tin trong CV và xem trạng thái gửi, bạn có thể sử dụng link sau để truy cập vào trang xem
            lại:</p>
        <a class="btn" :href=formState.cvLink>Xem Lại CV</a>
        <p>Chúng tôi đang tiến hành chuyển CV của bạn đến công ty và sẽ cập nhật trạng thái gửi trong thời gian sớm nhất.
            Hãy kiểm tra thường xuyên để cập nhật thông tin mới nhất.</p>
        <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi và chúc bạn may mắn trong quá trình tìm kiếm việc làm!</p>
        <p>Trân trọng,<br>Đội ngũ CV Connect</p>
    </div>
</template>