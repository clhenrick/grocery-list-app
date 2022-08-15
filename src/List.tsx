import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import { IDatum } from "./lib/data";
import { ListGroup } from "./ListGroup";
import { groupData, DataGrouped } from "./lib/data"

interface Props {
	data: IDatum[] | null;
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

	return (
		<div className={styles.List}>
			{ grouped.map(({ category, items }) => {
				return (
					<ListGroup key={category} {...{category, items }} />
				);
			})}
		</div>
	);
}
