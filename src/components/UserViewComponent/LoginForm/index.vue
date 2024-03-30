<script lang="ts" setup>
import { ref } from 'vue';
import { LoginRequestType } from '@/model/LoginRequestType';
const emit = defineEmits(['userLogin'])
let formState = ref<LoginRequestType>({
    username: undefined,
    password: undefined
});
const onFinish = () => {
    emit("userLogin", formState.value);
}
</script>
<template>
    <a-form :model="formState" name="nest-messages" @finish="onFinish">
        <div class="sign__input-wrapper mb-25">
            <h5>Work email</h5>
            <div class="sign__input">
                <a-form-item :name="['username']">
                    <a-input type="text" placeholder="e-mail address" v-model:value="formState.username" />
                </a-form-item>
                <i class="fal fa-envelope"></i>
            </div>
            <div class="sign__input-wrapper mb-10">
                <h5>Password</h5>
                <div class="sign__input">
                    <a-form-item :name="['password']">
                        <a-input type="password" placeholder="Password" v-model:value="formState.password" />
                    </a-form-item>
                    <i class="fal fa-lock"></i>
                </div>
                <div class="sign__action d-sm-flex justify-content-between mb-30">
                    <div class="sign__agree d-flex align-items-center">
                        <a-form-item :name="['remember']">
                            <a-input class="m-check-input" type="checkbox" id="m-agree" />
                            <label class="m-check-label" for="m-agree">Keep me signed in</label>
                        </a-form-item>

                    </div>
                    <div class="sign__forgot">
                        <a href="#">Forgot your password?</a>
                    </div>
                </div>
                <button class="e-btn w-100" html-type="submit"> <span></span> Sign In</button>
                <div class="sign__new text-center mt-20">
                    <p>New to Educal? <router-link to="/register">Sign Up</router-link></p>
                </div>
            </div>
        </div>
    </a-form>
</template>