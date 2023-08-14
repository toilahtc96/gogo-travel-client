<script lang="ts" setup>
import { JobTypeService } from '@/services/jobTypeService';
import { JobType } from '@/type/JobType';
import type { SelectProps } from 'ant-design-vue';
import { onMounted, ref, watch, onUpdated } from 'vue';
const props = defineProps(['listJobType', 'jobTypeId', 'style']);
const emit = defineEmits(['filter', 'selectJobType']);
const loading = ref(false);
const jobTypeService = new JobTypeService();
let defaultPage = ref({
    page: 0,
    size: 10
});
let listJobType = ref({
    listData: ref<[JobType]>()
});
onMounted(() => {
    jobTypeService.findJobType({ ...defaultPage.value }).then((data: any) => {
        listJobType.value = { listData: data.data };

    }).then(() => {
        if (listJobType.value.listData) {
            options.value = [];
            Object.values(listJobType.value.listData).forEach((item: JobType) => {
                options.value?.push({ value: item.id, label: item.name });
            });
        }
    });
})
watch(() => props.listJobType, () => {
    if (props.listJobType) {
        openSelect.value = false;
        loading.value = false;
        options.value = [];
        Object.values(props.listJobType.listData).forEach((item: any) => {
            options.value?.push({ value: item.id, label: item.name });
        });
        setTimeout(() => {
            openSelect.value = true;
            console.log(options.value);
        }, 100)

    }
})

watch(() => props.jobTypeId, () => {
    jobTypeId.value = props.jobTypeId;
    getJobTypeById(props.jobTypeId);
})

const getJobTypeById = (id: number) => {
    jobTypeService.getJobTypeById(id)?.then((data) => {
        if (options.value?.filter(item => { return item.value == data.id }).length == 0) {
            options.value?.push({ value: data.id, label: data.name });
        }
    }).then(() => {
        jobTypeId.value = props.jobTypeId;
    })
}
let options = ref<SelectProps['options']>();
const handleChange = (value: number) => {
    emit('selectJobType', value);
};
const handleBlur = () => {
    openSelect.value = false;
};
const handleFocus = () => {
    openSelect.value = true;
};
let openSelect = ref<boolean>(false);
const jobTypeId = ref();
const inputKeyDown = (key: KeyboardEvent) => {
    loading.value = true;
    delay(function () {
        emit('filter', (key.target as HTMLSelectElement).value);
    }, 1000);
}

var delay = (function () {
    let timer: any = 0;
    return function (callback: any, ms: any) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();
const selectJobType = ref<Element>();

onUpdated(() => {
    if (props.jobTypeId) {
        jobTypeId.value = props.jobTypeId;
    }
})
</script>
<template>
    <div class="country-select">
        <div class="course__sort-inner">
            <a-select placeholder="Select Job Type" :loading="loading" v-model:value="jobTypeId" show-search 
                :style="props.style" :options="options" :open="openSelect" @select="openSelect = false" allowClear
                @mousedown="openSelect = true" @focus="handleFocus" @blur="handleBlur" @change="handleChange"
                ref="selectJobType" @inputKeyDown="inputKeyDown" />
        </div>
    </div>
</template>