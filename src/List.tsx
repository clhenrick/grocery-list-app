import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import { IDatum } from "./lib/data";
import { ListItem } from "./ListItem";
import { groupData, DataGrouped } from "./lib/data"

interface Props {
	data: IDatum[] | null;
}

function sanitize(string: string) {
	return string.replace(/ /gi, '').toLowerCase();
}

export function List({ data }: Props) {

	const [grouped, setGrouped] = useState<DataGrouped[]>([]);

	useEffect(() => {
		if (data) {
			const filtered = data.filter(d => d.include);
			const grouped = groupData(filtered);
			setGrouped(grouped);
		}
	}, [data]);

	function renderListItem({ item }:IDatum) {
		const id = sanitize(item);
		return (
			<ListItem key={id} {...{id, item }} />
		);
	}

	return (
		<div className={styles.List}>
			{ grouped.map(({ category, items }) => {
				return (
					<div>
						<h2 className={styles.categoryHeading}>{category}</h2>
						{items.map(renderListItem)}
					</div>
				)
			})}
		</div>
	);
}
