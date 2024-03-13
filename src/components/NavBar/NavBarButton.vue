<script setup>
import { defineProps } from 'vue';
import { VBtn, VIcon } from 'vuetify/lib/components/index.mjs';

defineProps({
	icon: String,
	label: String,
	clickAction: Function
});


</script>
<template>
	<v-btn class="button" :click="clickAction"> 
		<v-icon :icon="icon"></v-icon>
		{{ label }}
	</v-btn>
</template>

<style scoped>
.button {
	color: rgb(230, 220, 172);
	font-size: 18px;
}
</style>