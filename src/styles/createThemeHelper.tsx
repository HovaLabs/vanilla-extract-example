import * as React from "react";

export function createThemeHelper<T extends string>(
  themeNameArray: T[],
  localStorageKey?: string
) {
  /**
   * Validates name is a theme name, otherwise returns undefined.
   */
  function nullishStringToThemeName(
    themeNameString?: string | null
  ): T | undefined {
    for (const themeName of themeNameArray) {
      if (themeName === themeNameString) return themeName;
    }
    return undefined;
  }

  /**
   *  We are assuming the default browser theme name is "light"
   *  Note: we're returning T | undefined even though this function will only
   *  ever return 'light' | 'dark' | undefined
   */
  function getOsThemeName(): T | undefined {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia === "undefined"
    ) {
      return undefined;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark" as T;
    }
    return "light" as T;
  }

  type TThemeContextValue = {
    themeName: T | undefined;
    osThemeName: T | undefined;
    setThemeName: React.Dispatch<React.SetStateAction<T | undefined>>;
  };

  /**
   * All things theme names context
   */
  const ThemeContext = React.createContext<TThemeContextValue>({
    themeName: undefined, // currently used theme name
    osThemeName: undefined, // what the OS's theme is
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setThemeName: () => {}, // sets the currently used theme name
  });

  /**
   *
   */
  const useThemeInfoHook = (initialThemeName?: string) => {
    const [themeName, setThemeNameState] = React.useState<T | undefined>(
      nullishStringToThemeName(initialThemeName)
    );
    const [osThemeName, setOsThemeName] = React.useState<T | undefined>(
      getOsThemeName()
    );

    React.useEffect(() => {
      function handleThemeChange(e: MediaQueryListEvent) {
        const newOsThemeName = (e.matches ? "dark" : "light") as T;
        setOsThemeName(newOsThemeName);
      }

      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", handleThemeChange);
      return () => {
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .removeEventListener("change", handleThemeChange);
      };
    }, []);

    // Wrapping `setThemeNameState` so it also sets localstorage when called
    const setThemeName: React.Dispatch<React.SetStateAction<T | undefined>> = (
      newValOrFunc
    ) => {
      if (typeof newValOrFunc === "function") {
        setThemeNameState((currentValue) => {
          const newVal = newValOrFunc(currentValue);
          if (newVal != null && localStorageKey != null) {
            localStorage.setItem(localStorageKey, newVal);
          }
          return newVal;
        });
      } else {
        setThemeNameState(newValOrFunc);
        if (newValOrFunc != null && localStorageKey != null) {
          localStorage.setItem(localStorageKey, newValOrFunc);
        }
      }
    };

    return { themeName, setThemeName, osThemeName };
  };

  /**
   * Theme Provider Wrapper
   */
  function ThemeProvider({
    children,
    themeName,
  }: {
    children: React.ReactNode;
    themeName: T | undefined;
  }) {
    const value = useThemeInfoHook(themeName);
    return (
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
  }

  function useThemeInfo() {
    const value = React.useContext(ThemeContext);
    return value;
  }

  return {
    ThemeContext,
    useThemeInfo,
    ThemeProvider,
    nullishStringToThemeName,
  };
}
