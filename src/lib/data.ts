import { csvParse, DSVRowString, DSVParsedArray } from "d3-dsv"

// https://docs.google.com/spreadsheets/d/1YMBkCqCi31xiVpWtSsw97YFMo0HwVE6N6hX3nv2fF-w/edit#gid=0
const key = "1YMBkCqCi31xiVpWtSsw97YFMo0HwVE6N6hX3nv2fF-w";
const sheet_name = "Sheet1";
const sheetUrl = `https://docs.google.com/spreadsheets/d/${key}/gviz/tq?tqx=out:csv&sheet=${sheet_name}`;

export interface IDatum {
	item: string;
	category: string;
	include: boolean;
}

export async function fetchSheetData() : Promise<[DSVParsedArray<IDatum>|null, Error|null]> {
	try {
		const res = await window.fetch(sheetUrl);
		const text = await res.text();
		const data = parseText(text);
		return [data, null];
	} catch (error: unknown) {
		return [null, new Error("Something went wrong.")];
	}
}

function parseText(text:string) : DSVParsedArray<IDatum> {
	return csvParse(text, row);
}

function row({ item, category, include }: DSVRowString<keyof IDatum>) {
	return {
		item: item || "missing item",
		category: category || "missing category",
		include: include === "TRUE" ? true : false,
	}
}
