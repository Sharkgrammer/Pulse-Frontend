import {createApp} from 'vue'
import App from './App.vue'
import router from "./router/router";
import store from "./store";
import "tailwindcss/tailwind.css";
import "./assets/css/utility.css";
import "./assets/js/utility.js";

let app = createApp(App);

app.config.globalProperties._backend_url = "http://127.0.0.1:8000";
app.config.globalProperties._frontend_url = "http://localhost:8080";

document.addEventListener("hideOverflow", function (e) {
    let data = e.detail, res = '';
    if (data === 0) return

    // Theres a small bit of movement when the overflow changes but its hard to work around
    data === true ? res = 'hidden' : res = 'scroll'

    if (data) {
        document.body.style.marginRight = "1rem";
    } else {
        document.body.style.marginRight = "0rem";
    }

    document.body.style.overflowY = res;
});

document.addEventListener("darkmode", function (e) {
    let data = e.detail;
    if (data === 0) return

    data ? document.body.classList.add("dark") : document.body.classList.remove("dark")
});

app.use(store)
app.use(router)
app.mount('#app')
