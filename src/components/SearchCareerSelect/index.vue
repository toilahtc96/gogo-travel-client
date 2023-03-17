<script lang="ts" setup>
import { CareerService } from '@/services/careerService';
import { Career } from '@/type/Career';
import type { SelectProps } from 'ant-design-vue';
import { onMounted, ref, watch, defineProps, defineEmits, onUpdated } from 'vue';
const props = defineProps(['listCareer', 'careerId', 'style']);
const emit = defineEmits(['filter', 'selectCareer']);
const loading = ref(false);
const careerService = new CareerService();
let defaultPage = ref({
    page: 0,
    size: 10
});
let listCareer = ref({
    listData: ref<[Career]>()
});
onMounted(() => {
    careerService.findCareer({ ...defaultPage.value }).then((data: any) => {
        listCareer.value = { listData: data.data };

    }).then(() => {
        if (listCareer.value.listData) {
            options.value = [];
            Object.values(listCareer.value.listData).forEach((item: Career) => {
                options.value?.push({ value: item.id, label: item.name });
            });
        }
    });
})
watch(() => props.listCareer, () => {
    if (props.listCareer) {
        openSelect.value = false;
        loading.value = false;
        options.value = [];
        Object.values(props.listCareer.listData).forEach((item: any) => {
            options.value?.push({ value: item.id, label: item.name });
        });
        setTimeout(() => {
            openSelect.value = true;
            console.log(options.value);
        }, 100)

    }
})

watch(() => props.careerId, () => {
    if (props.careerId) {
        getCareerById(props.careerId);
    }
})

const getCareerById = (id: number) => {
    careerService.getCareerById(id)?.then((data) => {
        if (options.value?.filter(item => { return item.value == data.id }).length == 0) {
            options.value?.push({ value: data.id, label: data.name });
        }
    }).then(() => {
        careerId.value = props.careerId;
    })
}
let options = ref<SelectProps['options']>();
const handleChange = (value: number) => {
    emit('selectCareer', value);
};
const handleBlur = () => {
    openSelect.value = false;
};
const handleFocus = () => {
    openSelect.value = true;
};
let openSelect = ref<boolean>(false);
const careerId = ref("");
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
const selectCareer = ref<Element>();

onUpdated(() => {
    if (props.careerId) {
        careerId.value = props.careerId;
    }
})
</script>
<template>
    <div class="country-select">
        <div class="course__sort-inner">
            <a-select :loading="loading" v-model:value="careerId" show-search placeholder="Select a Career"
                :style="props.style" :options="options" :open="openSelect"
                @select="openSelect = false" allowClear @mousedown="openSelect = true" @focus="handleFocus"
                @blur="handleBlur" @change="handleChange" ref="selectCareer" @inputKeyDown="inputKeyDown" />
        </div>
    </div>
</template>