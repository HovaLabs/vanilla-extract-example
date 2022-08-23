import { createThemeContract } from "@vanilla-extract/css";

export const varsSansColor = {
  space: {
    small: "4px",
    medium: "8px",
    large: "16px",
  },
  fonts: {
    heading: "Georgia, Times, Times New Roman, serif",
    body: "system-ui",
  },
  // TODO update fonts with sane default typography object shape
};

export const varsSansColorThemeContract = createThemeContract(varsSansColor);

const colorTokens = {
  red100: "#ff0000",
  red200: "#ff4444",
};

const colors = createThemeContract({
  primary: null,
  secondary: null,
  background: null,
  textNormal: null,
  textDimmed: null,
  ...colorTokens,
});

type ThemeColorObject = Record<keyof typeof colors, string>;

export const lightTheme: ThemeColorObject = {
  primary: "#1E40AF",
  secondary: "#DB2777",
  background: "#EFF6FF",
  textNormal: "#1F2937",
  textDimmed: "#6B7280",
  ...colorTokens,
};
export const lightThemeClass = "light";

export const darkTheme: ThemeColorObject = {
  primary: "#60A5FA",
  secondary: "#F472B6",
  background: "#1F2937",
  textNormal: "#F9FAFB",
  textDimmed: "#D1D5DB",
  ...colorTokens,
};

export const darkThemeClass = "dark";

export const vars = { ...varsSansColorThemeContract, colors };
