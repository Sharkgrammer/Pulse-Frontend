import {createRouter, createWebHistory} from "vue-router";
import HomePage from "@/views/HomePage";
import LoginPage from "@/views/LoginPage";
import PostPage from "@/views/PostPage";
import ErrorPage from "@/views/ErrorPage";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
    },
    {
        path: "/login",
        name: "Login",
        component: LoginPage,
    },
    {
        path: "/post",
        name: "Post",
        component: PostPage,
    },
    {
        path: '/:catchAll(.*)*', //catch all to send a 404
        name: 'ErrorPage',
        component: ErrorPage,
    },//*/

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
