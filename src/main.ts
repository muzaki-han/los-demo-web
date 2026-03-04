import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'
import App from './app/App.vue'
import { router } from './app/router'
import { vuetify } from './app/vuetify'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueApexCharts)

app.mount('#app')
