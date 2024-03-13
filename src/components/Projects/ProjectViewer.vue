<script setup>
import { ref, defineExpose } from 'vue';
import { VRow, VDialog, VCard, VForm, VCardTitle } from 'vuetify/lib/components/index.mjs';

const dialog = ref(false);

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
		<v-dialog v-model="dialog" width="1024" >
			<v-card :class="{'entry-animation' : dialog}">
				<v-form >
					<v-card-title>
						<span class="text-h5">Projects</span>
					</v-card-title>
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
</style>