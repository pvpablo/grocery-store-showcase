<template>
  <v-app>
      <v-app-bar
        color="primary"
        dark
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>Grocery Store Showcase</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="mr-3">
          <v-badge
            color="accent"
            content="0"
            overlap
            offset-y="20"
          >
            <v-btn color="secondary" dark icon>
              <v-icon dark right>mdi-cart</v-icon>
            </v-btn>
          </v-badge>
          <v-btn color="secondary" dark rounded class="ml-5 primary--text">Login
             <v-icon right color="primary">mdi-account</v-icon>
          </v-btn>
        </div>
        
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
            active-class="primary--text"
          >
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
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
      drawer: false,
  }),
};
</script>

<style lang="sass">

</style>
