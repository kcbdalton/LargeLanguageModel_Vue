<script setup>
import { ref } from 'vue';
import { invokeLLM } from '../services/InvokeLLMService';
import PromptInput from '@/components/PromptInput.vue';
import MessageTextArea from '@/components/MessageTextArea.vue';
import NavBarContainer from '@/components/NavBar/NavBarContainer.vue';

const messages = ref([]);
async function handleUserPrompt(prompt) {
	messages.value.push(
		{
			user: 'human', 
			text: prompt
		}
	);
	await invokeLLM(prompt).then((response) => {
		messages.value.push(
			{
				user: 'ai', 
				text: response
			}
		);
	});
}
</script>

<template>
	<PromptInput @userPrompt="handleUserPrompt"/>
	<NavBarContainer/>
	<div class="chat-container">
		<div v-for="(message, index) in messages" :key="index" style="display: flex; width: 100%;">
			<MessageTextArea v-if="messages.length > 0" :message="message"/>
		</div>
	</div>
</template>

<style scoped>
.chat-container {
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 45%;
	left: 50%;
	transform: translate(-50%, -50%);
	height: 600px; 
	width: 80vw;
	overflow-x: hidden;
	overflow-y: auto; 
	justify-content: flex-end;
	border-radius: 5px;
	/* border: 2px solid red; */
}
</style>