<!-- Fullname,code,province,district,precinct,star,information -->
<script lang="ts" setup>
import { UserService } from "@/services/userService";
import { SearchUserForm } from '@/type/SearchUserForm';
import { ref, defineProps, defineEmits } from "vue";
import { StatusType } from "@/type/StatusType";
import { UserType } from "@/type/UserType";
import { LevelName } from "@/type/LevelName";
import Company from "@/type/Company";
import { CompanyService } from "@/services/company";
const userService = new UserService();
const companyService = new CompanyService();
const emit = defineEmits(['searchUser'])
const props = defineProps(['defaultPage'])
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const formItemStyle = {
    labelCol3: { width: '50%', },
    labelColInput3: { width: '100%', float: 'left' },
};
const formState = ref<SearchUserForm>({
    username: undefined,
    name: undefined,
    companyId: undefined,
    userType: undefined,
    level: undefined,
    experience: undefined,
    star: undefined,
    status: undefined,
    page: props.defaultPage.page,
    size: props.defaultPage.size
});
const onFinish = () => {
    console.log(formState.value);
    emit('searchUser', formState.value);
}
let listCompany = ref({
    listData: ref<[Company]>()
});

const filterCompany = (input: string) => {
    companyService.findCompany({ ...props.defaultPage, companyName: input }).then((data: any) => {
        listCompany.value = { listData: data.data };
    });
}
const selectCompany = (value: number) => {
    formState.value.companyId = value;
}

const selectUserType = (value: UserType) => {
    formState.value.userType = value;
}
const fixStar = (star: number) => {
    formState.value.star = star;
}
const selectLevel = (levelName: LevelName) => {
    formState.value.level = levelName;
}
const chooseExperience = (value: number) => {
    formState.value.experience = value;
}
</script>
<template>
    <div style="background-color: #ddd;">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['username']" label="User Name" :style="formItemStyle.labelCol3" style="float:left">
                <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item :name="['name']" label="Name" :style="formItemStyle.labelCol3" style="float:left">
                <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item :name="['companyId']" label="Company" :style="formItemStyle.labelCol3" style="float:left">
                <SearchCompanySelect ref="select-company" :companyId="formState.companyId" style="float:left"
                    :listCompany="listCompany" @filter="filterCompany" @selectCompany="selectCompany" />
            </a-form-item>
            <a-form-item :name="['userType']" label="User Type" :style="formItemStyle.labelCol3" style="float:left">
                <UserTypeSelect ref="userTypeSelect" :userTypeCode="formState.userType" @selectUserType="selectUserType" />
            </a-form-item>
            <a-form-item :name="['star']" label="Star" :style="formItemStyle.labelCol3" style="float:left">
                <Rate :value="formState.star" @change="fixStar" />
            </a-form-item>
            <a-form-item :name="['level']" label="Level" :style="formItemStyle.labelCol3" style="float:left">
                <LevelNameComponent :levelName="formState.level" ref="selectLevelName" @selectLevel="selectLevel" />
            </a-form-item>
            <a-form-item :name="['experience']" label="Experience" :style="formItemStyle.labelCol3" style="float:left">
                <ExperienceRange :levelName="formState.level" ref="selectExperience" @chooseExperience="chooseExperience" />
            </a-form-item>
            <div style="width:100%; float:left; text-align: center;">
                <a-button type="primary" html-type="submit">Tìm kiếm</a-button>
            </div>
        </a-form>
    </div>
</template>