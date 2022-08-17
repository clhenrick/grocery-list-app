import { IDatum } from "./data";

const key = "grocery-list";
const storage = window.localStorage;

export function setStorage(data: IDatum[]) {
	if (data) {
		storage.setItem(key, JSON.stringify(data));
	}
}

export function getStorage() {
	const data = storage.getItem(key);
	if (data && typeof data === "string") {
		try {
			return JSON.parse(data);
		} catch(error) {
			throw new Error("Problem parsing localStorage data");
		}
	}
}
