import { createThemeHelper } from "./createThemeHelper";

/**
 * CONSTANTS
 */
export const LOCAL_STORAGE_THEME_NAME_KEY = undefined; // "theme-name";

/**
 * TYPES
 */
export type ThemeName = ReturnType<typeof useThemeInfo>["themeName"];

/**
 * HELPERS
 */
export const { useThemeInfo, nullishStringToThemeName, ThemeProvider } =
  createThemeHelper(["light", "dark"], LOCAL_STORAGE_THEME_NAME_KEY);
