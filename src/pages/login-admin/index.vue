<template>
  <a-form
    style="padding-top: 18% "
    :model="formState"
    name="basic"
    :label-col="{ span: 9 }"
    :wrapper-col="{ span: 6 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" v-autofocus/>
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">      Submit
      </a-button>
    </a-form-item>

  </a-form>
</template>

<script setup>
import {reactive, onMounted} from "vue";
import { Form, FormItem, Input, InputPassword } from 'ant-design-vue';
import { vAutofocus } from "@/directives/vAutofocus.js";
import axios from '@/services/httpClient';
const apiUrl = import.meta.env.API_URL;

/*formState*/
const formState = reactive({
  username: '',
  password: '',
  remember: false
});

const onFinish = () => {
  axios.post(`/api/v1/authentication/login`, {
    username: formState.username,
    password: formState.password
  }).then(data => {
    debugger;
  }).catch(error => {
    if(error.response.status !== 200) {
      alert(error.response.data.Login)
    }
  })
}

const onFinishFailed = () => {
}

onMounted( () => {
    console.log(apiurl)
})
</script>
