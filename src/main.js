import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './plugins/state';
import firebase from 'firebase'
import VueFirestore from 'vue-firestore'
import router from './router'

let app

Vue.config.productionTip = false

Vue.use(VueFirestore, {
  key: 'id',
})

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
export const firestore = firebaseApp.firestore()

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    firebase.auth().currentUser.getIdTokenResult().then((idTokenResult) => {
      if (idTokenResult.claims) {
        store.commit('updateClaims', idTokenResult.claims)
      }
    })
  } else {
    store.commit('updateClaims', {})
  }

  store.commit('updateUser', { user })

  if (!app) {
    app = new Vue({
      store,
      vuetify,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
