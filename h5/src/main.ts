import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import './assets/style/index.scss'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'
import './lib/iconfont/iconfont.css'

const app = createApp(App)

import TeamLogo from './components/TeamLogo.vue'
app.component("team-logo", TeamLogo)

app.use(router)

app.use(createPinia())

app.mount('#app')
