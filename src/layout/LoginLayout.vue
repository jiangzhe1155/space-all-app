<template>
  <div :style="windowSize" class="bg-white">
    <LoginFormWrapper/>
    <LoginBackground/>
  </div>
</template>

<script setup>

import {useWindowSize} from '@vueuse/core'
import {computed} from 'vue'
import LoginBackground from "@/view/login/LoginBackground.vue";
import LoginFormWrapper from "@/view/login/LoginFormWrapper.vue";

const {width, height} = useWindowSize()
const windowSize = computed(() => {
  return {height: height.value + 'px', width: width.value + 'px'}
})

</script>


<style scoped lang="css">

:deep(.el-input__inner) {
  @apply block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1
  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
  focus:ring-indigo-600;
  line-height: 2rem;
}

</style>
