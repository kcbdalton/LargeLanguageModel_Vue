<script setup>
import { ref, defineEmits, watch } from 'vue';
import { VTextField, VRow, VCol, VIcon } from 'vuetify/lib/components/index.mjs';
const userPrompt = ref('');
const response = ref('');
const animationTrigger = ref(false);

async function handleUserInput(event, source) {
	if ((source === 'enter'  && userPrompt.value != '') || (source === 'icon' && userPrompt.value != '')) {
		triggerSuccessAnimation();	
		emit('userPrompt', userPrompt.value);
		userPrompt.value = '';
	}
}

const triggerSuccessAnimation = () => {
	animationTrigger.value = true;
	setTimeout(() => {
		animationTrigger.value = false;
	}, 1000); // Change this value according to your animation duration
};

watch(response, (newValue) => {
	emit('aiResponse', newValue)
})

const emit = defineEmits({
	userPrompt: String
});

</script>

<template>
	<v-row dense class="prompt-container">
		<v-col md="11">
			<v-text-field 
				class="user-prompt" 
				label="Enter your prompt here..."
				variant="outlined"
				clear-icon="mdi-close-circle"
				clearable
				v-model="userPrompt"
				@keyup.enter="handleUserInput($event, 'enter')"
				color="aliceblue"
			/>
		</v-col>
		<v-col md="1">
			<span class="magic" :class="{ 'is-animated': animationTrigger }" style="--r:15px;" @click="handleUserInput($event, 'icon')">
				<v-icon icon="mdi-send" color="white"/>
			</span>
		</v-col>
	</v-row>
</template>

<style scoped>
.prompt-container {
	position: absolute;
	width: 50%;
	bottom: 5%;
	left: 50%; 
	transform: translate(-50%, -50%);
	height: 5vw;
}
.user-prompt {
	position: absolute;
	width: 90%;
	color: aliceblue;
}
.v-text-field {
	font-size: 20px;
}
.v-text-field >>> input {
	font-size: 20px;
	font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.magic {
	display: inline-block;
	margin-top: 15px;
	position: relative;
	--r: 45px;
	transform: scale(150%);
	animation: var(--animate);
}

.magic:hover {
	cursor: pointer;
}

.magic i {
	color: rgb(5, 165, 0);
	filter: grayscale(100%);
}

.magic.is-animated i{
	animation: change 1s forwards;
}

@keyframes change {
	50% {
		transform: scale(0);
		filter: grayscale(100%);
	}
	51% {
		filter: grayscale(0%);
	}
	100% {
		transform: scale(1);
		filter: grayscale(0%);
	}
}

.magic::before {
	content: "";
	position: absolute;
	top: calc(50% - var(--r));
	left: calc(50% - var(--r));
	width: calc(2 * var(--r));
	height: calc(2 * var(--r));
	border-radius: 50%;
	border: solid rgb(5, 165, 0) var(--r);
	transform: scale(0);
	box-sizing: border-box;
}

/* .magic:hover::before, */
.magic.is-animated::before {
	border-width: 0;
	transform: scale(1);
	transition: transform 0.5s, border-width 0.5s 0.5s;
}

.magic::after,
.magic i::after {
	content: "";
	position: absolute;
	width: calc(4 * var(--r));
	height: calc(4 * var(--r));
	left: calc(50% - 2 * var(--r));
	top: calc(50% - 2 * var(--r));
	--c1: radial-gradient(circle, red 50%, transparent 60%);
	--c2: radial-gradient(circle, rgb(0, 38, 255) 50%, transparent 60%);
	background: /*4 reds*/
	var(--c1), var(--c1), var(--c1), var(--c1), /*4 oranges*/
	var(--c2), var(--c2), var(--c2), var(--c2);
	background-size: calc(var(--r) / 3) calc(var(--r) / 3);
	background-position: calc(50% - var(--r)) calc(50% - var(--r)), calc(50% + var(--r)) calc(50% - var(--r)),
	calc(50% - var(--r)) calc(50% + var(--r)), calc(50% + var(--r)) calc(50% + var(--r)),
	calc(50% + 0px) calc(50% + var(--r) * 1.414), calc(50% + var(--r) * 1.414) calc(50% + 0px),
	calc(50% - var(--r) * 1.414) calc(50% + 0px), calc(50% + 0px) calc(50% - var(--r) * 1.414);
	background-repeat: no-repeat;
	transform: scale(0);
}

.magic i::after {
	background-size: calc(var(--r) / 5) calc(var(--r) / 5);
	transform: rotate(55deg) scale(0);
}

/* .magic:hover:after, */
.magic.is-animated:after {
	transform: scale(1);
	opacity: 0;
	background-size: 0 0;
	transition: transform 0.5s 0.5s, opacity 0.4s 0.9s, background-size 0.5s 0.9s;
}

/* .magic:hover i:after, */
.magic.is-animated i:after {
	transform: rotate(55deg) scale(1);
	opacity: 0;
	background-size: 0 0;
	transition: transform 0.5s 0.5s, opacity 0.4s 0.9s, background-size 0.5s 0.9s;
}
</style>