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

    if (params === "{}") {
        return "";
    }

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
    return context.$store.getters.username
}

export function setFirstName(context, name) {
    context.$store.commit("setFirstName", name)
}

export function getFirstName(context) {
    return context.$store.getters.first_name
}

export function setLastName(context, name) {
    context.$store.commit("setLastName", name)
}

export function getLastName(context) {
    return context.$store.getters.last_name
}

export function setProfImage(context, image) {
    context.$store.commit("setProfImage", image)
}

export function getProfImage(context) {
    return context.$store.getters.prof_image
}

export function setFollowers(context, followers) {
    context.$store.commit("setFollowers", followers)
}

export function getFollowers(context) {
    return context.$store.getters.followers
}

export function setFollowing(context, following) {
    context.$store.commit("setFollowing", following)
}

export function getFollowing(context) {
    return context.$store.getters.following
}

export async function redirectToLogin() {
    await router.push({name: 'Login'})
}

export function loggedIn(context) {
    return getAccessKey(this)
}

export async function logout(context) {
    setAccessKey(context, "");
    localStorage.clear()

    await redirectToLogin();
}

export function updateUser(context, data) {
    this.setFirstName(context, data.first_name);
    this.setLastName(context, data.last_name);
    this.setUsername(context, data.username);
    this.setFollowing(context, data.following);
    this.setFollowers(context, data.followers);
    this.setProfImage(context, data.prof_image);
}

export function spliceSearch(text, search) {

    if (!text.toLowerCase().includes(search.toLowerCase())) {
        return [text, "", ""]
    }

    let searchStart = text.toLowerCase().indexOf(search.toLowerCase())
    let searchText = text.substring(searchStart, searchStart + search.length)


    let array = text.split(searchText)
    let len = array.length

    if (len === 2) {
        return [array[0], searchText, array[1]]
    } else {
        let res = ""

        for (let x = 1; x < len; x++) {
            if (x > 1) res += searchText
            res += array[x]
        }

        return [array[0], searchText, res]
    }
}