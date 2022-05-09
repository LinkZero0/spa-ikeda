<template>
	<v-container fluid>
		<div class="tables-basic">
			<h1 class="page-title mt-5 mb-6">Mentoria Online</h1>
			<v-row>
				<v-col cols="12">
					<v-card class="mb-1">
						<v-simple-table>
							<template v-slot:top>
								<div class="d-flex" style="height: 4vh" flat>
									<div :class="1 === 1 && 'mr-auto'" class="pa-2 header" tile>
										<p class="title ml-2">Mentorias</p>
									</div>
									<!-- <div icon :class="2 === 1 && 'mr-auto'" class="" tile>
										<v-menu
											v-model="filterMenu"
											:close-on-content-click="false"
											:nudge-width="200"
											offset-x
										>
											<template v-slot:activator="{ on }">
												<v-btn
													v-on="on"
													plain
													@click="filterMenu = true"
													class="mt-3"
												>
													<v-icon class="mr-2" small>mdi-tune-variant</v-icon>
													Filtro
												</v-btn>
											</template>

											<v-card>
												<v-container class="filter-text">
													<v-text-field
														v-model="codTrib"
														clearable
														label="Cód. Tributação Municipal"
													></v-text-field>
													<v-text-field
														v-model="cityHall"
														clearable
														label="Prefeitura"
													></v-text-field>
													<v-text-field
														v-model="codCont"
														clearable
														label="Cód. Contabilização Padrão"
													></v-text-field>
												</v-container>

												<v-card-actions>
													<v-spacer></v-spacer>
													<v-btn color="primary" text @click="cleanFilter">
														Limpar
													</v-btn>
												</v-card-actions>
											</v-card>
										</v-menu>
									</div> -->
									<div :class="3 === 1 && 'mr-auto'" class="pa-3 header" tile>
										<v-btn plain @click="openForm()">
											<v-icon class="mr-1">mdi-plus</v-icon>
											Novo
										</v-btn>
									</div>
								</div>
								<v-text-field
									v-model="search"
									class="ml-3"
									prepend-icon="mdi-magnify"
								></v-text-field>
							</template>

							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left pa-6">NOME</th>
										<th class="text-left">DATA DE INICIO</th>
										<th class="text-left">DATA DE TÉRMINO</th>
										<th class="text-left">AÇÕES</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="item in dataTable" :key="item.name">
										<td class="pa-6">{{ item.name }}</td>

										<td>
											{{ item.started }}
										</td>
										<td>
											{{ item.finished }}
										</td>
									
										<td>
											<v-btn @click="addVideo(item)" icon
												><v-icon> mdi-video-plus-outline </v-icon></v-btn
											>
											<v-btn @click="showVideo(item)" icon
												><v-icon> mdi-video-outline </v-icon></v-btn
											>
											<v-btn @click="editUser(item)" icon
												><v-icon> mdi-pencil </v-icon></v-btn
											>
											<v-btn @click="deleteMentorship(item)" icon
												><v-icon> mdi-trash-can </v-icon></v-btn
											>
											
										</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
					</v-card>
				</v-col>
			</v-row>
		</div>
		<FormUser
			:dialog="dialog"
			:selectedMentorship="selectedMentorship"
			:labelBtn="labelBtn"
			@dialog="closeForm"
		/>
      <VideoForm
			:dialog="dialogVideo"
			:selectedMentorship="selectedMentorship"
			:labelBtn="labelBtn"
			@dialog="closeVideoForm"
		/>
      <VideoShow
			:dialog="dialogShowVideo"
         :selectedVideos="videosItems"
			:selectedMentorship="selectedMentorship"
			:labelBtn="labelBtn"
			@dialog="closeShowVideo"
		/>
		
	</v-container>
</template>

<script>
	import FormUser from "./Form.vue";
	import VideoForm from "./VideoForm.vue"
   import VideoShow from "./VideoShow.vue"
	import mentorship from "@/services/http/mentorship";

	export default {
		name: "Mentorships",
		components: { FormUser, VideoForm, VideoShow },
		data() {
			return {
				dataTable: [],
				dialog: false,
				dialogVideo: false,
				dialogShowVideo: false,
            videosItems : [],
				search: "",
				labelBtn: "",
				selectedMentorship: {},
				rules: {
					required: (value) => !!value || "Campo obrigatório.",
				},
			};
		},
		computed: {},
		methods: {
			openForm() {
				this.labelBtn = "Adicionar";
				this.dialog = true;
			},
			addVideo(selectedMentorship) {
				this.labelBtn = "Adicionar";
				this.dialogVideo = true;
				this.selectedMentorship = selectedMentorship;
			},
			showVideo(selectedMentorship) {
				this.labelBtn = "Adicionar";
				this.dialogShowVideo = true;
            this.videosItems = selectedMentorship.video;
				this.selectedMentorship = selectedMentorship;
			},
			editUser(selectedMentorship) {
				this.labelBtn = "Atualizar";
				this.dialog = true;
				this.selectedMentorship = selectedMentorship;
			},
			async closeForm() {
				await this.fetchMentorships();
				this.dialog = false;
			},
			async closeVideoForm() {
				await this.fetchMentorships();
				this.dialogVideo = false;
			},
         async closeShowVideo() {
				await this.fetchMentorships();
				this.dialogShowVideo = false;
			},

			async fetchMentorships() {
				let { data } = await mentorship().show();
				this.dataTable = data;
			},

			async updateStatus(selectedMentorship) {
				if (!(await this.showUpdateDialog(selectedMentorship))) return;
				await mentorship(selectedMentorship.id).update({
					is_active: !selectedMentorship.is_active,
				});
				await this.fetchMentorships();
			},

			async deleteMentorship(selectedMentorship) {
				if (!(await this.dialogMentorshipDelete(selectedMentorship))) return;
				await mentorship(selectedMentorship.id).delete(
					{},
					{
						notification: true,
						message: { success: "Mentoria apagada com sucesso!" },
					}
				);
				await this.fetchMentorships();
			},

			async showUpdateDialog(selectedMentorship) {
				return await this.$swal
					.fire({
						title: "Alterar status?",
						text: `Isso altera o status de  ${selectedMentorship.name}`,
						icon: "question",
						showCancelButton: true,
						cancelButtonText: "Cancelar",
						confirmButtonText: "Sim, alterar",
						cancelButtonColor: "#f54242",
						allowOutsideClick: false,
					})
					.then((result) => {
						if (result.value) return true;
						return false;
					});
			},

			async dialogMentorshipDelete(selectedMentorship) {
				return await this.$swal
					.fire({
						title: "Remover a mentoria?",
						text: `Isso remove a mentoria ${selectedMentorship.name}`,
						icon: "question",
						showCancelButton: true,
						cancelButtonText: "Cancelar",
						confirmButtonText: "Sim, apagar",
						cancelButtonColor: "#f54242",
						allowOutsideClick: false,
					})
					.then((result) => {
						if (result.value) return true;
						return false;
					});
			},

			// async stopUser(selectedMentorship) {
			//   await User(selectedMentorship.id)
			//     .stop()
			//     .show(
			//       {},
			//       {
			//         notification: true,
			//         message: { success: "Robô iniciado!" },
			//       }
			//     );
			// },
		},
		mounted() {
			this.fetchMentorships();
		},
	};
</script>

<style src="../scss/Table.scss" lang="scss"></style>
