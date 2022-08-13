// https://docs.google.com/spreadsheets/d/1YMBkCqCi31xiVpWtSsw97YFMo0HwVE6N6hX3nv2fF-w/edit#gid=0
const key = "1YMBkCqCi31xiVpWtSsw97YFMo0HwVE6N6hX3nv2fF-w";
const sheet_name = "Sheet1";
const sheetUrl = `https://docs.google.com/spreadsheets/d/${key}/gviz/tq?tqx=out:csv&sheet=${sheet_name}`

export async function fetchSheetData() : Promise<[any|null, Error|null]> {
	try {
		const res = await window.fetch(sheetUrl);
		console.log(res)
		const text = await res.text();
		console.log(text)
		return [text, null];
	} catch (error: unknown) {
		return [null, new Error("Failed to fetch")];
	}
}
