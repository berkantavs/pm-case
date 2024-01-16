// store/index.js
export const state = () => ({
    loggedIn: false,
    user: null,
});

export const mutations = {
    setLoggedIn(state, value) {
        state.loggedIn = value;
    },
    setUser(state, user) {
        state.user = user;
    },
};

export const actions = {
    async nuxtServerInit({ commit }) {
        let userCookie = this.$cookies.get('user-info');
        if (userCookie && userCookie !== null) {
            try {
                let user = (userCookie);
                commit("setUser", user);
                commit("setLoggedIn", true);
            } catch (error) {
                console.error("Cookie değeri JSON olarak ayrıştırılamadı:", error);
            }
        }
    },
    login({ commit }, userData) {
        commit('setLoggedIn', true);
        commit('setUser', userData);
    },
    logout({ commit }) {
        commit('setLoggedIn', false);
        commit('setUser', null);
    },
};

export const getters = {
    loggedIn: (state) => {
        return state.loggedIn;
    },
    isAdmin: (state) => {
        return state?.user?.user_type == 'admin';
    },
    isEmployee: (state) => {
        return state?.user?.user_type == 'employee';
    },
    isUser: (state) => {
        return state?.user?.user_type == 'user';
    },
    user: (state) => {
        return state.user;
    },
    // Diğer getters...
};