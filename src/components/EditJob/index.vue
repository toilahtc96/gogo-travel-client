<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { CompanyService } from "@/services/company";
import { JobService } from "@/services/jobService";
import { message } from "ant-design-vue";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
import Company from "@/type/Company";
import { Job } from "@/type/Job";
import { Career } from "@/type/Career";
import { LevelName } from "@/type/LevelName";
import { WorkingForm } from "@/type/WorkingForm";
import { JobTypeService } from "@/services/jobTypeService";
import { WorkingFormService } from "@/services/workingFormService";
import { CareerService } from "@/services/careerService";
import { JobType } from "@/type/JobType";
const companyService = new CompanyService();
const jobService = new JobService();
const jobTypeService = new JobTypeService();
const workingFormService = new WorkingFormService();
const careerService = new CareerService();
const route = useRoute();

const spinning = ref<boolean>(false);
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
const fetchJob = () => {
    const id = route.params.id;
    if (id) {
        changeSpinning();
        jobService.getJobById(id)?.then((data) => {
            formState.value.id = data.id;
            formState.value.information = data.information;
            formState.value.careerId = data.careerId;
            formState.value.workingFormId = data.workingFormId;
            formState.value.companyId = data.companyId;
            formState.value.customRange = data.customRange;
            formState.value.jobTypeId = data.jobTypeId;
            formState.value.levelName = data.levelName;
            formState.value.quantity = data.quantity;
            minSalary.value = data.rangeSalaryMin;
            maxSalary.value = data.rangeSalaryMax;
            formState.value.rangeSalaryMax = data.rangeSalaryMax;
            formState.value.rangeSalaryMin = data.rangeSalaryMin;
            formState.value.status = data.status;
            changeSpinning();
        }).then(() => {

        })
    }
}
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const formState = ref<Job>({
    id: undefined,
    jobTypeId: undefined,
    companyId: undefined,
    levelName: undefined,
    careerId: undefined,
    workingFormId: undefined,
    quantity: undefined,
    rangeSalaryMin: undefined,
    rangeSalaryMax: undefined,
    information: '',
    status: undefined,
    customRange: false,
});
const onFinish = (values: any) => {
    changeSpinning();
    if (values.rangeSalaryMin && values.rangeSalaryMax) {
        if (values.rangeSalaryMin > values.rangeSalaryMax) {
            message.error("Min Salary great than Max Salary");
            changeSpinning();
            return;
        }
    }
    jobService.editJob(values)
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
            router.replace("/admin/job")
        })
        .catch(
            (err) => { message.error(err) }
        )
};

let defaultPage = ref({
    page: 0,
    size: 10
});
onMounted(() => {
    debugger;
    fetchJob();
})

watch(() => route.params.id, () => {
    fetchJob();
})
const styleInput = "float: left; width: 100%;";

const selectStatus = (value: StatusType) => {
    formState.value.status = value;
}
let listCompany = ref({
    listData: ref<[Company]>()
});
const filterCompany = (input: string) => {
    companyService.findCompany({ ...defaultPage.value, companyName: input }).then((data: any) => {
        listCompany.value = { listData: data.data };
    });
}
const selectCompany = (value: number) => {
    formState.value.companyId = value;
}
const selectLevel = (level: LevelName) => {
    formState.value.levelName = level;
}
const onAfterChangeMinSalary = (value: number) => {
    formState.value.rangeSalaryMin = value;
}
const onAfterChangeMaxSalary = (value: number) => {
    formState.value.rangeSalaryMax = value;
}
const minSalary = ref<number>(10);
const maxSalary = ref<number>(50);
let listCareer = ref({
    listData: ref<[Career]>()
});
const filterCareer = (input: string) => {
    careerService.findCareer({ ...defaultPage.value, name: input }).then((data: any) => {
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
    jobTypeService.findJobType({ ...defaultPage.value, name: input }).then((data: any) => {
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
    workingFormService.findWorkingForm({ ...defaultPage.value, name: input }).then((data: any) => {
        listWorkingForm.value = { listData: data.data };
    });
}
const selectWorkingForm = (value: number) => {
    formState.value.workingFormId = value;
}

</script>
<template>
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['id']" label="Id" :rules="[{ required: true }]" :hidden="true">
                <a-input-number v-model:value="formState.id" />
            </a-form-item>
            <a-form-item :name="['companyId']" label="Company" :style="styleInput">
                <SearchCompanySelect ref="select-company" :companyId="formState.companyId" style="width: 50%"
                    :listCompany="listCompany" @filter="filterCompany" @selectCompany="selectCompany" />
            </a-form-item>
            <a-form-item :name="['quantity']" label="Quantity" :style="styleInput">
                <a-input-number v-model:value="formState.quantity" style="width:30%" />
            </a-form-item>
            <a-form-item :name="['jobTypeId']" label="Job Type" :style="styleInput">
                <SearchJobTypeSelect ref="select-jobType-form" :jobTypeId="formState.jobTypeId" :listJobType="listJobType"
                    @filter="filterJobType" @selectJobType="selectJobType" />
            </a-form-item>
            <a-form-item :name="['workingFormId']" label="Working Form" :style="styleInput">
                <SearchWorkingFormSelect ref="select-working-form" :workingFormId="formState.workingFormId"
                    style="width: 50%" :listWorkingForm="listWorkingForm" @filter="filterWorkingForm"
                    @selectWorkingForm="selectWorkingForm" />
            </a-form-item>
            <a-form-item :name="['levelName']" label="Level" :style="styleInput">
                <LevelNameComponent :levelName="formState.levelName" ref="selectLevelName" @selectLevel="selectLevel" />
            </a-form-item>
            <a-form-item :name="['careerId']" label="Career" :style="styleInput">
                <SearchCareerSelect ref="select-career-form" :careerId="formState.careerId" style="width: 50%"
                    :listCareer="listCareer" @filter="filterCareer" @selectCareer="selectCareer" />
            </a-form-item>
            <a-form-item :name="['customRange']" label="Custom Range" :style="styleInput">
                <a-switch v-model:checked="formState.customRange" checked-children="Thỏa thuận"
                    un-checked-children="Không" />
            </a-form-item>

            <a-form-item :name="['rangeSalaryMin']" label="Min Salary" :style="styleInput">
                <a-col :span="12" style="float:left; width:100%">
                    <a-slider v-model:value="minSalary" :min="1" :max="100" @afterChange="onAfterChangeMinSalary" />
                </a-col>
                <a-col :span="4" style="float:left">
                    <a-input-number v-model:value="minSalary" :min="1" :max="100" style="margin-left: 16px"
                        @change="onAfterChangeMinSalary" />
                </a-col>
            </a-form-item>
            <a-form-item :name="['rangeSalaryMax']" label="Max Salary" :style="styleInput">
                <a-col :span="12" style="float:left; width:100%">
                    <a-slider v-model:value="maxSalary" :min="1" :max="100" @afterChange="onAfterChangeMaxSalary" />
                </a-col>
                <a-col :span="4" style="float:left">
                    <a-input-number v-model:value="maxSalary" :min="1" :max="100" style="margin-left: 16px"
                        @change="onAfterChangeMaxSalary" />
                </a-col>
            </a-form-item>
            <a-form-item :name="['information']" label="Information" :style="styleInput">
                <a-textarea v-model:value="formState.information" />
            </a-form-item>
            <a-form-item :name="['status']" label="Status" :style="styleInput">
                <StatusElement :status="formState.status" ref="select" @selectStatus="selectStatus" />
            </a-form-item>
            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }" :style="styleInput">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>