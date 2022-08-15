import React from "react";
import { IDatum } from "./lib/data";
import { ListItem } from "./ListItem";
import styles from "./ListGroup.module.css";

interface Props {
	category: string;
	items: IDatum[];
}

function sanitize(string: string) {
	return string.replace(/ /gi, '').toLowerCase();
}

export function ListGroup({ category, items }: Props) {
	function renderListItem({ item }:IDatum) {
		const id = sanitize(item);
		return (
			<ListItem key={id} {...{id, item }} />
		);
	}

	return (
		<details key={category} className={styles.details} open>
			<summary className={styles.categoryHeading}>
				{category}
			</summary>
			{items.map(renderListItem)}
		</details>
	)
}
