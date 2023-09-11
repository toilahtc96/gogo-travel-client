<script lang="ts" setup>
import { InboxOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { ref } from 'vue';
import type { UploadChangeParam } from 'ant-design-vue';
import { FileService } from '@/services/fileService';

const emit = defineEmits(["upload-cv-success"]);
const fileService = new FileService();
const loading = ref<boolean>(false);
const fileCv = ref();
const handleChange = (info: UploadChangeParam) => {
    loading.value = true;
    if (info.file.status == 'uploading' && info.event == undefined) {
        fileService.uploadFileCV(info.file.originFileObj).then((fileCvUpload: string) => {
            fileCv.value = fileCvUpload;
            loading.value = false;
            if (fileCvUpload !== undefined) {
                emit('upload-cv-success', fileCv.value);
            }

        }).catch((err) => {
            loading.value = false;
            message.error('upload error');
            throw err;
        });
    }
};

const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'pdf/doc/docx/html' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const fileList = ref([]);
const handleDrop = (e: DragEvent) => {
    console.log(e);
};
</script>

<template>
    <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true" @change="handleChange" @drop="handleDrop"
        @before-upload="beforeUpload" :previewFile="true">
        <a-spin :spinning="loading">
            <p class="ant-upload-drag-icon">
                <inbox-outlined></inbox-outlined>
            </p>
            <p class="ant-upload-text">Click or drag file to this area to upload</p>
            <p class="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
            </p>
        </a-spin>
    </a-upload-dragger>
</template>