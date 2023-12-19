"use client";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const switchClasses = `flex items-center justify-center w-12 h-12 dark:text-dark text-light dark:bg-light  bg-dark rounded-full transition-all duration-500 transform ${
    theme === "light" ? "rotate-180" : ""
  }`;

  return (
    <button
      className={switchClasses}
      onClick={toggleTheme}
      title="Toggle Theme"
    >
      <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
    </button>
  );
};

export default ThemeSwitch;
