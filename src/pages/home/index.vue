<script lang="ts" setup>
import { useCounterStore } from "@/stores/counter";
import { Button as AButton, ButtonGroup as AButtonGroup } from "ant-design-vue";
import axios from "@/services/httpClient";

function test() {
  axios.post("/api/v1/authentication/login",{
    username: "conght96",
    password: "123456"
  }).then(accessToken => {
    console.log(accessToken);
  })
}
const counterStore = useCounterStore();
</script>

<template>
  <div>
    <p>{{ counterStore.count }}</p>
    <p>Double Count: {{ counterStore.doubleCount }}</p>
    <a-button-group>
      <a-button type="primary" @click="counterStore.increment">++</a-button>
      <a-button type="primary" danger @click="counterStore.decrement">
        --
      </a-button>
      <a-button type="button" @click="test"> login
      </a-button>
    </a-button-group>
  </div>
</template>
