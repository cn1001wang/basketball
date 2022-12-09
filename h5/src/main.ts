import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import './assets/style/index.scss'
import 'vant/es/toast/style';

const app = createApp(App)

app.use(router)

app.use(createPinia())

app.mount('#app')
