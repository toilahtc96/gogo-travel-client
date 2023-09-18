<script lang="ts" setup>
import { UserService } from "@/services/userService";
import { ProgressService } from "@/services/progressService";
import { User } from "@/type/User";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { JobService } from "@/services/jobService";
import { message } from "ant-design-vue";
import { Progress } from "@/type/Progress";
const route = useRoute();

const progressService = new ProgressService();
const id = +route.params.id;
const props = defineProps(['agencyId']);
const jobService = new JobService();
const userService = new UserService();
const agency = ref<User>();
const getAgency = (agencyId: number) => {
    userService.getUserById(agencyId)?.then((data) => {
        agency.value = data;
    })
}
onMounted(() => {
    progressService.getProgressOfUser(id, props.agencyId).then((data: Progress[]) => {
        data.forEach(item => {
            debugger;
            formState.value = item;
        })
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
    cvLink: undefined,
    candidateSendCvTime:undefined,
    companyId:undefined,
    sendCvCompanyTime:undefined
});
const onFinish = () => {
    message.success('success');
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
        <h2>Bước Hoàn Thành: Lịch Phỏng Vấn và Thông Tin Liên Quan</h2>
        <p>Chào bạn {{ formState.candidateName }},</p>
        <p>Chúc mừng! CV của bạn đã được công ty [Tên Công Ty] nhận và họ đã quan tâm đến hồ sơ của bạn. Dưới đây là các
            thông tin liên quan đến bước tiếp theo:</p>
        <ul>
            <li><strong>Thời gian phỏng vấn:</strong> [Ngày/Giờ Phỏng Vấn]</li>
            <li><strong>Địa điểm:</strong> [Địa Điểm Phỏng Vấn]</li>
            <li><strong>Người liên hệ tại công ty:</strong> [Tên Người Liên Hệ]</li>
            <li><strong>Số điện thoại liên hệ:</strong> [Số Điện Thoại Người Liên Hệ]</li>
        </ul>
        <p>Vui lòng chuẩn bị kỹ cho buổi phỏng vấn và đảm bảo bạn đến đúng giờ. Đây là cơ hội tốt để bạn thể hiện năng lực
            và thảo luận về kinh nghiệm của mình.</p>
        <p>Nếu bạn cần hỗ trợ hoặc có bất kỳ câu hỏi nào, vui lòng liên hệ chúng tôi qua email [Địa Chỉ Email Hỗ Trợ] hoặc
            số điện thoại [Số Điện Thoại Hỗ Trợ].</p>
        <p>Chúc bạn thành công trong buổi phỏng vấn!</p>
        <p>Trân trọng,<br>Đội ngũ [Tên Trang Web]</p>
    </div>
</template>