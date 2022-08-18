import React from "react";
import styles from "./ListGroup.module.css";

interface Props {
	category: string;
	children?: React.ReactNode;
}

export function ListGroup({ category, children }: Props) {
	return (
		<details key={category} className={styles.details} open>
			<summary className={styles.categoryHeading}>
				{category}
			</summary>
			{ children }
		</details>
	)
}
