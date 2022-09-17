import React, { useState, useEffect } from "react";
import styles from "./ThemeToggle.module.css";

const enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

const enum ThemeClass {
  LIGHT_THEME = "light-theme",
  DARK_THEME = "dark-theme",
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    if (media.matches) {
      setTheme(Theme.DARK);
    } else {
      setTheme(Theme.LIGHT);
    }
  }, []);

  useEffect(() => {
    if (theme === Theme.LIGHT) {
      document.body.classList.remove(ThemeClass.DARK_THEME);
      document.body.classList.add(ThemeClass.LIGHT_THEME);
    } else {
      document.body.classList.remove(ThemeClass.LIGHT_THEME);
      document.body.classList.add(ThemeClass.DARK_THEME);
    }
  }, [theme]);

  function handleClick() {
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }

  return (
    <button
      className={styles.ThemeToggle}
      onClick={handleClick}
      aria-label={`Toggle dark theme`}
      aria-pressed={theme === Theme.DARK}
    >
      {theme === Theme.LIGHT ? "🌞" : "🌙"}
    </button>
  );
}
