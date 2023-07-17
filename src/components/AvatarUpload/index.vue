
<script lang="ts" setup>
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { ref, watch, defineEmits, defineProps } from 'vue';
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import { FileService } from '@/services/fileService';

const emit = defineEmits(['setImageUrl'])
const props = defineProps(['avatarImageBlob'])
const fileService = new FileService();
const getBase64 = (img: Blob | undefined, callback: (base64Url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    if (img) {
        reader.readAsDataURL(img);
    }
}

const fileList = ref([]);
const loading = ref<boolean>(false);
const imageUrl = ref<string>('');
const imageAddress = ref<string>('');
const avatarImage = ref<Blob>();

const handleChange = (info: UploadChangeParam) => {
    loading.value = true;
    fileService.uploadAvatar(info.file.originFileObj).then((imgAddress: string) => {
        imageAddress.value = imgAddress;
        emit("setImageUrl", imageAddress.value);
    }).catch((err) => {
        loading.value = false;
        message.error('upload error');
    });
};

const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
const setAvatar = (avatarUrl: any) => {
    imageUrl.value = avatarUrl;
}

defineExpose({
    setAvatar,
});

</script>
<style>
.avatar-uploader>.ant-upload {
    width: 256px;
    height: 256px;
}

.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
.ant-upload.ant-upload-select.ant-upload-select-picture-card {
    height:256px !important;
    width:256px !important;
}
</style>

<template>
    <a-upload v-model:file-list="fileList" name="avatar" list-type="picture-card" class="avatar-uploader"
        :show-upload-list="false" :before-upload="beforeUpload" @change="handleChange">
        <img v-if="imageUrl" :src="$props.avatarImageBlob" alt="avatar" style="width: 100%" />
        <div v-else>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">Upload</div>
        </div>
    </a-upload>
</template>