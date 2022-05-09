<template>
  <v-row justify="center">
    <v-dialog :value="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="text-h5 grey--text">
          {{ labelBtn }} aluno
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="formUsers.name"
                    prepend-icon="mdi-account-outline"
                    label="Nome"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="formUsers.name"
                    prepend-icon="mdi-phone-outline"
                    label="Celular"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    v-model="formUsers.level_id"
                    prepend-icon="mdi-dumbbell"
                    :items="levelsItems"
                    item-text="description"
                    item-value="value"
                    label="Nível"
                    :rules="[rules.required]"
                    required
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text mr-5"
            color="primary"
            @click="labelBtn == 'Adicionar' ? saveUser() : updateUser()"
          >
            {{ labelBtn }}
          </v-btn>
          <v-btn class="white--text" color="error" @click="closeModal()">
            FECHAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import user from "@/services/http/user";
export default {
  name: "formUsers",
  props: {
    selectedUser:{
      default: {}
    },
    labelBtn: {
      type: String,
    },
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rules: {
        required: (value) => !!value || "Campo obrigatório."
      },
      formUsers: {},
      levelsItems:[
        {description: "Iniciante", value: 1 },
        {description: "Intermediário", value: 2 },
        {description: "Avançado", value: 3 }
      ]
    };
  },
  methods: {
    async closeModal() {
      this.$emit("dialog");
      this.$refs.form.reset();
    },

    async saveUser() {
      if (!this.$refs.form.validate()) return;
      await user().store(this.formUsers, {
        notification: true,
        message: { success: "Usuário cadastrado com sucesso!" },
      });
      this.closeModal();
    },

    async updateUser() {
      if (!this.$refs.form.validate()) return;
      await user(this.selectedUser.id).update(this.formUsers, {
        notification: true,
        message: { success: "Aluno atualizado com sucesso!" },
      });
      this.closeModal();
    },
  },

  watch:{
    selectedUser(item){
      this.formUsers = item;
    }
  }
};
</script>

<style></style>
