import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import VueKonva from 'vue-konva'

//const app = createApp(App);
//app.use(VueKonva);
//app.use(store);
//app.mount('#app');

createApp(App).use(store).use(VueKonva).mount('#app')
