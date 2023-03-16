<script setup lang="ts">
import { onMounted, ref, watch, watchEffect, computed, CSSProperties, onUpdated } from "vue";
import { useDraggable } from '@vueuse/core';
import { User } from "@/type/User";
import { UserService } from "@/services/userService";
import { CompanyService } from "@/services/company";
import Company from "@/type/Company";

const props = defineProps(['user']);
const emit = defineEmits(['updateUser'])
const visible = ref<boolean>(false);
const modalTitleRef = ref<HTMLElement>();
const userService = new UserService();
const companyService = new CompanyService();
const showModal = () => {
    visible.value = true;
};

const { x, y, isDragging } = useDraggable(modalTitleRef);
const handleOk = (e: MouseEvent) => {
    visible.value = false;
};
const startX = ref<number>(0);
const startY = ref<number>(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(0);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });
watch([x, y], () => {
    if (!startedDrag.value) {
        startX.value = x.value;
        startY.value = y.value;
        const bodyRect = document.body.getBoundingClientRect();
        const titleRect = modalTitleRef.value?.getBoundingClientRect() == undefined ? { width: 10, height: 10 } : modalTitleRef.value?.getBoundingClientRect();
        dragRect.value.right = bodyRect.width - titleRect.width;
        dragRect.value.bottom = bodyRect.height - titleRect.height;
        preTransformX.value = transformX.value;
        preTransformY.value = transformY.value;
    }
    startedDrag.value = true;
});
watch(isDragging, () => {
    if (!isDragging) {
        startedDrag.value = false;
    }
});

watchEffect(() => {
    if (startedDrag.value) {
        transformX.value =
            preTransformX.value +
            Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
            startX.value;
        transformY.value =
            preTransformY.value +
            Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
            startY.value;
    }
});
const transformStyle = computed<CSSProperties>(() => {
    return {
        transform: `translate(${transformX.value}px, ${transformY.value}px)`,
    };
});
const formState = ref<User>({
    id: undefined,
    roleId: undefined,
    companyId: undefined,
    typeId: undefined,
    description: undefined,
    name: undefined,
    star: undefined,
    information: undefined,
    status: undefined,
    birthDay: undefined,
    levelId: undefined,
    experienceYear: undefined,
    cvLink: undefined,
    username: undefined,
    password: undefined,
    typeName: undefined,
})

const onFinish = () => {
    emit('updateUser',formState.value);
}

onMounted(() => {
    if (props.user) {
        userService.getUserById(props.user.id)?.then((data) => {
            formState.value = data.data;
        }).catch((err) => {

        })
    }
})
watch(props.user, () => {
    formState.value = props.user;
    userService.getUserById(formState.value.id)?.then((data) => {
        formState.value = data.data;
    }).catch((err) => {
    })
})

let listCompany = ref({
    listData: ref<[Company]>()
});
let defaultPage = ref({
    page: 0,
    size: 10
});

const filterCompany = (input: string) => {
    companyService.findCompany({ page: defaultPage.value.page, size: defaultPage.value.size, companyName: input }).then((data: any) => {
        listCompany.value = { listData: data.data };
    });
}
const selectCompany = (value: number) => {
    formState.value.companyId = value;
}

onUpdated(() => {
    formState.value = props.user;
})

defineExpose({
    handleOk
});
</script>

<style scoped>
:global(.ant-modal-footer) {
    display: none !important;
}

:global(.ant-form-item-label) {
    width: 15%;
    text-align: left !important;
}
</style>

<template>
    <div>
        <a-button type="primary" @click="showModal" class="e-btn e-btn-border">Edit Info</a-button>
        <a-modal ref="modalRef" v-model:visible="visible" :wrap-style="{ overflow: 'hidden' }" @ok="handleOk" width="50%">
            <a-form :model="formState" name="nest-messages" @finish="onFinish">
                <!-- :rules="[{ required: true }]" -->
                <a-form-item :name="['name']" label="Name">
                    <div class="blog__comment-input">
                        <a-textarea v-model:value="formState.name" show-count :maxlength="20" :row="1" />
                    </div>
                </a-form-item>
                <a-form-item :name="['companyId']" label="Company">
                    <SearchCompanySelect ref="select-company" :companyId="formState.companyId" style="float:left"
                        :listCompany="listCompany" @filter="filterCompany" @selectCompany="selectCompany"
                        class="form-item-edit-modal" />
                </a-form-item>
                <a-form-item :name="['description']" label="Description">
                    <div class="blog__comment-input">
                        <a-textarea v-model:value="formState.description" show-count :maxlength="100" />
                    </div>
                </a-form-item>
                <a-form-item :name="['experienceYear']" label="experienceYear">
                    <div class="blog__comment-input">
                        <a-input v-model:value="formState.experienceYear" />
                    </div>
                </a-form-item>
                <a-form-item style="text-align: center;">
                    <a-button type="primary" html-type="submit" class="e-btn">Submit</a-button>
                </a-form-item>
            </a-form>
            <template #title>
                <div ref="modalTitleRef" style="width: 100%; cursor: move">Edit User Modal</div>
            </template>
            <template #modalRender="{ originVNode }">
                <div :style="transformStyle">
                    <component :is="originVNode" />
                </div>
            </template>
        </a-modal>
    </div>
</template>

