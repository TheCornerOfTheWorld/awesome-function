<template>
  <input type="text" v-model="inputVal" />
</template>
<script lang="ts">
import { ref, defineComponent } from "vue-demi";

const name = "test";
const props = {};

export default defineComponent({
  name,
  props,
  setup() {
    const inputVal = ref<string>("");
    return {
      name,
      inputVal,
    };
  },
});
</script>
