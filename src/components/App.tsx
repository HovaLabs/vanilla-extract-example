import * as React from "react";
import { darkThemeClass, lightThemeClass } from "../styles/theme.css";
import "../styles/global.css";
import { useThemeInfo } from "../styles/theme";

interface AppProps {
  children: React.ReactNode;
}

export default function App({ children }: AppProps) {
  const { themeName, osThemeName, setThemeName } = useThemeInfo();

  return (
    <div
      id="app"
      className={
        themeName === "light"
          ? lightThemeClass
          : themeName === "dark"
          ? darkThemeClass
          : undefined
      }
    >
      {children}
      <button
        onClick={() =>
          setThemeName((themeName ?? osThemeName) === "dark" ? "light" : "dark")
        }
      >
        Switch to{" "}
        {(themeName ?? osThemeName) === "dark"
          ? lightThemeClass
          : darkThemeClass}{" "}
        theme
      </button>
    </div>
  );
}
