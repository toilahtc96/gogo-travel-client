<script lang="ts" setup>
import { reactive, ref, watch, onMounted } from "vue-demi";
import { useRoute, } from "vue-router";
import { RoleService } from "@/services/role";

import { Role } from '@/type/Role';
import { message } from "ant-design-vue";
import router from "@/router/router";
import { StatusType } from "@/type/StatusType";
const roleService = new RoleService();
const route = useRoute();

let roleList;
const spinning = ref<boolean>(false);
const changeSpinning = () => {
  spinning.value = !spinning.value;
};


const formState = reactive({
  role: {
    id: 0,
    name: '',
    code: '',
    status: StatusType.ACTIVED
  },
});
const featchRole = () => {

  const id = route.params.id;
  if (id) {
    changeSpinning();
    roleService.getRoleById(id)?.then((data) => {
      roleList = data;
      formState.role.id = roleList.id;
      formState.role.name = roleList.name;
      formState.role.code = roleList.code;
      formState.role.status = roleList.status;
      changeSpinning();
    });
  }
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const onFinish = (values: any) => {
  console.log('Success:', values.role);
  changeSpinning();
  roleService.editRole(values.role)
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
      router.replace("/admin/role")
    })
    .catch(
      (err) => { message.error(err) }
    )
};

const handleChangeStatus = () => {

}

onMounted: {
  featchRole();
}

watch(() => route.params.id, () => {
  featchRole();
})
</script>
<template>
  <!-- :validate-messages="validateMessages" -->
  <a-spin :spinning="spinning">
    <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
      <a-form-item :name="['role', 'id']" label="Id" :rules="[{ required: true }]" :hidden="true">
        <a-input-number v-model:value="formState.role.id" />
      </a-form-item>
      <a-form-item :name="['role', 'name']" label="Name" :rules="[{ required: true }]">
        <a-input v-model:value="formState.role.name" />
      </a-form-item>
      <a-form-item :name="['role', 'code']" label="Code" :rules="[{ required: true }]">
        <a-select ref="select" v-model:value="formState.role.code" style="width: 120px">
          <a-select-option value="ADMIN">Admin</a-select-option>
          <a-select-option value="CANDIDATE">Candidate</a-select-option>
          <a-select-option value="AGENCY">Agency</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :name="['role', 'status']" label="Status">
        <a-select ref="select" v-model:value="formState.role.status" style="width: 120px" @change="handleChangeStatus">
          <a-select-option v-for="data in StatusType" :key="data" :value="data">{{
            data
          }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </a-spin>
</template>