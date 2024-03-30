<!-- Fullname,code,province,district,precinct,star,information -->
<script lang="ts" setup>
import { SearchJob } from '@/type/SearchJob';
import { ref } from "vue";
import { StatusType } from "@/type/StatusType";
import { JobType } from '@/type/JobType';
import Company from '@/type/Company';
import { WorkingForm } from '@/type/WorkingForm';
import { Career } from '@/type/Career';
import { LevelName } from '@/type/LevelName';
import { CompanyService } from '@/services/company';
import { JobService } from '@/services/jobService';
import { JobTypeService } from '@/services/jobTypeService';
import { WorkingFormService } from '@/services/workingFormService';
import { CareerService } from '@/services/careerService';

const companyService = new CompanyService();
const jobService = new JobService();
const jobTypeService = new JobTypeService();
const workingFormService = new WorkingFormService();
const careerService = new CareerService();
const emit = defineEmits(['searchJob'])
const props = defineProps(['defaultJobPage'])
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const formItemStyle = {
    labelCol3: { width: '50%', },
    labelColInput3: { width: '100%', float: 'left' },
};
const formState = ref<SearchJob>({
    jobTypeId: undefined,
    companyId: undefined,
    rangeSalary: undefined,
    levelName: undefined,
    customRange: undefined,
    careerId: undefined,
    workingFormId: undefined,
    information: undefined,
    status: StatusType.ACTIVED,
    page: props.defaultJobPage.page,
    size: props.defaultJobPage.size
})
const onFinish = () => {
    emit('searchJob', formState.value);
}
const styleInput = "float: left; width: 50%;";

const selectStatus = (value: StatusType) => {
    formState.value.status = value;
}
let listCompany = ref({
    listData: ref<[Company]>()
});
const filterCompany = (input: string) => {
    companyService.findCompany({ ...props.defaultJobPage, companyName: input }).then((data: any) => {
        listCompany.value = { listData: data.data };
    });
}
const selectCompany = (value: number) => {
    formState.value.companyId = value;
}
const selectLevel = (level: LevelName) => {
    formState.value.levelName = level;
}
const onAfterChangeSalary = (value: number) => {
    formState.value.rangeSalary = value;
}
const minSalary = ref<number>(0);
let listCareer = ref({
    listData: ref<[Career]>()
});
const filterCareer = (input: string) => {
    careerService.findCareer({ ...props.defaultJobPage, name: input }).then((data: any) => {
        listCareer.value = { listData: data.data };
    });
}
const selectCareer = (value: number) => {
    formState.value.careerId = value;
}

let listJobType = ref({
    listData: ref<[JobType]>()
});
const filterJobType = (input: string) => {
    jobTypeService.findJobType({ ...props.defaultJobPage, name: input }).then((data: any) => {
        listJobType.value = { listData: data.data };
    });
}
const selectJobType = (value: number) => {
    formState.value.jobTypeId = value;
}
let listWorkingForm = ref({
    listData: ref<[WorkingForm]>()
});
const filterWorkingForm = (input: string) => {
    workingFormService.findWorkingForm({ ...props.defaultJobPage, name: input }).then((data: any) => {
        listWorkingForm.value = { listData: data.data };
    });
}
const selectWorkingForm = (value: number) => {
    formState.value.workingFormId = value;
}
const clearFilter = () => {
    formState.value.jobTypeId = undefined;
    formState.value.companyId = undefined;
    formState.value.rangeSalary = undefined;
    formState.value.levelName = undefined;
    formState.value.customRange = undefined;
    formState.value.careerId = undefined;
    formState.value.workingFormId = undefined;
    formState.value.information = undefined;
    formState.value.status = StatusType.ACTIVED;
    formState.value.page = props.defaultJobPage.page;
    formState.value.size = props.defaultJobPage.size;
    minSalary.value = 0;
}
</script>
<template>
    <div style="background-color: #f1f1f1;">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['companyId']" label="Company" :style="styleInput">
                <SearchCompanySelect ref="select-company" :companyId="formState.companyId" style="width: 50%"
                    :listCompany="listCompany" @filter="filterCompany" @selectCompany="selectCompany" />
            </a-form-item>
            <a-form-item :name="['jobTypeId']" label="Job Type" :style="styleInput">
                <SearchJobTypeSelect ref="select-jobType-form" :jobTypeId="formState.jobTypeId" :listJobType="listJobType"
                    @filter="filterJobType" @selectJobType="selectJobType" style="width: 50%" />
            </a-form-item>
            <a-form-item :name="['workingFormId']" label="Working Form" :style="styleInput">
                <SearchWorkingFormSelect ref="select-working-form" :workingFormId="formState.workingFormId"
                    style="width: 50%" :listWorkingForm="listWorkingForm" @filter="filterWorkingForm"
                    @selectWorkingForm="selectWorkingForm" />
            </a-form-item>
            <a-form-item :name="['levelName']" label="Level" :style="styleInput">
                <LevelNameComponent :levelName="formState.levelName" ref="selectLevelName" @selectLevel="selectLevel"
                    style="width: 50%" />
            </a-form-item>
            <a-form-item :name="['careerId']" label="Career" :style="styleInput">
                <SearchCareerSelect ref="select-career-form" :careerId="formState.careerId" style="width: 50%"
                    :listCareer="listCareer" @filter="filterCareer" @selectCareer="selectCareer" />
            </a-form-item>
            <a-form-item :name="['rangeSalary']" label="Salary From" :style="styleInput">
                <a-col :span="12" style="float:left; width:100%">
                    <a-slider v-model:value="minSalary" :min="0" :max="100" @afterChange="onAfterChangeSalary" />
                </a-col>
                <a-col :span="4" style="float:left">
                    <a-input-number v-model:value="minSalary" :min="0" :max="100" style="margin-left: 16px"
                        @change="onAfterChangeSalary" />
                </a-col>
            </a-form-item>
            <a-form-item :name="['customRange']" label="Custom Range" :style="styleInput">
                <a-switch v-model:checked="formState.customRange" checked-children="Thỏa thuận"
                    un-checked-children="Không" />
            </a-form-item>
            <a-form-item :name="['status']" label="Status" :style="formItemStyle.labelCol3" style="float:left">
                <StatusElement :status="formState.status" ref="select" @selectStatus="selectStatus" style="width: 50%" />
            </a-form-item>
            <div style="width:100%; float:left; text-align: center;">
                <a-button type="primary" html-type="submit">Tìm kiếm</a-button>
                <a-button @click="clearFilter" style="margin-left: 15px;">Clear Filter</a-button>
            </div>
        </a-form>
    </div>
</template>