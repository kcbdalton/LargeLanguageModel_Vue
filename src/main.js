import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
// loadFonts()
createApp(App).use(router).use(vuetify).mount('#app');