<script lang="ts" setup>
import { Ref, ref, onMounted, reactive, watch } from 'vue'
import { CompanyService } from '../../../services/company';
import { List, TableColumnsType } from 'ant-design-vue';
import { Company } from '@/type/Company';
import { AddressService } from '@/services/address';
import { AddressType } from '@/type/AddressType';
import { Address, SearchAddress } from '@/type/Address';
import { StatusType } from '@/type/StatusType';
// import SearchCompany from '@/components/search-company/search-company-index.vue';

const defaultCompanyPage = ref({
  page: 0,
  size: 10
});
let spinning = ref({ data: true });
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

let dataSearch = ref<SearchAddress>({
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

const companyService = new CompanyService();
const addressService = new AddressService();
let companyActives = ref({
  listData: ref<[Company]>()
});
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
onMounted(async () => {
  spinning.value.data = true;
  companyService.getListCompayActive(defaultCompanyPage.value.page, defaultCompanyPage.value.size).then((data: [Company]) => {
    companyActives.value = { ...companyActives.value, listData: data };
  }).then(() => {
    companyActives.value.listData?.forEach((item) => {
      getNameOfAddress(item.provinceCode, AddressType.PROVINCE, item);
      getNameOfAddress(item.districtCode, AddressType.DISTRICT, item);
      getNameOfAddress(item.precinctCode, AddressType.PRECINCT, item);
    })
    spinning.value.data = false;
  });
  companyService.getAll().then((data) => {
    setTotal(data.length);
  }).then(() => {
    spinning.value.data = false;
  });
})
let pageSetting = ref({
  current: new Number(1),
  total: new Number(0),
});

const setTotal = (total: Number) => {
  pageSetting.value.total = total;
}

const change = async (page: number, pageSize: number) => {
  // paging
  dataSearch.value.page = page;
  dataSearch.value.size = pageSize;
  spinning.value.data = true;
  companyService.findCompany(dataSearch.value).then((data) => {
    companyActives.value = { ...companyActives.value, listData: data };
  }).then(() => {
    companyActives.value.listData?.forEach((item) => {
      getNameOfAddress(item.provinceCode, AddressType.PROVINCE, item);
      getNameOfAddress(item.districtCode, AddressType.DISTRICT, item);
      getNameOfAddress(item.precinctCode, AddressType.PRECINCT, item);
    })
  }).then(() => {
    spinning.value.data = false;
  });
  // end paging
}
const showSizeChange = (current: number, size: number) => {
  defaultCompanyPage.value.size = size;

}
watch(() => companyActives.value.listData, (oldData, newData) => {
})
watch(() => pageSetting.value.total, (oldData, newData) => {
})
const searchCompany = (data: SearchAddress) => {
  spinning.value.data = true;
  dataSearch.value = data;
  dataSearch.value.page = defaultCompanyPage.value.page;
  dataSearch.value.size = defaultCompanyPage.value.size;
  console.log(2)
  companyService.findCompany(data).then((data) => {
    companyActives.value = { ...companyActives.value, listData: data };
  }).then(() => {
    companyActives.value.listData?.forEach((item) => {
      getNameOfAddress(item.provinceCode, AddressType.PROVINCE, item);
      getNameOfAddress(item.districtCode, AddressType.DISTRICT, item);
      getNameOfAddress(item.precinctCode, AddressType.PRECINCT, item);
    })
  }).then(() => {
    spinning.value.data = false;
    let allData = data;
    allData.size = 9999999;
    allData.page = 0;
    console.log(3)
    companyService.findCompany(allData).then((data) => {
      setTotal(data?.length ? data?.length : 0);
    }).then(() => {
      spinning.value.data = false;
    });
  });

}

</script>

<template>
  <a-spin :spinning="spinning.data">
    <search-company-index @searchCompany="searchCompany" />
    <a-table :columns="columns" :data-source="companyActives.listData" :scroll="{ x: 1300, y: 1000 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <router-link v-if="record.id" :to="{ name: 'admin-company-edit', params: { id: record.id } }"><a>edit
            </a></router-link>
        </template>
      </template>
    </a-table>
  </a-spin>
  <Pagination :current="pageSetting.current" :total="pageSetting.total" @change="change"
    :pageSize="defaultCompanyPage.size" @showSizeChange="showSizeChange" />
</template>