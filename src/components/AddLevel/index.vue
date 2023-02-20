<script lang="ts" setup>
import router from "@/router/router";
import { LevelService } from "@/services/levelService";
import { LevelName } from "@/type/LevelName";
import { StatusType } from "@/type/StatusType";
import { message } from "ant-design-vue";
import { ref } from "vue";


const spinning = ref<boolean>(false);
const levelService = new LevelService();
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
const formState = ref(
    {
        level: {
            meaning: '',
            name: '',
            status: StatusType.ACTIVED
        }
    });
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const onFinish = (values: any) => {
    changeSpinning();
    levelService.addLevel(values.level)
        .then(
            (data) => {
                if (data && data.status === 204) {
                    message.info("Success")

                } else {
                    message.error('Has error, Contact to developer')
                }
                changeSpinning();
            }
        ).then(() => {
            router.replace("/admin/level")
        });
};
const selectLevel = (levelName: LevelName) => {
    formState.value.level.name = levelName;
}
</script>
<template>
    <!-- :validate-messages="validateMessages" -->
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['level', 'name']" label="Name" :rules="[{ required: true }]">
                <LevelNameComponent :levelName="formState.level.name" ref="selectLevelName" @selectLevel="selectLevel"/>
            </a-form-item>
            <a-form-item :name="['level', 'meaning']" label="Meaning" :rules="[{ required: true }]">
                <a-input v-model:value="formState.level.meaning" />
            </a-form-item>
            <a-form-item :name="['level', 'status']" label="Status">
                <StatusElement :status="formState.level.status" ref="select" />
            </a-form-item>

            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>