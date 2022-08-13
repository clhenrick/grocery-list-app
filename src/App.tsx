import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchSheetData, IDatum } from './lib/data';
import {List} from "./List";

function App() {
	const [ data, setData ] = useState<IDatum[]|null>(null);
	const [ error, setError ] = useState<Error|null>(null);

	useEffect(() => {
		async function handleData() {
			const [data, error] = await fetchSheetData();
			setData(data);
			setError(error);
		}
		handleData();
	}, []);

  return (
    <div className="App">
      <header>
				<h1>Grocery List</h1>
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
