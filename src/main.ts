// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'toastr/build/toastr.min.css'
import toastr from 'toastr'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.globalProperties.$ = $

window.toastr = toastr

library.add(fas)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
