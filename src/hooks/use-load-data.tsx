import { useEffect, useState } from 'react';
import { IDatum } from '../lib/data';
import { getStorage } from '../lib/storage';
import { fetchSheetData } from '../lib/data';

/**
 * useLoadData: handles fetching data from Google Sheets,
 * or loading saved data from the browser's LocalStorage API
 * @returns Array<data, error>
 */
export const useLoadData = () => {
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

		// prevents the fetch call from being made multiple times
		return () => {
			controller.abort();
		}
	}, []);

	return [data, error] as const;
}
