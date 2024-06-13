import App from "@/App";
import { store } from "@/infrastructure/store/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
