import { IDatum } from "./data";

const key = "grocery-list";
const storage = window.localStorage;

export function setStorage(data: IDatum[] | null) {
	if (data) {
		storage.setItem(key, JSON.stringify(data));
	}
}

export function clearStorage() {
	if (storage.getItem(key)) {
		storage.removeItem(key);
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
