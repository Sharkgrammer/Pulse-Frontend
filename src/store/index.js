import {createStore} from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
    state() {
        return {
            access: "",
            refresh: "",
            username: "",
            first_name: "",
            last_name: "",
            prof_image: "",
            followers: 0,
            following: 0,
            verified: false,
        }
    },
    mutations: {
        setAccess(state, access) {
            state.access = access
        },
        setRefresh(state, refresh) {
            state.refresh = refresh
        },
        setUsername(state, username) {
            state.username = username
        },
        setFirstName(state, first_name) {
            state.first_name = first_name
        },
        setLastName(state, last_name) {
            state.last_name = last_name
        },
        setProfImage(state, prof_image) {
            state.prof_image = prof_image
        },
        setFollowers(state, followers) {
            state.followers = followers
        },
        setFollowing(state, following) {
            state.following = following
        },
        setVerified(state, verified) {
            state.verified = verified
        },
    },
    getters: {
        access: state => state.access,
        refresh: state => state.refresh,
        username: state => state.username,
        first_name: state => state.first_name,
        last_name: state => state.last_name,
        prof_image: state => state.prof_image,
        followers: state => state.followers,
        following: state => state.following,
        verified: state => state.verified,
    },
    plugins: [createPersistedState()]
});
