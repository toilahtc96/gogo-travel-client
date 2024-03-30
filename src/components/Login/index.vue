
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { AuthenticationService } from "@/services/authenticate";
import { vAutofocus } from "@/directives/vAutofocus.js"
const authenticationService = new AuthenticationService();
/*formState*/
const formState = ref({
  username: 'conght96',
  password: '123456',
  remember: false
});

const onFinish = function () {
  authenticationService.login({
    'username': formState.value.username,
    'password': formState.value.password
  })
}

const onFinishFailed = () => {
}

onMounted(() => {
})
</script>

<template>
  <a-form style="padding-top: 18% " :model="formState" name="basic" :label-col="{ span: 9 }" :wrapper-col="{ span: 6 }"
    autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
    <a-form-item label="Username" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
      <a-input v-model:value="formState.username" v-autofocus />
    </a-form-item>

    <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit"> Submit
      </a-button>
    </a-form-item>

  </a-form>
</template>
