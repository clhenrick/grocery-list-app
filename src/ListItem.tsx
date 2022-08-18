import React, { memo } from "react";
import styles from "./ListItem.module.css";
import { sanitize } from "./lib/utils";

interface Props {
	id: number;
	item: string;
	checked: boolean;
	onChange: (id: number) => void;
}

export const ListItem = memo(({ item, id, checked, onChange }: Props) => {
	const htmlId = sanitize(item);

	return (
		<div className={styles.ListItem}>
			<input
				id={htmlId}
				type="checkbox"
				checked={checked}
				onChange={() => onChange(id)}
			/>
			{' '}
			<label className={styles.label} htmlFor={htmlId}>
				{item}
			</label>
		</div>
	)
});
