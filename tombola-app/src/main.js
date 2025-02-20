import { createApp } from 'vue';
import App from './App.vue';

// ✅ Importa PRIMA Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

// ✅ Poi importa Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// ✅ Importa il router DOPO Bootstrap
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
