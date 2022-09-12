import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { useUserStore } from "./stores/userStore";
import { auth } from "./firebase/config";
import router from "./router/index";
import "./firebase/config";
import "./index.css"; // TAILWIND
import BaseCard from "./components/BaseCard.vue";
import PrimeVue from "primevue/config";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

import "primevue/resources/themes/saga-green/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

// import fontawesome core library
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
library.add(faRightFromBracket);

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

const userStore = useUserStore();

const onAuthStateChangedPromise = new Promise((resolve, reject) => {
  auth.onAuthStateChanged(
    (user) => {
      userStore.user = user;
      resolve(user);
    },
    (err) => {
      reject(err);
    }
  );
});

export const onAuthStateInit = () => onAuthStateChangedPromise;

app.use(PrimeVue);

app
  .component("BaseCard", BaseCard)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("DataTable", DataTable)
  .component("Column", Column)
  .component("Button", Button);

app.mount("#app");
