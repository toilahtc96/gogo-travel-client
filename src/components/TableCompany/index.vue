<script lang="ts" setup>
import { ref, onMounted, watch, defineEmits, defineProps } from 'vue'
import { CompanyService } from '@/services/company';
import { TableColumnsType } from 'ant-design-vue';
import Company from '@/type/Company';
import { AddressService } from '@/services/address';
import { AddressType } from '@/type/AddressType';
import { Address } from '@/type/Address';
import { SearchCompany } from '@/type/SearchCompany';
import { StatusType } from '@/type/StatusType';

const emit = defineEmits(['setSpin', 'setTotal', 'settingDataSearch', 'setPaging'])
const props = defineProps(['companyActives', 'defaultCompanyPage', 'dataSearch'])
let rateInteract = ref<boolean>();
let defaultCompanyPage = ref({
    page: 0,
    size: 10
});
let dataSearch = ref<SearchCompany>({
    companyName: '',
    companyCode: '',
    provinceCode: '',
    districtCode: '',
    precinctCode: '',
    star: 1,
    information: '',
    status: StatusType.ACTIVED,
    page: defaultCompanyPage.value.page,
    size: defaultCompanyPage.value.size
});
const columns: TableColumnsType = [
    { title: 'Full Name', width: 300, dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: 'Code', width: 100, dataIndex: 'code', key: 'code', fixed: 'left' },
    { title: 'province', dataIndex: 'provinceCode', key: 'provinceCode' },
    { title: 'district', dataIndex: 'districtCode', key: 'districtCode' },
    { title: 'precinct', dataIndex: 'precinctCode', key: 'precinctCode' },
    { title: 'star', dataIndex: 'star', key: 'star' },
    { title: 'information', dataIndex: 'information', key: 'information' },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
    },
];

const companyService = new CompanyService();
const addressService = new AddressService();
let companyActives = ref({
    listData: ref<[Company]>()
});
const getAddressName = () => {
    companyActives.value.listData?.forEach((item) => {
        getNameOfAddress(item.provinceCode, AddressType.PROVINCE, item);
        getNameOfAddress(item.districtCode, AddressType.DISTRICT, item);
        getNameOfAddress(item.precinctCode, AddressType.PRECINCT, item);
    })
}
onMounted(async () => {
    emit('setSpin', true);
    companyService.getListCompayActive(defaultCompanyPage.value.page, defaultCompanyPage.value.size).then((data: [Company]) => {
        companyActives.value = { ...companyActives.value, listData: data };
    }).then(() => {
        companyActives.value.listData?.forEach((item) => {
            getNameOfAddress(item.provinceCode, AddressType.PROVINCE, item);
            getNameOfAddress(item.districtCode, AddressType.DISTRICT, item);
            getNameOfAddress(item.precinctCode, AddressType.PRECINCT, item);
        })
        emit('setSpin', false)
    });
    companyService.getAll().then((data) => {
        emit('setTotal', data.length);
    }).then(() => {
        emit('setSpin', false)
    });
    rateInteract.value = true;
})

const getNameOfAddress = (code: string, type: AddressType, item: Company) => {
    if (code !== '') {
        addressService.getAddressByTypeAndCode(code, type).then((data: (void | Address)) => {
            if (data) {
                switch (type) {
                    case AddressType.PROVINCE:
                        item.provinceCode = data.name;
                        break;
                    case AddressType.DISTRICT:
                        item.districtCode = data.name;
                        break;
                    case AddressType.PRECINCT:
                        item.precinctCode = data.name;
                        break;
                    default: break;
                }
            }
        })
    }
}

watch(() => props.companyActives, (data) => {
    companyActives.value = data;
});
watch(() => props.dataSearch, (data) => {
    dataSearch.value = data;
})
const searchCompany = (data: SearchCompany) => {
    emit('setSpin', true)
    emit('settingDataSearch', data)
    companyService.findCompany(data).then((data) => {
        companyActives.value = { ...companyActives.value, listData: data.data };
        emit('setTotal', data.total);
    }).then(() => {
        companyActives.value.listData?.forEach((item) => {
            getNameOfAddress(item.provinceCode, AddressType.PROVINCE, item);
            getNameOfAddress(item.districtCode, AddressType.DISTRICT, item);
            getNameOfAddress(item.precinctCode, AddressType.PRECINCT, item);
        })
    }).then(() => {
        emit('setSpin', false)
    });
}
const changePage = async (page: number, pageSize: number) => {
    emit('setPaging', page, pageSize)
    emit('setSpin', true)
    dataSearch.value.page = page;
    dataSearch.value.size = pageSize;
    companyService.findCompany(dataSearch.value).then((data) => {
        companyActives.value = { ...companyActives.value, listData: data.data };
        emit('setTotal', data.total);
    }).then(() => {
        companyActives.value.listData?.forEach((item) => {
            getNameOfAddress(item.provinceCode, AddressType.PROVINCE, item);
            getNameOfAddress(item.districtCode, AddressType.DISTRICT, item);
            getNameOfAddress(item.precinctCode, AddressType.PRECINCT, item);
        })
    }).then(() => {
        emit('setSpin', false);
    });
}
defineExpose({
    getAddressName,
    searchCompany,
    changePage
});
</script>
<template>
    <a-table :columns="columns" :data-source="companyActives.listData" :scroll="{ x: 1300, y: 1000 }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'star'">
                <rate :value="record.star" :isCanAccess="rateInteract"/>
            </template>
            <template v-if="column.key === 'operation'">
                <router-link v-if="record.id" :to="{ name: 'admin-company-edit', params: { id: record.id } }"><a>edit
                    </a></router-link>
            </template>
        </template>
    </a-table>
</template>