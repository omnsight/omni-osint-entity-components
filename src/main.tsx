import "@mantine/core/styles.css";
import i18n from "./i18n";
import App from "./App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, MantineProvider } from "@mantine/core";
import { I18nextProvider } from "react-i18next";

const theme = createTheme({
  primaryColor: "blue",
  autoContrast: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </MantineProvider>
  </StrictMode>,
);
