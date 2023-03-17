<script lang="ts" setup>
import { ref, watch, onMounted } from "vue-demi";
import { useRoute, } from "vue-router";
import { CareerService } from "@/services/careerService";

import { Career } from '@/type/Career';
import { message } from "ant-design-vue";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
const careerService = new CareerService();
const route = useRoute();
let careerList;
const spinning = ref<boolean>(false);
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
let formState = ref({
    career: {
        id: 0,
        name: '',
        status: StatusType.ACTIVED
    }
});
const fetchCareer = () => {

    const id = route.params.id;
    if (id) {
        changeSpinning();
        careerService.getCareerById(id)?.then((data) => {
            careerList = data;
            formState.value.career.id = careerList.id;
            formState.value.career.name = careerList.name;
            formState.value.career.status = careerList.status;
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
    careerService.editCareer(values.career)
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
            router.replace("/admin/career")
        })
        .catch(
            (err) => { message.error(err) }
        )
};

onMounted(() => {
    fetchCareer();
})

watch(() => route.params.id, () => {
    fetchCareer();
})

const selectStatus = (value: StatusType) => {
    formState.value.career.status = value;
}

let defaultPage = ref({
    page: 0,
    size: 10
});
let listCareer = ref({
    listData: ref<[Career]>()
});
const filterCareer = (input: string) => {
    careerService.findCareer({ ...defaultPage.value, name: input }).then((data: any) => {
        listCareer.value = { listData: data.data };
    });
}
const selectCareer = (value: number) => {
    formState.value.career.id = value;
}

</script>
<template>
    <!-- :validate-messages="validateMessages" -->
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['career', 'id']" label="Id" :rules="[{ required: true }]" :hidden="true">
                <a-input-number :value="formState.career.id" />
            </a-form-item>
            <a-form-item :name="['career', 'name']" label="Name" :rules="[{ required: true }]">
                <a-input v-model:value="formState.career.name" />
            </a-form-item>
            <a-form-item :name="['career', 'status']" label="Status">
                <StatusElement :status="formState.career.status" ref="select" @selectStatus="selectStatus" />
            </a-form-item>

            <a-form-item :name="['career', 'test']" label="test">
                <SearchCareerSelect ref="select-career-form" :careerId="formState.career.id" style="width: 50%"
                    :listCareer="listCareer" @filter="filterCareer" @selectCareer="selectCareer" />
            </a-form-item>

            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>