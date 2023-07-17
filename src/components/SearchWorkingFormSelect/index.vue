<script lang="ts" setup>
import { WorkingFormService } from '@/services/workingFormService';
import { WorkingForm } from '@/type/WorkingForm';
import type { SelectProps } from 'ant-design-vue';
import { onMounted, ref, watch, defineProps, defineEmits, onUpdated } from 'vue';
const props = defineProps(['listWorkingForm', 'workingFormId', 'style']);
const emit = defineEmits(['filter', 'selectWorkingForm']);
const workingFormService = new WorkingFormService();
let defaultPage = ref({
    page: 0,
    size: 10
});
let listWorkingForm = ref({
    listData: ref<[WorkingForm]>()
});
onMounted(() => {
    workingFormService.findWorkingForm({ ...defaultPage.value }).then((data: any) => {
        listWorkingForm.value = { listData: data.data };

    }).then(() => {
        if (listWorkingForm.value.listData) {
            options.value = [];
            Object.values(listWorkingForm.value.listData).forEach((item: WorkingForm) => {
                options.value?.push({ value: item.id, label: item.name });
            });
        }
    });
})
watch(() => props.listWorkingForm, () => {
    if (props.listWorkingForm) {
        openSelect.value = false;
        loading.value = false;
        options.value = [];
        Object.values(props.listWorkingForm.listData).forEach((item: any) => {
            options.value?.push({ value: item.id, label: item.name });
        });
        setTimeout(() => {
            openSelect.value = true;
            console.log(options.value);
        }, 100)

    }
})

watch(() => props.workingFormId, () => {
    workingFormId.value = props.workingFormId;
    getWorkingFormById(props.workingFormId);
})

const getWorkingFormById = (id: number) => {
    workingFormService.getWorkingFormById(id)?.then((data) => {
        if (options.value?.filter(item => { return item.value == data.id }).length == 0) {
            options.value?.push({ value: data.id, label: data.name });
        }
    }).then(() => {
        workingFormId.value = props.workingFormId;
    })
}
let options = ref<SelectProps['options']>([

]);
const handleChange = (value: number) => {
    emit('selectWorkingForm', value);
};
const handleBlur = () => {
    openSelect.value = false;
};
const handleFocus = () => {
    openSelect.value = true;
    console.log('focus');
};
let openSelect = ref<boolean>(false);
const workingFormId = ref();
const loading = ref(false);
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
const selectWorkingForm = ref<Element>();

onUpdated(() => {
    if (props.workingFormId) {
        // getWorkingFormById(props.workingFormId);
        workingFormId.value = props.workingFormId;
    }
})
</script>
<template>
    <div class="country-select">
        <div class="course__sort-inner">
            <a-select :loading="loading" v-model:value="workingFormId" show-search placeholder="Select a working form"
                :style="props.style" :options="options" :open="openSelect"
                @select="openSelect = false" allowClear @mousedown="openSelect = true" @focus="handleFocus"
                @blur="handleBlur" @change="handleChange" ref="selectWorkingForm" @inputKeyDown="inputKeyDown" />
        </div>
    </div>
</template>