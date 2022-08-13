import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchSheetData } from './lib/data';

function App() {
	const [ data, setData ] = useState<any|null>(null);
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
				<pre>
					{ JSON.stringify(data, null, 2) }
				</pre>
				{ error && <p>{error.message}</p>}
			</main>
    </div>
  );
}

export default App;
