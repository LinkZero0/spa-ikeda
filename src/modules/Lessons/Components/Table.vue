<template>
	<div>
		<v-sheet class="mx-auto" color="black" elevation="1" max-width="800">
			<v-card color="#2a2929" class="text-xs-center" height="180">
				<iframe
					:src="selectedVideo.link"
					height="180"
					width="350"
					frameborder="0"
					allow="autoplay; fullscreen; picture-in-picture"
					allowfullscreen
				></iframe>

				<div class="title white--text">{{selectedVideo.title}}</div>
			</v-card>

			<v-slide-group v-model="selectedWeek" class="mt-16 pb-6">
				<v-slide-item v-for="n in 25" :key="n" v-slot="{ active, toggle }">
					<v-btn
						class="mx-2"
						size="30"
						small
						:input-value="active"
						active-class="black white--text"
						depressed
						rounded
						@click="toggle"
					>
						Semana {{ n }}
					</v-btn>
				</v-slide-item>
			</v-slide-group>
			<div class="title white--text">Semana 1</div>
			<v-slide-group v-model="model" class="pt-2" active-class="success">
				<v-slide-item v-for="item in itemsVideos" :key="item.id" v-slot="{ active }">
					<v-card
						:color="active ? undefined : 'white'"
						class="ma-4 justify-center"
						height="150"
						width="150"
						@click="selectVideo(item)"
					>
						<v-card-text class="text-center justify-center">
							<p class="mt-12 text-center">{{item.title}}</p>
						</v-card-text>
						<v-row class="fill-height" align="center" justify="center">
							<v-scale-transition>
								<v-icon v-if="active" color="white" size="48"></v-icon>
							</v-scale-transition>
						</v-row>
					</v-card>
				</v-slide-item>
			</v-slide-group>
		</v-sheet>
	</div>
</template>

<script>
	import video from "@/services/http/video";
	export default {
		name: "Lessons",
		components: {},
		data() {
			return {
				selectedWeek:0,
        selectedVideo: {
          title: "",
          description: "",
          link: ""
        },
        itemsVideos : [],
				model: null,
			};
		},
		methods: {
			async fetchVideos() {
        let {data} = await video().show({n_week: this.selectedWeek+1, mentorship_id: this.$store.state.user?.level_id});
        this.itemsVideos = data;
        console.log(data);
      },
      selectVideo(item){
        this.selectedVideo.title = item.title;
        this.selectedVideo.link = `https://player.vimeo.com/video/${item.link}`
      }
		},

		mounted() {
      this.fetchVideos();
    },

    watch:{
      selectedWeek(){
        this.fetchVideos();
      }
    },
	};
</script>

<style src="../scss/Table.scss" lang="scss"></style>
<style scoped>
	.v-application .v-card {
		box-shadow: 0 0px 0 0 #e8eafc, 0 2px 3px -2px #b2b2b21a,
			0 1px 8px 0 #9a9a9a1a !important;
	}
</style>
