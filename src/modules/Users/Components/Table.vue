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
										<p class="title ml-2">Alunos</p>
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
										<th class="text-left">NÍVEL</th>
										<th class="text-left">STATUS</th>
										<th class="text-left">AÇÕES</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="item in dataTable" :key="item.name">
										<td class="pa-6">{{ item.name }}</td>

										<td>
											{{ item.level.description }}
										</td>

										<td>
											<v-chip
												v-if="item.is_active"
												link
												color="success"
												class="ma-2 ml-0"
												@click="updateStatus(item)"
											>
												Ativo
											</v-chip>
											<v-chip
												v-else
												link
												color="error"
												class="ma-2 ml-0"
												@click="updateStatus(item)"
											>
												Inativo
											</v-chip>
										</td>
										<td>
											<v-btn @click="editUser(item)" icon
												><v-icon> mdi-pencil </v-icon></v-btn
											>
											<v-btn @click="deleteUser(item)" icon
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
			:selectedUser="selectedUser"
			:labelBtn="labelBtn"
			@dialog="closeForm"
		/>
	</v-container>
</template>

<script>
	import FormUser from "./Form.vue";

	import user from "@/services/http/user";

	export default {
		name: "Users",
		components: { FormUser },
		data() {
			return {
				dataTable: [],
				dialog: false,
				search: "",
				labelBtn: "",
				selectedUser: {},
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
			editUser(selectedUser) {
				this.labelBtn = "Atualizar";
				this.dialog = true;
				this.selectedUser = selectedUser;
			},
			async closeForm() {
				await this.fetchUsers();
				this.dialog = false;
			},

			async fetchUsers() {
				let { data } = await user().show();
				this.dataTable = data;
				console.log(data);
			},

			async updateStatus(selectedUser) {
				if (!(await this.showUpdateDialog(selectedUser))) return;
				await user(selectedUser.id).update({
					is_active: !selectedUser.is_active,
				});
				await this.fetchUsers();
			},

			async deleteUser(selectedUser) {
				if (!(await this.showDeleteDialog(selectedUser))) return;
				await user(selectedUser.id).delete(
					{},
					{
						notification: true,
						message: { success: "Robo apagado com sucesso!" },
					}
				);
				await this.fetchUsers();
			},

			async showUpdateDialog(selectedUser) {
				return await this.$swal
					.fire({
						title: "Alterar status?",
						text: `Isso altera o status de  ${selectedUser.name}`,
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

			async showDeleteScheduleDialog(selectedUser) {
				return await this.$swal
					.fire({
						title: "Remover o agendamento do robô?",
						text: `Isso remove o agendamento do robô ${selectedUser.name}`,
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

			// async stopUser(selectedUser) {
			//   await User(selectedUser.id)
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
			this.fetchUsers();
		},
	};
</script>

<style src="../scss/Table.scss" lang="scss"></style>
