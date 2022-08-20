import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import { IDatum, groupData, DataGrouped } from "../lib/data";
import { ListGroup } from "./ListGroup";
import { ListItem } from "./ListItem";

interface Props {
	data: IDatum[] | null;
	handleChange: (i:number) => void;
}

export function List({ data, handleChange }: Props) {
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
					<ListGroup key={category} category={category}>
						{ items.map(({ item, id, checked }) => (
							<ListItem
								key={id}
								{...{item, id, checked }}
								onChange={handleChange}
							/>
						))}
					</ListGroup>
				);
			})}
		</div>
	);
}
