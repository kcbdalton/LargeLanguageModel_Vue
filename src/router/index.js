import { createRouter, createWebHistory }from "vue-router";

const routes = [
	{
		path: '/',
		name: 'App',
		component: () => import('../App.vue')
	},
	{
		path: '/LLM',
		name: 'LLM',
		component: () => import('../Views/LLMConversation.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router