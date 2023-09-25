import {createApp} from 'vue'
import './style.css'
import {router} from '@/route'
import App from './App.vue'
import i18n from './i18n'

const app = createApp(App)
app.use(router)
app.use(i18n)

app.mount('#app')
