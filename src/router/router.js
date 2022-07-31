import {createRouter, createWebHistory} from "vue-router";
import HomePage from "@/views/HomePage";
//import ErrorPage from "@/views/ErrorPage";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
    },
   /* {
        path: '/:catchAll(.*)*', //catch all to send a 404
        name: 'ErrorPage',
        component: ErrorPage,
    },*/

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
