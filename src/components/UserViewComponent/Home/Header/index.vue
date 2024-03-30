
<script setup lang="ts">
import { onMounted, ref } from 'vue';
const isSticky = ref(false);
const showSidebar = ref(false);
const menuOption = ref({
    menuShow: ref(false),
    menuSearch: ref(false),
    homeDropdown: ref(false),
    coursesDropdown: ref(false),
    pagesDropDown: ref(false),
    blogDropdown: ref(false),
    aboutDropdown: ref(false),
});
const props = defineProps(['headerShadow']);
const handleSticky = () => {
    if (window.scrollY > 80) {
        isSticky.value = true;
    }
    else {
        isSticky.value = false;
    }
};

const handleSidebar = () => {
    showSidebar.value = true;
};
const handleSidebarClose = () => {
    showSidebar.value = false;
};

onMounted(() => {
    window.addEventListener('scroll', handleSticky)
})
</script>

<template>
    <header>
        <!-- header__transparent -->
        <div id="header-sticky"
            :class="`${isSticky ? 'header__area header__padding-2 sticky' : `${headerShadow ? headerShadow : 'header__area header__padding-2'}`}`">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-xxl-3 col-xl-3 col-lg-4 col-md-2 col-sm-4 col-6">
                        <div class="header__left d-flex">
                            <div class="logo">
                                <router-link to="/">
                                    <img src="@/assets/img/logo/ggo-logo.png" alt="logo">
                                </router-link>
                            </div>
                            <div class="header__category d-none d-lg-block">
                                <nav>
                                    <ul>
                                        <li>
                                            <router-link to="/" class="cat-menu d-flex align-items-center">
                                                <div class="cat-dot-icon d-inline-block">
                                                    <svg viewBox="0 0 276.2 276.2">
                                                        <g>
                                                            <g>
                                                                <path class="cat-dot"
                                                                    d="M33.1,2.5C15.3,2.5,0.9,17,0.9,34.8s14.5,32.3,32.3,32.3s32.3-14.5,32.3-32.3S51,2.5,33.1,2.5z" />
                                                                <path class="cat-dot"
                                                                    d="M137.7,2.5c-17.8,0-32.3,14.5-32.3,32.3s14.5,32.3,32.3,32.3c17.8,0,32.3-14.5,32.3-32.3S155.5,2.5,137.7,2.5    z" />
                                                                <path class="cat-dot"
                                                                    d="M243.9,67.1c17.8,0,32.3-14.5,32.3-32.3S261.7,2.5,243.9,2.5S211.6,17,211.6,34.8S226.1,67.1,243.9,67.1z" />
                                                                <path class="cat-dot"
                                                                    d="M32.3,170.5c17.8,0,32.3-14.5,32.3-32.3c0-17.8-14.5-32.3-32.3-32.3S0,120.4,0,138.2S14.5,170.5,32.3,170.5z" />
                                                                <path class="cat-dot"
                                                                    d="M136.8,170.5c17.8,0,32.3-14.5,32.3-32.3c0-17.8-14.5-32.3-32.3-32.3c-17.8,0-32.3,14.5-32.3,32.3    C104.5,156.1,119,170.5,136.8,170.5z" />
                                                                <path class="cat-dot"
                                                                    d="M243,170.5c17.8,0,32.3-14.5,32.3-32.3c0-17.8-14.5-32.3-32.3-32.3s-32.3,14.5-32.3,32.3    C210.7,156.1,225.2,170.5,243,170.5z" />
                                                                <path class="cat-dot"
                                                                    d="M33,209.1c-17.8,0-32.3,14.5-32.3,32.3c0,17.8,14.5,32.3,32.3,32.3s32.3-14.5,32.3-32.3S50.8,209.1,33,209.1z    " />
                                                                <path class="cat-dot"
                                                                    d="M137.6,209.1c-17.8,0-32.3,14.5-32.3,32.3c0,17.8,14.5,32.3,32.3,32.3c17.8,0,32.3-14.5,32.3-32.3    S155.4,209.1,137.6,209.1z" />
                                                                <path class="cat-dot"
                                                                    d="M243.8,209.1c-17.8,0-32.3,14.5-32.3,32.3c0,17.8,14.5,32.3,32.3,32.3c17.8,0,32.3-14.5,32.3-32.3    S261.6,209.1,243.8,209.1z" />
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <span>Menu</span>
                                            </router-link>
                                            <ul class="cat-submenu">
                                                <li><router-link to="/login">Login</router-link></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-9 col-xl-9 col-lg-8 col-md-10 col-sm-8 col-6">
                        <div class="header__right d-flex justify-content-end align-items-center">
                            <div class="main-menu main-menu-2">
                                <nav id="mobile-menu" class="d-none d-xl-block">
                                    <ul style="width: 160%;">
                                        <li style="padding-right:5%;">
                                            <router-link to="/">Trang Chủ</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/">Xem Chuyến Đi</router-link>
                                        </li>
                                        <li><router-link to="/contact">Liên hệ</router-link></li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="sidebar__menu d-xl-none">
                                <div @click="handleSidebar" class="sidebar-toggle-btn ml-30" id="sidebar-toggle">
                                    <span class="line"></span>
                                    <span class="line"></span>
                                    <span class="line"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div @click="handleSidebarClose" :class="[showSidebar ? 'body-overlay opened' : 'body-overlay']"></div>
    <!-- sidebar area end -->
</template>