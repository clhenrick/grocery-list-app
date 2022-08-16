import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchSheetData, IDatum } from './lib/data';
import { useStorage } from './lib/storage';
import {List} from "./List";
import {ThemeToggle} from "./ThemeToggle";

function App() {
	const [ data, setData ] = useState<IDatum[]|null>(null);
	const [ error, setError ] = useState<Error|null>(null);
	const [ writeSavedList, readSavedList] = useStorage();

	// On first render/mount, try to load data from localStorage first.
	// If it doesn't exist then try fetching it.
	useEffect(() => {
		async function handleFetch() {
			const [data, error] = await fetchSheetData();
			setData(data);
			setError(error);
		}
		try {
			const savedList = readSavedList();
			if (savedList && Array.isArray(savedList)) {
				setData(savedList);
			} else {
				handleFetch();
			}
		} catch (error) {
			setError(new Error("Problem reading localStorage."));
		}
	}, []);

	// TODO: function that handles updating list items to be checked / unchecked.
	// function updateListItem(id: number) {
	// 	if (!data) return;
	// 	setState()
	// }

  return (
    <div className="App">
      <header>
				<h1>Grocery List</h1>
				<ThemeToggle />
      </header>
			<main>
				{ data && <List data={data} />}
				{ error && <p>{error.message}</p>}
				{ !data && !error && <p>loading shopping list...</p>}
			</main>
    </div>
  );
}

export default App;
