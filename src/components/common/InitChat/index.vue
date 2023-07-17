<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { MessageOutlined } from '@ant-design/icons-vue';
const initChat = () => {
    showChat.value = !showChat.value;
    console.log(showChat.value)
}
const showChat = ref(false);
onMounted(() => { })
</script>

<style scoped>
.ant-chat {
    font-feature-settings: "tnum";
    bottom: 50px;
    box-sizing: border-box;
    color: rgba(0, 0, 0, .85);
    cursor: pointer;
    font-size: 14px;
    font-variant: tabular-nums;
    height: 40px;
    line-height: 1.5715;
    list-style: none;
    margin: 0;
    padding: 0;
    position: fixed;
    right: 100px;
    width: 40px;
    z-index: 10;
}

.ant-chat-icon {
    background-color: white;
    border-radius: 20px;
    color: #000;
    height: 40px;
    overflow: hidden;
    text-align: center;
    transition: all .3s;
    width: 40px;
}

.ant-chat-icon {
    font-size: 24px;
    line-height: 40px;
}
</style>

<template>
    <div class="ant-chat" data-v-7ec1b40c="" style="" @click="initChat">
        <div class="ant-chat-content">
            <div class="ant-chat-icon">
                <span role="img" aria-label="vertical-align-top" class="anticon anticon-vertical-align-top">
                    <MessageOutlined style="font-size: 25px; color: rgb(0, 0, 0); margin-bottom:10px" />
                </span>
            </div>
        </div>
    </div>
    <InitChatBox :showChat="showChat" />
</template>