import { csvParse, DSVRowString } from "d3-dsv"

// https://docs.google.com/spreadsheets/d/1YMBkCqCi31xiVpWtSsw97YFMo0HwVE6N6hX3nv2fF-w/edit#gid=0
const key = "1YMBkCqCi31xiVpWtSsw97YFMo0HwVE6N6hX3nv2fF-w";
const sheet_name = "Sheet1";
const sheetUrl = `https://docs.google.com/spreadsheets/d/${key}/gviz/tq?tqx=out:csv&sheet=${sheet_name}`;

export interface IDatum {
	item: string;
	category: string;
	include: boolean;
}

interface IDatumString {
	item: string;
	category: string;
	include: string;
}

export async function fetchSheetData() : Promise<[any|null, Error|null]> {
	try {
		const res = await window.fetch(sheetUrl);
		const text = await res.text();
		const data = parseText(text);
		return [data, null];
	} catch (error: unknown) {
		return [null, new Error("Failed to fetch")];
	}
}

function parseText(text:string) : any {
	return csvParse(text, row);
}

function row({ item, category, include }: DSVRowString<keyof IDatumString>) {
	return {
		item,
		category,
		include: include === "TRUE" ? true : false,
	}
}
