<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { CompanyInformationService } from "@/services/companyInformationService";
import CompanyInformation from "@/type/CompanyInformation";
import { message } from "ant-design-vue";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
const companyInformationService = new CompanyInformationService();
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const formItemStyle = {
    labelCol3: { width: '100%', },
    labelColInput3: { width: '100%', float: 'left' },
};
const styleInput = "float: left; width: 100%;";
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
    status: StatusType.ACTIVED
});
const onFinish = (values: any) => {
    companyInformationService.addCompanyInformation(values)
        .then(
            (data) => {
                if (data && data.status === 204) {
                    message.info("Success")
                    router.push("/admin/company-information")
                } else {
                    message.error('Has error, Contact to developer')
                }
            }
        )
        .catch(
            (err) => { message.error(err) }
        )
};
const selectStatus = (value: StatusType) => {
    formState.value.status = value;
}
</script>
<template>
    <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
        <a-form-item :name="['companyName']" label="Tên Công Ty" :rules="[{ required: true }]">
            <a-input v-model:value="formState.companyName" />
        </a-form-item>
        <a-form-item :name="['companyAddress']" label="Địa chỉ chính">
            <a-input v-model:value="formState.companyAddress" />
        </a-form-item>
        <a-form-item :name="['companyCityAddress']" label="Thành Phố">
            <a-input v-model:value="formState.companyCityAddress" />
        </a-form-item>
        <a-form-item :name="['companyEmail']" label="Email">
            <a-input v-model:value="formState.companyEmail" />
        </a-form-item>
        <a-form-item :name="['companyPhone']" label="Số điện thoại" :rules="[{ required: true }]">
            <a-input v-model:value="formState.companyPhone" />
        </a-form-item>
        <a-form-item :name="['facebookLink']" label="Link FB">
            <a-input v-model:value="formState.facebookLink" />
        </a-form-item>
        <a-form-item :name="['instagramLink']" label="Instagram">
            <a-input v-model:value="formState.instagramLink" />
        </a-form-item>
        <a-form-item :name="['tikTokLink']" label="Tik tok">
            <a-input v-model:value="formState.tikTokLink" />
        </a-form-item>
        <a-form-item :name="['status']" label="Status" :style="styleInput">
            <StatusElement :status="formState.status" ref="select" @selectStatus="selectStatus" />
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }" :style="styleInput">
            <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
    </a-form>
</template>