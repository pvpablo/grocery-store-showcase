import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    user: null,
    claims: {}
}

const getters = {
    user: state => state.user,
    claims: state => state.claims
}

const store = new Vuex.Store({
    state,
    getters,
    mutations: {
        updateUser (state, { user }){
            Vue.set(state, 'user', user)
        },
        updateClaims (state, claims) {
            Vue.set(state, 'claims', claims)
        }
    }
})

export default store