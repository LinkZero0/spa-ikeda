<template>
  <v-app-bar class="main-header" height="64" fixed color="primary" dark>
    <v-btn icon class="mx-1" @click.stop="TOGGLE_DRAWER">
      <template v-if="DRAWER_STATE">
        <v-icon style="font-size: 28px">mdi-arrow-left</v-icon>
      </template>
      <template v-else>
        <v-icon style="font-size: 28px">mdi-menu</v-icon>
      </template>
    </v-btn>
    <v-toolbar-title>Ikeda Personal</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-menu offset-y bottom nudge-bottom="10" left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="
            notificationsBadge ? (notificationsBadge = !notificationsBadge) : ''
          "
          v-bind="attrs"
          v-on="on"
          style="font-size: 28px"
          icon
          class="mr-2"
        >
          <!-- <v-badge
            :value="notificationsBadge"
            color="error"
            content="1"
            overlap
          >
            <v-icon style="font-size: 28px" color="rgba(255, 255, 255, 0.35)"
              >mdi-bell-outline</v-icon
            >
          </v-badge> -->
        </v-btn>
      </template>
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in notifications" :key="i">
            <v-list-item-icon class="mr-4 mb-1">
              <v-icon :color="item.color" v-text="item.icon"> </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>

    <v-menu min-width="180" offset-y bottom left nudge-bottom="10">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-0" icon v-bind="attrs" v-on="on">
          <v-icon style="font-size: 28px" :color="config.light.iconColor"
            >mdi-account</v-icon
          >
        </v-btn>
      </template>
      <v-list>
        <div class="text-h5 grey--text text--darken-3 px-4 pt-4">
          {{ profile.nome }}
        </div>
        <div class="subtitle-2 primary--text font-weight-regular px-4">
          {{ profile.email }}
        </div>
        <div class="d-flex justify-center my-3">
          <v-btn
            width="80%"
            large
            outlined
            color="primary"
            class="text-capitalize"
            @click="logOut"
            >Sair
          </v-btn>
        </div>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from "vuex";
import config from "../../config";
//import auth from "@/services/http/auth";

export default {
  name: "Header",
  data: () => ({
    profile: {},
    config,
    notifications: [],
    messages: [],
    notificationsBadge: true,
    messageBadge: true,
  }),
  computed: {
    ...mapState(["drawer"]),
    DRAWER_STATE: {
      get() {
        return this.drawer;
      },
    },
  },
  methods: {
    ...mapActions(["TOGGLE_DRAWER"]),
    logOut() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
  async mounted() {
    // let { data } = await auth().me().show();
    // this.profile = data;
  },
};
</script>

<style src="./Header.scss" lang="scss"></style>
