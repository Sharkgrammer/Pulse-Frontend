import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/router";
import "tailwindcss/tailwind.css";
import "./assets/css/utility.css";
import "./assets/js/utility.js";

let app = createApp(App);

app.use(router)
app.mount('#app')
