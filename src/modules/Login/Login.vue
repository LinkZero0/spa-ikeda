<template>
	<v-app>
		<div class="abc" fluid>
			<v-row no-gutters>
				<v-col cols="7" class="main-part d-none d-md-none d-lg-flex">
					<v-img src="@/assets/images/background_login.png"></v-img>
				</v-col>
				<v-col cols="12" lg="5" class="login-part d-flex align-center">
					<v-row no-gutters class="align-start">
						<v-col cols="12" class="login-part d-flex align-center flex-column">
							<div class="login-wrapper">
								<div class="d-flex align-center">
									<v-img
										width="150"
										height="150"
										src="@/assets/images/white_logo.png"
										contain
									></v-img>
								</div>

								<v-tabs class="text--white" grow>
									<v-tabs-slider color="white"></v-tabs-slider>
									<v-tab class="myText" :href="`#tab-login`"> LOGIN </v-tab>
									<v-tab class="myText" :href="`#tab-newUser`"> Novo aluno </v-tab>

									<v-tab-item :value="'tab-login'">
										<v-form>
											<v-container>
												<v-row class="flex-column">
													<v-col cols="12" class="d-flex align-center my-8">
														<v-divider></v-divider>
														<span class="px-5 text white--text">
															#TeamIkeda
														</span>
														<v-divider></v-divider>
													</v-col>
													<v-form>
														<v-col>
															<v-text-field
																label="Email"
																class="custom-label-color"
																v-model="formLogin.email"
																filled
																rounded
																dense
															></v-text-field>
															<v-text-field
																label="Senha"
																class="custom-label-color"
																v-model="formLogin.password"
																filled
																type="password"
																rounded
																dense
															></v-text-field>
														</v-col>
														<v-col class="d-flex justify-space-between">
															<v-btn
																class="text-capitalize"
																large
																outlined
																color="primary"
																@click="login"
															>
																Login</v-btn
															>
															<v-btn large text class="text white--text"
																>Esqueci a senha</v-btn
															>
														</v-col>
													</v-form>
												</v-row>
											</v-container>
										</v-form>
									</v-tab-item>

									<v-tab-item :value="'tab-newUser'">
										<div>
											<v-container>
												<v-row class="flex-column">
													<v-col>
														<p
															class="
																login-slogan
																display-1
																text-center
																font-weight-medium
																mb-10
															"
														>
															Junte se ao time
														</p>
													</v-col>

													<v-form ref="formCreate">
														<v-col>
															<v-text-field
																label="Nome"
																class="custom-label-color"
																v-model="formUser.name"
																:rules="[rules.required]"
																filled
																rounded
																dense
															></v-text-field>
															<v-text-field
																label="Email"
																class="custom-label-color"
																v-model="formUser.email"
																:rules="[rules.required, rules.email]"
																filled
																rounded
																dense
															></v-text-field>
															<v-text-field
																label="Senha"
																v-model="formUser.password"
																:rules="[rules.required, rules.password]"
																class="custom-label-color"
																type="password"
																filled
																rounded
																dense
															></v-text-field>
														</v-col>
														<v-col class="d-flex justify-space-between">
															<v-btn
																large
																block
																outlined
																color="primary"
																@click="createUser()"
															>
																Bora lançar o shape</v-btn
															>
														</v-col>
													</v-form>
												</v-row>
											</v-container>
										</div>
									</v-tab-item>
								</v-tabs>
							</div>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</div>
	</v-app>
</template>

<script>
	import user from "@/services/http/user";
	import auth from "@/services/http/auth";
	export default {
		name: "Login",
		data() {
			return {
				email: "",
				rules: {
					required: (value) => !!value || "Campo obrigatório.",
					email: (v) => /.+@.+/.test(v) || "E-mail não é válido",
					password: (value) => value.length >= 8 || "Min. 8 caracteres",
				},

				formUser: {},
				formLogin: {},
			};
		},
		methods: {
			async createUser() {
				if (!this.$refs.formCreate.validate()) return;
				await user().store(this.formUser, {
					notification: true,
					message: { success: "Pronto! Bem vindo ao #TeamIkeda" },
				});
			},
			async login() {
				let { data } = await auth().store(this.formLogin, {
					notification: true,
					message: {
						success: "Lançando treinos...",
						error: "Credenciais inválidas",
					},
				});
				this.$store.dispatch("auth", data.token);
        this.$store.dispatch("user", data.user)
				this.$router.push("/lessons");
			},
		},
		created() {
			if (window.localStorage.getItem("authenticated") === "true") {
				this.$router.push("/dashboard");
			}
		},
	};
</script>

<style src="./Login.scss" lang="scss" />
<style scoped>
.v-application >>> .primary--text {
  color: #e6e7ea !important;
  caret-color: #e6e7ea !important;
}
.myText{
  color: white !important;
}
</style>