<script lang="ts" setup>
import { LoginRequestType } from '@/model/LoginRequestType';
import { AuthenticationService } from '@/services/authenticate';
const authenticationService = new AuthenticationService();
const doLogin = (value: LoginRequestType) => {
    authenticationService.login(value);
}
</script>

<template>
    <section class="signup__area po-rel-z1 pt-100 pb-145">
        <div class="sign__shape">
            <img class="man-1" src="@/assets/img/icon/sign/man-1.png" alt="">
            <img class="man-2" src="@/assets/img/icon/sign/man-2.png" alt="">
            <img class="circle" src="@/assets/img/icon/sign/circle.png" alt="">
            <img class="zigzag" src="@/assets/img/icon/sign/zigzag.png" alt="">
            <img class="dot" src="@/assets/img/icon/sign/dot.png" alt="">
            <img class="bg" src="@/assets/img/icon/sign/sign-up.png" alt="">
        </div>
        <div class="container">
            <div class="row">
                <div class="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2">
                    <div class="section__title-wrapper text-center mb-55">
                        <h2 class="section__title">Sign in to <br> recharge direct.</h2>
                        <p>it you don't have an account you can <a href="#">Register here!</a></p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                    <div class="sign__wrapper white-bg">
                        <div class="sign__header mb-35">
                            <div class="sign__in text-center">
                                <a href="#" class="sign__social text-start mb-15">
                                    <i class="fab fa-facebook-f"></i>Sign in with Facebook</a>
                                <p> <span>........</span> Or,
                                    <router-link to="/login">sign in</router-link>
                                    with your email<span> ........</span>
                                </p>
                            </div>
                        </div>
                        <div class="sign__form">
                            <LoginForm @userLogin="doLogin" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>