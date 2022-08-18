import { csvParse, DSVRowString, DSVParsedArray } from "d3-dsv"
import { group } from "d3-array";

// Google Sheet key and name stored in .env file in root of repo
const key = process.env.REACT_APP_SHEET_KEY;
const sheet_name = process.env.REACT_APP_SHEET_NAME;
const sheetUrl = `https://docs.google.com/spreadsheets/d/${key}/gviz/tq?tqx=out:csv&sheet=${sheet_name}`;

export interface IDatum {
	id: number;
	item: string;
	category: string;
	include: boolean;
	checked: boolean;
}

export interface DataGrouped {
	category: string;
	items: IDatum[];
}

export async function fetchSheetData(signal: AbortSignal) : Promise<[DSVParsedArray<IDatum>|null, Error|null]> {
	try {
		const res = await window.fetch(sheetUrl, { signal: signal });
		const text = await res.text();
		const data = parseText(text);
		return [data, null];
	} catch (error: unknown) {
		if (error instanceof Error && error.name === "AbortError") {
			return [null, null];
		}
		return [null, new Error("Something went wrong.")];
	}
}

export function groupData(data: IDatum[]): DataGrouped[] {
	const grouped = group(data, d => d.category);
	return Array.from(grouped, (([category, items]) => ({ category, items: sortItems(items) })));
}

function sortItems(items: IDatum[]) {
	return items.slice().sort((a, b) => {
		return a.item.localeCompare(b.item);
	})
}

function parseText(text:string) : DSVParsedArray<IDatum> {
	return csvParse(text, row);
}

function row({ item, category, include }: DSVRowString<keyof IDatum>, index: number) {
	return {
		id: index,
		item: item || "missing item",
		category: category || "missing category",
		include: include === "TRUE",
		checked: false,
	}
}
