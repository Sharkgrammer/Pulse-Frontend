import router from "../../router/router";


// Taken from mozilla docs
export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export function params(params) {

    let result = "?";
    let count = 0;
    let len = Object.keys(params).length

    for (let key in params) {
        let val = params[key];

        result += key + "=" + val;

        if (count < len - 1) {
            result += "&";
        }

        count += 1;
    }

    return result;
}

export function setAccessKey(context, access) {
    context.$store.commit("setAccess", access)
}

export function getAccessKey(context) {
    return context.$store.getters.access
}

export function setRefreshKey(context, refresh) {
    context.$store.commit("setRefresh", refresh)
}

export function getRefreshKey(context) {
    return context.$store.getters.refresh
}

export function setUsername(context, name) {
    context.$store.commit("setUsername", name)
}

export function getUsername(context) {
    return context.$store.getters.fname
}

export function setUserID(context, userid) {
    context.$store.commit("setUserid", userid)
}

export function getUserID(context) {
    return context.$store.getters.userid
}

export async function redirectToLogin() {
    await router.push({name: 'Login'})
}

export async function logout(context) {
    setAccessKey(context, "");
    setRefreshKey(context, "");
    setUserID(context, "");
    setUsername(context, "");

    await redirectToLogin();
}