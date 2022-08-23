import { globalStyle } from "@vanilla-extract/css";
import {
  vars,
  lightTheme,
  darkTheme,
  varsSansColor,
  lightThemeClass,
  darkThemeClass,
} from "./theme.css";

const { colors, ...nonColors } = vars;

function generatedGlobalVariableObject(theme: any, vars: any) {
  let globalVariableObject: Record<string, any> = {};
  Object.entries(theme).forEach(([themeKey, themeValue]: any) => {
    if (typeof themeValue === "string") {
      globalVariableObject[vars[themeKey]] = themeValue;
    } else {
      globalVariableObject = {
        ...globalVariableObject,
        ...generatedGlobalVariableObject(themeValue, vars[themeKey]),
      };
    }
  });
  return globalVariableObject;
}

globalStyle(":root", {
  vars: {
    ...generatedGlobalVariableObject(lightTheme, vars.colors),
    ...generatedGlobalVariableObject(varsSansColor, nonColors),
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: generatedGlobalVariableObject(darkTheme, vars.colors),
    },
  },
});

globalStyle(`.${lightThemeClass}`, {
  vars: generatedGlobalVariableObject(lightTheme, vars.colors),
});

globalStyle(`.${darkThemeClass}`, {
  vars: generatedGlobalVariableObject(darkTheme, vars.colors),
});

globalStyle("html, body, #root, #app", {
  height: "100%",
  width: "100%",
});

globalStyle("*", {
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
});

globalStyle("#app", {
  backgroundColor: vars.colors.background,
  color: vars.colors.textNormal,
});
