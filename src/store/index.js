import {createStore} from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
    state() {
        return {
            access: "",
            refresh: "",
            username: "",
            userid: 0
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
        setUserid(state, userid) {
            state.userid = userid
        }
    },
    getters: {
        access: state => state.access,
        refresh: state => state.refresh,
        username: state => state.username,
        userid: state => state.userid
    },
    plugins: [createPersistedState()]
});
