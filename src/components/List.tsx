import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import { IDatum, groupData, DataGrouped } from "../lib/data";
import { ListGroup } from "./ListGroup";
import { ListItem } from "./ListItem";

interface Props {
	data: IDatum[] | null;
	handleChange: (i:number) => void;
	filterIncluded: boolean;
}

export function List({ data, handleChange, filterIncluded }: Props) {
	const [grouped, setGrouped] = useState<DataGrouped[]>([]);

	useEffect(() => {
		if (data) {
			const filtered = filterIncluded ? data.filter(d => d.include) : data.slice();
			const grouped = groupData(filtered);
			setGrouped(grouped);
		}
	}, [data, filterIncluded]);

	return (
		<div className={styles.List}>
			{ grouped.map(({ category, items }) => {
				return (
					<ListGroup key={category} category={category}>
						<ul>
							{ items.map(({ item, id, checked }) => (
								<ListItem
									key={id}
									{...{item, id, checked }}
									onChange={handleChange}
								/>
							))}
						</ul>
					</ListGroup>
				);
			})}
		</div>
	);
}
