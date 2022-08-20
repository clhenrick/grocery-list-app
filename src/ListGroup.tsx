import React, { memo } from "react";
import styles from "./ListGroup.module.css";

interface Props {
	category: string;
	children?: React.ReactNode;
}

export const ListGroup = memo(({ category, children }: Props) => {
	return (
		<details className={styles.details} open>
			<summary className={styles.categoryHeading}>
				{category}
			</summary>
			{ children }
		</details>
	);
});
