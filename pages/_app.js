import { store } from "@/store/store";
import "@/styles/globals.css";
import React from "react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>)
}
