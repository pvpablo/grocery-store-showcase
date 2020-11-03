<template>
  <v-app>
    <v-app-bar color="primary" max-height="60">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Grocery Store Showcase</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="mr-3">
        <v-badge color="accent" :content="itemsInCart" overlap offset-y="20">
          <v-btn color="secondary" dark icon @click="$router.push('/checkout')">
            <v-icon dark>mdi-cart</v-icon>
          </v-btn>
        </v-badge>
        <v-btn
          v-if="!isAuthUser"
          @click="login"
          color="secondary"
          dark
          rounded
          class="ml-5 primary--text"
        >
          <v-icon right color="primary" class="pr-3">mdi-account</v-icon>
          Login
        </v-btn>
        <v-menu v-if="isAuthUser" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="secondary"
              dark
              v-bind="attrs"
              v-on="on"
              class="ml-5 primary--text"
            >
              <v-icon right color="primary" class="pr-3">mdi-account</v-icon>
              {{ shortDisplayName }}
              <v-icon right color="primary" class="pr-3">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <div class="sidebar-header pa-5">
        <h1>Grocery Store</h1>
      </div>
      <v-list nav dense>
        <v-list-item-group active-class="secondary--text">
          <v-list-item @click="$router.push('/')">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push('/products')">
            <v-list-item-icon>
              <v-icon>mdi-basket</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Browse Products</v-list-item-title>
          </v-list-item>
          <v-divider color="#dedede" class="mb-5 mt-5"></v-divider>
          <span class="subtitle--text custom-sub">HELP & SETTINGS</span>
          <v-list-item class="mt-2">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Your Account</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-lifebuoy</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item>
          <v-divider color="#dedede" class="mb-5 mt-5"></v-divider>
          <span class="subtitle--text custom-sub">FULFILLMENT</span>
          <v-list-item @click="$router.push('/fulfillment/orders')">
            <v-list-item-icon>
              <v-icon>mdi-receipt</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Orders</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push('/fulfillment/deliveries')">
            <v-list-item-icon>
              <v-icon>mdi-send</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Deliveries</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase"
import { firestore } from "@/main"
export default {
  name: "App",
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result)
          this.isAuthUser = true;
          this.displayName = result.user.displayName;
        })
        .catch((err) => new Error(err));
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.isAuthUser = false;
          this.displayName = "";
        })
        .catch((err) => new Error(err));
    },
  },
  computed: {
    shortDisplayName() {
      return this.displayName.substr(0, this.displayName.indexOf(" "));
    }
  },
  created : function() {
    firestore
        .collection("cart")
        .doc(this.uid)
        .onSnapshot( (querySnapshot) => {
          if(querySnapshot.data()) {
            this.itemsInCart = Object.keys(querySnapshot.data().products).length || "0";
          }else{
            this.itemsInCart = "0";
          }

        })
  },
  data: () => ({
    drawer: false,
    isAuthUser: firebase.auth().currentUser,
    displayName: firebase.auth().currentUser
      ? firebase.auth().currentUser.displayName
      : "",
    uid: firebase.auth().currentUser.uid,
    cart: [],
    itemsInCart: 0,
  }),
};
</script>

<style lang="sass">
.custom-sub
  font-size: 1rem
  font-weight: 800
  line-height: 1rem

.sidebar-header
  background-color: #1565C0
  color: white
</style>
