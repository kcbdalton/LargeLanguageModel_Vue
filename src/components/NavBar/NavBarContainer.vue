<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { VToolbar, VRow, VCol } from 'vuetify/lib/components/index.mjs';
import NavBarButton from './NavBarButton.vue';
import ProjectViewer from '../Projects/ProjectViewer.vue';

const router = useRouter();
const projectViewerDialog = ref(false);
const navBarButtons = ref([
	{
		label: "Home",
		icon: "mdi-home",
		clickAction: () => router.push("/")
	},
	{
		label: "LLM",
		icon: "mdi-message-text",
		clickAction: () => router.push("/LLM")
	},
	// {
	// 	label: "View Resume",
	// 	icon: "mdi-text-box-search-outline",
	// 	clickAction: () => console.log("message service: ", messageService)
	// },
	{
		label: "View Projects",
		icon: "mdi-text-box-search-outline",
		clickAction: () => projectViewerDialog.value.open()
	}
]);

</script>

<template>
	<v-toolbar :elevation="8" class="custom-navbar" color="teal-darken-4">
		<v-row dense justify="start">
			<v-col
				v-for="button in navBarButtons"
				:key="button.label"
				cols="auto"
				>
				<NavBarButton :label="button.label" :icon="button.icon" @click="button.clickAction"/>
			</v-col>
			<v-col cols="auto" justify="end">
				<a href="https://github.com/kcbdalton" target="blank">
					<img src="../../assets/github-logo.png" class="github-logo"/>
				</a>
				
			</v-col>
		</v-row>
	</v-toolbar>
	<ProjectViewer ref="projectViewerDialog"/>
	
</template>

<style scoped>
.custom-navbar {
	display: flex;
	background-color: rgb(66, 64, 71);
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 60px;
	z-index: 1000;
	justify-content: flex-start;
}
.github-logo {
	position: absolute;
	right: 2%;
	top: 15%;
	max-width: 40px; 
	height: auto; 
}
</style>