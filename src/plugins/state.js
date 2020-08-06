import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    user: null,
    claims: {},
    cart: {}
}

const getters = {
    user: state => state.user,
    claims: state => state.claims,
    cart: state=> state.cart
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
        },
        updateCart(state, cart) {
            Vue.set(state, 'cart', cart)
        }
    }
})

export default store