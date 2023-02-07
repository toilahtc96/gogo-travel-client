<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { CompanyService } from "@/services/company";
import { message } from "ant-design-vue";
import router from "@/router/router";
import { AddressService } from "@/services/address";
import { AddressType } from "@/type/AddressType";
import { Address } from "@/type/Address";
import { EntityStatus } from "@/model/EntityStatus";
const addressService = new AddressService();
const companyService = new CompanyService();
const route = useRoute();

const comboAddress = ref();
let companyList;
const spinning = ref<boolean>(false);
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
const fetchCompany = () => {
    const id = route.params.id;
    if (id) {

        changeSpinning();
        companyService.getCompanyById(id)?.then((data) => {
            companyList = data;
            formState.value.company.companyId = companyList.id;
            formState.value.company.name = companyList.name;
            formState.value.company.code = companyList.code;
            formState.value.company.provinceCode = companyList.provinceCode;
            formState.value.company.districtCode = companyList.districtCode;
            formState.value.company.precinctCode = companyList.precinctCode;
            formState.value.company.star = companyList.star;
            formState.value.company.information = companyList.information;
            formState.value.company.status = companyList.status;
            changeSpinning();
        }).then(() => {
            if (formState.value.company.provinceCode !== '') {
                changeProvince(formState.value.company.provinceCode, false);
            }
        })
    }
}
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const formState = ref({
    company: {
        companyId: ref<number>(0),
        name: ref<string>(''),
        code: ref<string>(''),
        provinceCode: ref<string>(''),
        districtCode: ref<string>(''),
        precinctCode: ref<string>(''),
        star: ref<number>(0),
        information: ref<string>(''),
        status: ref<EntityStatus>(EntityStatus.ACTIVE)
    },
});
const onFinish = (values: any) => {
    changeSpinning();
    companyService.editCompany(values.company)
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
            router.replace("/admin/company")
        })
        .catch(
            (err) => { message.error(err) }
        )
};
onMounted(() => {
    fetchCompany();
    addressService.getByType(AddressType.PROVINCE).then(data => {
        if (data) {
            listProvince.value = data;
        }
    });
})

watch(() => route.params.id, () => {
    fetchCompany();
})

let listProvince = ref<Address[]>();

let listDistrict = ref<Address[]>();

let listPrecinct = ref<Address[]>();
const changeProvince = (value: string, isResetValue: boolean) => {
    let temp = formState.value.company.districtCode;
    formState.value.company.districtCode = '';
    addressService.getByParentCode(value).then(data => {
        if (data) {
            console.log(temp);
            console.log(formState.value.company);
            listDistrict.value = data;
            if (!isResetValue) {
                formState.value.company.districtCode = temp;
            }
            comboAddress.value.changeProvince(formState.value.company.provinceCode)
            changeDistrict(formState.value.company.districtCode, isResetValue);
        }
    })
}
const changeDistrict = (value: string, isResetValue: boolean) => {
    let temp = formState.value.company.precinctCode;
    formState.value.company.precinctCode = '';
    addressService.getByParentCode(value).then(data => {
        if (data) {
            listPrecinct.value = data;
            if (!isResetValue) {
                formState.value.company.precinctCode = temp;
            }
            console.log(formState.value.company)
            comboAddress.value.changeDistrict(formState.value.company.districtCode)
            comboAddress.value.changePrecinct(formState.value.company.precinctCode)
        }
    })
}
const fixStar = (star: number) => {
    formState.value.company.star = star;
}

const changeAddress = (data: string, type: AddressType) => {
    switch (type) {
        case AddressType.PROVINCE:
            formState.value.company.provinceCode = data;
            break;
        case AddressType.DISTRICT:
            formState.value.company.districtCode = data;
            break;
        case AddressType.PRECINCT:
            formState.value.company.precinctCode = data;
            break;
        default:
            break;
    }
}

let provinceName = ref<[string, string]>(['company', 'provinceCode']);
let districtName = ref<[string, string]>(['company', 'districtCode']);
let precinctName = ref<[string, string]>(['company', 'precinctCode']);
const styleInput = "float: left; width: 100%;";
const formItemStyle = {
    labelCol3: { width: '100%', },
    labelColInput3: { width: '100%', float: 'left' },
};
</script>
<template>
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['company', 'companyId']" label="Id" :rules="[{ required: true }]" :hidden="true">
                <a-input-number v-model:value="formState.company.companyId" />
            </a-form-item>
            <a-form-item :name="['company', 'name']" label="Name" :rules="[{ required: true }]">
                <a-input v-model:value="formState.company.name" />
            </a-form-item>
            <a-form-item :name="['company', 'code']" label="Code" :rules="[{ required: true }]">
                <a-input v-model:value="formState.company.code" />
            </a-form-item>
            <ComboAddress ref="comboAddress" :provinceCode="formState.company.provinceCode" :districtCode="formState.company.districtCode"
                :precinctCode="formState.company.precinctCode" @changeAddress="changeAddress"
                :provinceName="provinceName" :districtName="districtName" :precinctName="precinctName"
                @changeProvince="changeProvince(formState.company.provinceCode, true)"
                @changeDistrict="changeDistrict(formState.company.districtCode, true)" 
                :formItemStyle="formItemStyle"/>
            <a-form-item :name="['company', 'star']" label="Star" :style="styleInput">
                <rate :value="formState.company.star" @change="fixStar" />
            </a-form-item>
            <a-form-item :name="['company', 'information']" label="Infomation" :style="styleInput">
                <a-input v-model:value="formState.company.information" />
            </a-form-item>
            <a-form-item :name="['company', 'status']" label="Status" :style="styleInput">
                <StatusElement :status="formState.company.status" ref="select" />
            </a-form-item>
            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }" :style="styleInput">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>