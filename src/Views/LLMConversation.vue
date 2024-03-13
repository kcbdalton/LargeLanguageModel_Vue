<script setup>
import { ref } from 'vue';
import PromptInput from '../components/PromptInput.vue';
import MessageTextArea from '../components/MessageTextArea.vue';
const messages = ref([]);
const userPrompt = ref('');

const handleUserPrompt = (prompt) => {
	userPrompt.value = prompt;
	messages.value.push(
		{
			user: 'human', 
			prompt: prompt
		}
	);
}

</script>

<template>
	<PromptInput @userPrompt="handleUserPrompt"/>
	<div class="chat-container">
		<div v-for="(message, index) in messages" :key="index" style="display: flex; width: 100%;">
			<MessageTextArea v-if="messages.length > 0" :message="message"/>
		</div>
	</div>
</template>

<style scoped>
.chat-container {
	display: flex;
	flex-direction: column; /* Reverse the order of items */
	position: absolute;
	top: 45%;
	left: 50%;
	transform: translate(-50%, -50%);
	height: 600px; 
	width: 80vw;
	border-radius: 5px;
	border: 2px solid red;
	overflow-x: hidden;
	overflow-y: auto; 
	justify-content: flex-end;
	/* align-items: center; */
}


/* Add any additional styling here if needed */
</style>