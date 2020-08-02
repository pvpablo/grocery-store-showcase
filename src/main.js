import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'
import VueFirestore from 'vue-firestore'

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

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
