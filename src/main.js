import {createApp} from 'vue'
import App from './App.vue'
import router from "./router/router";
import store from "./store";
import "tailwindcss/tailwind.css";
import "./assets/css/utility.css";
import "./assets/js/utility.js";

let app = createApp(App);

app.config.globalProperties._backend_url = "http://127.0.0.1:8000";

app.use(store)
app.use(router)
app.mount('#app')
