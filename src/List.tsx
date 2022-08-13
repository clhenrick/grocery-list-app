import React from "react";
import { IDatum } from "./lib/data";

interface Props {
	data: IDatum[] | null;
}

export function List({ data }: Props) {
	return (
		<pre>
			{ JSON.stringify(data, null, 2) }
		</pre>
	);
}
