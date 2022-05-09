<template>
  <v-app class="pa-6">
    <Header />
    <Sidebar />
    <v-main class="content">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import "./Layout.scss";

export default {
  name: "Layout",
  components: { Header, Sidebar },
};
</script>

<style src="./Layout.scss" lang="scss" />
