<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form';
import { defineComponent, reactive, ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { AuthenticationService } from '@/services/authenticate';
import { RegisterRequest } from '@/model/RegisterRequest';
interface FormState {
    username: string;
    pass: string;
    checkPass: string;
}
const authenticationService = new AuthenticationService();
const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
    username: '',
    pass: '',
    checkPass: '',
});
let formRegister = ref<RegisterRequest>({
    username: '',
    password: ''
});
let validatePass = async (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('Please input the password');
    } else {
        if (formState.checkPass !== '') {
            formRef.value?.validateFields('checkPass');
        }
        return Promise.resolve();
    }
};
let validatePass2 = async (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('Please input the password again');
    } else if (value !== formState.pass) {
        return Promise.reject("Two inputs don't match!");
    } else {
        return Promise.resolve();
    }
};

const rules: Record<string, Rule[]> = {
    username: [{ required: true }],
    pass: [{ required: true, validator: validatePass, trigger: 'change' }],
    checkPass: [{ required: true, validator: validatePass2, trigger: 'change' }],
};
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
};
const handleFinish = (values: FormState) => {
    formRegister.value.username = values.username;
    formRegister.value.password = values.pass;
    authenticationService.register(formRegister.value);
};
const handleFinishFailed = (errors: any) => {
    console.log(errors);
};
const resetForm = () => {
    formRef.value?.resetFields();
};
const handleValidate = (...args: any[]) => {
};
</script>
<template>
    <a-form ref="formRef" name="custom-validation" :model="formState" :rules="rules" v-bind="layout"
        @finish="handleFinish" @validate="handleValidate" @finishFailed="handleFinishFailed" style="padding-top: 18% "
        :label-col="{ span: 9 }" :wrapper-col="{ span: 6 }">
        <a-form-item has-feedback label="Username" name="username">
            <a-input v-model:value="formState.username" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="Password" name="pass">
            <a-input v-model:value="formState.pass" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="Confirm" name="checkPass">
            <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 8, offset: 10 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
            <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
        </a-form-item>
    </a-form>
</template>