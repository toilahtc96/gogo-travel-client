<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { CompanyInformationService } from "@/services/companyInformationService";
import CompanyInformation from "@/type/CompanyInformation";
import { message } from "ant-design-vue";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
const companyInformationService = new CompanyInformationService();
const route = useRoute();
const comboAddress = ref();
const spinning = ref<boolean>(false);
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
const fetchCompany = () => {
    const id = route.params.id;
    if (id) {
        changeSpinning();
        companyInformationService.getCompanyInformationById(id)?.then((data) => {
            formState.value.id = data.id;
            formState.value.companyName = data.companyName;
            formState.value.companyAddress = data.companyAddress;
            formState.value.companyCityAddress = data.companyCityAddress;
            formState.value.companyEmail = data.companyEmail;
            formState.value.companyPhone = data.companyPhone;
            formState.value.facebookLink = data.facebookLink;
            formState.value.instagramLink = data.instagramLink;
            formState.value.tikTokLink = data.tikTokLink;
            formState.value.status = data.status;
            changeSpinning();
        })
    }
}
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

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
    status: undefined
});
const onFinish = (values: any) => {
    changeSpinning();
    companyInformationService.editCompanyInformation(values)
        .then(
            (data) => {
                if (data && data.status === 200) {
                    message.info("Success")
                } else {
                    message.error('Has error, Contact to developer')
                }
                changeSpinning();
            }
        ).then(() => {
            debugger;
            router.replace("/admin/company-information")
        })
        .catch(
            (err) => { message.error(err) }
        )
};
onMounted(() => {
    fetchCompany();
})

watch(() => route.params.id, () => {
    fetchCompany();
})

const styleInput = "float: left; width: 100%;";
const formItemStyle = {
    labelCol3: { width: '100%', },
    labelColInput3: { width: '100%', float: 'left' },
};
const selectStatus = (value: StatusType) => {
    formState.value.status = value;
}
</script>
<template>
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['id']" label="Id" :rules="[{ required: true }]" :hidden="true">
                <a-input-number v-model:value="formState.id" />
            </a-form-item>
            <a-form-item :name="['companyName']" label=" Tên Công Ty" :rules="[{ required: true }]">
                <a-input v-model:value="formState.companyName" />
            </a-form-item>
            <a-form-item :name="['companyAddress']" label="Địa chỉ chính">
                <a-input v-model:value="formState.companyAddress" />
            </a-form-item>
            <a-form-item :name="['companyCityAddress']" label="Thành Phố">
                <a-input v-model:value="formState.companyCityAddress" />
            </a-form-item>
            <a-form-item :name="['companyEmail']" label="Email" >
                <a-input v-model:value="formState.companyEmail" />
            </a-form-item>
            <a-form-item :name="['companyPhone']" label="Số điện thoại" :rules="[{ required: true }]">
                <a-input v-model:value="formState.companyPhone" />
            </a-form-item>
            <a-form-item :name="['facebookLink']" label="Link FB" >
                <a-input v-model:value="formState.facebookLink" />
            </a-form-item>
            <a-form-item :name="['instagramLink']" label="Instagram" >
                <a-input v-model:value="formState.instagramLink" />
            </a-form-item>
            <a-form-item :name="['tikTokLink']" label="Tik tok" >
                <a-input v-model:value="formState.tikTokLink" />
            </a-form-item>
            <a-form-item :name="['status']" label="Status" :style="styleInput">
                <StatusElement :status="formState.status" ref="select" @selectStatus="selectStatus" />
            </a-form-item>
            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }" :style="styleInput">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>