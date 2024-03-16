<script setup>
import { ref, defineExpose } from 'vue';
import { VRow, VDialog, VCard, VForm, VToolbar, VCol, VToolbarTitle, VIcon } from 'vuetify/lib/components/index.mjs';
import ProjectCardVue from './ProjectCard.vue';

const dialog = ref(false);

const projectCards = ref([
	{
		title: "LLM",
		descriptions: [
			"Utilize Langchain"
		],
		githubUrl: "https://github.com/kcbdalton/langchain-vuetify"
	},
	{
		title: "Baseball Stats Scraper",
		descriptions: [
			"Webscrape stats from the 2021 & 2022 MLB seasons",
			"Utilizes ChartJS to visualize data"
		],
		githubUrl: "https://github.com/kcbdalton/baseball-stats"
	},
]);



function open() {
	setTimeout(() => {
		dialog.value = true;
	}, 100);
}

defineExpose({
	open,
});

</script>
<template >
	<v-row justify="center">
		<v-dialog v-model="dialog" width="80vw" >
			<v-card :class="{'entry-animation' : dialog}" style="margin: 20px; overflow-y: hidden;" height="auto">
				<v-form >
					<v-toolbar
						color="blue-grey"
						dark
						flat
						>
						<v-toolbar-title class="text-h5" style="user-select: none;">Projects</v-toolbar-title>

						<v-icon class="icon" icon="mdi-close-thick" @click="dialog = false"/>

					</v-toolbar>
					<v-row dense>
						<v-col
							v-for="projectCard in projectCards"
							:key="projectCard.title"
							cols="auto"
						>
							<ProjectCardVue 
								:title="projectCard.title" 
								:descriptions="projectCard.descriptions" 
								:githubUrl="projectCard.githubUrl"
							/>
						</v-col>
					</v-row>
				</v-form>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<style>

@media (prefers-reduced-motion: no-preference) {
  .entry-animation {
	display: block;
    animation: wipe-enter 1s 1;
  }
}
@keyframes wipe-enter {
	0% {
		transform: scale(0, .025);
	}
	50% {
		transform: scale(1, .025);
	}
}
.icon {
	margin-right: 20px;
}
.icon:hover {
	transform: scale(150%);
}

</style>