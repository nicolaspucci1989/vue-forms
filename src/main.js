import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import Maska from "maska";

createApp(App)
    .use(Maska)
    .mount('#app')
