import React from "react";
import ReactDOM from "react-dom/client";
import client from "./common/client/apollo";
import Home from "./pages/home/home";
import { ApolloProvider } from "@apollo/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  </React.StrictMode>
);
