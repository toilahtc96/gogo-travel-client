<script lang="ts" setup>
import { CloseOutlined } from '@ant-design/icons-vue';
import { ref, onMounted, watch } from 'vue';
import SocketProxy from '@/components/socket/SocketProxy.js';
import SocketRequest from '@/components/socket/SocketRequest.js';
import { AppCommand } from '@/components/socket/SocketConstants';
import _ from 'lodash';
import { UserService } from '@/services/userService';
import { UserResponse } from '@/type/UserResponse';

let socketRequest: any = SocketRequest.getInstance();

const userService = new UserService();
const props = defineProps(['showChat']);
const showChatbox = ref("display:none;");
let socketProxy: any = SocketProxy.getInstance();
const spinning = ref(false);
const channelNameSelected = ref<string>("");
const channelNames = ref<string[]>([]);
const formState = ref({
    username: ref('')
})
const channel = new BroadcastChannel(AppCommand.GET_CHANNEL);
const isShowSearch = ref<boolean>(false);
if (socketProxy) {
    if (socketProxy != null && !socketProxy.connection) {
        socketProxy.setup();
    }
}
onMounted(() => {
    channelNameSelected.value = "Tin Nhắn Mới";
    userService.getUserByToken().then((data: UserResponse) => {
        if (data) {
            socketProxy.defineLoginRequest(data.username, data.password);
        }
    })
})
const closeChatBox = () => {
    showChatbox.value = "display:none;";
}
watch(() => props.showChat, (first, second) => {
    if (props.showChat) {
        showChatbox.value = "";
    } else {
        showChatbox.value = "display:none;";
    }
})

const onFinish = () => {
    console.log(formState.value.username)
}
const changeUsername = () => {
    spinning.value = true;
    let timer = 500;
    if (socketProxy != null || socketProxy.status !== "CONNECTED") {
        clearTimeout(timer);
        setTimeout(() => {
            setTimeout(() => {
                socketRequest.getChannelRequest(["conght96"])
                spinning.value = false;
            }, timer)
            spinning.value = false; 
        }, timer)
    }
}
channel.onmessage = (data) => {
    channelNames.value = [];
    const { channelId, chatLogs, channelName } = data.data;
    channelNames.value.push(channelName);
};
const chooseChannel = (channelName: string) => {
    isShowSearch.value = true;
    channelNameSelected.value = channelName;
}
</script>

<style scoped>
.chat-box {
    font-feature-settings: "tnum";
    bottom: 310px;
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
    right: 350px;
    width: 40px;
    z-index: 10;
}

.chat-box-content {
    background-color: rgb(103, 230, 255);
    border-radius: 20px;
    color: #000;
    height: 300px;
    overflow: hidden;
    transition: all .3s;
    width: 250px;
}

.chat-box-content-text {
    float: left;
    font-family: inherit;
    font-size: 20px;
    line-height: 40px;
    margin-left: 10px;
}

.chat-box-content-exit {
    float: right;
    font-size: 20px;
    line-height: 40px;
    margin-right: 10px;
}

.chat-search-name {
    width: 100%;
    float: left;
    font-family: inherit;
    font-size: 20px;
    line-height: 40px;
    margin-left: 10px;
    margin-bottom: -0.9em;
}

.chat-message-filter-content {
    width: 100%;
    float: left;
    font-family: inherit;
    font-size: 20px;
    line-height: 40px;
    margin-left: 10px;
}

.chat-message-box {
    width: 100%;
    float: left;
    font-family: inherit;
    font-size: 20px;
    line-height: 40px;
    margin-left: 10px;
}

.message-data {
    height: 30vh;
    background-color: white;
    margin-right: 8%;
    scroll-margin: inherit;
}

.chat-search-name .ant-spin-spinning {
    margin: auto !important;
    width: 100%;
}

.channel-name {
    float: left;
}

.inputSendMessage {
    position: absolute;
    bottom: 0%;
    left: 1%;
}

.message-textarea {
    width: 65%;
}

.send-btn {
    margin-left: 8px;
}

/* chat-search-name  chat-message-filter-content */
</style>

<template>
    <div class="chat-box" data-v-7ec1b40c="" :style="showChatbox">
        <div class="chat-box-content">
            <div class="chat-box-content-text">
                {{ channelNameSelected }}
            </div>
            <div class="chat-box-content-exit" style="text-align: right;" @click="closeChatBox">
                <CloseOutlined />
            </div>
            <div class="chat-search-name" :hidden="isShowSearch">
                <a-form :model="formState" name="nest-messages" @finish="onFinish">
                    <a-form-item :name="['username']" style=" text-align: center;">
                        <a-input v-model:value="formState.username" style="border: 4px; width: 93%; float: left;"
                            @change="changeUsername" :autocomplete="false" />
                    </a-form-item>
                </a-form>
            </div>
            <div class="chat-message-filter-content" :hidden="isShowSearch">
                <a-spin :spinning="spinning" style="font-size: 26px;">
                    <div class="chat-channel-content">
                        <div class="channel-name" @click="chooseChannel(item)" :key="index"
                            v-for="(item, index) in channelNames"> {{ item }}</div>
                    </div>

                </a-spin>
            </div>
            <div class="chat-message-box" :hidden="!isShowSearch">
                <a-spin :spinning="spinning" style="font-size: 26px;">
                    <div class="message-data">
                        <!-- :key="index" v-for="(item, index) in chatLogs" -->
                        <div class="channel-name"> </div>

                        <div class="inputSendMessage">
                            <a-textarea class="message-textarea" />
                            <a-button class="send-btn">send</a-button>
                        </div>
                    </div>
                </a-spin>
            </div>
        </div>

    </div>
</template>