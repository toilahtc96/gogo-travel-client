<script setup lang="ts">
import { UserRegisterRequest } from '@/model/UserRegisterRequest';
import { ref } from 'vue';
const emit = defineEmits(['signup'])
const formState = ref<UserRegisterRequest>({
    fullname: undefined,
    username: undefined,
    password: undefined,
    rePassword: undefined,
    isCondition: false,
})
const onFinish = () => {
    emit('signup', formState.value);
}
</script>

<template>
    <div class="sign__form">
        <a-form :model="formState" name="nest-messages" @finish="onFinish">
            <div class="sign__input-wrapper mb-25">
                <h5>Full Name</h5>
                <div class="sign__input">
                    <a-form-item :name="['fullname']">
                        <a-input type="text" placeholder="Full name" v-model:value="formState.fullname" />
                    </a-form-item>
                    <i class="fal fa-user"></i>
                </div>
            </div>
            <div class="sign__input-wrapper mb-25">
                <h5>Username</h5>
                <div class="sign__input">
                    <a-form-item :name="['username']">
                        <a-input type="text" placeholder="username" v-model:value="formState.username" />
                    </a-form-item>
                    <i class="fal fa-envelope"></i>
                </div>
            </div>
            <div class="sign__input-wrapper mb-25">
                <h5>Password</h5>
                <div class="sign__input">
                    <a-form-item :name="['password']">
                        <a-input type="password" placeholder="Password" v-model:value="formState.password" />
                    </a-form-item>
                    <i class="fal fa-lock"></i>
                </div>
            </div>
            <div class="sign__input-wrapper mb-10">
                <h5>Re-Password</h5>
                <div class="sign__input">
                    <a-form-item :name="['rePassword']">
                        <a-input type="password" placeholder="Re-Password" v-model:value="formState.rePassword" />
                    </a-form-item>
                    <i class="fal fa-lock"></i>
                </div>
            </div>
            <div class="sign__action d-flex justify-content-between mb-30">
                <div class="sign__agree d-flex align-items-center">
                    <a-form-item :name="['isCondition']">
                        <a-input class="m-check-input" type="checkbox" id="m-agree" v-model:value="formState.isCondition" />
                    </a-form-item>
                    <label class="m-check-label" for="m-agree" style="margin-bottom: 10%;">I agree to the
                        <a href="#">Terms & Conditions</a>
                    </label>
                </div>
            </div>
            <button class="e-btn w-100" html-type="submit"> <span></span> Sign Up</button>
            <div class="sign__new text-center mt-20">
                <p>Already in E ducal ? <router-link to="/login"> Sign In</router-link></p>
            </div>
        </a-form>
    </div>
</template>