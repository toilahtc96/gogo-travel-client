<script lang="ts" setup>
import { CompanyService } from '@/services/company';
import { Company } from '@/type/Company';
import type { SelectProps } from 'ant-design-vue';
import { onMounted, ref, watch } from 'vue';
const props = defineProps(['listCompany', 'companyId']);
const emit = defineEmits(['filter']);
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
        Object.values(props.listCompany.listData).forEach((item: any) => {
            options.value?.push({ value: item.id, label: item.name });
        });
        setTimeout(() => {
            openSelect.value = true;
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
        if (!options.value?.includes({ value: data.id, label: data.name })) {
            options.value?.push({ value: data.id, label: data.name });
        }
    }).then(() => {
        companyId.value = props.companyId;
    })
}
let options = ref<SelectProps['options']>([

]);
const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};
const handleBlur = () => {
    openSelect.value = false;
};
const handleFocus = () => {
    openSelect.value = true;
    console.log('focus');
};
let inputCancel = ref("");
const filterOption = (input: string) => {


    // return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

let openSelect = ref<boolean>(false);
const companyId = ref("");
const current = ref(2);
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
</script>
<template>
    <a-select :loading="loading" v-model:value="companyId" show-search placeholder="Select a company" style="width: 50%"
        :options="options" :filter-option="filterOption" :open="openSelect" @select="openSelect = false"
        @mousedown="openSelect = true" @focus="handleFocus" @blur="handleBlur" @change="handleChange" ref="selectCompany"
        @inputKeyDown="inputKeyDown" />
</template>