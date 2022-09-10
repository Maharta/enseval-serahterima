import { createApp } from "vue";
import App from "./App.vue";
import "./firebase/config";
import router from "./router/index";
import "./index.css";
import BaseCard from "./components/BaseCard.vue";

const app = createApp(App);

app.use(router);

app.component("BaseCard", BaseCard);

app.mount("#app");
