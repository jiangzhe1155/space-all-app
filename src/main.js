import {createApp} from 'vue'
import './style.css'
import {router} from './route/index'
import App from './App.vue'
import i18n from './i18n'
import ElementPlus from 'element-plus'

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(ElementPlus)

app.mount('#app')
