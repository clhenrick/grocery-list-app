import React from "react";
import styles from "./ListItem.module.css";

interface Props {
	id: string;
	item: string;
}

export function ListItem({ item, id }: Props) {
	return (
		<div className={styles.ListItem}>
			<input id={id} type="checkbox" />{' '}
			<label className={styles.label} htmlFor={id}>
				{item}
			</label>
		</div>
	)
}
