<template>
	<v-row justify="center">
		<v-dialog :value="dialog" persistent max-width="600px">
			<v-card>
				<v-card-title class="text-h5 grey--text">
					{{ labelBtn }} mentoria
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-form ref="form">
							<v-row>
								<v-col cols="12">
									<v-text-field
										v-model="formMentorship.name"
										prepend-icon="mdi-account-outline"
										label="Nome"
										:rules="[rules.required]"
										required
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-menu
										ref="menuStarted"
										v-model="menuStarted"
										:close-on-content-click="false"
										:return-value.sync="formMentorship.started"
										transition="scale-transition"
										offset-y
										min-width="auto"
									>
										<template v-slot:activator="{ on, attrs }">
											<v-text-field
												v-model="formMentorship.started"
												label="Data de Inicio"
												prepend-icon="mdi-calendar"
												readonly
												v-bind="attrs"
												v-on="on"
											></v-text-field>
										</template>
										<v-date-picker
											v-model="formMentorship.started"
											no-title
											scrollable
										>
											<v-spacer></v-spacer>
											<v-btn text color="primary" @click="menuStarted = false">
												Cancel
											</v-btn>
											<v-btn
												text
												color="primary"
												@click="$refs.menuStarted.save(formMentorship.started)"
											>
												OK
											</v-btn>
										</v-date-picker>
									</v-menu>
								</v-col>
								<v-col cols="12">
									<v-menu
										ref="menuFinished"
										v-model="menuFinished"
										:close-on-content-click="false"
										:return-value.sync="formMentorship.finished"
										transition="scale-transition"
										offset-y
										min-width="auto"
									>
										<template v-slot:activator="{ on, attrs }">
											<v-text-field
												v-model="formMentorship.finished"
												label="Data de término"
												prepend-icon="mdi-calendar"
												readonly
												v-bind="attrs"
												v-on="on"
											></v-text-field>
										</template>
										<v-date-picker
											v-model="formMentorship.finished"
											no-title
											scrollable
										>
											<v-spacer></v-spacer>
											<v-btn text color="primary" @click="menuFinished = false">
												Cancel
											</v-btn>
											<v-btn
												text
												color="primary"
												@click="
													$refs.menuFinished.save(formMentorship.finished)
												"
											>
												OK
											</v-btn>
										</v-date-picker>
									</v-menu>
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
						@click="
							labelBtn == 'Adicionar' ? saveMentorship() : updateMentorship()
						"
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
	import mentorship from "@/services/http/mentorship";
	export default {
		name: "formMentorship",
		props: {
			selectedMentorship: {
				default: {},
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
					required: (value) => !!value || "Campo obrigatório.",
				},
				formMentorship: {},
				menuStarted: false,
				menuFinished: false,
				levelsItems: [
					{ description: "Iniciante", value: 8 },
					{ description: "Intermediário", value: 9 },
					{ description: "Avançado", value: 10 },
				],
			};
		},
		methods: {
			async closeModal() {
				this.$emit("dialog");
				this.$refs.form.reset();
			},

			convertDataType() {
				this.formMentorship.started = new Date(
					this.formMentorship.started
				).toISOString();
				this.formMentorship.finished = new Date(
					this.formMentorship.finished
				).toISOString();
			},

			async saveMentorship() {
				if (!this.$refs.form.validate()) return;
				this.convertDataType();
				await mentorship().store(this.formMentorship, {
					notification: true,
					message: { success: "Usuário cadastrado com sucesso!" },
				});
				this.closeModal();
			},

			async updateMentorship() {
				if (!this.$refs.form.validate()) return;
				this.convertDataType();
				await mentorship(this.selectedMentorship.id).update(
					this.formMentorship,
					{
						notification: true,
						message: { success: "Mentoria atualizado com sucesso!" },
					}
				);
				this.closeModal();
			},
		},

		watch: {
			selectedMentorship(item) {
				this.formMentorship = item;
			},
		},
	};
</script>

<style></style>
