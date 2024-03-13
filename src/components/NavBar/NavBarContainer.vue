<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { VToolbar, VRow, VCol } from 'vuetify/lib/components/index.mjs'
import NavBarButton from './NavBarButton.vue'
const router = useRouter();
const showPDF = ref(false);

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
	{
		label: "View Resume",
		icon: "mdi-text-box-search-outline",
		clickAction: () =>console.log("Not implemented yet, but hopefully can get a pdf to pop up")
	},
	{
		label: "View Projects",
		icon: "mdi-text-box-search-outline",
		clickAction: () => showPDF.value = true
	}
]);
</script>

<template>
	<v-toolbar :elevation="8" class="custom-navbar">
		<v-row dense justify="start">
			<v-col
				v-for="button in navBarButtons"
				:key="button.label"
				cols="auto"
				>
				<NavBarButton :label="button.label" :icon="button.icon" @click="button.clickAction"/>
			</v-col>
		</v-row>
	</v-toolbar>
</template>

<style scoped>
.custom-navbar {
	display: flex;
	background-color: rgb(24, 83, 108);
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 60px;
	z-index: 1000;
	justify-content: flex-start;
}
</style>