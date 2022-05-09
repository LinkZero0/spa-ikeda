<template>
	<v-row justify="center">
		<v-dialog :value="dialog" persistent max-width="600px">
			<v-card>
				<v-card-title class="text-h5 grey--text"> Videos </v-card-title>
				<v-card-text>
					<v-container>
						<v-data-table :headers="headers" :items="itemsVideo">
							<template v-slot:[`item.actions`]="{ item }">
								
								<v-btn icon @click="deleteVideo(item)"
									><v-icon color="error">mdi-trash-can</v-icon></v-btn
								>
							</template>
						</v-data-table>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>

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
		
			selectedVideos: {
				type: Array,
				default: () => [],
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
				itemsVideo: [],
				headers: [
					{ text: "Titulo", value: "title" },
					{ text: "Semana", value: "n_week" },
					{ text: "Link", value: "link" },
					{ text: "Ações", value: "actions" },
				],
				menuStarted: false,
				menuFinished: false,
				weekItems: [],
			};
		},
		methods: {
			async closeModal() {
				this.$emit("dialog");
			},

			fetchVideos() {},
			async deleteVideo(selectedVideo) {
				if (!(await this.dialogVideoDelete(selectedVideo))) return;
				await video(selectedVideo.id).delete(
					{},
					{
						notification: true,
						message: { success: "Mentoria apagada com sucesso!" },
					}
				);
				await this.fetchVideos();
			},
			async dialogVideoDelete(selectedVideo) {
				return await this.$swal
					.fire({
						title: "Remover o vídeo?",
						text: `Isso remove o vídeo ${selectedVideo.name}`,
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
		},

		mounted() {},

		watch: {
			selectedVideos(item) {
				this.itemsVideo = item;
				console.log(item);
			},
		},
	};
</script>

<style></style>
