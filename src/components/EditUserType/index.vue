<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
import { UserTypeService } from "@/services/userTypeService";
const userTypeService = new UserTypeService();
const route = useRoute();
const spinning = ref<boolean>(false);
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
let formState = ref({
    userType: {
        id: 0,
        meaning: '',
        code: '',
        status: StatusType.ACTIVED
    }
});
const fetchUserType = () => {
    const id = route.params.id;
    if (id) {
        changeSpinning();
        userTypeService.getUserTypeById(id)?.then((data) => {
            formState.value.userType.id = data.id;
            formState.value.userType.meaning = data.meaning;
            formState.value.userType.code = data.code;
            formState.value.userType.status = data.status;
            changeSpinning();
        });
    }
}
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const onFinish = (values: any) => {
    changeSpinning();
    userTypeService.editUserType(values.userType)
        .then(
            (data) => {
                if (data && data.status === 204) {
                    message.info("Success")

                } else {
                    message.error('Has error, Contact to developer')
                }
                changeSpinning();
            }
        ).then(() => {
            router.replace("/admin/user-type")
        })
        .catch(
            (err) => { message.error(err) }
        )
};

onMounted(() => {
    fetchUserType();
})

watch(() => route.params.id, () => {
    fetchUserType();
})

//todo:
const selectStatus = (value: StatusType) => {
    formState.value.userType.status = value;
}

</script>
<template>
    <!-- :validate-messages="validateMessages" -->
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['userType', 'id']" label="Id" :rules="[{ required: true }]" :hidden="true">
                <a-input-number :value="formState.userType.id" />
            </a-form-item>
            <a-form-item :name="['userType', 'meaning']" label="Meaning" :rules="[{ required: true }]">
                <a-input v-model:value="formState.userType.meaning" />
            </a-form-item>
            <a-form-item :name="['userType', 'code']" label="Code" :rules="[{ required: true }]">
                <a-input v-model:value="formState.userType.code" /> </a-form-item>
            <a-form-item :name="['userType', 'status']" label="Status">
                <StatusElement :status="formState.userType.status" ref="select" @selectStatus="selectStatus" />
            </a-form-item>

            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>