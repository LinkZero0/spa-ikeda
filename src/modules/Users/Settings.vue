<template>
  <v-dialog :value="dialog" persistent max-width="600">
    <v-card>
      <v-card-title class="text--secondary"
        >Configurações do Robô: {{ robot.name }}</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="white--text" color="error" @click="closeModal">
          FECHAR
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "settingsRobot",
  props: {
    robot: {
      type: Object,
    },
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("closeSettings");
    },
  },
};
</script>

<style></style>
