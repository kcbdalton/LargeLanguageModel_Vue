<script setup>
// import { ref, } from 'vue';
// import { useRouter } from 'vue-router';
import { VCard, VCardItem} from 'vuetify/lib/components/index.mjs';
import { defineProps } from 'vue';
// import { RouterLink } from 'vue-router';

defineProps({
	title: String,
	descriptions: Array,
	clickAction: Function,
	githubUrl: String
});
</script>

<template>
	<a :href="githubUrl" class="card-link" target="blank">
		<v-card class="card" variant="tonal" width="344" height="auto" hover @click="console.log('card clicked')" dark>
			<v-card-item>
				<div>
					<div style="font-size: 20px; font-weight: bold;">
						{{ title }}
					</div>
					<div class="text-h6 mt-1">
						Description
					</div>
					<div class="text-h6" v-for="description in descriptions" :key="description">
						- {{ description }}
					</div>
				</div>
			</v-card-item>
		</v-card>
	</a>
</template>

<style scoped>
.card {
	color: rgb(0, 87, 87);
    user-select: none;
	margin: 20px;
}
.card-link {
	text-decoration: none; 
	color: inherit; 
	cursor: pointer; 
}

</style>