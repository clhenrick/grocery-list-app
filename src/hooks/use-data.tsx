import { useEffect, useState } from 'react';
import { IDatum } from '../lib/data';
import { getStorage, setStorage } from '../lib/storage';
import { fetchSheetData } from '../lib/data';

/**
 * useData:
 * 	- handles fetching data from Google Sheets, or loading saved data
 * 		from the browser's LocalStorage API.
 *  - handles updating the data and storing it in LocalStorage
 *
 * @returns { data, error, updateData }
 */
export const useData = () => {
	const [ data, setData ] = useState<IDatum[]|null>(null);
	const [ error, setError ] = useState<Error|null>(null);

	useEffect(() => {
		const controller = new AbortController();

		async function handleFetch() {
			const [data, error] = await fetchSheetData(controller.signal);
			setData(data);
			setError(error);
		}

		// On first render/mount, try to load data from localStorage first.
		// If it doesn't exist in localStorage then try fetching it.
		try {
			const savedList = getStorage();
			if (savedList && Array.isArray(savedList)) {
				setData(savedList);
			} else {
				handleFetch();
			}
		} catch (error) {
			setError(new Error("Problem reading localStorage."));
		}

		// clean up fn prevents the fetch call from being made multiple times
		return () => {
			controller.abort();
		}
	}, []);

	const updateData = (updated: IDatum[]) => {
		try {
			setData(updated);
			setStorage(updated);
		} catch (error) {
			setError(new Error("Problem saving to localStorage"));
		}
	}

	return { data, error, updateData } as const;
}
