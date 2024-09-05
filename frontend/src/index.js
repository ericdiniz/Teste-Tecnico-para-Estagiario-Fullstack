import { ThemeProvider } from "@mui/material"; // Importando o ThemeProvider
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../src/context/authContext";
import App from "./App";
import { LightTheme } from "./theme/light"; // Importando o tema dark

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={LightTheme}>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
