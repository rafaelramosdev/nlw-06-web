import { createContext, ReactNode, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

type ThemeContextProviderProps = {
  children: ReactNode;
};

const themeColours = {
  light: {
    backgroundColor: "#f8f8f8",
    color: "#29292e",
  },
  dark: {
    backgroundColor: "#282828",
    color: "#f8f8f8",
  },
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [ currentTheme, setCurrentTheme ] = useState<Theme>(() => {
    const storageTheme = localStorage.getItem('theme');

    return (storageTheme ?? 'light') as Theme;
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);

    document.body.style.setProperty("--color", themeColours[currentTheme].color);
    document.body.style.setProperty(
      "--background",
      themeColours[currentTheme].backgroundColor
    );
  }, [currentTheme]);

  function toggleTheme() {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');

    document.body.style.setProperty("--color", themeColours[currentTheme === 'light' ? 'dark' : 'light'].color);
    document.body.style.setProperty(
      "--background",
      themeColours[currentTheme === 'light' ? 'dark' : 'light'].backgroundColor
    );
  }

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
