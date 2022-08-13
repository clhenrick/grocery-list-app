import React from "react";
import { IDatum } from "./lib/data";

interface Props {
	data: IDatum[] | null;
}

function sanitize(string: string) {
	return string.replace(/ /gi, '').toLowerCase();
}

export function List({ data }: Props) {

	function renderItem({ item }:IDatum) {
		const id = sanitize(item);
		return (
			<div key={id}>
				<input id={id} type="checkbox" />{' '}
				<label htmlFor={id}>
					{item}
				</label>
			</div>
		)
	}

	return (
		<div>
			{ data?.filter(d => d.include).map(renderItem) }
		</div>
	);
}
