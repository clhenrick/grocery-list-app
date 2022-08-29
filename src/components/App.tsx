import { useState, useMemo } from "react";
import './App.css';
import { useData } from '../hooks/use-data';
import { List } from "./List";
import { OptionsMenu } from "./OptionsMenu";

function App() {
	const { data: dataRaw, error, updateData, resetData } = useData();
	const [ filterIncluded, setFilterIncluded ] = useState(true);
	const data = useMemo(() =>
		filterIncluded
			? dataRaw?.filter(d => d.include)
			: dataRaw,
		[dataRaw, filterIncluded]
	);

	function updateListItem(id: number) {
		if (dataRaw) {
			const index = dataRaw.findIndex(d => d.id === id);
			if (index === -1) return;
			const datum = dataRaw[index];
			const datumUpdated = { ...datum, checked: !datum.checked };
			updateData([
				...dataRaw.slice(0, index),
				datumUpdated,
				...dataRaw.slice(index + 1)
			]);
		}
	}

  return (
    <div className="App">
      <header>
				<h1>Grocery List</h1>
				<OptionsMenu
					onResetClick={resetData}
					onToggleExcludedClick={() => setFilterIncluded(!filterIncluded)}
					showExcludedItems={!filterIncluded}
				/>
      </header>
			<main>
				{ data &&
					<List
						data={data}
						handleChange={updateListItem}
					/>
				}
				{ error && <p>{error.message}</p>}
				{ !data && !error && <p>loading shopping list...</p>}
			</main>
    </div>
  );
}

export default App;
