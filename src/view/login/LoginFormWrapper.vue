<template>
  <div class="z-10 relative space-always-center w-[30rem]">
    <div class="bg-white px-6 py-6 shadow-xl rounded-lg px-12 space-y-6">
      <div class="mb-6 text-center space-h1">{{
          $t('login.title')
        }}
      </div>
      <div class="flex flex-row">
        <el-button
                class="space-tab-item select_tab"
                @click="()=>state.formType = 'phone'"
                :class="{'active':state.formType === 'phone'}">
          {{ $t('login.phone') }}
        </el-button>
        <el-button class="space-tab-item select_tab"
                   @click="()=>state.formType = 'email'"
                   :class="{'active':state.formType === 'email'}">
          {{ $t('login.email') }}
        </el-button>
      </div>

      <el-form v-model="form" class="space-y-6">
        <el-form-item v-if="state.formType === 'email'">
          <el-input size="large" v-model="form.email" type="text" :placeholder="$t('login.email')"></el-input>
        </el-form-item>

        <el-form-item v-if="state.formType === 'phone'">
          <el-input v-model="form.phone" type="text" :placeholder="$t('login.phone')"></el-input>
        </el-form-item>

        <el-form-item v-if="state.loginType==='password'">
          <el-input v-model="form.password" type="password" :key="state.formType"
                    :placeholder="$t('login.password.name')"></el-input>
        </el-form-item>

        <el-form-item v-if="state.loginType==='code'">
          <div class="flex space-x-2">
            <el-input v-model="form.code" type="text" class="flex-grow"
                      :placeholder="$t('login.verify')"></el-input>
            <el-button type="button" class=" w-[6rem] space-button"> {{ $t('login.sendVerifyCode') }}
            </el-button>
          </div>
        </el-form-item>

        <button class="w-full space-button-primary" @click="onSubmitLogin">
          {{ $t('login.submit') }}
        </button>
      </el-form>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <a href="#" class="text-indigo-400 hover:text-indigo-500"
             @click="()=>state.loginType = 'code'">{{ $t('login.code.login') }}</a>
        </div>
        <div class="leading-6">
          <a href="#" class="text-indigo-400 hover:text-indigo-500">{{ $t('login.password.forget') }}</a>
        </div>
      </div>
      <div>
        <div class="relative mt-10">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-200"/>
          </div>
          <div class="relative flex justify-center text-sm font-medium leading-6">
            <span class="bg-white px-6 text-gray-900">{{ $t('login.third') }}</span>
          </div>
        </div>

        <div class="mt-6">
          <a href="#">
            <img src="../../assets/icons/wechat.svg" class="w-10 h-10 hover:duration-25  hover:scale-110">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {reactive} from "vue";
import {getCurrentDevice, SYSTEM_ID} from "../../utils";

const TIME_COUNT = 60
const form = reactive({
  email: '1024741733@qq.com',
  code: '',
  phone: '13699824828',
  password: 'Jiang5201314*',
})

const state = reactive({
  loginType: 'password',
  formType: 'phone',
  disableVerifyCodeTimeout: TIME_COUNT,
  timer: null,
})


const onSubmitLogin = async () => {
  let type;
  if (state.loginType === 'code' && state.formType === 'email') {
    type = 'emailCode';
  } else if (state.loginType === 'password' && state.formType === 'email') {
    type = 'emailPassword';
  } else if (state.loginType === 'code' && state.formType === 'phone') {
    type = 'phoneCode';
  } else if (state.loginType === 'password' && state.formType === 'phone') {
    type = 'phonePassword';
  }

  let resp = await userlogin({type: type, systemId: SYSTEM_ID, device: getCurrentDevice(), ...form});
};


</script>
<style scoped lang="css">

:deep(.el-input__inner) {
  @apply block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1
  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
  focus:ring-indigo-600;
  line-height: 2rem;
}

</style>
