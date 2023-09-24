<template>
	<div :style="windowSize" class="bg-white">
		<div class="z-10 relative left-1/2 top-1/2	transform -translate-y-1/2 -translate-x-1/2 max-w-[30rem] max-h-[50rem]">
			<div class="bg-white px-6 py-12 shadow-xl rounded-lg px-12">
				<div class="mb-6 text-center text-2xl font-medium leading-9 tracking-tight text-gray-900">{{ $t('login.title') }}</div>
				<div class="flex flex-row ">
					<button class="relative w-1/2 justify-center px-3 py-1.5 text-sm leading-6 hover:text-indigo-500 select_tab"
									@click="()=>state.formType = 'phone'"
									:class="{'active':state.formType === 'phone'}">
						{{ $t('login.phone') }}
					</button>
					<button class="relative w-1/2 justify-center px-3 py-1.5 text-sm leading-6 hover:text-indigo-500 select_tab"
									@click="()=>state.formType = 'email'"
									:class="{'active':state.formType === 'email'}">
						{{ $t('login.email') }}
					</button>
				</div>

				<form class="space-y-4" action="#" method="POST">
					<div>
						<div class="mt-2">
							<input id="email" name="email" autocomplete="email"
										 :placeholder="$t('login.email')"
										 required=""
										 class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
										 ring-inset ring-gray-300 placeholder:text-gray-400
										 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
						</div>
					</div>
					<div>
						<div class="mt-2">
							<input id="password"
										 :placeholder="$t('login.password.name')"
										 name="password" type="password" autocomplete="current-password" required=""
										 class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
										  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
										  focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
						</div>
					</div>

					<div class="flex items-center justify-between">
						<div class="flex items-center">
							<a href="#" class="text-indigo-400 hover:text-indigo-500">{{ $t('login.code.login') }}</a>
						</div>
						<div class="leading-6">
							<a href="#" class="text-indigo-400 hover:text-indigo-500">{{ $t('login.password.forget') }}</a>
						</div>
					</div>

					<div>
						<button type="submit"
										class="flex w-full justify-center
										 rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white
										 shadow-sm hover:bg-indigo-500 focus-visible:outline
										 focus-visible:outline-2 focus-visible:outline-offset-2
										 focus-visible:outline-indigo-600">
							{{ $t('login.submit') }}
						</button>
					</div>

				</form>

				<div>
					<div class="relative mt-10">
						<div class="absolute inset-0 flex items-center" aria-hidden="true">
							<div class="w-full border-t border-gray-200"/>
						</div>
						<div class="relative flex justify-center text-sm font-medium leading-6">
							<span class="bg-white px-6 text-gray-900">{{ $t('login.third') }}</span>
						</div>
					</div>

					<div class="mt-6 grid grid-cols-2 gap-4">
						<!--						<a href="#"-->
						<!--							 class="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]">-->
						<!--							<svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">-->
						<!--								<path-->
						<!--									d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>-->
						<!--							</svg>-->
						<!--							<span class="text-sm font-semibold leading-6">Twitter</span>-->
						<!--						</a>-->
						<a href="#">
							<img src="@/assets/icons/wechat.svg" class="w-10 h-10 hover:duration-25  hover:scale-110">
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="transform-gpu blur-3xl">
			<div class="aspect-[1155/678] absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30  h-[50rem]"
					 style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"/>
		</div>
	</div>
</template>


<script setup>
import {useWindowSize} from '@vueuse/core'
import {computed, reactive} from 'vue'

const {width, height} = useWindowSize()
const TIME_COUNT = 60

const state = reactive({
	loginType: 'password',
	formType: 'phone',
	disableVerifyCodeTimeout: TIME_COUNT,
	timer: null,
})

const windowSize = computed(() => {
	return {height: height.value + 'px', width: width.value + 'px'}
})

</script>


<style scoped lang="css">

.select_tab::before {
	@apply bg-indigo-500;
	content: '';
	position: absolute;
	width: 0;
	height: 0.1rem;
	left: 100%;
	bottom: 0;
	transition: 0.2s all linear
}

.select_tab.active {

}

.active::before {
	left: 0;
	width: 100%;
}

.active ~ ::before {
	width: 0;
	left: 0;
}


</style>
