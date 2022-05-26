import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import Maska from "maska";
import {createPinia} from "pinia";

createApp(App)
    .use(Maska)
    .use(createPinia())
    .mount('#app')
