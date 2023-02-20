<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
import { DealService } from "@/services/dealService";
import { UserService } from "@/services/userService";
import { User } from "@/type/User";
import { UserTypeService } from "@/services/userTypeService";
import { UserType } from "@/type/UserType";
import { Role } from "@/type/Role";
import { RoleType } from "@/type/RoleType";
import { LevelName } from "@/type/LevelName";
import dayjs, { Dayjs } from "dayjs";
import { CompanyService } from "@/services/company";
import { Company } from "@/type/Company";
const userService = new UserService();
const userTypeService = new UserTypeService();
const companyService = new CompanyService();
let userTypeData = ref({
    agencyId: -1,
    candidateId: -1,
    admin: -1,
})
let defaultPage = ref({
    page: 0,
    size: 10
});
const dealService = new DealService();
const route = useRoute();
const spinning = ref<boolean>(false);
const changeSpinning = () => {
    spinning.value = !spinning.value;
};
let formState = ref({
    user: {
        id: undefined,
        roleId: RoleType.USER,
        companyId: undefined,
        typeId: ref(),
        level: LevelName.JUNIOR,
        description: '',
        information: '',
        star: 0,
        name: '',
        experienceYear: undefined,
        cvLink: '',
        birthDay: ref<Dayjs>(),
        status: StatusType.ACTIVED
    }
});
const fetchUser = () => {
    const id = route.params.id;
    if (id) {
        changeSpinning();
        userService.getUserById(id)?.then((data) => {
            formState.value.user.id = data.id;
            formState.value.user.star = data.star;
            formState.value.user.birthDay = dayjs(data.birthDay);
            formState.value.user.cvLink = data.cvLink;
            formState.value.user.description = data.description;
            formState.value.user.information = data.information;
            formState.value.user.experienceYear = data.experienceYear;
            formState.value.user.name = data.name;
            formState.value.user.typeId = data.typeId;
            formState.value.user.roleId = data.roleName;
            formState.value.user.companyId = data.companyId;
            formState.value.user.status = data.status;
            changeSpinning();
        }).catch(err => {
            changeSpinning();

        });
    }
}
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const onFinish = (values: any) => {
    console.log(formState.value.user)
    changeSpinning();
    debugger;

    dealService.editDeal(values.deal)
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
            router.replace("/admin/deal")
        })
        .catch(
            (err) => { message.error(err) }
        )
};

const getCompany = () => {
    companyService.findCompany(defaultPage.value).then((data) => {
        listCompany.value.listData = data.data;
    })
}

onMounted(() => {
    fetchUser();
    getUserTypeId();
    getCompany();

})

const getUserTypeId = () => {
    userTypeService.getListUserType(defaultPage.value.page, defaultPage.value.size).then(data => {
        data.data.forEach((userType: any) => {
            switch (userType.code.toLowerCase()) {
                case UserType.ADMIN.toLocaleLowerCase():
                    userTypeData.value.admin = userType.id;
                    break;
                case UserType.AGENCY.toLocaleLowerCase():
                    userTypeData.value.agencyId = userType.id;
                    break;
                case UserType.CANDIDATE.toLocaleLowerCase():
                    userTypeData.value.candidateId = userType.id;
                    break;
                default:
                    break;
            }
        });
    }).then(() => {
        userService.getPaging({ ...defaultPage.value, typeId: userTypeData.value.agencyId }).then((data: any) => {
            listAgency.value = { ...listAgency.value, listData: data.data };
        });
        userService.getPaging({ ...defaultPage.value, typeId: userTypeData.value.candidateId }).then((data: any) => {
            listCandidate.value = { ...listCandidate.value, listData: data.data };
        });
    })
}

watch(() => route.params.id, () => {
    fetchUser();
})

const selectStatus = (value: StatusType) => {
    formState.value.user.status = value;
}
let listAgency = ref({
    listData: ref<[User]>()
});
let listCandidate = ref({
    listData: ref<[User]>()
});
const agencyFilterOption = (input: string, option: any) => {
    userService.getPaging({ ...defaultPage.value, typeId: userTypeData.value.agencyId, name: input }).then((data: any) => {
        return { ...listAgency.value, listData: data.data };
    });
}
const candidateFilterOption = (input: string, option: any) => {
    userService.getPaging({ ...defaultPage.value, typeId: userTypeData.value.candidateId, name: input }).then((data: any) => {
        return { ...listCandidate.value, listData: data.data };
    });
}
const selectRole = (role: RoleType) => {
    formState.value.user.roleId = role;
}
const selectLevel = (level: LevelName) => {
    formState.value.user.level = level;
}
const fixStar = (star: number) => {
    formState.value.user.star = star;
}
let listCompany = ref({
    listData: ref<[Company]>()
});
const filterCompany = (input: string) => {
    companyService.findCompany({ ...defaultPage.value, companyName: input }).then((data: any) => {
        listCompany.value = { listData: data.data };
    });
}
const dateFormat = "DD/MM/YYYY";

</script>
<template><!-- :validate-messages="validateMessages" -->
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['user', 'id']" label="Id" :rules="[{ required: true }]" :hidden="false">
                <a-input-number :value="formState.user.id" />
            </a-form-item>
            <a-form-item :name="['user', 'name']" label="Name">
                <a-input v-model:value="formState.user.name" />
            </a-form-item>
            <a-form-item :name="['user', 'roleId']" label="Role" :rules="[{ required: true }]">
                <RoleElement ref="select-role" :role="formState.user.roleId" style="width: 120px"
                    @selectRole="selectRole" />
            </a-form-item>

            <a-form-item :name="['user', 'companyId']" label="Company">
                <SearchCompanySelect ref="select-company" :companyId="formState.user.companyId" style="width: 50%"
                    :listCompany="listCompany" @filter="filterCompany" />
            </a-form-item>
            <a-form-item :name="['user', 'typeId']" label="Type" :rules="[{ required: true }]">
                <a-input-number v-model:value="formState.user.typeId" />
            </a-form-item>
            <a-form-item :name="['user', 'level']" label="Level">
                <LevelNameComponent :levelName="formState.user.level" ref="selectLevelName" @selectLevel="selectLevel" />
            </a-form-item>
            <a-form-item :name="['user', 'experienceYear']" label="Experience" >
                <a-input-number v-model:value="formState.user.experienceYear" />
            </a-form-item>
            <a-form-item :name="['user', 'cvLink']" label="Link CV">
                <a-textarea v-model:value="formState.user.cvLink" />
                <a-button type="link" :href="formState.user.cvLink" target="_blank">go to Link</a-button>
            </a-form-item>
            <a-form-item :name="['user', 'birthDay']" label="BirthDay">
                <a-date-picker v-model:value="formState.user.birthDay" :format="dateFormat" />
            </a-form-item>
            <a-form-item :name="['user', 'description']" label="Description">
                <a-textarea v-model:value="formState.user.description" />
            </a-form-item>
            <a-form-item :name="['user', 'information']" label="Information">
                <a-textarea v-model:value="formState.user.information" />
            </a-form-item>
            <a-form-item :name="['user', 'star']" label="Star">
                <rate :value="formState.user.star" @change="fixStar" />
            </a-form-item>

            <a-form-item :name="['user', 'status']" label="Status">
                <StatusElement :status="formState.user.status" ref="select" @selectStatus="selectStatus" />
            </a-form-item>

            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
</a-spin>
</template>