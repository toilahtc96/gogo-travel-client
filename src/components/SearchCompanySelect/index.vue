<script lang="ts" setup>
import { CompanyService } from '@/services/company';
import Company from '@/type/Company';
import type { SelectProps } from 'ant-design-vue';
import { onMounted, ref, watch, defineProps, defineEmits, onUpdated } from 'vue';
const props = defineProps(['listCompany', 'companyId', 'style']);
const emit = defineEmits(['filter', 'selectCompany']);
const companyService = new CompanyService();
let defaultPage = ref({
    page: 0,
    size: 10
});
let listCompany = ref({
    listData: ref<[Company]>()
});
onMounted(() => {
    companyService.findCompany({ ...defaultPage.value }).then((data: any) => {
        listCompany.value = { listData: data.data };

    }).then(() => {
        if (listCompany.value.listData) {
            options.value = [];
            Object.values(listCompany.value.listData).forEach((item: Company) => {
                options.value?.push({ value: item.id, label: item.name });
            });
        }
    });
})
watch(() => props.listCompany, () => {
    if (props.listCompany) {
        openSelect.value = false;
        loading.value = false;
        options.value = [];
        console.log(options.value);
        Object.values(props.listCompany.listData).forEach((item: any) => {
            options.value?.push({ value: item.id, label: item.name, key: item.id });
        });
        setTimeout(() => {
            openSelect.value = true;
            console.log(options.value)
        }, 100)

    }
})

watch(() => props.companyId, () => {
    if (props.companyId) {
        getCompanyById(props.companyId);
    }
})

const getCompanyById = (id: number) => {
    companyService.getCompanyById(id)?.then((data) => {
        if (options.value?.filter(item => { return item.value == id }).length == 0) {
            options.value?.push({ value: data.id, label: data.name });
        }
    }).then(() => {
        companyId.value = props.companyId;
    })
}
let options = ref<SelectProps['options']>([

]);
const handleChange = (value: number) => {
    companyId.value = value;
    emit('selectCompany', value);
};
const handleBlur = () => {
    openSelect.value = false;
};
const handleFocus = () => {
    openSelect.value = true;
};

let openSelect = ref<boolean>(false);
const companyId = ref<number | undefined>();
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
const selectCompany = ref<Element>();

onUpdated(() => {
    companyId.value = props.companyId;
})
</script>
<template>
    <div class="country-select">
        <div class="course__sort-inner">
            <a-select :loading="loading" v-model:value="companyId" show-search placeholder="Select a company"
                :style="props.style" :options="options" :open="openSelect" @select="openSelect = false" allowClear
                @mousedown="openSelect = true" @focus="handleFocus" @blur="handleBlur" @change="handleChange"
                ref="selectCompany" @inputKeyDown="inputKeyDown" />
        </div>
    </div>
</template>