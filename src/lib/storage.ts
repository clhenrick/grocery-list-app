import { IDatum } from "./data";

export function useStorage(): [(data: IDatum[]) => void, () => undefined | IDatum[] | Error] {
	const key = "grocery-list";
	const storage = window.localStorage;

	function setStorage(data: IDatum[]) {
		if (data) {
			storage.setItem(key, JSON.stringify(data));
		}
	}

	function getStorage() {
		const data = storage.getItem(key);
		if (data && typeof data === "string") {
			try {
				return JSON.parse(data);
			} catch(error) {
				throw new Error("Problem parsing localStorage data");
			}
		}
	}

	return [setStorage, getStorage];
}
