<script lang="ts" setup>
import { UserService } from "@/services/userService";
import { User } from "@/type/User";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { JobService } from "@/services/jobService";
import { message } from "ant-design-vue";


import { h } from 'vue';
import {
    UserOutlined,
    SolutionOutlined,
    LoadingOutlined,
    SmileOutlined,
} from '@ant-design/icons-vue';
import { StepProps } from 'ant-design-vue';
const items = [
    {
        title: 'Login',
        status: 'finish',
        icon: h(UserOutlined),
    },
    {
        title: 'Verification',
        status: 'finish',
        icon: h(SolutionOutlined),
    },
    {
        title: 'Pay',
        status: 'process',
        icon: h(LoadingOutlined),
    },
    {
        title: 'Done',
        status: 'wait',
        icon: h(SmileOutlined),
    },
] as StepProps[];

const route = useRoute();

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
    // if (props.agencyId) {
    //     getAgency(props.agencyId);
    // }
    // if (!props.agencyId) {
    //     jobService.getJobById(id)?.then((data) => {
    //         getAgency(data.agencyId);
    //     })
    // }
})
const formState = ref({
    "description": ""
});
const onFinish = () => {
    message.success('success');
}
const editStep = () => {

}
</script>
<template>
    <a-steps :items="items"></a-steps>
</template>