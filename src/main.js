import { createApp } from "vue";
import App from "./App.vue";
import "./firebase/config";
import router from "./router/index";
import "./index.css";
import BaseCard from "./components/BaseCard.vue";

// import fontawesome core library
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
library.add(faRightFromBracket);

const app = createApp(App);

app.use(router);

app
  .component("BaseCard", BaseCard)
  .component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
