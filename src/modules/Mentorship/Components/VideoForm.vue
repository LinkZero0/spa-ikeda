<template>
	<v-row justify="center">
		<v-dialog :value="dialog" persistent max-width="600px">
			<v-card>
				<v-card-title class="text-h5 grey--text">
					{{ labelBtn }} video
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-form ref="form">
							<v-row>
								<v-col cols="12">
									<v-text-field
										v-model="formVideo.title"
										prepend-icon="mdi-account-outline"
										label="Título"
										:rules="[rules.required]"
										required
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-autocomplete
										v-model="formVideo.n_week"
										prepend-icon="mdi-calendar-multiple"
										:items="weekItems"
										item-text="description"
										item-value="value"
										label="Semana"
										:rules="[rules.required]"
										
									></v-autocomplete>
								</v-col>
								<v-col cols="12">
									<v-text-field
										v-model="formVideo.link"
										prepend-icon="mdi-link-variant-plus"
										label="Link"
										:rules="[rules.required]"
										required
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
										v-model="formVideo.description"
										prepend-icon="mdi-card-text-outline"
										label="Descrição"
										:rules="[rules.required]"
										required
									></v-text-field>
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
							labelBtn == 'Adicionar' ? saveVideo() : updateMentorship()
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
	import video from "@/services/http/video";
	export default {
		name: "formVideo",
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
				formVideo: {},
				menuStarted: false,
				menuFinished: false,
				weekItems: [],
			};
		},
		methods: {
			async closeModal() {
				this.$emit("dialog");
				this.$refs.form.reset();
				this.$refs.form.resetValidation()
				
			},

			convertDataType() {
				this.formVideo.started = new Date(
					this.formVideo.started
				).toISOString();
				this.formVideo.finished = new Date(
					this.formVideo.finished
				).toISOString();
			},

			generateWeeks(){
				let tmpWeek = [];
				for(let x = 1; x<=12; x++){
					tmpWeek.push({description: `Semana ${x}`, value: x})
				}
				this.weekItems = tmpWeek;
			
			},

			async saveVideo() {
				if (!this.$refs.form.validate()) return;
				this.convertDataType();
				this.formVideo["mentorship_id"] = this.selectedMentorship.id;
				await video().store(this.formVideo, {
					notification: true,
					message: { success: "Video cadastrado com sucesso!" },
				});
				
				this.closeModal();
			},

			async updateMentorship() {
				if (!this.$refs.form.validate()) return;
				this.convertDataType();
				await video(this.selectedMentorship.id).update(
					this.formVideo,
					{
						notification: true,
						message: { success: "Videos atualizado com sucesso!" },
					}
				);
				this.closeModal();
			},
		},

		mounted(){
			this.generateWeeks();
		},

		watch: {
			selectedMentorship(item) {
				this.formVideo = item;
			},
		},
	};
</script>

<style></style>
