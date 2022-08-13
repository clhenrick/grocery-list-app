import React from "react";
import styles from "./List.module.css";
import { IDatum } from "./lib/data";
import { ListItem } from "./ListItem";

interface Props {
	data: IDatum[] | null;
}

function sanitize(string: string) {
	return string.replace(/ /gi, '').toLowerCase();
}

export function List({ data }: Props) {

	function renderListItem({ item }:IDatum) {
		const id = sanitize(item);
		return (
			<ListItem key={id} {...{id, item }} />
		);
	}

	return (
		<div className={styles.List}>
			{ data?.filter(d => d.include).map(renderListItem) }
		</div>
	);
}
