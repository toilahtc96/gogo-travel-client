<script lang="ts" setup>
import { AddressService } from "@/services/address";
import { AddressType } from "@/type/AddressType";
import { Address } from "@/type/Address";
import { ref } from "vue";
const emit = defineEmits(['changeAddress'])
const addressService = new AddressService();
const props = defineProps(['provinceCode', 'districtCode', 'precinctCode', 'provinceName', 'districtName', 'precinctName', 'formItemStyle']);
let provinceCode = ref<string>(props.provinceCode);
let districtCode = ref<string>(props.districtCode);
let precinctCode = ref<string>(props.precinctCode);
let listProvince = ref<Address[]>();
let listDistrict = ref<Address[]>();
let listPrecinct = ref<Address[]>();

onMounted: {
    addressService.getByType(AddressType.PROVINCE).then(data => {
        if (data) {
            listProvince.value = data;
        }
    });
}

const changeProvince = (value: string) => {
    provinceCode.value = value;
    districtCode.value = '';
    precinctCode.value = '';
    addressService.getByParentCode(value).then(data => {
        if (data) {
            listDistrict.value = data;
            emit('changeAddress', value, AddressType.PROVINCE);
        }
    })
}

const changeDistrict = (value: string) => {
    districtCode.value = value;
    precinctCode.value = '';
    addressService.getByParentCode(value).then(data => {
        if (data) {
            listPrecinct.value = data;
            emit('changeAddress', value, AddressType.DISTRICT);
        }
    })
}

const changePrecinct = (value: string) => {
    precinctCode.value = value;
    emit('changeAddress', value, AddressType.PRECINCT);
}

defineExpose({
    changeProvince,
    changeDistrict,
    changePrecinct
});

</script>
<template>
    <a-form-item :name="props.provinceName" label="Province" :style="formItemStyle.labelCol3" style="float:left">
        <a-select ref="select" :value="provinceCode" :style="formItemStyle.labelColInput3" @change="changeProvince">
            <a-select-option v-for="data in listProvince" :key="data" :value="data.code">{{
                data.name
            }}</a-select-option>
        </a-select>
    </a-form-item>
    <a-form-item :name="props.districtName" label="District " :style="formItemStyle.labelCol3" style="float:left">
        <a-select ref="select" :value="districtCode" :style="formItemStyle.labelColInput3" @change="changeDistrict">
            <a-select-option v-for="data in listDistrict" :key="data" :value="data.code">{{
                data.name
            }}</a-select-option>
        </a-select>
    </a-form-item>
    <a-form-item :name="props.precinctName" label="Precinct" :style="formItemStyle.labelCol3" style="float:left">
        <a-select ref="select" :value="precinctCode" :style="formItemStyle.labelColInput3" @change="changePrecinct">
            <a-select-option v-for="data in listPrecinct" :key="data" :value="data.code">{{
                data.name
            }}</a-select-option>
        </a-select>
    </a-form-item>
</template>