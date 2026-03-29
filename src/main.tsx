import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import i18n from "./i18n";
import App from "./App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, MantineProvider, Modal, Popover } from "@mantine/core";
import { I18nextProvider } from "react-i18next";
import { ModalsProvider } from "@mantine/modals";

const theme = createTheme({
  primaryColor: "blue",
  autoContrast: true,
  components: {
    Modal: Modal.extend({
      defaultProps: { zIndex: 1200 },
    }),
    Popover: Popover.extend({
      defaultProps: { zIndex: 1300 },
    }),
    Tooltip: {
      defaultProps: { zIndex: 1400 },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>,
);
