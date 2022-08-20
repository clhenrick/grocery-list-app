import { useEffect, useState } from 'react';
import { IDatum } from '../lib/data';
import { getStorage, setStorage, clearStorage } from '../lib/storage';
import { fetchSheetData } from '../lib/data';

/**
 * useData:
 * 	- handles fetching data from Google Sheets, or loading saved data
 * 		from the browser's LocalStorage API.
 *  - handles updating the data and storing it in LocalStorage
 *
 * @returns { data, error, updateData, resetData }
 */
export const useData = () => {
	const [ data, setData ] = useState<IDatum[]|null>(null);
	const [ error, setError ] = useState<Error|null>(null);

	const handleFetch = async (signal: AbortSignal) => {
		const [data, error] = await fetchSheetData(signal);
		setData(data);
		setError(error);
	}

	useEffect(() => {
		const controller = new AbortController();

		// On first render/mount, try to load data from localStorage first.
		// If it doesn't exist in localStorage then try fetching it.
		try {
			const savedList = getStorage();
			if (savedList && Array.isArray(savedList)) {
				setData(savedList);
			} else {
				handleFetch(controller.signal);
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

	const resetData = () => {
		const controller = new AbortController();
		try {
			clearStorage();
			handleFetch(controller.signal);
		} catch (error) {
			setError(new Error("Problem resetting data"));
		}
		return () => {
			controller.abort();
		};
	}

	return { data, error, updateData, resetData } as const;
}
