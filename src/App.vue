<script setup>
import NavBarContainer from './components/NavBar/NavBarContainer.vue';

</script>
<template>
	<NavBarContainer />
	<router-view></router-view>
</template>



<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
	background-color: rgb(255, 0, 0);
}
</style>
