<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Grocery Store Showcase</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="mr-3">
        <v-badge color="accent" content="0" overlap offset-y="20">
          <v-btn color="secondary" dark icon>
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
      <v-list nav dense>
        <v-list-item-group active-class="primary--text">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
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
  import firebase from "firebase";
  export default {
    name: "App",
    methods: {
      login() {
        const provider = new firebase.auth.GoogleAuthProvider()
        provider.setCustomParameters({
          prompt: "select_account",
        });
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
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
      shortDisplayName () {
        return this.displayName.substr(0, this.displayName.indexOf(' '))
      }
    },
    data: () => ({
      drawer: false,
      isAuthUser: firebase.auth().currentUser,
      displayName: firebase.auth().currentUser
        ? firebase.auth().currentUser.displayName
        : "",
    }),
  };
</script>

<style lang="sass"></style>
