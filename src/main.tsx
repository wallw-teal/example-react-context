import React from "react";
import ReactDOM from "react-dom/client";
import AppUsingContext from "./AppUsingContext.tsx";
import AppUsingStores from "./AppUsingStores.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <>
      <AppUsingContext />
      <AppUsingStores />
    </>
  </React.StrictMode>,
);
