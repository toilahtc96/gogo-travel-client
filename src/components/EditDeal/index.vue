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
const userService = new UserService();
const userTypeService = new UserTypeService();
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
    deal: {
        id: 0,
        agencyId: 0,
        candidateId: 0,
        processId: 0,
        status: StatusType.ACTIVED
    }
});
const fetchDeal = () => {
    const id = route.params.id;
    if (id) {
        changeSpinning();
        dealService.getDealById(id)?.then((data) => {
            formState.value.deal.id = data.id;
            formState.value.deal.agencyId = data.agencyId;
            formState.value.deal.processId = data.processId;
            formState.value.deal.candidateId = data.candidateId;
            formState.value.deal.status = data.status;
            changeSpinning();
        });
    }
}
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const onFinish = (values: any) => {
    console.log(formState.value.deal)
    changeSpinning();
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

onMounted(() => {
    fetchDeal();
    getUserTypeId();

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
    fetchDeal();
})

const selectStatus = (value: StatusType) => {
    formState.value.deal.status = value;
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
const editProcess = (current: number) => {
    formState.value.deal.processId = current;
    console.log(formState.value.deal);
}
</script>
<template>
    <!-- :validate-messages="validateMessages" -->
    <a-spin :spinning="spinning">
        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
            <a-form-item :name="['deal', 'id']" label="Id" :rules="[{ required: true }]" :hidden="true">
                <a-input-number :value="formState.deal.id" />
            </a-form-item>

            <a-form-item :name="['deal', 'agencyId']" label="Agency" :rules="[{ required: true }]">
                <!-- <a-input v-model:value="formState.deal.agencyId" /> -->
                <SearchUserSelect :listUser="listAgency" @filter="agencyFilterOption" />
            </a-form-item>
            <a-form-item :name="['deal', 'candidateId']" label="Candidate" :rules="[{ required: true }]">
                <SearchUserSelect :listUser="listCandidate" @filter="candidateFilterOption" />
            </a-form-item>
            <a-form-item :name="['deal', 'processId']" label="Process" :rules="[{ required: true }]">
                <ProcessDeal :current="formState.deal.processId" @editProcess="editProcess" />
            </a-form-item>
            <a-form-item :name="['deal', 'status']" label="Status">
                <StatusElement :status="formState.deal.status" ref="select" @selectStatus="selectStatus" />
            </a-form-item>

            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</template>