import * as React from "react";
import App from "./components/App";
import Heading from "./components/Heading";
import {
  ThemeProvider,
  nullishStringToThemeName,
  LOCAL_STORAGE_THEME_NAME_KEY,
} from "./styles/theme";

const Home = () => (
  <App>
    <Heading>Theming with Vanilla Extract</Heading>
  </App>
);

export default function AppWithContexts() {
  const [themeName] = React.useState(() =>
    nullishStringToThemeName(
      localStorage.getItem(LOCAL_STORAGE_THEME_NAME_KEY ?? "")
    )
  );

  return (
    <ThemeProvider themeName={themeName}>
      <Home />
    </ThemeProvider>
  );
}
