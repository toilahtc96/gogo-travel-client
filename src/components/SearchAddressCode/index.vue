<script lang="ts" setup>
import { AddressService } from "@/services/address";
import { AddressType } from "@/type/AddressType";
import { Address } from "@/type/Address";
import { ref } from "vue";
const emit = defineEmits(['changeAddress'])
const addressService = new AddressService();
const formItemStyle = {
    labelCol3: { width: '40%', },
    labelColInput3: { width: '100%', float: 'left' },
};

let provinceCode = ref<string>("");
let districtCode = ref<string>("");
let precinctCode = ref<string>("");
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
    addressService.getByParentCode(value).then(data => {
        if (data) {
            listDistrict.value = data;
            emit('changeAddress', value, AddressType.PROVINCE);
        }
    })
}

const changeDistrict = (value: string) => {
    districtCode.value = value;
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

</script>
<template>
    <a-form-item :name="['provinceCode']" label="Province" :style="formItemStyle.labelCol3" style="float:left">
        <a-select ref="select" :value="provinceCode" :style="formItemStyle.labelColInput3" @change="changeProvince">
            <a-select-option v-for="data in listProvince" :key="data" :value="data.code">{{
                data.name
            }}</a-select-option>
        </a-select>
    </a-form-item>
    <a-form-item :name="['districtCode']" label="District " :style="formItemStyle.labelCol3" style="float:left">
        <a-select ref="select" :value="districtCode" :style="formItemStyle.labelColInput3" @change="changeDistrict">
            <a-select-option v-for="data in listDistrict" :key="data" :value="data.code">{{
                data.name
            }}</a-select-option>
        </a-select>
    </a-form-item>
    <a-form-item :name="['precinctCode']" label="Precinct" :style="formItemStyle.labelCol3" style="float:left">
        <a-select ref="select" :value="precinctCode" :style="formItemStyle.labelColInput3" @change="changePrecinct">
            <a-select-option v-for="data in listPrecinct" :key="data" :value="data.code">{{
                data.name
            }}</a-select-option>
        </a-select>
    </a-form-item>
</template>