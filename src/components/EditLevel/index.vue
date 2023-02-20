<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
import { LevelService } from "@/services/levelService";
import { LevelName } from "@/type/LevelName";
const levelService = new LevelService();
const route = useRoute();
const spinning = ref<boolean>(false);
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
let formState = ref({
    level: {
        levelId: 0,
        meaning: '',
        levelName: '',
        status: StatusType.ACTIVED
    }
});
const fetchLevel = () => {
    const id = route.params.id;
    if (id) {
        changeSpinning();
        levelService.getLevelById(id)?.then((data) => {
            formState.value.level.levelId = data.id;
            formState.value.level.meaning = data.meaning;
            formState.value.level.levelName = data.levelName;
            formState.value.level.status = data.status;
            changeSpinning();
        });
    }
}
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const onFinish = (values: any) => {
    changeSpinning();
    levelService.editLevel(values.level)
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
        })
        .catch(
            (err) => { message.error(err) }
        )
};

onMounted(() => {
    fetchLevel();
})

watch(() => route.params.id, () => {
    fetchLevel();
})

//todo:
const selectStatus = (value: StatusType) => {
    formState.value.level.status = value;
}
const selectLevel = (value: LevelName) => {
    formState.value.level.levelName = value;
}

</script>
<template>
    <!-- :validate-messages="validateMessages" -->
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['level', 'levelId']" label="Id" :rules="[{ required: true }]" :hidden="true">
                <a-input-number :value="formState.level.levelId" />
            </a-form-item>
            <a-form-item :name="['level', 'levelName']" label="Level Name" :rules="[{ required: true }]">
                <LevelNameComponent :levelName="formState.level.levelName" ref="selectLevelName"
                    @selectLevel="selectLevel" />
            </a-form-item>
            <a-form-item :name="['level', 'meaning']" label="Meaning" :rules="[{ required: true }]">
                <a-input v-model:value="formState.level.meaning" />
            </a-form-item>
            <a-form-item :name="['level', 'status']" label="Status">
                <StatusElement :status="formState.level.status" ref="select" @selectStatus="selectStatus" />
            </a-form-item>

            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>