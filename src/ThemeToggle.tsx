import React, { useState, useEffect } from "react";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
	const DARK = "dark";
	const LIGHT = "light";
	const [theme, setTheme] = useState<"light"|"dark">(LIGHT);

	useEffect(() => {
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		if (media.matches) {
			setTheme("dark");
		} else {
			setTheme(LIGHT);
		}
	}, []);

	useEffect(() => {
		if (theme === LIGHT) {
			document.body.classList.remove("dark-theme");
			document.body.classList.add("light-theme");
		} else {
			document.body.classList.remove("light-theme");
			document.body.classList.add("dark-theme");
		}
	}, [theme]);

	function handleClick() {
		setTheme(theme === LIGHT ? DARK : LIGHT);
	}

	return (
		<button
			className={styles.ThemeToggle}
			onClick={handleClick}
			aria-label={`Switch to ${theme === LIGHT ? DARK : LIGHT} mode`}
		>
			{ theme === LIGHT ? "🌞" : "🌙"}
		</button>
	);
}
