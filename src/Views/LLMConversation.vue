<script setup>
import { ref } from 'vue';
import PromptInput from '../components/PromptInput.vue';
import MessageTextArea from '../components/MessageTextArea.vue';
import NavBarContainer from '@/components/NavBar/NavBarContainer.vue';
import { invokeLLM } from '../services/InvokeLLMService';

// How to install Linux on Windows with WSL
// https://learn.microsoft.com/en-us/windows/wsl/install
const messages = ref([]);
async function handleUserPrompt(prompt) {
	messages.value.push(
		{
			user: 'human', 
			text: prompt
		}
	);
	let aiResponse = await invokeLLM(prompt);
	handleAiResponse(aiResponse)
}

const handleAiResponse = (response) => {
	messages.value.push(
		{
			user: 'ai', 
			text: response
		}
	);
}
</script>

<template>
	<PromptInput @userPrompt="handleUserPrompt" @aiResponse="handleAiResponse"/>
	<NavBarContainer @aiResponse="handleAiResponse"/>
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
	/* border: 2px solid red; */
	overflow-x: hidden;
	overflow-y: auto; 
	justify-content: flex-end;
	/* align-items: center; */
}


/* Add any additional styling here if needed */
</style>