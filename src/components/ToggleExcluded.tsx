import { memo } from "react";
import styles from "./ToggleExcluded.module.css";

interface Props {
	showExcludedItems: boolean;
	onClick: () => void;
}

export const ToggleExcludedItems = memo(({ showExcludedItems, onClick}: Props) => {
	return (
		<button
			className={styles.ToggleExcluded}
			onClick={onClick}
		>
			{showExcludedItems ? "⚅" : "⚀"}
		</button>
	);
});
